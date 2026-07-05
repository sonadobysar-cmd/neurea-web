#!/bin/bash
# Spustí Robin web — volá se z OTEVRI-ROBIN.command i z terminálu.

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Načíst node/npm (Finder spouští bash bez .zshrc)
for f in "$HOME/.zprofile" "$HOME/.zshrc" "$HOME/.bash_profile" "$HOME/.profile"; do
  [ -f "$f" ] && source "$f" 2>/dev/null || true
done
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

NODE=""
NPM=""
for candidate in "$(command -v node 2>/dev/null)" /opt/homebrew/bin/node /usr/local/bin/node; do
  [ -x "$candidate" ] && NODE="$candidate" && break
done
for candidate in "$(command -v npm 2>/dev/null)" /opt/homebrew/bin/npm /usr/local/bin/npm; do
  [ -x "$candidate" ] && NPM="$candidate" && break
done

log() { echo "  $*"; }
fail() {
  log "❌ $*"
  log ""
  log "Log serveru: $ROOT/robin-dev.log"
  log "Nebo v terminálu:  cd $ROOT && npm run dev"
  log "Pak otevři:        http://127.0.0.1:3000/robin"
  log ""
  read -r -p "  Stiskni Enter pro zavření… " _ || true
  exit 1
}

[ -n "$NODE" ] || fail "Node.js nenalezen. Nainstaluj z https://nodejs.org"
[ -n "$NPM" ] || fail "npm nenalezen."

log "Node: $($NODE -v)  ·  složka: $ROOT"

if [ ! -d "node_modules/next" ]; then
  log "Instaluji závislosti (poprvé trvá 1–2 min)…"
  "$NPM" install || fail "npm install selhal — zkontroluj internet"
fi

# Uvolnit porty bez xargs (ten hází „err“ když nic neběží)
for PORT in 3000 3001 3002; do
  PIDS=$(lsof -ti:"$PORT" 2>/dev/null || true)
  if [ -n "$PIDS" ]; then
    kill -9 $PIDS 2>/dev/null || true
  fi
done

log "Spouštím server…"
"$NPM" run dev >"$ROOT/robin-dev.log" 2>&1 &
DEV_PID=$!

log "Čekám na web (až 90 s, první start je pomalejší)…"
log ""

if "$NODE" "$ROOT/scripts/open-robin-browser.mjs"; then
  OPENED=1
else
  OPENED=0
  log "Poslední řádky logu:"
  tail -8 "$ROOT/robin-dev.log" 2>/dev/null | sed 's/^/    /'
fi

echo ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$OPENED" = "1" ]; then
  log "✓ Prohlížeč otevřen"
else
  log "⚠ Otevři ručně: http://127.0.0.1:3000/robin"
fi
log "Server běží — NEZAVÍREJ toto okno!"
log "Celý log: robin-dev.log"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -r -p "  Stiskni Enter pro vypnutí serveru… " _ || true

kill "$DEV_PID" 2>/dev/null || true
pkill -f "next dev -H 127.0.0.1" 2>/dev/null || true
log "Server ukončen."
