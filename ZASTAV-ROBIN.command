#!/bin/bash
# Robin běží na Vercelu — lokální server není potřeba.
echo "  Robin web je online: https://neurea-web.vercel.app/robin"
echo "  (Po napojení domény: https://www.kouzlimesrobinem.cz)"
open "https://neurea-web.vercel.app/robin" 2>/dev/null || true
read -r -p "  Stiskni Enter… " _ || true
