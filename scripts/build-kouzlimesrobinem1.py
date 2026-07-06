#!/usr/bin/env python3
"""Build kouzlimesrobinem1/index.html from Claude export."""

from __future__ import annotations

from pathlib import Path

SRC = Path("/Users/soni/Downloads/kouzlime-navrh-5-vizitka_2.html")
OUT = Path("/Users/soni/Neurea/kouzlimesrobinem1/index.html")

CLUSTER_OLD_START = '<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">'

CLUSTER_NEW = r'''<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">
          <svg viewBox="0 0 300 320" aria-hidden="true">
            <defs>
              <radialGradient id="gO" cx="34%" cy="26%" r="76%"><stop offset="0%" stop-color="#FFD48A"/><stop offset="50%" stop-color="#F68544"/><stop offset="100%" stop-color="#D9611F"/></radialGradient>
              <radialGradient id="gV" cx="34%" cy="26%" r="76%"><stop offset="0%" stop-color="#C4A8EE"/><stop offset="50%" stop-color="#7457B1"/><stop offset="100%" stop-color="#543B8C"/></radialGradient>
              <radialGradient id="gY" cx="34%" cy="26%" r="76%"><stop offset="0%" stop-color="#FFF080"/><stop offset="50%" stop-color="#E8D53A"/><stop offset="100%" stop-color="#B9A81E"/></radialGradient>
              <radialGradient id="gB" cx="34%" cy="26%" r="76%"><stop offset="0%" stop-color="#A8E4FF"/><stop offset="50%" stop-color="#4FA9E0"/><stop offset="100%" stop-color="#2E7FB8"/></radialGradient>
            </defs>
            <g fill="none" stroke="#B98A50" stroke-width="2" stroke-linecap="round">
              <path d="M150 248 Q128 278 118 312"/>
              <path d="M150 248 Q162 282 175 312"/>
              <path d="M150 248 Q150 286 148 312"/>
              <path d="M150 248 Q138 268 124 292" opacity=".55"/>
              <path d="M150 248 Q162 268 176 292" opacity=".55"/>
            </g>
            <g stroke="#1A1206" stroke-width="2.5" stroke-linejoin="round">
              <g transform="translate(94 118) rotate(-15)">
                <path d="M0 -62 C36 -62 42 -22 42 2 C42 32 24 52 0 52 C-24 52 -42 32 -42 2 C-42 -22 -36 -62 0 -62 Z" fill="url(#gV)"/>
                <path d="M-5 52 L0 66 L5 52 Z" fill="#543B8C" stroke="#543B8C" stroke-width="1"/>
                <ellipse cx="-12" cy="-26" rx="13" ry="21" fill="#fff" opacity=".5"/>
              </g>
              <g transform="translate(206 118) rotate(15)">
                <path d="M0 -62 C36 -62 42 -22 42 2 C42 32 24 52 0 52 C-24 52 -42 32 -42 2 C-42 -22 -36 -62 0 -62 Z" fill="url(#gY)"/>
                <path d="M-5 52 L0 66 L5 52 Z" fill="#B9A81E" stroke="#B9A81E" stroke-width="1"/>
                <ellipse cx="-12" cy="-26" rx="13" ry="21" fill="#fff" opacity=".5"/>
              </g>
              <g transform="translate(118 148) rotate(-7)">
                <path d="M0 -66 C38 -66 46 -22 46 4 C46 36 26 56 0 56 C-26 56 -46 36 -46 4 C-46 -22 -38 -66 0 -66 Z" fill="url(#gB)"/>
                <path d="M-6 56 L0 70 L6 56 Z" fill="#2E7FB8" stroke="#2E7FB8" stroke-width="1"/>
                <ellipse cx="-14" cy="-28" rx="14" ry="23" fill="#fff" opacity=".52"/>
              </g>
              <g transform="translate(182 150) rotate(9)">
                <path d="M0 -70 C40 -70 48 -24 48 6 C48 42 28 64 0 64 C-28 64 -48 42 -48 6 C-48 -24 -40 -70 0 -70 Z" fill="url(#gO)"/>
                <path d="M-6 64 L0 78 L6 64 Z" fill="#D9611F" stroke="#D9611F" stroke-width="1"/>
                <ellipse cx="-15" cy="-30" rx="15" ry="24" fill="#fff" opacity=".55"/>
              </g>
            </g>
          </svg>'''

DOPOP_OLD = """    function doPop(){
      if(busy)return;busy=true;
      var pick=rewards[order[popped%order.length]];
      starBurst();
      cluster.classList.add('gone');"""

DOPOP_NEW = """    function doPop(){
      if(busy)return;busy=true;
      var pick=rewards[order[popped%order.length]];
      starBurst();
      cluster.style.transition='opacity .35s, transform .4s cubic-bezier(.4,0,.2,1)';
      cluster.style.transform='scale(1.04)';
      setTimeout(function(){
        cluster.style.transform='scale(.4)';
        cluster.style.opacity='0';
      },120);
      setTimeout(function(){cluster.classList.add('gone');cluster.style.transform='';cluster.style.opacity='';cluster.style.transition='';},480);"""

RESET_OLD = """    function reset(){
      if(busy)return;
      reward.classList.remove('show');
      reward.innerHTML='';
      cluster.classList.remove('gone');
    }"""

RESET_NEW = """    function reset(){
      if(busy)return;
      reward.classList.remove('show');
      reward.innerHTML='';
      cluster.classList.remove('gone');
      cluster.style.transform='';
      cluster.style.opacity='';
      cluster.style.transition='';
    }"""


def replace_cluster(html: str) -> str:
    start = html.find(CLUSTER_OLD_START)
    if start < 0:
        raise SystemExit("cluster block not found")
    hint = html.find('<span class="cluster-hint">', start)
    if hint < 0:
        raise SystemExit("cluster-hint not found")
    close = html.find("</div>", hint)
    if close < 0:
        raise SystemExit("cluster div close not found")
    after = close + len("</div>")
    suffix = '\n          <span class="cluster-hint">Praskni mě! ✦</span>\n        </div>'
    return html[:start] + CLUSTER_NEW + suffix + html[after:]


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")

    html = SRC.read_text(encoding="utf-8")
    html = html.replace(DOPOP_OLD, DOPOP_NEW)
    html = html.replace(RESET_OLD, RESET_NEW)
    html = replace_cluster(html)

    if "</html>" not in html or "<script>" not in html:
        raise SystemExit("Build output looks truncated — missing script or closing tags")
    if "createHeroDog" in html or "function tick(now)" in html:
        raise SystemExit("Unexpected patches — background animation should stay original")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
