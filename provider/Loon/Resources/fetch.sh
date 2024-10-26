#!/bin/bash

mkdir -p kelee

while IFS= read -r url; do
    curl -A "Loon/767 CFNetwork/1568.200.51 Darwin/24.1.0" -o "kelee/$(basename "$url")" "$url"
done <kl.txt
