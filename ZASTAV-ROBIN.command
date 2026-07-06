#!/bin/bash
# Zastaví lokální Robin server.
cd "$(dirname "$0")"
xattr -cr "ZASTAV-ROBIN.command" 2>/dev/null || true
clear
echo ""
echo "  🎩 Zastavuji Robin web…"
echo ""
bash scripts/stop-robin.sh
echo ""
read -r -p "  Stiskni Enter pro zavření okna… " _ || true
