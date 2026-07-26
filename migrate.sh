#!/usr/bin/env sh

set +a
source .env
set -a

# Temporary file to store project metadata for index generation
METADATA_FILE=$(mktemp)

getProjects() {
    response=$(curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/$RANGE?key=$API_KEY")

    projects=$(echo "$response" | jq -r '.values | map(select(.[4] == "Frontend Mentor")) | .[] | "\(.[2])|\(.[5])"')

    echo "$projects" | while IFS='|' read -r project_url image_url; do
        [ -z "$project_url" ] && continue

        clean_name=$(basename "$project_url" .git | sed 's/^[ -]*//')

        formatted_title=$(echo "$clean_name" | sed 's/Frontend-Mentor-//g' | tr '-' ' ')
        echo "$clean_name|$formatted_title|$image_url" >>"$METADATA_FILE"

        if [ -d "$clean_name" ]; then
            echo "--> Skipping $clean_name (folder already exists)"
            continue
        fi

        echo "--> Importing $clean_name from $project_url..."
        git subtree add --prefix="$clean_name" "$project_url" main
    done
}

generateIndex() {
    echo "--> Generating index.html with live search and preview cards..."

    cat <<'EOF' >index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frontend Mentor Showcase</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      padding: 2rem;
      min-height: 100vh;
    }
    header {
      max-width: 1200px;
      margin: 0 auto 2.5rem;
      text-align: center;
    }
    h1 { font-size: 2.25rem; margin-bottom: 0.5rem; }
    p { color: var(--text-muted); margin-bottom: 1.5rem; }
    .search-container {
      max-width: 500px;
      margin: 0 auto;
    }
    .search-input {
      width: 100%;
      padding: 0.8rem 1.2rem;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
      background: var(--card-bg);
      color: var(--text);
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus {
      border-color: var(--accent);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      background: var(--card-bg);
      border-radius: 12px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      border: 1px solid rgba(255,255,255,0.05);
      transition: transform 0.2s, border-color 0.2s;
      display: flex;
      flex-direction: column;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
    }
    .card-img-wrapper {
      width: 100%;
      height: 180px;
      background: #090d16;
      overflow: hidden;
    }
    .card-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .card-body {
      padding: 1.25rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card h2 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: var(--accent);
      text-transform: capitalize;
    }
    .card code {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <header>
    <h1>Frontend Mentor Projects</h1>
    <p>A collection of completed challenges imported into a monorepo.</p>
    <div class="search-container">
      <input type="text" id="searchInput" class="search-input" placeholder="Search projects..." onkeyup="filterProjects()">
    </div>
  </header>
  
  <main class="grid" id="projectGrid">
EOF

    while IFS='|' read -r folder title image; do
        [ -z "$folder" ] && continue
        cat <<EOF >>index.html
    <a class="card" href="./$folder/" data-name="$title $folder">
      <div class="card-img-wrapper">
        <img class="card-img" src="$image" alt="$title preview" loading="lazy" onerror="this.style.display='none'">
      </div>
      <div class="card-body">
        <h2>$title</h2>
        <code>/$folder</code>
      </div>
    </a>
EOF
    done <"$METADATA_FILE"

    cat <<'EOF' >>index.html
  </main>

  <script>
    function filterProjects() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>
EOF

    rm -f "$METADATA_FILE"
    echo "--> index.html successfully generated!"
}

getProjects
generateIndex
