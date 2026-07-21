let beatQ=null,beatI=-1,beatT=0,beatCap=null,beatBo=false,beatAC=null;
const BEAT_SECS=0.7;
function beatsActive(){return beatQ!==null;}
function beatsBegin(){beatCap=[];}
function beatsClear(){beatQ=null;beatCap=null;beatBo=false;beatI=-1;}
function beatEv(t){return {t,prev:{kind:t.kind,state:t.state,atk:!!t.atk},crew:crew(t).map(s=>({col:s.col})),floats:[],out:"work",label:"",au:"working"};}
function beatOut(ev,t){
if(ev.prev.atk){
const lost=t.state==="dark";
ev.out=lost?"taken":"held";ev.label=lost?"TAKEN":"HELD";ev.au=lost?"taken":"held";
}else if(t.state==="owned"){
ev.out="done";
const k=ev.prev.kind;
if(k==="camp"||k==="mysteryroll"){ev.label="SURVIVOR";ev.au="survivor";}
else if(k==="grocery"){ev.label="FOOD";ev.au="food";}
else if(k==="scrap"){ev.label="MATERIAL";ev.au="material";}
else if(k==="cache"){ev.label="SUPPLY CACHE";ev.au="cache";}
else if(k==="light"){ev.label="LIGHT";ev.au="cache";}
else if(k==="pr"){ev.label="EMBER";ev.au="cache";}
else{ev.label="RECLAIMED";ev.au="material";}
}else{ev.out="fail";ev.label="CONSUMED";ev.au="taken";}
beatCap.push(ev);
}
function beatWork(ev,t){
ev.out="work";
ev.label=t.turnsLeft+(t.turnsLeft===1?" DAY LEFT":" DAYS LEFT");
ev.au="working";
beatCap.push(ev);
}
function beatsEnd(boFire){
if(overT>=0){beatsClear();return;}
if(!beatCap||beatCap.length===0){beatCap=null;if(boFire)boWordStart();return;}
beatQ=shuffle(beatCap);
beatCap=null;beatBo=boFire;beatI=0;beatT=0;
beatSfx(beatQ[0].au);
}
function beatSettle(ev){for(const f of ev.floats)spawnFloat(f.x,f.y,f.txt);}
function beatsFinish(){
beatQ=null;beatI=-1;
if(beatBo){beatBo=false;boWordStart();}
}
function beatsSkipAll(){
if(!beatQ)return;
for(let i=beatI;i<beatQ.length;i++)beatSettle(beatQ[i]);
beatsFinish();
}
function beatsUpdate(dt){
if(!beatQ)return;
beatT+=dt;
if(beatT>=BEAT_SECS){
beatSettle(beatQ[beatI]);
beatI++;beatT=0;
if(beatI>=beatQ.length)beatsFinish();
else beatSfx(beatQ[beatI].au);
}
}
function beatPrevFor(t){
if(!beatQ)return null;
for(let i=beatI;i<beatQ.length;i++)if(beatQ[i].t===t)return beatQ[i];
return null;
}
function drawBeats(){
if(!beatQ||beatI>=beatQ.length)return;
const ev=beatQ[beatI],p2=Math.min(1,beatT/BEAT_SECS);
px(0,0,W,H,"rgba(0,0,0,0.5)");
cx.save();
cx.translate(Math.round(camX*S),Math.round(camY*S));
const q=tpos(ev.t),d=DXY(),l=L();
cx.save();
if(ev.out==="done"){
cx.globalAlpha=Math.min(1,0.35+0.75*p2);
drawTileVisual(ev.t,q.x,q.y);
}else if(ev.out==="taken"){
cx.globalAlpha=Math.max(0.25,1-p2*0.75);
drawTileVisual({kind:ev.prev.kind,state:"owned",atk:false},q.x,q.y);
}else if(ev.out==="held"){
cx.globalAlpha=0.8+0.2*Math.sin(p2*Math.PI*4);
drawTileVisual({kind:ev.prev.kind,state:"owned",atk:false},q.x,q.y);
}else{
drawTileVisual({kind:ev.prev.kind,state:ev.prev.state,atk:false},q.x,q.y);
}
cx.restore();
cx.save();
cx.scale(S,S);
for(let i=0;i<ev.crew.length;i++){
const bx=q.x+(i-(ev.crew.length-1)/2)*16*l.sc;
const by=q.y+d.hh+8*l.sc+Math.abs(Math.sin(p2*Math.PI*3))*-3*l.sc;
cx.fillStyle=ev.crew[i].col;
cx.beginPath();
cx.arc(bx,by,6*l.sc,0,Math.PI*2);
cx.fill();
}
cx.restore();
cx.globalAlpha=Math.min(1,p2*2.5);
const bad=ev.out==="fail"||ev.out==="taken";
text7(ev.label,q.x,q.y-d.hh-30,2,"c",bad?DANGER:FG);
cx.globalAlpha=1;
cx.restore();
}
function beatBeep(f0,f1,dur,type,g,at){
const t0=beatAC.currentTime+at;
const o=beatAC.createOscillator(),gn=beatAC.createGain();
o.type=type;
o.frequency.setValueAtTime(f0,t0);
if(f1)o.frequency.exponentialRampToValueAtTime(f1,t0+dur);
gn.gain.setValueAtTime(0,t0);
gn.gain.linearRampToValueAtTime(g,t0+0.012);
gn.gain.exponentialRampToValueAtTime(0.001,t0+dur);
o.connect(gn);gn.connect(beatAC.destination);
o.start(t0);o.stop(t0+dur+0.02);
}
function beatSfx(k){
const v=OPT.mute?0:OPT.volF;
if(!(v>0))return;
if(!beatAC)beatAC=new (window.AudioContext||window.webkitAudioContext)();
if(beatAC.state==="suspended")beatAC.resume();
if(k==="material"){beatBeep(180,90,0.16,"square",0.12*v,0);beatBeep(330,495,0.14,"triangle",0.1*v,0.16);}
else if(k==="food"){beatBeep(660,0,0.1,"triangle",0.12*v,0);beatBeep(880,0,0.12,"triangle",0.1*v,0.1);}
else if(k==="survivor"){beatBeep(440,0,0.09,"triangle",0.11*v,0);beatBeep(554,0,0.09,"triangle",0.11*v,0.09);beatBeep(659,0,0.16,"triangle",0.12*v,0.18);}
else if(k==="cache"){beatBeep(987,0,0.06,"square",0.07*v,0);beatBeep(1318,0,0.1,"square",0.07*v,0.08);}
else if(k==="held"){beatBeep(330,495,0.14,"triangle",0.1*v,0);beatBeep(660,0,0.12,"triangle",0.09*v,0.15);}
else if(k==="taken"){beatBeep(140,70,0.2,"square",0.12*v,0);beatBeep(90,0,0.15,"square",0.1*v,0.2);}
else{beatBeep(110,0,0.07,"square",0.08*v,0);beatBeep(110,0,0.05,"square",0.05*v,0.22);}
}
