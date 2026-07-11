function save(){
if(saveGag||!G)return;
const data={v:2,t:G.t,day:G.day,dayT:G.dayT,food:G.food,mats:G.mats,matsSeen:G.matsSeen,names:G.names,faces:G.faces,
tiles:G.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,blocked:t.blocked,progress:t.progress,need:t.need,action:t.action})),
survivors:G.survivors.map(s=>({name:s.name,face:s.face,x:Math.round(s.x),y:Math.round(s.y),eatT:s.eatT,hungry:s.hungry,
task:s.task?{type:s.task.type,gx:s.task.tile.gx,gy:s.task.tile.gy}:null}))};
try{localStorage.setItem("goodbyes_save",JSON.stringify(data));}catch(e){}
}
function load(){
try{
const raw=localStorage.getItem("goodbyes_save");
if(!raw)return false;
const d=JSON.parse(raw);
if(d.v!==2)return false;
G={v:2,t:d.t,day:d.day,dayT:d.dayT,food:d.food,mats:d.mats,matsSeen:!!d.matsSeen||d.mats>0,names:d.names,faces:d.faces,tiles:[],survivors:[]};
G.tiles=d.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,blocked:t.blocked,progress:t.progress,need:t.need,action:t.action}));
G.survivors=d.survivors.map(s=>{
const sv={name:s.name,face:s.face,x:s.x,y:s.y,eatT:s.eatT,hungry:s.hungry,task:null,arriveAt:0};
if(s.task){const tile=G.tiles.find(t=>t.gx===s.task.gx&&t.gy===s.task.gy);if(tile)sv.task={type:s.task.type,tile};}
return sv;
});
return true;
}catch(e){return false;}
}
function wipe(){
saveGag=true;
try{localStorage.removeItem("goodbyes_save");}catch(e){}
location.reload();
}
