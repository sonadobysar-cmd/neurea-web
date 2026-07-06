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

POP_CSS_NEW = """.popstage{position:relative;width:min(440px,90vw);height:440px;margin:24px auto 0;display:grid;place-items:center;overflow:visible}
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
          <svg viewBox="0 0 300 360" aria-hidden="true" class="bouquet-svg">
            <defs>
              <radialGradient id="gO" cx="26%" cy="16%" r="82%"><stop offset="0%" stop-color="#FFF4D0"/><stop offset="22%" stop-color="#FFB870"/><stop offset="62%" stop-color="#F06828"/><stop offset="100%" stop-color="#A83808"/></radialGradient>
              <radialGradient id="gV" cx="26%" cy="16%" r="82%"><stop offset="0%" stop-color="#F5EEFF"/><stop offset="22%" stop-color="#C8A8F0"/><stop offset="62%" stop-color="#7858B8"/><stop offset="100%" stop-color="#3A2070"/></radialGradient>
              <radialGradient id="gY" cx="26%" cy="16%" r="82%"><stop offset="0%" stop-color="#FFFDE8"/><stop offset="22%" stop-color="#FFF070"/><stop offset="62%" stop-color="#E0C820"/><stop offset="100%" stop-color="#907808"/></radialGradient>
              <radialGradient id="gB" cx="26%" cy="16%" r="82%"><stop offset="0%" stop-color="#F0FAFF"/><stop offset="22%" stop-color="#98DCFF"/><stop offset="62%" stop-color="#38A8E8"/><stop offset="100%" stop-color="#1868A0"/></radialGradient>
              <linearGradient id="stringG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#DEC090"/><stop offset="100%" stop-color="#9A7048"/></linearGradient>
              <radialGradient id="spec" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff" stop-opacity=".95"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient>
            </defs>
            <g stroke="#1A1206" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
              <g transform="translate(90 108)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-15;-11;-15" dur="4.4s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.2s" repeatCount="indefinite"/>
                    <path d="M0 -66 C36 -70 46 -28 44 2 C42 30 24 56 0 60 C-24 56 -44 30 -44 2 C-46 -28 -36 -70 0 -66 Z" fill="url(#gV)"/>
                    <path d="M0 60 C-3 64 -3 68 0 72 C3 68 3 64 0 60 Z" fill="#543B8C" stroke="none"/>
                    <rect x="-1.3" y="60" width="2.6" height="9" rx="1" fill="#543B8C" stroke="none"/>
                    <ellipse cx="-14" cy="-30" rx="15" ry="24" fill="url(#spec)" opacity=".55"/>
                    <ellipse cx="-10" cy="-24" rx="8" ry="12" fill="#fff" opacity=".35"/>
                    <ellipse cx="10" cy="-6" rx="7" ry="5" fill="#fff" opacity=".22"/>
                    <path d="M-20 18 Q0 28 20 18" fill="none" stroke="#3A2070" stroke-width="1.2" opacity=".25"/>
                  </g>
                  <g fill="none" stroke="url(#stringG)" stroke-width="1.5" stroke-linecap="round">
                    <path d="M0 82 Q 22 108 60 144">
                      <animate attributeName="d" dur="4.2s" repeatCount="indefinite"
                        values="M0 82 Q 22 108 60 144;M0 82 Q 20 110 60 144;M0 82 Q 24 106 60 144;M0 82 Q 22 108 60 144"/>
                    </path>
                  </g>
                </g>
              </g>
              <g transform="translate(210 108)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="15;11;15" dur="4.8s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="3.5s" repeatCount="indefinite"/>
                    <path d="M0 -66 C36 -70 46 -28 44 2 C42 30 24 56 0 60 C-24 56 -44 30 -44 2 C-46 -28 -36 -70 0 -66 Z" fill="url(#gY)"/>
                    <path d="M0 60 C-3 64 -3 68 0 72 C3 68 3 64 0 60 Z" fill="#907808" stroke="none"/>
                    <rect x="-1.3" y="60" width="2.6" height="9" rx="1" fill="#907808" stroke="none"/>
                    <ellipse cx="-14" cy="-30" rx="15" ry="24" fill="url(#spec)" opacity=".55"/>
                    <ellipse cx="-10" cy="-24" rx="8" ry="12" fill="#fff" opacity=".35"/>
                    <ellipse cx="10" cy="-6" rx="7" ry="5" fill="#fff" opacity=".22"/>
                    <path d="M-20 18 Q0 28 20 18" fill="none" stroke="#706008" stroke-width="1.2" opacity=".25"/>
                  </g>
                  <g fill="none" stroke="url(#stringG)" stroke-width="1.5" stroke-linecap="round">
                    <path d="M0 82 Q -22 108 -60 144">
                      <animate attributeName="d" dur="4.5s" repeatCount="indefinite"
                        values="M0 82 Q -22 108 -60 144;M0 82 Q -20 110 -60 144;M0 82 Q -24 106 -60 144;M0 82 Q -22 108 -60 144"/>
                    </path>
                  </g>
                </g>
              </g>
              <g transform="translate(114 138)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="-7;-3;-7" dur="4s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="2.9s" repeatCount="indefinite"/>
                    <path d="M0 -70 C40 -74 50 -30 48 4 C46 34 26 62 0 66 C-26 62 -48 34 -48 4 C-50 -30 -40 -74 0 -70 Z" fill="url(#gB)"/>
                    <path d="M0 66 C-3.5 71 -3.5 76 0 80 C3.5 76 3.5 71 0 66 Z" fill="#1868A0" stroke="none"/>
                    <rect x="-1.4" y="66" width="2.8" height="10" rx="1" fill="#1868A0" stroke="none"/>
                    <ellipse cx="-16" cy="-32" rx="16" ry="26" fill="url(#spec)" opacity=".58"/>
                    <ellipse cx="-11" cy="-26" rx="9" ry="14" fill="#fff" opacity=".38"/>
                    <ellipse cx="11" cy="-8" rx="8" ry="6" fill="#fff" opacity=".24"/>
                    <path d="M-22 20 Q0 32 22 20" fill="none" stroke="#1868A0" stroke-width="1.2" opacity=".22"/>
                  </g>
                  <g fill="none" stroke="url(#stringG)" stroke-width="1.5" stroke-linecap="round">
                    <path d="M0 86 Q 18 98 36 114">
                      <animate attributeName="d" dur="3.9s" repeatCount="indefinite"
                        values="M0 86 Q 18 98 36 114;M0 86 Q 16 100 36 114;M0 86 Q 20 96 36 114;M0 86 Q 18 98 36 114"/>
                    </path>
                  </g>
                </g>
              </g>
              <g transform="translate(186 140)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="9;5;9" dur="4.6s" repeatCount="indefinite"/>
                  <g>
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3.3s" repeatCount="indefinite"/>
                    <path d="M0 -74 C42 -78 52 -32 50 6 C48 36 28 66 0 70 C-28 66 -50 36 -50 6 C-52 -32 -42 -78 0 -74 Z" fill="url(#gO)"/>
                    <path d="M0 70 C-4 75 -4 80 0 84 C4 80 4 75 0 70 Z" fill="#A83808" stroke="none"/>
                    <rect x="-1.5" y="70" width="3" height="11" rx="1" fill="#A83808" stroke="none"/>
                    <ellipse cx="-17" cy="-34" rx="17" ry="28" fill="url(#spec)" opacity=".6"/>
                    <ellipse cx="-12" cy="-28" rx="10" ry="15" fill="#fff" opacity=".4"/>
                    <ellipse cx="12" cy="-10" rx="9" ry="6" fill="#fff" opacity=".26"/>
                    <path d="M-24 22 Q0 34 24 22" fill="none" stroke="#883008" stroke-width="1.2" opacity=".22"/>
                  </g>
                  <g fill="none" stroke="url(#stringG)" stroke-width="1.5" stroke-linecap="round">
                    <path d="M0 88 Q -18 100 -36 112">
                      <animate attributeName="d" dur="4.3s" repeatCount="indefinite"
                        values="M0 88 Q -18 100 -36 112;M0 88 Q -16 102 -36 112;M0 88 Q -20 98 -36 112;M0 88 Q -18 100 -36 112"/>
                    </path>
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(150 256)">
              <ellipse cx="0" cy="3" rx="11" ry="4.5" fill="#000" opacity=".08"/>
              <path d="M-11 1 C-16 -7 -7 -12 0 -5 C7 -12 16 -7 11 1 C7 6 0 7 -5 5 Z" fill="#F0D898" stroke="#1A1206" stroke-width="1.5"/>
              <circle cx="0" cy="1" r="2.5" fill="#C4A062" stroke="#1A1206" stroke-width=".9"/>
            </g>
            <g class="hang-strings" fill="none" stroke="url(#stringG)" stroke-width="1.5" stroke-linecap="round">
              <path d="M150 262 L150 332">
                <animate attributeName="d" dur="3.6s" repeatCount="indefinite"
                  values="M150 262 L150 332;M150 262 L149 332;M150 262 L151 332;M150 262 L150 332"/>
              </path>
              <path d="M150 262 Q138 288 128 328">
                <animate attributeName="d" dur="4.1s" repeatCount="indefinite"
                  values="M150 262 Q138 288 128 328;M150 262 Q137 290 127 328;M150 262 Q139 286 129 328;M150 262 Q138 288 128 328"/>
              </path>
              <path d="M150 262 Q162 288 172 328">
                <animate attributeName="d" dur="4.4s" repeatCount="indefinite"
                  values="M150 262 Q162 288 172 328;M150 262 Q163 290 173 328;M150 262 Q161 286 171 328;M150 262 Q162 288 172 328"/>
              </path>
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
