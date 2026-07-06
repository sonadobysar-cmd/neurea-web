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
.bubble.balloon-float::after{display:none}"""

POP_CSS_OLD = """.popstage{position:relative;width:min(440px,90vw);height:400px;margin:24px auto 0;display:grid;place-items:center}
/* the balloon cluster you pop */
.cluster{position:absolute;inset:0;display:grid;place-items:center;cursor:pointer;
  animation:sway 3.4s ease-in-out infinite;transition:opacity .25s}
@keyframes sway{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-10px) rotate(1.5deg)}}
.cluster.gone{opacity:0;pointer-events:none;animation:none}
.cluster svg{width:min(300px,72vw);height:auto;filter:drop-shadow(6px 8px 0 rgba(26,18,6,.14))}"""

POP_CSS_NEW = """.popstage{position:relative;width:min(460px,92vw);height:430px;margin:24px auto 0;display:grid;place-items:center;overflow:visible}
.cluster{position:absolute;inset:0;display:grid;place-items:center;cursor:pointer;
  animation:clusterSway 4.2s ease-in-out infinite;transition:opacity .35s, transform .45s cubic-bezier(.34,1.2,.48,1)}
@keyframes clusterSway{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-14px) rotate(1deg)}}
.cluster.popping{animation:clusterPop .55s cubic-bezier(.4,0,.2,1) forwards;pointer-events:none}
@keyframes clusterPop{0%{transform:scale(1)}35%{transform:scale(1.06)}100%{transform:scale(.55);opacity:0}}
.cluster.gone{opacity:0;pointer-events:none;animation:none}
.cluster-svg{width:min(340px,86vw);height:auto;overflow:visible}
.cluster-balloon{transform-origin:center bottom;animation:balloonBob 3.6s ease-in-out infinite}
.cluster-balloon.cb-v{animation-delay:0s}.cluster-balloon.cb-y{animation-delay:.4s}
.cluster-balloon.cb-b{animation-delay:.8s}.cluster-balloon.cb-o{animation-delay:.2s}
.cluster-balloon.cb-p{animation-delay:1.1s}
@keyframes balloonBob{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-6px) rotate(calc(var(--r,0deg) + 2deg))}}"""

CLUSTER_OLD_START = '<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">'
CLUSTER_NEW = r'''<div class="cluster" id="cluster" role="button" tabindex="0" aria-label="Prasknout balónky">
          <svg viewBox="0 0 320 340" aria-hidden="true" class="cluster-svg">
            <defs>
              <radialGradient id="gO" cx="34%" cy="26%" r="72%"><stop offset="0%" stop-color="#FFC878"/><stop offset="55%" stop-color="#F68544"/><stop offset="100%" stop-color="#C94E12"/></radialGradient>
              <radialGradient id="gV" cx="34%" cy="26%" r="72%"><stop offset="0%" stop-color="#C9A8EE"/><stop offset="55%" stop-color="#7B56B8"/><stop offset="100%" stop-color="#4A2E7A"/></radialGradient>
              <radialGradient id="gY" cx="34%" cy="26%" r="72%"><stop offset="0%" stop-color="#FAF078"/><stop offset="55%" stop-color="#E4D040"/><stop offset="100%" stop-color="#A89218"/></radialGradient>
              <radialGradient id="gB" cx="34%" cy="26%" r="72%"><stop offset="0%" stop-color="#A8E0FF"/><stop offset="55%" stop-color="#4FA9E0"/><stop offset="100%" stop-color="#256A9E"/></radialGradient>
              <radialGradient id="gP" cx="34%" cy="26%" r="72%"><stop offset="0%" stop-color="#FFB0D0"/><stop offset="55%" stop-color="#E06090"/><stop offset="100%" stop-color="#A83058"/></radialGradient>
              <filter id="clusterGlow" x="-15%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="rgba(26,18,6,0.16)"/>
              </filter>
            </defs>
            <g filter="url(#clusterGlow)">
              <path d="M160 262 Q138 292 128 318" stroke="#C4A062" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <path d="M160 262 Q168 295 178 318" stroke="#C4A062" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <path d="M160 262 Q160 298 160 318" stroke="#C4A062" stroke-width="2" fill="none" stroke-linecap="round"/>
              <path d="M160 262 Q148 278 142 292" stroke="#C4A062" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
              <path d="M160 262 Q172 278 178 292" stroke="#C4A062" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
              <ellipse cx="160" cy="276" rx="34" ry="14" fill="#D62828" stroke="#1A1206" stroke-width="2"/>
              <ellipse cx="160" cy="272" rx="22" ry="9" fill="#FF4757" opacity=".85"/>
              <g class="cluster-balloon cb-v" style="--r:-18deg" transform="translate(82 118) rotate(-18)">
                <path d="M0 -58 C32 -58 38 -18 38 4 C38 34 20 54 0 54 C-20 54 -38 34 -38 4 C-38 -18 -32 -58 0 -58 Z" fill="url(#gV)" stroke="#4A2E7A" stroke-width="2.5"/>
                <path d="M-5 54 L0 68 L5 54 Z" fill="#4A2E7A"/><ellipse cx="-11" cy="-22" rx="11" ry="18" fill="#fff" opacity=".5"/>
              </g>
              <g class="cluster-balloon cb-y" style="--r:18deg" transform="translate(238 118) rotate(18)">
                <path d="M0 -58 C32 -58 38 -18 38 4 C38 34 20 54 0 54 C-20 54 -38 34 -38 4 C-38 -18 -32 -58 0 -58 Z" fill="url(#gY)" stroke="#A89218" stroke-width="2.5"/>
                <path d="M-5 54 L0 68 L5 54 Z" fill="#A89218"/><ellipse cx="-11" cy="-22" rx="11" ry="18" fill="#fff" opacity=".5"/>
              </g>
              <g class="cluster-balloon cb-b" style="--r:-8deg" transform="translate(108 152) rotate(-8)">
                <path d="M0 -62 C36 -62 42 -20 42 6 C42 38 22 58 0 58 C-22 58 -42 38 -42 6 C-42 -20 -36 -62 0 -62 Z" fill="url(#gB)" stroke="#256A9E" stroke-width="2.5"/>
                <path d="M-5 58 L0 72 L5 58 Z" fill="#256A9E"/><ellipse cx="-12" cy="-24" rx="12" ry="20" fill="#fff" opacity=".52"/>
              </g>
              <g class="cluster-balloon cb-o" style="--r:0deg" transform="translate(160 138)">
                <path d="M0 -72 C44 -72 52 -24 52 8 C52 44 28 66 0 66 C-28 66 -52 44 -52 8 C-52 -24 -44 -72 0 -72 Z" fill="url(#gO)" stroke="#C94E12" stroke-width="2.5"/>
                <path d="M-6 66 L0 82 L6 66 Z" fill="#C94E12"/><ellipse cx="-15" cy="-30" rx="15" ry="24" fill="#fff" opacity=".55"/>
              </g>
              <g class="cluster-balloon cb-p" style="--r:10deg" transform="translate(212 154) rotate(10)">
                <path d="M0 -60 C34 -60 40 -20 40 4 C40 34 22 54 0 54 C-22 54 -40 34 -40 4 C-40 -20 -34 -60 0 -60 Z" fill="url(#gP)" stroke="#A83058" stroke-width="2.5"/>
                <path d="M-5 54 L0 68 L5 54 Z" fill="#A83058"/><ellipse cx="-11" cy="-22" rx="11" ry="18" fill="#fff" opacity=".5"/>
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
      b.y-=speed;b.phase+=0.007*dt;
      var sway=Math.sin(b.phase)*0.85+Math.sin(b.phase*1.63+1.1)*0.38+b.drift;
      var dx=b.x-mx,dy=b.y-my,dist=Math.hypot(dx,dy);
      if(dist<150&&dist>0){sway+=(dx/dist)*((150-dist)/150)*1.1;}
      b.x+=sway;
      if(b.isBalloon){b.rot=(b.spinBase||0)+Math.sin(b.phase*0.75)*7;}
      else if(b.x<-b.size*0.4){b.x=W+b.size*0.2;}
      else if(b.x>W-b.size*0.2){b.x=-b.size*0.3;}
      if(b.y<-b.size-40){b.el.remove();bubbles.splice(i,1);continue;}
      b.el.style.transform='translate3d('+b.x+'px,'+b.y+'px,0)'+(b.isBalloon?' rotate('+b.rot+'deg)':'');
    }
    requestAnimationFrame(tick);
  }
  if(!reduce){
    var target=Math.min(16,Math.floor(W/95));
    for(var i=0;i<target;i++){setTimeout(function(){spawnBubble(false);},i*320);}
    setInterval(function(){if(bubbles.filter(function(b){return !b.isBalloon;}).length<target)spawnBubble(false);},2100);
    setInterval(function(){if(bubbles.filter(function(b){return b.isBalloon;}).length<5)spawnBubble(true);},3600);
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
      drift:(Math.random()-.5)*0.28,phase:Math.random()*6,isBalloon:isBalloon,spinBase:(Math.random()-.5)*5,rot:0};"""

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
    end = html.find("</svg>", start)
    if end < 0:
        raise SystemExit("cluster svg end not found")
    end = html.find("\n", html.find(">", hint)) + 1
    return html[:start] + CLUSTER_NEW + html[hint:end]


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")

    html = SRC.read_text(encoding="utf-8")
    html = html.replace(BUBBLE_CSS_OLD, BUBBLE_CSS_NEW)
    html = html.replace(POP_CSS_OLD, POP_CSS_NEW)
    html = html.replace(SPAWN_PATCH_OLD, SPAWN_PATCH_NEW)
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

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
