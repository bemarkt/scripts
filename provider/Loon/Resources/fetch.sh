#!/bin/bash

mkdir -p kelee

while IFS= read -r url; do
    curl -A "$USER_AGENT" -o "kelee/$(basename "$url")" "$url"
done <kl.txt
