#!/usr/bin/env bash
# migrate.sh - consolidate Frontend Mentor repositories into one monorepo.

set -euo pipefail

# Stages:
#   manifest   Fetch and cache Google Sheets data
#   import     Import original repositories using git subtree
#   index      Generate the project homepage
#   verify     Check new GitHub Pages URLs
#   report     Generate a CSV migration checklist
#   purge      Delete original repositories (dry-run by default)

SEP=$'\037'
STATE_DIR=".migration"
MANIFEST="$STATE_DIR/manifest.dat"
VERIFY_FILE="$STATE_DIR/verify.tsv"
REPORT_FILE="$STATE_DIR/report.csv"
PURGE_LOG="$STATE_DIR/purge.log"
INDEX_TMP=""

export GIT_TERMINAL_PROMPT=0

log() { printf '%s\n' "--> $*"; }
warn() { printf '%s\n' "WARN: $*" >&2; }
die() {
  printf '%s\n' "ERROR: $*" >&2
  exit 1
}

lc() { printf '%s' "$1" | tr '[:upper:]' '[:lower:]'; }
need() { command -v "$1" >/dev/null 2>&1 || die "missing dependency: $1"; }

cleanup() {
  [ -z "$INDEX_TMP" ] || rm -f "$INDEX_TMP"
}
trap cleanup EXIT

# ---------------------------------------------------------------- environment

load_env() {
  if [ -f .env ]; then
    set -a
    . ./.env
    set +a
  fi

  GH_USER="${GH_USER:-FopefoluwaIkufisile}"
  MONOREPO="${MONOREPO:-frontend-mentor-projects}"
  MONO_BRANCH="${MONO_BRANCH:-main}"
  SQUASH="${SQUASH:-0}"

  SQUASH_FLAG=""
  [ "$SQUASH" != "1" ] || SQUASH_FLAG="--squash"

  LIVE_BASE="https://$(lc "$GH_USER").github.io/$MONOREPO"
}

guard_repo() {
  need git

  local top origin excl

  top=$(git rev-parse --show-toplevel 2>/dev/null) ||
    die "not inside a git repository"

  [ "$top" = "$(pwd -P)" ] ||
    die "run this from the repository root: $top"

  origin=$(git remote get-url origin 2>/dev/null) ||
    die "no origin remote"

  case "$(lc "$origin")" in
  *"$(lc "$GH_USER/$MONOREPO")"*) ;;
  *) die "origin is not $GH_USER/$MONOREPO" ;;
  esac

  mkdir -p "$STATE_DIR"

  excl=$(git rev-parse --git-path info/exclude)
  mkdir -p "$(dirname "$excl")"

  grep -qx "$STATE_DIR/" "$excl" 2>/dev/null ||
    printf '%s\n' "$STATE_DIR/" >>"$excl"

  if [ -f .env ] && ! git check-ignore -q .env; then
    warn ".env is NOT gitignored. Your API key could be committed."
  fi
}

require_clean() {
  { git diff --quiet && git diff --cached --quiet; } ||
    die "uncommitted changes detected. Commit or stash first."
}

require_branch() {
  [ "$(git rev-parse --abbrev-ref HEAD)" = "$MONO_BRANCH" ] ||
    die "check out $MONO_BRANCH first"
}

need_manifest() {
  [ -s "$MANIFEST" ] || stage_manifest
}

# ---------------------------------------------------------------- manifest

stage_manifest() {
  need curl
  need jq

  : "${SPREADSHEET_ID:?set SPREADSHEET_ID in .env}"
  : "${RANGE:?set RANGE in .env}"
  : "${API_KEY:?set API_KEY in .env}"

  local resp rows tmp
  local url old_live_url image path owner repo folder title

  resp=$(curl -fsS --max-time 30 \
    "https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/$RANGE?key=$API_KEY") ||
    die "Google Sheets request failed"

  # Google Sheets columns:
  # C = GitHub URL
  # D = Original live URL
  # E = Category
  # F = Image URL

  rows=$(printf '%s' "$resp" | jq -r '
        (.values // error("no .values in response"))
        | map(select(
            .[4] == "Frontend Mentor"
            and ((.[2] // "") | length > 0)
        ))
        | .[]
        | [
            (.[2] | gsub("^\\s+|\\s+$"; "")),
            (.[3] // ""),
            (.[5] // "")
          ]
        | join("\u001f")
    ') || die "could not parse Google Sheets response"

  [ -n "$rows" ] || die "no Frontend Mentor projects found"

  tmp=$(mktemp "$STATE_DIR/manifest.XXXXXX")

  while IFS="$SEP" read -r url old_live_url image; do
    [ -n "$url" ] || continue

    url=${url%/}
    url=${url%.git}

    case "$url" in
    https://github.com/*/*) ;;
    *)
      warn "skipping unrecognised URL: $url"
      continue
      ;;
    esac

    path=${url#https://github.com/}
    owner=${path%%/*}
    repo=${path#*/}

    case "$repo" in
    "" | */*)
      warn "invalid repository URL: $url"
      continue
      ;;
    esac

    folder=$(printf '%s' "$repo" | sed 's/^[ -]*//')

    [ -n "$folder" ] || continue

    title=$(printf '%s' "$folder" |
      sed 's/Frontend-Mentor-//g' |
      tr '-' ' ' |
      sed 's/[[:space:]]*$//')

    # Seven fields:
    # folder, title, image, old_repo_url,
    # old_live_url, owner, original_repo_name

    printf '%s\037%s\037%s\037%s\037%s\037%s\037%s\n' \
      "$folder" \
      "$title" \
      "$image" \
      "$url" \
      "$old_live_url" \
      "$owner" \
      "$repo" >>"$tmp"

  done <<<"$rows"

  awk -F "$SEP" '!seen[$1]++' "$tmp" >"$MANIFEST"

  rm -f "$tmp"

  log "manifest: $(wc -l <"$MANIFEST" | tr -d ' ') projects cached"
}

# ---------------------------------------------------------------- import

default_branch() {
  git ls-remote --symref "$1" HEAD 2>/dev/null |
    awk '/^ref:/ {
            sub("refs/heads/", "", $2)
            print $2
            exit
        }'
}

stage_import() {
  guard_repo
  need_manifest
  require_branch

  local folder title image old_url old_live_url owner repo
  local branch ok=0 skipped=0 failed=0

  while IFS="$SEP" read -r folder title image old_url old_live_url owner repo; do

    if [ -d "$folder" ]; then
      log "skip $folder (folder already exists)"
      skipped=$((skipped + 1))
      continue
    fi

    require_clean

    branch=$(default_branch "$old_url" || true)

    if [ -z "$branch" ]; then
      warn "cannot resolve default branch: $old_url"
      failed=$((failed + 1))
      continue
    fi

    log "importing $owner/$repo -> $folder"

    if git subtree add --prefix="$folder" $SQUASH_FLAG "$old_url" "$branch" </dev/null; then
      ok=$((ok + 1))
    else
      warn "subtree import failed: $old_url"
      failed=$((failed + 1))
    fi

  done <"$MANIFEST"

  log "import: $ok imported, $skipped skipped, $failed failed"

  [ "$failed" -eq 0 ] || exit 1

  log "next: ./migrate.sh index"
}

# ---------------------------------------------------------------- index

html_esc() {
  printf '%s' "$1" |
    sed -e 's/&/\&amp;/g' \
      -e 's/</\&lt;/g' \
      -e 's/>/\&gt;/g' \
      -e 's/"/\&quot;/g' \
      -e "s/'/\&#39;/g"
}

emit_card() {
  local f t i gh

  f=$(html_esc "$1")
  t=$(html_esc "$2")
  i=$(html_esc "$3")

  gh="https://github.com/$GH_USER/$MONOREPO/tree/$MONO_BRANCH/$f"

  cat <<CARD_EOF
        <div class="card p-3 flex flex-col gap-3 rounded-md bg-gradient-to-r from-[#1C1C1C] to-[#050505] text-white border border-[#2B2B2B]" data-name="$t $f">
CARD_EOF

  if [ -n "$3" ]; then
    cat <<IMG_EOF
          <div class="w-full h-40 relative overflow-hidden rounded-sm bg-[#0a0a0a]">
            <img src="$i" alt="$t" class="w-full h-full object-cover" loading="lazy" onerror="this.parentElement.style.display = 'none'" />
          </div>
IMG_EOF
  fi

  cat <<CARD_EOF
          <h3 class="text-white font-bold text-lg capitalize">$t</h3>
          <div class="flex gap-4 mt-auto pt-2">
            <a href="$gh" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" class="text-gray-300 hover:text-white transition">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="./$f/" target="_blank" aria-label="Live Demo" class="text-gray-300 hover:text-white transition">
              <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </a>
          </div>
        </div>
CARD_EOF
}

stage_index() {
  guard_repo
  need_manifest
  require_branch

  local folder title image old_url old_live_url owner repo
  local count=0

  local default_title=$'Fopefoluwa Ikufisiles\' Frontend Mentor Projects'
  local page_title="${PAGE_TITLE:-$default_title}"

  INDEX_TMP=$(mktemp "./index.html.XXXXXX")

  {
    cat <<HEAD_EOF
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Projects - Some of my Work</title>
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  <style>
    body { background-color: #000000; color: #ffffff; }
  </style>
</head>
<body class="bg-black text-white min-h-screen">
  <section id="projects" class="flex flex-col items-center my-20 px-5 mx-auto">
    <h1 class="text-[#AB4949] font-bold text-4xl text-center">$(html_esc "$page_title")</h1>
    <div class="mt-8 w-full max-w-md">
      <input type="text" id="searchInput" class="w-full px-5 py-3 rounded-full bg-[#1C1C1C] border border-[#2B2B2B] text-white placeholder-gray-400 focus:outline-none focus:border-[#AB4949] transition text-center" placeholder="Search projects..." onkeyup="filterProjects()" />
    </div>
    <div class="w-full md:w-9/10 lg:w-7/10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12" id="projectGrid">
HEAD_EOF

    while IFS="$SEP" read -r folder title image old_url old_live_url owner repo; do
      if [ ! -d "$folder" ]; then
        warn "no folder for $folder; leaving it off the index"
        continue
      fi

      emit_card "$folder" "$title" "$image"
      count=$((count + 1))

    done <"$MANIFEST"

    cat <<'FOOT_EOF'
    </div>
  </section>
  <script>
    function filterProjects() {
      const query = document.getElementById("searchInput").value.toLowerCase();
      document.querySelectorAll(".card").forEach((card) => {
        const name = card.getAttribute("data-name").toLowerCase();
        card.style.display = name.includes(query) ? "flex" : "none";
      });
    }
  </script>
</body>
</html>
FOOT_EOF

  } >"$INDEX_TMP"

  [ "$count" -gt 0 ] ||
    die "no cards generated; existing index.html untouched"

  chmod 644 "$INDEX_TMP"
  mv "$INDEX_TMP" index.html
  INDEX_TMP=""

  [ -f .nojekyll ] || : >.nojekyll

  git add -- index.html .nojekyll

  if git diff --cached --quiet -- index.html .nojekyll; then
    log "index.html unchanged ($count projects)"
  else
    git commit -q -m "Regenerate project index ($count projects)" -- index.html .nojekyll
    log "index.html regenerated and committed locally ($count projects)"
  fi
}

# ---------------------------------------------------------------- verify

check_url() {
  curl -Ls -o /dev/null -w '%{http_code}' \
    --max-time 20 --retry 2 --retry-delay 3 "$1" 2>/dev/null || true
}

static_warnings() {
  local d="$1" w=""

  if [ -f "$d/package.json" ]; then
    w="${w}has-package.json(build-based? check base path); "
  fi

  if grep -rEqs --exclude-dir=node_modules --include='*.html' \
    "(src|href)=[\"']/[^/\"']" "$d"; then
    w="${w}root-absolute-paths-in-html; "
  fi

  if grep -rEqs --exclude-dir=node_modules --include='*.css' \
    "url\([\"']?/[^/\"']" "$d"; then
    w="${w}root-absolute-url()-in-css; "
  fi

  printf '%s' "$w"
}

stage_verify() {
  guard_repo
  need_manifest
  need curl

  local folder title image old_url old_live_url owner repo
  local status warns good=0 bad=0 tmp

  tmp=$(mktemp "$STATE_DIR/verify.XXXXXX")

  while IFS="$SEP" read -r folder title image old_url old_live_url owner repo; do

    if [ ! -d "$folder" ]; then
      status="missing-local"
      warns=""
    else
      status=$(check_url "$LIVE_BASE/$folder/")
      warns=$(static_warnings "$folder")
    fi

    if [ "$status" = "200" ]; then
      good=$((good + 1))
    else
      bad=$((bad + 1))
    fi

    printf '%s\t%s\t%s\n' "$folder" "$status" "$warns" >>"$tmp"
    printf '%-6s %s %s\n' "$status" "$folder" "${warns:+[$warns]}"

  done <"$MANIFEST"

  mv "$tmp" "$VERIFY_FILE"

  log "verify: $good OK, $bad not OK"
  log "HTTP 200 does not guarantee that every asset or interaction works."

  [ "$bad" -eq 0 ] || exit 1
}

# ---------------------------------------------------------------- report

csvq() {
  printf '"%s"' "$(printf '%s' "$1" | sed 's/"/""/g')"
}

stage_report() {
  guard_repo
  need_manifest

  local folder title image old_url old_live_url owner repo status

  printf 'title,folder,old_repo_url,old_live_url,new_repo_url,new_live_url,verify_status,fm_updated\n' \
    >"$REPORT_FILE"

  while IFS="$SEP" read -r folder title image old_url old_live_url owner repo; do

    status="not-verified"

    if [ -f "$VERIFY_FILE" ]; then
      status=$(awk -F '\t' -v f="$folder" \
        '$1 == f { print $2; exit }' "$VERIFY_FILE")
      [ -n "$status" ] || status="not-verified"
    fi

    {
      csvq "$title"
      printf ','
      csvq "$folder"
      printf ','
      csvq "$old_url"
      printf ','
      csvq "$old_live_url"
      printf ','
      csvq "https://github.com/$GH_USER/$MONOREPO/tree/$MONO_BRANCH/$folder"
      printf ','
      csvq "$LIVE_BASE/$folder/"
      printf ','
      csvq "$status"
      printf ','
      printf '""\n'
    } >>"$REPORT_FILE"

  done <"$MANIFEST"

  log "report created: $REPORT_FILE"
}

# ---------------------------------------------------------------- purge

# ---------------------------------------------------------------- purge

blocker() {
  # Arguments: folder owner repo old_url

  local folder="$1"
  local owner="$2"
  local repo="$3"
  local old_url="$4"

  local sha remote_commit remote_tree local_tree

  if [ "$(lc "$owner")" != "$(lc "$GH_USER")" ]; then
    echo "owner is not $GH_USER"
    return
  fi

  if [ "$(lc "$repo")" = "$(lc "$MONOREPO")" ]; then
    echo "this is the monorepo"
    return
  fi

  if [ -z "$(git ls-tree HEAD -- "$folder/")" ]; then
    echo "folder is not committed on $MONO_BRANCH"
    return
  fi

  if [ "$(check_url "$LIVE_BASE/$folder/")" != "200" ]; then
    echo "new live URL is not returning 200"
    return
  fi

  # Get the latest commit from the original repository.
  sha=$(git ls-remote "$old_url" HEAD 2>/dev/null |
    awk 'NR == 1 { print $1 }' || true)

  if [ -z "$sha" ]; then
    echo "old repository unreachable or empty"
    return
  fi

  # Check whether the original HEAD is already in monorepo history.
  if git merge-base --is-ancestor "$sha" HEAD 2>/dev/null; then
    return 0
  fi

  # Check for a recorded subtree split.
  if git log --all --format=%B |
    grep -Fq "git-subtree-split: $sha"; then
    return 0
  fi

  # Histories may be unrelated. Fetch the exact original commit
  # and compare its complete tree with the monorepo project directory.
  if ! git fetch --quiet "$old_url" "$sha" 2>/dev/null; then
    echo "could not fetch original repository HEAD"
    return
  fi

  remote_commit=$(git rev-parse --verify 'FETCH_HEAD^{commit}' 2>/dev/null) || {
    echo "could not resolve original repository commit"
    return
  }

  remote_tree=$(git rev-parse --verify "$remote_commit^{tree}" 2>/dev/null) || {
    echo "could not inspect original repository tree"
    return
  }

  local_tree=$(git rev-parse --verify "HEAD:$folder" 2>/dev/null) || {
    echo "project directory is not committed"
    return
  }

  if [ "$remote_tree" = "$local_tree" ]; then
    return 0
  fi

  echo "original HEAD $(printf '%s' "$sha" | cut -c1-7) differs from monorepo project contents"
}

stage_purge() {
  local execute=0 only=""

  while [ $# -gt 0 ]; do
    case "$1" in
    --execute)
      execute=1
      ;;
    --only)
      shift
      only="${1:-}"
      [ -n "$only" ] || die "--only requires a folder name"
      ;;
    *)
      die "unknown option: $1"
      ;;
    esac
    shift
  done

  guard_repo
  need_manifest
  need gh
  need curl

  gh auth status >/dev/null 2>&1 ||
    die "gh is not authenticated"

  if [ "$execute" = "1" ]; then
    gh auth status 2>&1 | grep -q 'delete_repo' ||
      die "token lacks delete_repo. Run: gh auth refresh -h github.com -s delete_repo"
  fi

  require_clean
  require_branch

  git fetch origin "$MONO_BRANCH" --quiet

  [ "$(git rev-parse HEAD)" = "$(git rev-parse "origin/$MONO_BRANCH")" ] ||
    die "local branch differs from origin. Push/pull first."

  local folder title image old_url old_live_url owner repo
  local reason stats full skipped=0
  local plan=()
  local i

  while IFS="$SEP" read -r folder title image old_url old_live_url owner repo; do

    if [ -n "$only" ] && [ "$only" != "$folder" ]; then
      continue
    fi

    full="$owner/$repo"

    reason=$(blocker "$folder" "$owner" "$repo" "$old_url")

    if [ -n "$reason" ]; then
      printf 'SKIP   %-50s %s\n' "$full" "$reason"
      skipped=$((skipped + 1))
      continue
    fi

    stats=$(gh repo view "$full" \
      --json stargazerCount,forkCount \
      --jq '"\(.stargazerCount) stars, \(.forkCount) forks"' \
      2>/dev/null || echo "stats unavailable")

    printf 'DELETE %-50s (%s) -> %s/\n' "$full" "$stats" "$folder"

    plan+=("$full")

  done <"$MANIFEST"

  log "plan: ${#plan[@]} to delete, $skipped skipped"

  [ "${#plan[@]}" -gt 0 ] || exit 0

  if [ "$execute" != "1" ]; then
    log "DRY RUN. Nothing was deleted."
    log "Run with --execute only after reviewing the complete list."
    exit 0
  fi

  local answer

  printf 'Type "DELETE %s" to permanently delete these repositories: ' "${#plan[@]}"

  read -r answer </dev/tty ||
    die "no terminal available for confirmation"

  [ "$answer" = "DELETE ${#plan[@]}" ] ||
    die "confirmation did not match; nothing deleted"

  local deleted=0 failed=0

  for i in "${plan[@]}"; do
    if gh repo delete "$i" --yes; then
      printf '%s deleted %s\n' "$(date -u +%FT%TZ)" "$i" >>"$PURGE_LOG"
      deleted=$((deleted + 1))
    else
      printf '%s FAILED %s\n' "$(date -u +%FT%TZ)" "$i" >>"$PURGE_LOG"
      failed=$((failed + 1))
    fi
  done

  log "purge: $deleted deleted, $failed failed"

  [ "$failed" -eq 0 ] || exit 1
}

# ---------------------------------------------------------------- main

usage() {
  cat <<'USAGE_EOF'
Usage: ./migrate.sh <stage> [options]

  manifest            Refresh Google Sheets manifest
  import              Import projects using git subtree
  index               Regenerate index.html
  verify              Check new live URLs
  report              Generate migration CSV
  purge [--only F] [--execute]
                      Delete original repositories (dry-run by default)

Environment (.env):
  SPREADSHEET_ID RANGE API_KEY

Optional:
  GH_USER MONOREPO MONO_BRANCH SQUASH=1 PAGE_TITLE
USAGE_EOF
}

cmd="${1:-help}"

if [ $# -gt 0 ]; then
  shift
fi

load_env

case "$cmd" in
manifest)
  guard_repo
  stage_manifest
  ;;
import)
  stage_import
  ;;
index)
  stage_index
  ;;
verify)
  stage_verify
  ;;
report)
  stage_report
  ;;
purge)
  stage_purge "$@"
  ;;
help | -h | --help)
  usage
  ;;
*)
  usage
  exit 2
  ;;
esac
