#!/bin/bash
# Dvakrát klikni — spustí dev server a otevře Kouzlíme s Robinem v prohlížeči.
cd "$(dirname "$0")"
echo ""
echo "  Kouzlíme s Robinem — spouštím dev server…"
echo ""

# Ukončí starý rozbitý server na 3000 (často způsobuje chybu 500)
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true

npm run dev &
sleep 4
node scripts/open-robin-browser.mjs
