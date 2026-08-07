#!/bin/bash
cd "$(dirname "$0")"

# Next listens on 127.0.0.1 (ne localhost / ::1)
URL="http://127.0.0.1:5177/lic/"
if curl -sf -o /dev/null "http://127.0.0.1:3000/lic/index.html"; then
  URL="http://127.0.0.1:3000/lic/index.html"
elif ! curl -sf -o /dev/null "$URL"; then
  (cd lic-app && npm run sync >/tmp/lic-sync.log 2>&1)
  (cd lic-app && npx --yes serve ../public -l 5177 >/tmp/lic-serve.log 2>&1 &)
  sleep 1.2
  URL="http://127.0.0.1:5177/lic/"
fi

echo "Otevírám $URL"
open "$URL"
