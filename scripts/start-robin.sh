#!/bin/bash
# Spustí Robin web lokálně (dev server — rychlý start bez buildu).
# Ukončení: bash scripts/stop-robin.sh  nebo  ZASTAV-ROBIN.command

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
PID_FILE="$ROOT/robin-dev.pid"
LOG_FILE="$ROOT/robin-dev.log"
PORT_FILE="$ROOT/robin-dev.port"
ROBIN_PORT="${ROBIN_PORT:-3000}"
ROBIN_URL="http://127.0.0.1:${ROBIN_PORT}/robin"

# Finder spouští s minimálním PATH — doplníme běžná místa pro Node
export PATH="/usr/local/bin:/opt/homebrew/bin:${NVM_DIR:-$HOME/.nvm}/versions/node/current/bin:${HOME}/.fnm/current/bin:${PATH:-/usr/bin:/bin}"

for f in "$HOME/.zprofile" "$HOME/.zshrc" "$HOME/.bash_profile" "$HOME/.profile"; do
  [ -f "$f" ] && source "$f" 2>/dev/null || true
done
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh" 2>/dev/null || true
[ -d "$HOME/.fnm" ] && eval "$("$HOME/.fnm" env)" 2>/dev/null || true
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

log() { echo "  $*"; }

alert() {
  osascript -e "display alert \"Kouzlíme s Robinem\" message \"$1\"" 2>/dev/null || true
}

open_browser() {
  ROBIN_PORT="$ROBIN_PORT" "$NODE" "$ROOT/scripts/open-robin-browser.mjs"
}

fail() {
  log "❌ $*"
  log ""
  log "Log: $LOG_FILE"
  log "Adresa: $ROBIN_URL"
  tail -20 "$LOG_FILE" 2>/dev/null | sed 's/^/    /'
  alert "$1"
  exit 1
}

# Najdi Node — musí reálně fungovat, ne jen existovat v PATH
find_node() {
  local c
  for c in \
    "$(command -v node 2>/dev/null || true)" \
    /usr/local/bin/node \
    /opt/homebrew/bin/node \
    "$HOME/.nvm/versions/node/"*/bin/node \
    "$HOME/.fnm/current/bin/node"; do
    [ -n "$c" ] || continue
    [ -x "$c" ] || continue
    if "$c" -e "process.exit(0)" 2>/dev/null; then
      echo "$c"
      return 0
    fi
  done
  return 1
}

find_npm() {
  local node_dir c
  node_dir="$(dirname "$NODE")"
  for c in \
    "$(command -v npm 2>/dev/null || true)" \
    "$node_dir/npm" \
    /usr/local/bin/npm \
    /opt/homebrew/bin/npm; do
    [ -n "$c" ] || continue
    [ -x "$c" ] || continue
    if "$c" -v >/dev/null 2>&1; then
      echo "$c"
      return 0
    fi
  done
  return 1
}

NODE="$(find_node)" || fail "Node.js nenalezen. Nainstaluj z https://nodejs.org"
NPM="$(find_npm)" || fail "npm nenalezen."
NEXT_BIN="$ROOT/node_modules/next/dist/bin/next"

[ -f "$NEXT_BIN" ] || fail "Next.js není nainstalovaný. Spusť v terminálu: cd ~/Neurea && npm install"

log "Node: $($NODE -v) ($NODE)"
log "Složka: $ROOT"

server_responds() {
  curl -sf --connect-timeout 1 --max-time 4 "http://127.0.0.1:${ROBIN_PORT}/robin" >/dev/null 2>&1
}

stop_server() {
  if [ -f "$PID_FILE" ]; then
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [ -n "$pid" ]; then
      kill "$pid" 2>/dev/null || true
      sleep 1
      kill -9 "$pid" 2>/dev/null || true
    fi
    rm -f "$PID_FILE"
  fi
  pkill -f "next start -H 127.0.0.1" 2>/dev/null || true
  pkill -f "next dev -H 127.0.0.1" 2>/dev/null || true
  rm -f "$PORT_FILE"
}

if server_responds; then
  log "Web už běží — otevírám prohlížeč…"
  open_browser && log "✓ $ROBIN_URL" || log "⚠ Otevři ručně: $ROBIN_URL"
  alert "Web už běží.\n\n$ROBIN_URL"
  exit 0
fi

if [ ! -d "node_modules/next" ]; then
  log "Instaluji závislosti (poprvé 1–2 min)…"
  "$NPM" install || fail "npm install selhal"
fi

stop_server

PIDS=$(lsof -ti:"$ROBIN_PORT" 2>/dev/null || true)
if [ -n "$PIDS" ]; then
  kill -9 $PIDS 2>/dev/null || true
  sleep 1
fi

# Produkční režim jen když explicitně ROBIN_PROD=1 (jinak dev = rychlý start)
USE_PROD="${ROBIN_PROD:-0}"
if [ "$USE_PROD" = "1" ]; then
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
      "$NPM" run build >>"$LOG_FILE" 2>&1 || fail "Sestavení webu selhalo. Viz robin-dev.log"
    fi
  fi
  START_CMD=("$NODE" "$NEXT_BIN" start -H 127.0.0.1 -p "$ROBIN_PORT")
else
  log "Spouštím vývojový server (bez buildu, okamžitě aktuální)…"
  : >"$LOG_FILE"
  START_CMD=("$NODE" "$NEXT_BIN" dev -H 127.0.0.1 -p "$ROBIN_PORT")
fi

log "Startuji server na portu $ROBIN_PORT…"
nohup env PATH="$PATH" WATCHPACK_POLLING=1 "${START_CMD[@]}" >>"$LOG_FILE" 2>&1 &
echo $! >"$PID_FILE"
echo "$ROBIN_PORT" >"$PORT_FILE"

log "Čekám na web (až 45 s)…"
log ""

OPENED=0
if open_browser; then
  OPENED=1
else
  tail -15 "$LOG_FILE" 2>/dev/null | sed 's/^/    /'
  server_responds || fail "Server se nespustil. Viz robin-dev.log"
  OPENED=1
  log "⚠ Prohlížeč se neotevřel automaticky — otevři: $ROBIN_URL"
fi

echo ""
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$OPENED" = "1" ]; then
  log "✓ Robin web běží: $ROBIN_URL"
  alert "Web běží.\n\n$ROBIN_URL\n\nZavři: ZASTAV-ROBIN.command"
fi
log "Server běží na pozadí — okno můžeš zavřít."
log "Vypnutí: ZASTAV-ROBIN.command"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
