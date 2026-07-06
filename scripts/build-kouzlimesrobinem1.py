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

POP_CSS_NEW = """.popstage{position:relative;width:min(400px,88vw);height:400px;margin:24px auto 0;display:grid;place-items:center;overflow:visible}
.cluster{position:absolute;inset:0;display:grid;place-items:center;cursor:pointer;
  transform-origin:50% 82%;animation:bouquetFloat 4.8s ease-in-out infinite;
  transition:opacity .4s ease, transform .4s cubic-bezier(.34,1.2,.48,1)}
@keyframes bouquetFloat{
  0%,100%{transform:translate3d(0,0,0) rotate(0deg)}
  33%{transform:translate3d(1px,-6px,0) rotate(.4deg)}
  66%{transform:translate3d(-1px,-10px,0) rotate(-.35deg)}}
.cluster.popping{animation:bouquetPop .6s ease-out forwards;pointer-events:none}
@keyframes bouquetPop{0%{transform:scale(1);opacity:1}25%{transform:scale(1.05)}100%{transform:scale(.3);opacity:0}}
.cluster.gone{opacity:0;pointer-events:none;animation:none}
.cluster svg{width:min(300px,72vw);height:auto;overflow:visible;
  filter:drop-shadow(0 8px 18px rgba(0,0,0,.1))}"""

CLUSTER_OLD_START = '<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">'

CLUSTER_NEW = r'''<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">
          <svg viewBox="0 0 280 320" aria-hidden="true" class="bouquet-svg">
            <defs>
              <radialGradient id="gSky" cx="35%" cy="28%" r="68%"><stop offset="0%" stop-color="#C8EEFF"/><stop offset="55%" stop-color="#7EC8F8"/><stop offset="100%" stop-color="#4AABE8"/></radialGradient>
              <radialGradient id="gPur" cx="35%" cy="28%" r="68%"><stop offset="0%" stop-color="#D4C0F8"/><stop offset="55%" stop-color="#A888E0"/><stop offset="100%" stop-color="#7858C0"/></radialGradient>
              <radialGradient id="gPink" cx="35%" cy="28%" r="68%"><stop offset="0%" stop-color="#FFC8DC"/><stop offset="55%" stop-color="#F088A8"/><stop offset="100%" stop-color="#E05888"/></radialGradient>
              <radialGradient id="gYel" cx="35%" cy="28%" r="68%"><stop offset="0%" stop-color="#FFF8A8"/><stop offset="55%" stop-color="#FFE850"/><stop offset="100%" stop-color="#F0D020"/></radialGradient>
              <radialGradient id="gTeal" cx="35%" cy="28%" r="68%"><stop offset="0%" stop-color="#B8F0E0"/><stop offset="55%" stop-color="#68D8B8"/><stop offset="100%" stop-color="#38B898"/></radialGradient>
            </defs>
            <g fill="none" stroke="#2A2A2A" stroke-width="1.4" stroke-linecap="round">
              <path d="M68 118 L140 238"/><path d="M212 118 L140 238"/>
              <path d="M92 164 L140 238"/><path d="M188 160 L140 238"/>
              <path d="M140 166 L140 238"/>
              <path d="M140 238 L140 292"/><path d="M140 238 L134 288"/>
              <path d="M140 238 L146 288"/><path d="M140 238 L137 294"/>
              <path d="M140 238 L143 294"/>
            </g>
            <g>
              <g transform="translate(68 72)">
                <g><animateTransform attributeName="transform" type="translate" values="0,0;0.5,-2;0,0" dur="3.4s" repeatCount="indefinite"/>
                  <ellipse cx="0" cy="0" rx="36" ry="40" fill="url(#gSky)" stroke="#2A2A2A" stroke-width="1.8"/>
                  <ellipse cx="-11" cy="-12" rx="11" ry="15" fill="#fff" opacity=".82"/>
                  <circle cx="-5" cy="-24" r="3.5" fill="#fff" opacity=".92"/>
                  <path d="M-4 38 L0 46 L4 38 Z" fill="#4AABE8" stroke="#2A2A2A" stroke-width="1.2"/>
                </g>
              </g>
              <g transform="translate(212 74)">
                <g><animateTransform attributeName="transform" type="translate" values="0,0;-0.5,-2;0,0" dur="3.7s" repeatCount="indefinite"/>
                  <ellipse cx="0" cy="0" rx="34" ry="38" fill="url(#gPur)" stroke="#2A2A2A" stroke-width="1.8"/>
                  <ellipse cx="11" cy="-12" rx="10" ry="14" fill="#fff" opacity=".82"/>
                  <circle cx="5" cy="-24" r="3.5" fill="#fff" opacity=".92"/>
                  <path d="M-4 36 L0 44 L4 36 Z" fill="#7858C0" stroke="#2A2A2A" stroke-width="1.2"/>
                </g>
              </g>
              <g transform="translate(92 124)">
                <g><animateTransform attributeName="transform" type="translate" values="0,0;0.5,-3;0,0" dur="3.1s" repeatCount="indefinite"/>
                  <ellipse cx="0" cy="0" rx="30" ry="34" fill="url(#gPink)" stroke="#2A2A2A" stroke-width="1.8"/>
                  <ellipse cx="-10" cy="-10" rx="9" ry="13" fill="#fff" opacity=".82"/>
                  <circle cx="-4" cy="-20" r="3" fill="#fff" opacity=".92"/>
                  <path d="M-3.5 32 L0 40 L3.5 32 Z" fill="#E05888" stroke="#2A2A2A" stroke-width="1.2"/>
                </g>
              </g>
              <g transform="translate(188 120)">
                <g><animateTransform attributeName="transform" type="translate" values="0,0;-0.5,-2.5;0,0" dur="3.3s" repeatCount="indefinite"/>
                  <ellipse cx="0" cy="0" rx="30" ry="34" fill="url(#gTeal)" stroke="#2A2A2A" stroke-width="1.8"/>
                  <ellipse cx="10" cy="-10" rx="9" ry="13" fill="#fff" opacity=".82"/>
                  <circle cx="4" cy="-20" r="3" fill="#fff" opacity=".92"/>
                  <path d="M-3.5 32 L0 40 L3.5 32 Z" fill="#38B898" stroke="#2A2A2A" stroke-width="1.2"/>
                </g>
              </g>
              <g transform="translate(140 132)">
                <g><animateTransform attributeName="transform" type="translate" values="0,0;0,-2;0,0" dur="2.9s" repeatCount="indefinite"/>
                  <ellipse cx="0" cy="0" rx="24" ry="28" fill="url(#gYel)" stroke="#2A2A2A" stroke-width="1.8"/>
                  <ellipse cx="-8" cy="-8" rx="7" ry="10" fill="#fff" opacity=".85"/>
                  <circle cx="-3" cy="-16" r="2.5" fill="#fff" opacity=".92"/>
                  <path d="M-3 26 L0 34 L3 26 Z" fill="#F0D020" stroke="#2A2A2A" stroke-width="1.2"/>
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
