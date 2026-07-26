#!/usr/bin/env sh

set +a
source .env
set -a

getProjectsUrls() {
    projects=$(curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/$RANGE?key=$API_KEY" | jq -r '.values[0:8] | map(select(.[4] == "Frontend Mentor")) | map(.[2])[]')

    echo "$projects" | while IFS= read -r project; do
        [ -z "$project" ] && continue

        raw_name=$(basename "$project" .git)
        clean_name=$(echo "$raw_name" | sed 's/^-//')

        echo "--> Importing $clean_name from $project..."
        git subtree add --prefix="./$clean_name" "$project" main
    done
}

getProjectsUrls
