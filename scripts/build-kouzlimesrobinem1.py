#!/usr/bin/env python3
"""Build kouzlimesrobinem1/index.html from Claude export."""

from __future__ import annotations

from pathlib import Path

SRC = Path("/Users/soni/Downloads/kouzlime-navrh-5-vizitka_2.html")
OUT = Path("/Users/soni/Neurea/kouzlimesrobinem1/index.html")

POP_CSS_OLD = """.popstage{position:relative;width:min(440px,90vw);height:400px;margin:24px auto 0;display:grid;place-items:center}
/* the balloon cluster you pop */
.cluster{position:absolute;inset:0;display:grid;place-items:center;cursor:pointer;
  animation:sway 3.4s ease-in-out infinite;transition:opacity .25s}
@keyframes sway{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-10px) rotate(1.5deg)}}
.cluster.gone{opacity:0;pointer-events:none;animation:none}
.cluster svg{width:min(300px,72vw);height:auto;filter:drop-shadow(6px 8px 0 rgba(26,18,6,.14))}"""

POP_CSS_NEW = """.popstage{position:relative;width:min(440px,90vw);height:420px;margin:24px auto 0;display:grid;place-items:center;overflow:visible}
.cluster{position:absolute;inset:0;display:grid;place-items:center;cursor:pointer;
  transform-origin:50% 78%;animation:bouquetFloat 5.5s ease-in-out infinite;
  transition:opacity .4s cubic-bezier(.4,0,.2,1), transform .45s cubic-bezier(.34,1.25,.48,1)}
@keyframes bouquetFloat{
  0%,100%{transform:translate3d(0,0,0) rotate(-.5deg)}
  20%{transform:translate3d(2px,-7px,0) rotate(.35deg)}
  45%{transform:translate3d(-1px,-13px,0) rotate(-.25deg)}
  70%{transform:translate3d(-2px,-8px,0) rotate(.55deg)}
  90%{transform:translate3d(1px,-3px,0) rotate(-.15deg)}}
.cluster.popping{animation:bouquetPop .65s cubic-bezier(.4,0,.2,1) forwards;pointer-events:none}
@keyframes bouquetPop{0%{transform:scale(1)}18%{transform:scale(1.07)}100%{transform:scale(.35);opacity:0}}
.cluster.gone{opacity:0;pointer-events:none;animation:none}
.cluster svg{width:min(320px,76vw);height:auto;overflow:visible;
  filter:drop-shadow(0 16px 28px rgba(26,18,6,.13))}"""

CLUSTER_OLD_START = '<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">'

CLUSTER_NEW = r'''<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">
          <svg viewBox="0 0 300 340" aria-hidden="true" class="bouquet-svg">
            <defs>
              <radialGradient id="gO" cx="30%" cy="22%" r="78%"><stop offset="0%" stop-color="#FFE0A8"/><stop offset="42%" stop-color="#F68544"/><stop offset="100%" stop-color="#C94E12"/></radialGradient>
              <radialGradient id="gV" cx="30%" cy="22%" r="78%"><stop offset="0%" stop-color="#DEC4FF"/><stop offset="42%" stop-color="#8B62C4"/><stop offset="100%" stop-color="#4A2E7A"/></radialGradient>
              <radialGradient id="gY" cx="30%" cy="22%" r="78%"><stop offset="0%" stop-color="#FFF5A0"/><stop offset="42%" stop-color="#E8D040"/><stop offset="100%" stop-color="#A89218"/></radialGradient>
              <radialGradient id="gB" cx="30%" cy="22%" r="78%"><stop offset="0%" stop-color="#C8EEFF"/><stop offset="42%" stop-color="#4FA9E0"/><stop offset="100%" stop-color="#256A9E"/></radialGradient>
              <linearGradient id="stringG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#D4B078"/><stop offset="100%" stop-color="#A88450"/></linearGradient>
            </defs>
            <g class="bouquet-strings" fill="none" stroke="url(#stringG)" stroke-width="1.6" stroke-linecap="round">
              <path d="M92 188 C108 210 128 238 150 262">
                <animate attributeName="d" dur="4.2s" repeatCount="indefinite"
                  values="M92 188 C108 210 128 238 150 262;M92 188 C106 212 126 240 150 262;M92 188 C110 208 130 236 150 262;M92 188 C108 210 128 238 150 262"/>
              </path>
              <path d="M208 188 C192 210 172 238 150 262">
                <animate attributeName="d" dur="4.6s" repeatCount="indefinite"
                  values="M208 188 C192 210 172 238 150 262;M208 188 C194 212 174 240 150 262;M208 188 C190 208 170 236 150 262;M208 188 C192 210 172 238 150 262"/>
              </path>
              <path d="M116 218 C128 232 140 248 150 262">
                <animate attributeName="d" dur="3.8s" repeatCount="indefinite"
                  values="M116 218 C128 232 140 248 150 262;M116 218 C126 234 138 250 150 262;M116 218 C130 230 142 246 150 262;M116 218 C128 232 140 248 150 262"/>
              </path>
              <path d="M184 220 C172 234 160 248 150 262">
                <animate attributeName="d" dur="4.1s" repeatCount="indefinite"
                  values="M184 220 C172 234 160 248 150 262;M184 220 C174 236 162 250 150 262;M184 220 C170 232 158 246 150 262;M184 220 C172 234 160 248 150 262"/>
              </path>
            </g>
            <g transform="translate(150 268)">
              <ellipse cx="0" cy="2" rx="10" ry="4" fill="#C4A062" opacity=".35"/>
              <path d="M-10 0 C-14 -6 -6 -10 0 -4 C6 -10 14 -6 10 0 C6 4 0 5 -4 3 Z" fill="#E8C880" stroke="#1A1206" stroke-width="1.4"/>
              <circle cx="0" cy="0" r="2.2" fill="#C4A062" stroke="#1A1206" stroke-width=".8"/>
            </g>
            <g stroke="#1A1206" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
              <g transform="translate(92 112)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-16;-12;-16" dur="4.3s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.1s" repeatCount="indefinite"/>
                    <path d="M0 -64 C34 -68 44 -26 42 0 C40 26 24 50 0 54 C-24 50 -42 26 -42 0 C-44 -26 -34 -68 0 -64 Z" fill="url(#gV)"/>
                    <path d="M0 54 C-3 58 -3 62 0 66 C3 62 3 58 0 54 Z" fill="#543B8C" stroke="none"/>
                    <rect x="-1.2" y="54" width="2.4" height="8" rx="1" fill="#543B8C" stroke="none"/>
                    <ellipse cx="-13" cy="-28" rx="14" ry="22" fill="#fff" opacity=".48"/>
                    <ellipse cx="8" cy="-8" rx="6" ry="4" fill="#fff" opacity=".18"/>
                  </g>
                </g>
              </g>
              <g transform="translate(208 112)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="16;12;16" dur="4.7s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.4s" repeatCount="indefinite"/>
                    <path d="M0 -64 C34 -68 44 -26 42 0 C40 26 24 50 0 54 C-24 50 -42 26 -42 0 C-44 -26 -34 -68 0 -64 Z" fill="url(#gY)"/>
                    <path d="M0 54 C-3 58 -3 62 0 66 C3 62 3 58 0 54 Z" fill="#A89218" stroke="none"/>
                    <rect x="-1.2" y="54" width="2.4" height="8" rx="1" fill="#A89218" stroke="none"/>
                    <ellipse cx="-13" cy="-28" rx="14" ry="22" fill="#fff" opacity=".48"/>
                    <ellipse cx="8" cy="-8" rx="6" ry="4" fill="#fff" opacity=".18"/>
                  </g>
                </g>
              </g>
              <g transform="translate(116 142)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-8;-4;-8" dur="3.9s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="2.8s" repeatCount="indefinite"/>
                    <path d="M0 -68 C38 -72 48 -28 46 2 C44 30 26 56 0 60 C-26 56 -46 30 -46 2 C-48 -28 -38 -72 0 -68 Z" fill="url(#gB)"/>
                    <path d="M0 60 C-3.5 65 -3.5 70 0 74 C3.5 70 3.5 65 0 60 Z" fill="#256A9E" stroke="none"/>
                    <rect x="-1.3" y="60" width="2.6" height="9" rx="1" fill="#256A9E" stroke="none"/>
                    <ellipse cx="-15" cy="-30" rx="15" ry="24" fill="#fff" opacity=".5"/>
                    <ellipse cx="9" cy="-10" rx="7" ry="5" fill="#fff" opacity=".2"/>
                  </g>
                </g>
              </g>
              <g transform="translate(184 144)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="10;6;10" dur="4.5s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.2s" repeatCount="indefinite"/>
                    <path d="M0 -72 C42 -76 52 -30 50 4 C48 34 28 62 0 66 C-28 62 -50 34 -50 4 C-52 -30 -42 -76 0 -72 Z" fill="url(#gO)"/>
                    <path d="M0 66 C-4 71 -4 76 0 80 C4 76 4 71 0 66 Z" fill="#C94E12" stroke="none"/>
                    <rect x="-1.4" y="66" width="2.8" height="10" rx="1" fill="#C94E12" stroke="none"/>
                    <ellipse cx="-16" cy="-32" rx="16" ry="26" fill="#fff" opacity=".52"/>
                    <ellipse cx="10" cy="-12" rx="8" ry="5" fill="#fff" opacity=".22"/>
                  </g>
                </g>
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
      cluster.classList.add('popping');
      setTimeout(function(){cluster.classList.add('gone');cluster.classList.remove('popping');},620);"""

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
      cluster.classList.remove('gone','popping');
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
    html = html.replace(POP_CSS_OLD, POP_CSS_NEW)
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
