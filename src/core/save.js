function save(){
if(saveGag||!G||overT>=0)return;
const data={v:10,day:G.day,food:G.food,mats:G.mats,pr:G.pr||0,light:G.light||0,boDay:G.boDay||0,boCount:G.boCount||0,boNeed:G.boNeed||0,boFast:!!G.boFast,items:{p1:G.items&&G.items.p1||0,p2:G.items&&G.items.p2||0},tutDay:G.tutDay||3,zoomTipSeen:!!G.zoomTipSeen,matsSeen:G.matsSeen,opened:G.opened,atkN:G.atkN||0,nextAtk:G.nextAtk,names:G.names,faces:G.faces,
tiles:G.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,turnsLeft:t.turnsLeft||0,atk:!!t.atk,atkS:t.atkS||0,clearD:t.clearD||0,b2:!!t.b2,action:t.action})),
survivors:G.survivors.map(s=>({name:s.name,face:s.face,col:s.col,x:Math.round(s.x),y:Math.round(s.y),
task:s.task?{type:s.task.type,gx:s.task.tile.gx,gy:s.task.tile.gy}:null}))};
try{localStorage.setItem("goodbyes_save",JSON.stringify(data));}catch(e){}
}
function load(){
try{
const raw=localStorage.getItem("goodbyes_save");
if(!raw)return false;
const d=JSON.parse(raw);
if(d.v!==10)return false;
const opened=!d.tiles.some(t=>t.gx>=OB0&&t.gx<=OB1&&t.gy>=OB0&&t.gy<=OB1&&t.state!=="owned");
G={v:10,day:d.day,food:d.food,mats:d.mats,pr:d.pr||0,light:d.light||0,boDay:d.boDay||0,boCount:d.boCount||0,boNeed:d.boNeed||0,boFast:!!d.boFast,items:{p1:d.items&&d.items.p1||0,p2:d.items&&d.items.p2||0},tutDay:d.tutDay==null?3:d.tutDay,zoomTipSeen:!!d.zoomTipSeen,matsSeen:!!d.matsSeen||d.mats>0,opened,atkN:d.atkN||0,nextAtk:d.nextAtk==null?rollRange(ATK_FIRST):d.nextAtk,names:d.names||NAME_BAG.slice(),faces:d.faces||[2,3,4],tiles:[],survivors:[]};
G.tiles=d.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,turnsLeft:t.turnsLeft||0,atk:!!t.atk,atkS:t.atkS||0,clearD:t.clearD||0,b2:!!t.b2,action:t.action}));
G.survivors=d.survivors.map((s,i)=>{
const sv={name:s.name,face:s.face,col:s.col||SURV_COLS[i%SURV_COLS.length],x:s.x,y:s.y,task:null};
if(s.task){const tile=G.tiles.find(t=>t.gx===s.task.gx&&t.gy===s.task.gy);if(tile)sv.task={type:s.task.type,tile};}
return sv;
});
return true;
}catch(e){return false;}
}
function hasSave(){try{return localStorage.getItem("goodbyes_save")!==null;}catch(e){return false;}}
function wipe(){
saveGag=true;
try{localStorage.removeItem("goodbyes_save");}catch(e){}
location.reload();
}
