#!/usr/bin/env sh

set +a
source .env
set -a

getProjectsUrls() {
    projects=$(curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/$RANGE?key=$API_KEY" | jq -r '.values[0:8] | map(select(.[4] == "Frontend Mentor")) | map(.[2])[]')

    echo "$projects" | while IFS= read -r project; do
        [ -z "$project" ] && continue
        project_name=$(basename "$project" .git)
        echo "--> Importing $project_name from $project..."
        git subtree add --prefix="$project_name" "$project" main
    done
}

getProjectsUrls
