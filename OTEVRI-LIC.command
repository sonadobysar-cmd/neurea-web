#!/bin/bash
cd "$(dirname "$0")"
# Prefer Next.js if running, else static public server
URL="http://127.0.0.1:3000/lic/"
if ! curl -sf -o /dev/null "$URL"; then
  URL="http://127.0.0.1:5177/lic/"
fi
if ! curl -sf -o /dev/null "$URL"; then
  (cd lic-app && npm run dev >/tmp/lic-serve.log 2>&1 &) 
  sleep 1
  URL="http://127.0.0.1:5177/lic/"
fi
open "$URL"
