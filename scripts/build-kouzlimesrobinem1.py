#!/usr/bin/env python3
"""Build kouzlimesrobinem1/index.html from Claude export with animation upgrades."""

from __future__ import annotations

import re
from pathlib import Path

SRC = Path("/Users/soni/Downloads/kouzlime-navrh-5-vizitka_2.html")
OUT = Path("/Users/soni/Neurea/kouzlimesrobinem1/index.html")

BUBBLE_CSS_OLD = """.bubble.balloon-float{background:none!important;border:none!important;box-shadow:none!important;
  border-radius:0!important;width:auto!important;object-fit:contain;overflow:visible;
  filter:drop-shadow(3px 4px 5px rgba(120,60,10,.18));opacity:.9}
.bubble.balloon-float::after{display:none}"""

BUBBLE_CSS_NEW = """.bubble.balloon-float{background:none!important;border:none!important;box-shadow:none!important;
  border-radius:0!important;width:auto!important;object-fit:contain;overflow:visible;
  filter:drop-shadow(4px 10px 14px rgba(120,60,10,.16));
  opacity:.94;will-change:transform;backface-visibility:hidden;transform:translateZ(0)}
.bubble.balloon-float.hero-dog{opacity:.98;filter:drop-shadow(6px 16px 22px rgba(80,40,10,.18));pointer-events:none}
.bubble.balloon-float::after{display:none}"""

POP_CSS_OLD = """.popstage{position:relative;width:min(440px,90vw);height:400px;margin:24px auto 0;display:grid;place-items:center}
/* the balloon cluster you pop */
.cluster{position:absolute;inset:0;display:grid;place-items:center;cursor:pointer;
  animation:sway 3.4s ease-in-out infinite;transition:opacity .25s}
@keyframes sway{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-10px) rotate(1.5deg)}}
.cluster.gone{opacity:0;pointer-events:none;animation:none}
.cluster svg{width:min(300px,72vw);height:auto;filter:drop-shadow(6px 8px 0 rgba(26,18,6,.14))}"""

POP_CSS_NEW = """.popstage{position:relative;width:min(420px,90vw);height:380px;margin:28px auto 0;display:grid;place-items:center;overflow:visible}
.cluster{position:absolute;inset:0;display:grid;place-items:center;cursor:pointer;
  animation:clusterSway 4.5s ease-in-out infinite;transition:opacity .35s, transform .45s cubic-bezier(.34,1.2,.48,1)}
@keyframes clusterSway{0%,100%{transform:translateY(0) rotate(-.8deg)}50%{transform:translateY(-12px) rotate(.8deg)}}
.cluster.popping{animation:clusterPop .55s cubic-bezier(.4,0,.2,1) forwards;pointer-events:none}
@keyframes clusterPop{0%{transform:scale(1)}35%{transform:scale(1.05)}100%{transform:scale(.5);opacity:0}}
.cluster.gone{opacity:0;pointer-events:none;animation:none}
.cluster-svg{width:min(300px,78vw);height:auto;overflow:visible;filter:drop-shadow(0 14px 28px rgba(26,18,6,.14))}"""

CLUSTER_OLD_START = '<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">'
CLUSTER_NEW = r'''<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">
          <svg viewBox="0 0 300 320" aria-hidden="true" class="cluster-svg">
            <defs>
              <radialGradient id="gO" cx="32%" cy="24%" r="78%"><stop offset="0%" stop-color="#FFD090"/><stop offset="45%" stop-color="#F68544"/><stop offset="100%" stop-color="#C94E12"/></radialGradient>
              <radialGradient id="gV" cx="32%" cy="24%" r="78%"><stop offset="0%" stop-color="#D4B8F5"/><stop offset="45%" stop-color="#8B62C4"/><stop offset="100%" stop-color="#4A2E7A"/></radialGradient>
              <radialGradient id="gY" cx="32%" cy="24%" r="78%"><stop offset="0%" stop-color="#FFF090"/><stop offset="45%" stop-color="#E8D040"/><stop offset="100%" stop-color="#A89218"/></radialGradient>
              <radialGradient id="gB" cx="32%" cy="24%" r="78%"><stop offset="0%" stop-color="#B8E8FF"/><stop offset="45%" stop-color="#4FA9E0"/><stop offset="100%" stop-color="#256A9E"/></radialGradient>
              <radialGradient id="gP" cx="32%" cy="24%" r="78%"><stop offset="0%" stop-color="#FFB8D8"/><stop offset="45%" stop-color="#E06090"/><stop offset="100%" stop-color="#A83058"/></radialGradient>
            </defs>
            <g stroke-linecap="round">
              <path d="M150 248 Q128 278 118 308" stroke="#C4A062" stroke-width="2.2" fill="none" opacity=".85"/>
              <path d="M150 248 Q162 282 172 308" stroke="#C4A062" stroke-width="2.2" fill="none" opacity=".85"/>
              <path d="M150 248 Q142 285 138 308" stroke="#C4A062" stroke-width="2" fill="none" opacity=".7"/>
              <path d="M150 248 Q158 285 162 308" stroke="#C4A062" stroke-width="2" fill="none" opacity=".7"/>
              <ellipse cx="150" cy="262" rx="30" ry="12" fill="#D62828" stroke="#1A1206" stroke-width="2"/>
              <ellipse cx="150" cy="259" rx="20" ry="8" fill="#FF4757" opacity=".9"/>
              <g transform="translate(88 118) rotate(-18)" stroke-width="2.5">
                <path d="M0 -58 C32 -58 38 -18 38 4 C38 34 20 54 0 54 C-20 54 -38 34 -38 4 C-38 -18 -32 -58 0 -58 Z" fill="url(#gV)" stroke="#4A2E7A"/>
                <path d="M-5 54 L0 68 L5 54 Z" fill="#4A2E7A"/>
                <ellipse cx="-11" cy="-22" rx="11" ry="18" fill="#fff" opacity=".52"/>
              </g>
              <g transform="translate(212 118) rotate(18)" stroke-width="2.5">
                <path d="M0 -58 C32 -58 38 -18 38 4 C38 34 20 54 0 54 C-20 54 -38 34 -38 4 C-38 -18 -32 -58 0 -58 Z" fill="url(#gY)" stroke="#A89218"/>
                <path d="M-5 54 L0 68 L5 54 Z" fill="#A89218"/>
                <ellipse cx="-11" cy="-22" rx="11" ry="18" fill="#fff" opacity=".52"/>
              </g>
              <g transform="translate(112 152) rotate(-8)" stroke-width="2.5">
                <path d="M0 -62 C36 -62 42 -20 42 6 C42 38 22 58 0 58 C-22 58 -42 38 -42 6 C-42 -20 -36 -62 0 -62 Z" fill="url(#gB)" stroke="#256A9E"/>
                <path d="M-5 58 L0 72 L5 58 Z" fill="#256A9E"/>
                <ellipse cx="-12" cy="-24" rx="12" ry="20" fill="#fff" opacity=".55"/>
              </g>
              <g transform="translate(188 152) rotate(10)" stroke-width="2.5">
                <path d="M0 -62 C36 -62 42 -20 42 6 C42 38 22 58 0 58 C-22 58 -42 38 -42 6 C-42 -20 -36 -62 0 -62 Z" fill="url(#gP)" stroke="#A83058"/>
                <path d="M-5 58 L0 72 L5 58 Z" fill="#A83058"/>
                <ellipse cx="-12" cy="-24" rx="12" ry="20" fill="#fff" opacity=".55"/>
              </g>
              <g transform="translate(150 128)" stroke-width="2.5">
                <path d="M0 -68 C42 -68 48 -22 48 6 C48 40 26 62 0 62 C-26 62 -48 40 -48 6 C-48 -22 -42 -68 0 -68 Z" fill="url(#gO)" stroke="#C94E12"/>
                <path d="M-6 62 L0 78 L6 62 Z" fill="#C94E12"/>
                <ellipse cx="-14" cy="-28" rx="14" ry="22" fill="#fff" opacity=".58"/>
              </g>
            </g>
          </svg>'''

TICK_OLD = re.compile(
    r"  function tick\(\)\{.*?\n  \}\n  if\(!reduce\)\{\n    var target=Math.min\(14,Math.floor\(W/110\)\);.*?\n    requestAnimationFrame\(tick\);\n  \}",
    re.DOTALL,
)

TICK_NEW = r"""  var lastT=performance.now();
  function tick(now){
    var dt=Math.min(32,(now||performance.now())-lastT);lastT=now||performance.now();
    for(var i=bubbles.length-1;i>=0;i--){
      var b=bubbles[i],speed=b.vy*(dt/16);
      b.y-=speed;b.phase+=0.006*dt;
      var sway=Math.sin(b.phase)*0.75+Math.sin(b.phase*1.55+0.8)*0.35+b.drift*(dt/16);
      if(b.hero){
        sway+=Math.sin(b.phase*0.9)*0.45*(dt/16);
        b.x+=sway;
        b.rot=b.spinBase+Math.sin(b.phase*0.72)*6;
        if(b.y<-b.size-50){resetHeroDog(b);continue;}
      }else{
        var dx=b.x-mx,dy=b.y-my,dist=Math.hypot(dx,dy);
        if(dist<150&&dist>0){sway+=(dx/dist)*((150-dist)/150)*1.0*(dt/16);}
        b.x+=sway;
        if(b.isBalloon){b.rot=(b.spinBase||0)+Math.sin(b.phase*0.75)*7;}
        else if(b.x<-b.size*0.4){b.x=W+b.size*0.2;}
        else if(b.x>W-b.size*0.2){b.x=-b.size*0.3;}
        if(b.y<-b.size-40){b.el.remove();bubbles.splice(i,1);continue;}
      }
      b.el.style.transform='translate3d('+b.x+'px,'+b.y+'px,0)'+(b.isBalloon?' rotate('+b.rot+'deg)':'');
    }
    requestAnimationFrame(tick);
  }
  if(!reduce){
    var target=Math.min(16,Math.floor(W/95));
    for(var i=0;i<target;i++){setTimeout(function(){spawnBubble(false);},i*300);}
    setInterval(function(){if(bubbles.filter(function(b){return !b.isBalloon&&!b.hero;}).length<target)spawnBubble(false);},2000);
    createHeroDog(0);
    createHeroDog(1);
    requestAnimationFrame(tick);
  }"""

SPAWN_PATCH_OLD = """      el.alt='';size=44+Math.random()*30;
      el.style.height=size+'px';el.style.width='auto';
    }else{
      el=document.createElement('div');el.className='bubble';
      size=26+Math.random()*70;
      el.style.width=el.style.height=size+'px';
    }
    var x=Math.random()*(W-size);
    var b={el:el,x:x,y:H+size,size:size,vy:.18+Math.random()*.32,drift:(Math.random()-.5)*.32,phase:Math.random()*6,isBalloon:isBalloon,spin:(Math.random()-.5)*.4,rot:0};"""

SPAWN_PATCH_NEW = """      el.alt='';size=54+Math.random()*36;
      el.style.height=size+'px';el.style.width='auto';
    }else{
      el=document.createElement('div');el.className='bubble';
      size=24+Math.random()*64;
      el.style.width=el.style.height=size+'px';
    }
    var x=Math.random()*(W-size);
    var b={el:el,x:x,y:H+size*0.5,size:size,vy:isBalloon?0.09+Math.random()*0.12:0.16+Math.random()*0.28,
      drift:(Math.random()-.5)*0.28,phase:Math.random()*6,isBalloon:isBalloon,spinBase:(Math.random()-.5)*5,rot:0,hero:false};"""

HERO_DOGS_PATCH = """    layer.appendChild(el);bubbles.push(b);
  }
  function createHeroDog(index){
    var el=document.createElement('img');
    el.className='bubble balloon-float hero-dog';
    el.src=balloonSrcs[index];
    el.alt='';
    var size=78+index*10;
    el.style.height=size+'px';el.style.width='auto';
    var startX=index===0?W*0.1:W*0.68;
    var b={el:el,x:startX,y:H*0.45+index*55,size:size,
      vy:0.038+index*0.006,drift:index===0?-0.14:0.14,
      phase:index*2.8,isBalloon:true,spinBase:index===0?-6:6,rot:0,hero:true,dogIndex:index};
    el.style.transform='translate3d('+b.x+'px,'+b.y+'px,0) rotate('+b.rot+'deg)';
    layer.appendChild(el);bubbles.push(b);
  }
  function resetHeroDog(b){
    b.y=H+b.size*0.6;
    b.x=b.dogIndex===0?W*(0.06+Math.random()*0.22):W*(0.62+Math.random()*0.28);
    b.phase=Math.random()*6;
  }"""

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
      setTimeout(function(){cluster.classList.add('gone');cluster.classList.remove('popping');},480);"""

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
    html = html.replace(BUBBLE_CSS_OLD, BUBBLE_CSS_NEW)
    html = html.replace(POP_CSS_OLD, POP_CSS_NEW)
    html = html.replace(SPAWN_PATCH_OLD, SPAWN_PATCH_NEW)
    html = html.replace(
        "    layer.appendChild(el);bubbles.push(b);\n  }\n  function popBubble(b,cx,cy){",
        HERO_DOGS_PATCH + "\n  function popBubble(b,cx,cy){",
    )
    html = html.replace(DOPOP_OLD, DOPOP_NEW)
    html = html.replace(RESET_OLD, RESET_NEW)
    html = html.replace(
        ".pop span{position:absolute;left:0;top:0;width:9px;height:9px;border-radius:50%;background:var(--star);\n  animation:popfly .6s ease-out forwards}",
        ".pop span{position:absolute;left:0;top:0;width:9px;height:9px;border-radius:50%;background:var(--star);\n  animation:popfly .75s cubic-bezier(.2,.8,.3,1) forwards}",
    )

    if not TICK_OLD.search(html):
        raise SystemExit("tick block not found")
    html = TICK_OLD.sub(TICK_NEW, html)
    html = replace_cluster(html)

    if "</html>" not in html or "<script>" not in html:
        raise SystemExit("Build output looks truncated — missing script or closing tags")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
