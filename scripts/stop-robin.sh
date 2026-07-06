#!/bin/bash
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

for PORT in 3000 3001 3002; do
  PIDS=$(lsof -ti:"$PORT" 2>/dev/null || true)
  if [ -n "$PIDS" ]; then
    kill -9 $PIDS 2>/dev/null || true
  fi
done

pkill -f "next start -H 127.0.0.1" 2>/dev/null || true
pkill -f "next dev -H 127.0.0.1" 2>/dev/null || true
rm -f "$ROOT/robin-dev.pid" "$ROOT/robin-dev.port"
echo "  Robin server vypnut."
read -r -p "  Stiskni Enter… " _ || true
