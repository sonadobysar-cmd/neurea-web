#!/bin/bash
# Dvakrát klikni — otevře živý Robin web na Vercelu (bez lokálního serveru).
cd "$(dirname "$0")"

# Po nasazení domény na Vercel změň na https://www.kouzlimesrobinem.cz
ROBIN_URL="${ROBIN_WEB_URL:-https://neurea-web.vercel.app/robin}"

open "$ROBIN_URL"
osascript -e "display notification \"$ROBIN_URL\" with title \"Kouzlíme s Robinem\"" 2>/dev/null || true

echo ""
echo "  🎩 Otevírám: $ROBIN_URL"
echo ""
