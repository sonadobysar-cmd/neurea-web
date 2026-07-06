#!/bin/bash
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT/robin-dev.pid"

if [ -f "$PID_FILE" ]; then
  PID="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [ -n "$PID" ]; then
    kill "$PID" 2>/dev/null || true
    sleep 1
    kill -9 "$PID" 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
fi

pkill -f "next start -H 127.0.0.1" 2>/dev/null || true
pkill -f "next dev -H 127.0.0.1" 2>/dev/null || true
rm -f "$ROOT/robin-dev.port"
echo "  ✓ Robin server vypnut."
