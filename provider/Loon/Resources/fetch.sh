#!/bin/bash

mkdir -p kelee

curl -s https://raw.githubusercontent.com/luestr/ProxyResource/refs/heads/main/README.md | grep -oE 'https:\/\/kelee\.one\/[^?&]+\.plugin' >kl.txt

while IFS= read -r url; do
    curl -A "$USER_AGENT" -o "kelee/$(basename "$url")" "$url"
done <kl.txt
