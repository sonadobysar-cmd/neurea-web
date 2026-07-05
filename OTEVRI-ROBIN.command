#!/bin/bash
# Dvakrát klikni — spustí dev server a otevře Kouzlíme s Robinem v prohlížeči.
# Okno NECH OTEVŘENÉ — server v něm běží.

cd "$(dirname "$0")"

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"

echo ""
echo "  ═══════════════════════════════════════"
echo "   Kouzlíme s Robinem — spouštím web"
echo "  ═══════════════════════════════════════"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "  ❌ Node.js není nainstalovaný."
  echo "     Stáhni z https://nodejs.org a zkus znovu."
  echo ""
  read -r -p "  Stiskni Enter pro zavření… "
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "  ❌ npm není k dispozici."
  read -r -p "  Stiskni Enter pro zavření… "
  exit 1
fi

# Ukončit staré servery (způsobují chybu 500)
for PORT in 3000 3001 3002; do
  lsof -ti:"$PORT" 2>/dev/null | xargs kill -9 2>/dev/null || true
done

echo "  Spouštím dev server…"
npm run dev &
DEV_PID=$!

echo "  První načtení může trvat až minutu — čekej…"
echo ""

if node scripts/open-robin-browser.mjs; then
  OPENED=1
else
  OPENED=0
fi

echo ""
echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$OPENED" = "1" ]; then
  echo "  ✓ Web by měl být otevřený v prohlížeči"
else
  echo "  ⚠ Auto-otevření selhalo — zkus ručně:"
  echo "    http://127.0.0.1:3000/robin"
fi
echo ""
echo "  Server běží — NEZAVÍREJ toto okno!"
echo "  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -r -p "  Stiskni Enter pro vypnutí serveru… "

kill "$DEV_PID" 2>/dev/null
wait "$DEV_PID" 2>/dev/null
echo "  Server ukončen."
