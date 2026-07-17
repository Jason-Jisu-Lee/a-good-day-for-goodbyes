function persistPR(){if(!G||!G.pr)return;try{const m=(parseInt(localStorage.getItem("goodbyes_pr")||"0",10)||0)+G.pr;localStorage.setItem("goodbyes_pr",String(m));}catch(e){}}
function save(){
if(saveGag||!G||overT>=0)return;
const data={v:6,day:G.day,food:G.food,mats:G.mats,pr:G.pr||0,matsSeen:G.matsSeen,opened:G.opened,attackOn:!!G.attackOn,armT:G.armT,atkT:G.atkT,names:G.names,faces:G.faces,
tiles:G.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,turnsLeft:t.turnsLeft||0,atk:!!t.atk,action:t.action})),
survivors:G.survivors.map(s=>({name:s.name,face:s.face,col:s.col,x:Math.round(s.x),y:Math.round(s.y),
task:s.task?{type:s.task.type,gx:s.task.tile.gx,gy:s.task.tile.gy}:null}))};
try{localStorage.setItem("goodbyes_save",JSON.stringify(data));}catch(e){}
}
function load(){
try{
const raw=localStorage.getItem("goodbyes_save");
if(!raw)return false;
const d=JSON.parse(raw);
if(d.v!==6)return false;
const opened=!d.tiles.some(t=>t.gx>=OB0&&t.gx<=OB1&&t.gy>=OB0&&t.gy<=OB1&&t.state!=="owned");
G={v:6,day:d.day,food:d.food,mats:d.mats,pr:d.pr||0,matsSeen:!!d.matsSeen||d.mats>0,opened,attackOn:!!d.attackOn,armT:d.armT==null?-1:d.armT,atkT:d.atkT==null?ATTACK_EVERY_T:d.atkT,tiles:[],survivors:[]};
G.tiles=d.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,turnsLeft:t.turnsLeft||0,atk:!!t.atk,action:t.action}));
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
