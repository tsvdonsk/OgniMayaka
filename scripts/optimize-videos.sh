#!/bin/bash
# Compress WebM videos using ffmpeg with VP9 codec
# Target: ~2-4 Mbps for background/hero videos (720p max, no audio needed)

IMG_DIR="$(dirname "$0")/../public/img"
CRF=35        # VP9 quality: lower = better. 33-36 is good for background videos
SPEED=2       # 0-5, higher = faster encode but worse quality
MAXWIDTH=1280 # Downscale to 720p for background usage (was 1920)

total_saved=0
total_src=0

compress_video() {
  local src="$1"
  local tmp="${src}.tmp.webm"
  local filename=$(basename "$src")

  local src_size=$(stat -f%z "$src" 2>/dev/null || stat -c%s "$src")

  echo -n "  Сжимаем $filename ($(numfmt --to=iec $src_size 2>/dev/null || echo "${src_size}B"))... "

  ffmpeg -i "$src" \
    -vf "scale='if(gt(iw,${MAXWIDTH}),${MAXWIDTH},-2)':'if(gt(iw,${MAXWIDTH}),-2,ih)'" \
    -c:v libvpx-vp9 \
    -crf $CRF \
    -b:v 0 \
    -deadline good \
    -cpu-used $SPEED \
    -an \
    -y "$tmp" 2>/dev/null

  if [ $? -ne 0 ]; then
    echo "✗ ошибка ffmpeg"
    rm -f "$tmp"
    return
  fi

  local dst_size=$(stat -f%z "$tmp" 2>/dev/null || stat -c%s "$tmp")

  if [ "$dst_size" -lt "$src_size" ]; then
    local saved=$((src_size - dst_size))
    local pct=$((saved * 100 / src_size))
    mv "$tmp" "$src"
    echo "✓ $(numfmt --to=iec $dst_size 2>/dev/null || echo "${dst_size}B") (−${pct}%)"
    total_saved=$((total_saved + saved))
  else
    echo "─ уже оптимальный"
    rm -f "$tmp"
  fi
  total_src=$((total_src + src_size))
}

echo ""
echo "Оптимизация видео..."
echo ""

for f in "$IMG_DIR"/*.webm "$IMG_DIR"/*.mp4; do
  [ -f "$f" ] || continue
  compress_video "$f"
done

echo ""
echo "────────────────────────────────────────"
if [ "$total_src" -gt 0 ]; then
  saved_pct=$((total_saved * 100 / total_src))
  echo "Сохранено: $(numfmt --to=iec $total_saved 2>/dev/null || echo "${total_saved}B") из $(numfmt --to=iec $total_src 2>/dev/null || echo "${total_src}B") (−${saved_pct}%)"
fi
echo ""
