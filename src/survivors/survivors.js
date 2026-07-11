function workSpot(t,i){const p=tpos(t),l=L(),d=DXY();const off=[[0,7],[-13,3],[13,3],[0,12]][i%4];return {x:p.x+off[0]*l.sc,y:p.y+d.hh+off[1]*l.sc};}
function idleSpot(s,i){const l=L(),d=DXY();const cx0=l.ox,cy0=l.oy+3*d.dy;const off=[[-17,4],[17,-4],[-7,-12],[7,12],[-17,-4],[17,4]][i%6];return {x:cx0+off[0]*l.sc,y:cy0+off[1]*l.sc};}
function crew(t){return G.survivors.filter(s=>s.task&&s.task.tile===t);}
function arrived(t){return crew(t).filter(s=>G.t>=s.arriveAt&&(!s.hungry||t.kind==="grocery"));}
function statusOf(s){
if(s.hungry)return "HUNGRY";
if(!s.task)return "IDLE";
if(G.t<s.arriveAt)return "WALKING";
if(s.task.type==="gather")return s.task.tile.kind==="grocery"?"FOOD":"MATERIALS";
return s.task.type.toUpperCase()+"ING";
}
function recruit(t){
if(G.survivors.length>=6)return;
const name=G.names.pop()||"ASH";
const face=G.faces.length?G.faces.shift():1;
const p=tpos(t),d=DXY();
const s={name,face,x:p.x,y:p.y+d.hh+5,task:null,arriveAt:0,eatT:EAT_EVERY,hungry:false};
G.survivors.push(s);
}
function visual(dt){
for(let i=0;i<G.survivors.length;i++){
const s=G.survivors[i];
let target;
if(s.task){const spot=workSpot(s.task.tile,G.survivors.indexOf(s));target=s.hungry&&s.task.tile.kind!=="grocery"?null:spot;}
else target=idleSpot(s,i);
if(target){
const d=Math.hypot(target.x-s.x,target.y-s.y);
if(d>1){const step=Math.min(d,SPEED*dt*ts);s.x+=(target.x-s.x)/d*step;s.y+=(target.y-s.y)/d*step;}
}
}
}
function drawSurvivors(){
for(const s of G.survivors)blit(s.hungry?RING_D:RING,s.x-5,s.y-5,1);
}
