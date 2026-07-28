#!/bin/bash
cd "$(dirname "$0")"
URL="http://127.0.0.1:3100"

if ! curl -s -o /dev/null -w "" --connect-timeout 1 "$URL" 2>/dev/null; then
  echo "Spouštím Chatky na kolech…"
  npm run dev >/tmp/chatky-dev.log 2>&1 &
  for i in $(seq 1 30); do
    if curl -s -o /dev/null -w "" --connect-timeout 1 "$URL" 2>/dev/null; then
      break
    fi
    sleep 0.5
  done
fi

open "$URL"
osascript -e "display notification \"$URL\" with title \"Chatky na kolech\"" 2>/dev/null || true
echo ""
echo "  🪵 Chatky na kolech"
echo "  $URL"
echo "  Konfigurátor: $URL/konfigurator"
echo ""
