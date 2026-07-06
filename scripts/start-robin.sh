#!/bin/bash
# Spustí Robin web — server běží v tomto okně (spolehlivě na macOS).
# Zavření okna = vypnutí webu.

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
PID_FILE="$ROOT/robin-dev.pid"
LOG_FILE="$ROOT/robin-dev.log"
PORT_FILE="$ROOT/robin-dev.port"
ROBIN_PORT="${ROBIN_PORT:-3000}"
ROBIN_URL="http://127.0.0.1:${ROBIN_PORT}/robin"

for f in "$HOME/.zprofile" "$HOME/.zshrc" "$HOME/.bash_profile" "$HOME/.profile"; do
  [ -f "$f" ] && source "$f" 2>/dev/null || true
done
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh" 2>/dev/null || true
[ -d "$HOME/.fnm" ] && eval "$("$HOME/.fnm" env)" 2>/dev/null || true
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

NODE=""
NPM=""
NEXT_BIN="$ROOT/node_modules/next/dist/bin/next"
for candidate in "$(command -v node 2>/dev/null)" /opt/homebrew/bin/node /usr/local/bin/node; do
  [ -x "$candidate" ] && NODE="$candidate" && break
done
for candidate in "$(command -v npm 2>/dev/null)" /opt/homebrew/bin/npm /usr/local/bin/npm; do
  [ -x "$candidate" ] && NPM="$candidate" && break
done

log() { echo "  $*"; }

alert() {
  osascript -e "display alert \"Kouzlíme s Robinem\" message \"$1\"" 2>/dev/null || true
}

fail() {
  log "❌ $*"
  log "Log: $LOG_FILE"
  tail -20 "$LOG_FILE" 2>/dev/null | sed 's/^/    /'
  alert "$1"
  read -r -p "  Stiskni Enter pro zavření… " _ || true
  exit 1
}

server_responds() {
  curl -sf --connect-timeout 1 --max-time 4 "http://127.0.0.1:${ROBIN_PORT}/robin" >/dev/null 2>&1
}

cleanup() {
  rm -f "$PID_FILE" "$PORT_FILE"
}

[ -n "$NODE" ] || fail "Node.js nenalezen. Nainstaluj z https://nodejs.org"
[ -n "$NPM" ] || fail "npm nenalezen."
[ -x "$NEXT_BIN" ] || fail "Next.js není nainstalovaný. Spusť: npm install"

log "Node: $($NODE -v)  ·  složka: $ROOT"

if server_responds; then
  log "Web už běží — otevírám prohlížeč…"
  ROBIN_PORT="$ROBIN_PORT" "$NODE" "$ROOT/scripts/open-robin-browser.mjs" || log "Otevři: $ROBIN_URL"
  alert "Web už běží.\n\n$ROBIN_URL"
  exit 0
fi

if [ ! -d "node_modules/next" ]; then
  log "Instaluji závislosti (poprvé 1–2 min)…"
  "$NPM" install || fail "npm install selhal"
fi

# Uvolnit port
PIDS=$(lsof -ti:"$ROBIN_PORT" 2>/dev/null || true)
if [ -n "$PIDS" ]; then
  kill -9 $PIDS 2>/dev/null || true
fi
rm -f "$PID_FILE" "$PORT_FILE"

NEEDS_BUILD=0
if [ ! -f ".next/BUILD_ID" ]; then
  NEEDS_BUILD=1
elif find src/components/robin src/app/robin public/robin -type f -newer ".next/BUILD_ID" 2>/dev/null | grep -q .; then
  NEEDS_BUILD=1
fi

if [ "$NEEDS_BUILD" -eq 1 ]; then
  log "Sestavuji web (cca 30–60 s)…"
  : >"$LOG_FILE"
  if ! "$NPM" run build >>"$LOG_FILE" 2>&1; then
    rm -rf ".next"
    "$NPM" run build >>"$LOG_FILE" 2>&1 || fail "Sestavení selhalo — viz robin-dev.log"
  fi
else
  log "Používám poslední sestavení…"
fi

echo "$ROBIN_PORT" >"$PORT_FILE"
trap cleanup INT TERM EXIT

echo ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "🎩 Robin web: $ROBIN_URL"
log "NEZAVÍREJ toto okno — web v něm běží!"
log "Vypnutí: zavři okno nebo Ctrl+C"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Prohlížeč otevřít, až port naběhne
( ROBIN_PORT="$ROBIN_PORT" "$NODE" "$ROOT/scripts/open-robin-browser.mjs" ) &

# Server v popředí — na macOS jediný spolehlivý způsob
exec "$NODE" "$NEXT_BIN" start -H 127.0.0.1 -p "$ROBIN_PORT"
