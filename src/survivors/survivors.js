function workSpot(t,i){const p=tpos(t),l=L(),d=DXY();const off=[[0,5],[-10,2],[10,2],[0,9]][i%4];return {x:p.x+off[0]*l.sc,y:p.y+d.hh+off[1]*l.sc};}
function idleSpot(s,i){const l=L(),d=DXY();const cx0=l.ox,cy0=l.oy+(OB0+OB1)*d.dy;const off=[[-13,3],[13,-3],[-5,-9],[5,9],[-13,-3],[13,3]][i%6];return {x:cx0+off[0]*l.sc,y:cy0+off[1]*l.sc};}
function crew(t){return G.survivors.filter(s=>s.task&&s.task.tile===t);}
function killSurvivor(s){const i=G.survivors.indexOf(s);if(i<0)return;s.task=null;G.survivors.splice(i,1);}
function statusOf(s){
if(!s.task)return "IDLE";
if(s.task.type==="extinguish")return s.task.tile.state==="owned"?"DEFENDING":"RECLAIMING";
return s.task.type.toUpperCase()+"ING";
}
function recruit(t){
if(G.survivors.length>=6)return;
const name=G.names.shift()||"ASH";
const face=G.faces.length?G.faces.shift():1;
const p=tpos(t),d=DXY();
const s={name,face,col:SURV_COLS[G.survivors.length%SURV_COLS.length],x:p.x,y:p.y+d.hh+4,task:null};
G.survivors.push(s);
}
function visual(dt){
for(let i=0;i<G.survivors.length;i++){
const s=G.survivors[i];
const target=s.task?workSpot(s.task.tile,G.survivors.indexOf(s)):idleSpot(s,i);
const d=Math.hypot(target.x-s.x,target.y-s.y);
if(d>1){const step=Math.min(d,SPEED*dt*ts);s.x+=(target.x-s.x)/d*step;s.y+=(target.y-s.y)/d*step;}
}
}
function drawSurvivors(){
const l=L();
cx.save();
cx.scale(S,S);
for(const s of G.survivors){
cx.fillStyle=s.col;
cx.beginPath();
cx.arc(s.x,s.y,6*l.sc,0,Math.PI*2);
cx.fill();
}
cx.restore();
}
