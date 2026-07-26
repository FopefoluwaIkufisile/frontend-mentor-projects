#!/usr/bin/env sh

set +a
source .env
set -a

getProjectsUrls() {
    projects=$(curl -s "https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/$RANGE?key=$API_KEY" | jq -r '.values[0:8] | map(select(.[4] == "Frontend Mentor")) | map(.[2])[]')

    echo $projects

    for project in $projects; do
        project_name=$(basename $project)
        echo "--> Importing $project_name from $project..."
        git subtree add --prefix=$project_name $project main
    done

}

getProjectsUrls
