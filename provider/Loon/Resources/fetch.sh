#!/bin/bash

mkdir -p kelee

echo "Searching for plugin links from remote repository..."

curl -s https://raw.githubusercontent.com/luestr/ProxyResource/refs/heads/main/README.md |
    grep -oE 'https://kelee\.one/[^?&]+\.lpx' |
    while IFS= read -r url; do
        if [ -z "$url" ]; then
            continue
        fi

        filename=$(basename "$url")
        new_filename="${filename%.lpx}.plugin"

        curl -L -A "$USER_AGENT" -o "kelee/$new_filename" "$url"
    done

echo "All plugins have been downloaded and renamed."
