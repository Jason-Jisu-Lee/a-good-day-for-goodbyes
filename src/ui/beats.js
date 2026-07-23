let beatQ=null,beatI=-1,beatT=0,beatCap=null,beatBo=false,beatAC=null,beatShown=null,beatLead=0;
const BEAT_LEAD=0.5;
function beatDwell(ev,i){
const base=ev.dram?1.5:0.75;
return Math.max(0.55,base*Math.max(0.6,1-i*0.06));
}
function beatsActive(){return beatQ!==null;}
function zeroDelta(){return {food:0,mats:0,light:0,pr:0};}
function beatsBegin(){beatCap=[];beatShown={food:G.food,mats:G.mats,light:G.light||0,pr:G.pr||0};}
function beatsClear(){beatQ=null;beatCap=null;beatShown=null;beatBo=false;beatI=-1;beatLead=0;}
function beatEv(t){return {t,prev:{kind:t.kind,state:t.state,atk:!!t.atk},crew:crew(t).map(s=>({col:s.col})),floats:[],out:"work",label:"",au:"working",dram:false,delta:zeroDelta(),seq:0};}
function beatOut(ev,t){
if(ev.prev.atk){
const lost=t.state==="dark";
ev.out=lost?"taken":"held";ev.label=lost?"TAKEN":"HELD";ev.au=lost?"taken":"held";ev.dram=true;
}else if(t.state==="owned"){
ev.out="done";
const k=ev.prev.kind;
if(k==="camp"||k==="mysteryroll"){ev.label="SURVIVOR";ev.au="survivor";ev.dram=true;}
else if(k==="grocery"){ev.label="FOOD";ev.au="food";}
else if(k==="scrap"){ev.label="MATERIAL";ev.au="material";}
else if(k==="cache"){ev.label="SUPPLY CACHE";ev.au="cache";ev.gkey="gcache";}
else if(k==="light"){ev.label="LIGHT";ev.au="cache";ev.gkey="glight";}
else if(k==="pr"){ev.label="EMBER";ev.au="cache";ev.gkey="gember";}
else{ev.label="ILLUMINATED";ev.au="material";}
}else{ev.out="fail";ev.label="CONSUMED";ev.au="taken";ev.dram=true;}
beatCap.push(ev);
}
function beatWork(ev,t){
ev.out="work";
ev.label=t.turnsLeft+(t.turnsLeft===1?" DAY LEFT":" DAYS LEFT");
ev.au="working";
beatCap.push(ev);
}
function beatIncome(t,res,amt){
if(!beatCap||amt<=0)return;
const p=tpos(t),d=DXY();
const dl=zeroDelta();dl[res]=amt;
beatCap.push({t,prev:{kind:t.kind,state:"owned",atk:false},crew:[],floats:[{x:p.x,y:p.y-d.hh-4,txt:"+"+amt}],out:"income",label:"+"+amt,au:res==="food"?"food":"material",dram:false,delta:dl,seq:1,gkey:"ginc-"+res});
}
function beatEat(amt){
if(!beatCap||amt<=0)return;
const q=tpos({gx:(OB0+OB1)/2,gy:(OB0+OB1)/2});
const dl=zeroDelta();dl.food=-amt;
beatCap.push({t:null,px:q.x,py:q.y,prev:null,crew:[],floats:[],out:"eat",label:"-"+amt+" FOOD",au:"working",dram:false,delta:dl,seq:2});
}
function beatStarve(s){
if(!beatCap)return;
beatCap.push({t:null,px:s.x,py:s.y,prev:null,crew:[{col:s.col}],floats:[],out:"starve",label:"STARVED",au:"taken",dram:true,delta:zeroDelta(),seq:3});
}
function grpLabel(g){const m=g.members[0];if(m.out==="income")return "+"+(g.delta.food+g.delta.mats);return m.label;}
function beatsEnd(boFire){
if(overT>=0){beatsClear();return;}
if(!beatCap||beatCap.length===0){beatCap=null;beatShown=null;if(boFire)boWordStart();return;}
const groups={},merged=[];
for(const e of beatCap){
if(e.gkey){
let g=groups[e.gkey];
if(!g){g={group:true,members:[],au:e.au,dram:e.dram,seq:e.seq||0,delta:zeroDelta(),floats:[],label:""};groups[e.gkey]=g;merged.push(g);}
g.members.push(e);
g.delta.food+=e.delta.food;g.delta.mats+=e.delta.mats;g.delta.light+=e.delta.light;g.delta.pr+=e.delta.pr;
for(const f of e.floats)g.floats.push(f);
}else merged.push(e);
}
for(const k in groups)groups[k].label=grpLabel(groups[k]);
const byq=[[],[],[],[]];
for(const e of merged)byq[e.seq||0].push(e);
beatQ=[...shuffle(byq[0]),...shuffle(byq[1]),...byq[2],...byq[3]];
beatCap=null;beatBo=boFire;beatI=0;beatT=0;beatLead=BEAT_LEAD;
}
function beatSettle(ev){
if(beatShown&&ev.delta){beatShown.food+=ev.delta.food;beatShown.mats+=ev.delta.mats;beatShown.light+=ev.delta.light;beatShown.pr+=ev.delta.pr;}
for(const f of ev.floats)spawnFloat(f.x,f.y,f.txt);
}
function beatsFinish(){
beatQ=null;beatI=-1;beatShown=null;beatLead=0;
if(beatBo){beatBo=false;boWordStart();}
}
function beatsSkipAll(){
if(!beatQ)return;
for(let i=beatI;i<beatQ.length;i++)beatSettle(beatQ[i]);
beatsFinish();
}
function beatsUpdate(dt){
if(!beatQ)return;
if(beatLead>0){beatLead-=dt;if(beatLead<=0){beatLead=0;beatSfx(beatQ[0].au);}return;}
beatT+=dt;
if(beatT>=beatDwell(beatQ[beatI],beatI)){
beatSettle(beatQ[beatI]);
beatI++;beatT=0;
if(beatI>=beatQ.length)beatsFinish();
else beatSfx(beatQ[beatI].au);
}
}
function beatPrevFor(t){
if(!beatQ)return null;
for(let i=beatI;i<beatQ.length;i++){
const e=beatQ[i];
if(e.group){for(const m of e.members)if(m.t===t)return m;}
else if(e.t===t)return e;
}
return null;
}
function drawBeats(){
if(!beatQ||beatI>=beatQ.length||beatLead>0)return;
const ev=beatQ[beatI],p2=Math.min(1,beatT/beatDwell(ev,beatI));
px(0,0,W,H,"rgba(0,0,0,0.5)");
cx.save();
cx.translate(Math.round(camX*S),Math.round(camY*S));
const d=DXY(),l=L();
if(ev.group){
let sx=0,sy=0;
for(const m of ev.members){
const mq=tpos(m.t);sx+=mq.x;sy+=mq.y;
cx.save();
cx.globalAlpha=m.out==="income"?0.82+0.18*Math.sin(p2*Math.PI*4):Math.min(1,0.35+0.75*p2);
drawTileVisual(m.t,mq.x,mq.y);
cx.restore();
}
cx.globalAlpha=Math.min(1,p2*2.5);
text7(ev.label,sx/ev.members.length,sy/ev.members.length-d.hh-30,2,"c",FG);
cx.globalAlpha=1;
cx.restore();
return;
}
const q=ev.t?tpos(ev.t):{x:ev.px,y:ev.py};
if(ev.t){
cx.save();
if(ev.out==="done"){
cx.globalAlpha=Math.min(1,0.35+0.75*p2);
drawTileVisual(ev.t,q.x,q.y);
}else if(ev.out==="income"){
cx.globalAlpha=0.82+0.18*Math.sin(p2*Math.PI*4);
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
}
cx.save();
cx.scale(S,S);
const cbY=ev.t?q.y+d.hh+8*l.sc:q.y;
for(let i=0;i<ev.crew.length;i++){
const bx=q.x+(i-(ev.crew.length-1)/2)*16*l.sc;
const by=cbY+(ev.t?Math.abs(Math.sin(p2*Math.PI*3))*-3*l.sc:0);
cx.globalAlpha=ev.out==="starve"?Math.max(0.2,1-p2*0.8):1;
cx.fillStyle=ev.crew[i].col;
cx.beginPath();
cx.arc(bx,by,6*l.sc,0,Math.PI*2);
cx.fill();
}
cx.globalAlpha=1;
cx.restore();
cx.globalAlpha=Math.min(1,p2*2.5);
const bad=ev.out==="fail"||ev.out==="taken"||ev.out==="starve";
const ly=ev.t?q.y-d.hh-30:q.y-16;
text7(ev.label,q.x,ly,2,"c",bad?DANGER:FG);
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
