#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

MANIFEST_PATH="assets/images/padoru/manifest.json"

mapfile -t image_files < <(
  find assets/images/padoru -type f \( \
    -iname '*.png' -o \
    -iname '*.jpg' -o \
    -iname '*.jpeg' -o \
    -iname '*.webp' -o \
    -iname '*.gif' \
  \) | sort
)

{
  echo "{"
  echo "  \"images\": ["

  for i in "${!image_files[@]}"; do
    comma=",";
    if [[ "$i" -eq $((${#image_files[@]} - 1)) ]]; then
      comma="";
    fi

    echo "    \"${image_files[$i]}\"${comma}"
  done

  echo "  ]"
  echo "}"
} > "$MANIFEST_PATH"

echo "Manifest gerado em: $MANIFEST_PATH"
echo "Total de imagens: ${#image_files[@]}"
