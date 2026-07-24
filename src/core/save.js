function save(){
if(saveGag||!G||overT>=0)return;
const data={v:11,day:G.day,mats:G.mats,pr:G.pr||0,light:G.light||0,boDay:G.boDay||0,boCount:G.boCount||0,boNeed:G.boNeed||0,boFast:!!G.boFast,matsSeen:G.matsSeen,opened:G.opened,atkN:G.atkN||0,nextAtk:G.nextAtk,names:G.names,faces:G.faces,peak:G.peak||G.survivors.length,soleMusic:!!G.soleMusic,
tiles:G.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,turnsLeft:t.turnsLeft||0,atk:!!t.atk,atkS:t.atkS||0,build:t.build||null,b2:!!t.b2,action:t.action})),
survivors:G.survivors.map(s=>({name:s.name,face:s.face,col:s.col,mc:!!s.mc,x:Math.round(s.x),y:Math.round(s.y),
task:s.task?{type:s.task.type,gx:s.task.tile.gx,gy:s.task.tile.gy}:null}))};
try{localStorage.setItem("goodbyes_save",JSON.stringify(data));}catch(e){}
}
function load(){
try{
const raw=localStorage.getItem("goodbyes_save");
if(!raw)return false;
const d=JSON.parse(raw);
if(d.v!==11)return false;
G={v:11,day:d.day,mats:d.mats,pr:d.pr||0,light:d.light||0,boDay:d.boDay||0,boCount:d.boCount||0,boNeed:d.boNeed||0,boFast:!!d.boFast,matsSeen:!!d.matsSeen||d.mats>0,opened:d.opened!==false,atkN:d.atkN||0,nextAtk:d.nextAtk==null?rollRange(ATK_FIRST):d.nextAtk,names:d.names||[],faces:d.faces||[],peak:Math.max(d.peak||0,d.survivors.length),soleMusic:!!d.soleMusic,tiles:[],survivors:[]};
G.tiles=d.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,turnsLeft:t.turnsLeft||0,atk:!!t.atk,atkS:t.atkS||0,build:t.build||null,b2:!!t.b2,action:t.action}));
G.survivors=d.survivors.map((s,i)=>{
const sv={name:s.name,face:s.face,col:s.col||SURV_COLS[i%SURV_COLS.length],mc:!!s.mc,x:s.x,y:s.y,task:null};
if(s.task){const tile=G.tiles.find(t=>t.gx===s.task.gx&&t.gy===s.task.gy);if(tile)sv.task={type:s.task.type,tile};}
return sv;
});
if(G.survivors.length&&!G.survivors.some(s=>s.mc))G.survivors[0].mc=true;
return true;
}catch(e){return false;}
}
function hasSave(){try{return localStorage.getItem("goodbyes_save")!==null;}catch(e){return false;}}
let sdCache=-1;
function saveDay(){
if(G)return G.day;
if(sdCache<0){
try{
const raw=localStorage.getItem("goodbyes_save");
sdCache=raw?(JSON.parse(raw).day||0):0;
}catch(e){sdCache=0;}
}
return sdCache;
}
function wipe(){
saveGag=true;
try{localStorage.removeItem("goodbyes_save");}catch(e){}
location.reload();
}
