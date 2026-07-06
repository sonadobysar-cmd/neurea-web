#!/bin/bash
# Dvakrát klikni — otevře Robin web (niadobysar, NE Neurea).
cd "$(dirname "$0")"

# Po nasazení na Vercel pod niadobysar (viz kouzlimesrobinem/README.md)
ROBIN_URL="${ROBIN_WEB_URL:-https://kouzlimesrobinem.vercel.app}"

# Až bude doména napojená:
# ROBIN_URL="https://www.kouzlimesrobinem.cz"

open "$ROBIN_URL"
osascript -e "display notification \"$ROBIN_URL\" with title \"Kouzlíme s Robinem\"" 2>/dev/null || true

echo ""
echo "  🎩 Kouzlíme s Robinem (niadobysar)"
echo "  $ROBIN_URL"
echo ""
echo "  Lokální náhled: cd kouzlimesrobinem && npm run dev"
echo ""
