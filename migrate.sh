#!/usr/bin/env sh

set +a
source .env
set -a

METADATA_FILE=$(mktemp)

getProjects() {
    response=$(curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/$RANGE?key=$API_KEY")

    projects=$(echo "$response" | jq -r '.values | map(select(.[4] == "Frontend Mentor")) | .[] | "\(.[2])|\(.[5])"')

    echo "$projects" | while IFS='|' read -r project_url image_url; do
        [ -z "$project_url" ] && continue

        clean_name=$(basename "$project_url" .git | sed 's/^[ -]*//')

        formatted_title=$(echo "$clean_name" | sed 's/Frontend-Mentor-//g' | tr '-' ' ')
        echo "$clean_name|$formatted_title|$image_url|$project_url" >>"$METADATA_FILE"

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
  <title>Projects - Some of my Work</title>
  <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
  <style type="text/css">
    body {
      background-color: #000000;
      color: #ffffff;
    }
  </style>
</head>
<body class="bg-black text-white min-h-screen">
  <section id="projects" class="flex flex-col items-center my-20 px-5 max-w-7xl mx-auto">
    <h1 class="text-[#AB4949] font-bold text-4xl text-center">
      Projects
    </h1>
    <h2 class="bg-gradient-to-r from-[#AB4949] to-[#484E53] text-transparent text-center bg-clip-text text-xl font-medium mt-1">
      Some of my Work
    </h2>

    <div class="mt-8 w-full max-w-md">
      <input 
        type="text" 
        id="searchInput" 
        class="w-full px-5 py-3 rounded-full bg-[#1C1C1C] border border-[#2B2B2B] text-white placeholder-gray-400 focus:outline-none focus:border-[#AB4949] transition text-center" 
        placeholder="Search projects..." 
        onkeyup="filterProjects()"
      >
    </div>

    <div class="w-full md:w-9/10 lg:w-7/10 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12" id="projectGrid">
EOF

    while IFS='|' read -r folder title image github_url; do
        [ -z "$folder" ] && continue
        cat <<EOF >>index.html
      <div class="card p-3 flex flex-col gap-3 rounded-md bg-gradient-to-r from-[#1C1C1C] to-[#050505] text-white border border-[#2B2B2B]" data-name="$title $folder">
        <div class="w-full h-40 relative overflow-hidden rounded-sm bg-[#0a0a0a]">
          <img src="$image" alt="$title" class="w-full h-full object-cover" loading="lazy" onerror="this.parentElement.style.display='none'">
        </div>
        <h3 class="text-white font-bold text-lg capitalize">$title</h3>
        <div class="flex gap-4 mt-auto pt-2">
          <a href="$github_url" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" class="text-gray-300 hover:text-white transition">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="./$folder/" target="_blank" aria-label="Live Demo" class="text-gray-300 hover:text-white transition">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </a>
        </div>
      </div>
EOF
    done <"$METADATA_FILE"

    cat <<'EOF' >>index.html
    </div>
  </section>

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
