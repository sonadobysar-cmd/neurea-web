#!/bin/bash
cd "$(dirname "$0")"
PORT=3200
if ! curl -sf "http://127.0.0.1:$PORT" >/dev/null 2>&1; then
  npm run dev >/tmp/clinic-samer-dev.log 2>&1 &
  for i in {1..40}; do
    if curl -sf "http://127.0.0.1:$PORT" >/dev/null 2>&1; then
      break
    fi
    sleep 0.4
  done
fi
open "http://127.0.0.1:$PORT/cs"
