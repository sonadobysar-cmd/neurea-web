#!/bin/bash
# Dvakrát klikni — otevře NAŠI verzi webu (stánek, hra, oranžový vizuál).
cd "$(dirname "$0")"

# Hlavní verze = /robin  ·  druhá (moderní) = /robin/modern
ROBIN_URL="${ROBIN_WEB_URL:-https://neurea-web.vercel.app/robin}"

open "$ROBIN_URL"
osascript -e "display notification \"Stánková verze webu\" with title \"Kouzlíme s Robinem\"" 2>/dev/null || true

echo ""
echo "  🎩 Otevírám NAŠI verzi (stánek):"
echo "  $ROBIN_URL"
echo ""
echo "  (Druhá verze — moderní náhled: ${ROBIN_URL%/robin}/robin/modern)"
echo ""
