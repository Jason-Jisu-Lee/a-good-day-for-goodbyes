const BO_YEL="#e3c15c";
let boT=-1;
function boWordStart(){boT=0;}
function updateBlackout(dt){if(boT>=0){boT+=dt;if(boT>=3.2)boT=-1;}}
function drawBlackoutWord(){
if(boT<0)return;
const a=boT<0.7?boT/0.7:(boT<2.2?1:Math.max(0,(3.2-boT)/1));
cx.save();
cx.scale(S,S);
cx.globalAlpha=a;
cx.font="800 52px "+FONT_STACK;
cx.textBaseline="top";
cx.textAlign="left";
cx.fillStyle=BO_YEL;
const s="BLACKOUT",gap=22;
const ws=[...s].map(ch=>cx.measureText(ch).width);
let tw=ws.reduce((t,w)=>t+w+gap,-gap);
let x=W/2-tw/2;
for(let i=0;i<s.length;i++){cx.fillText(s[i],x,H/2-34);x+=ws[i]+gap;}
cx.restore();
}
