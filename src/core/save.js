function save(){
if(saveGag||!G)return;
const data={v:5,t:G.t,day:G.day,dayT:G.dayT,food:G.food,mats:G.mats,pr:G.pr||0,matsSeen:G.matsSeen,opened:G.opened,names:G.names,faces:G.faces,
tiles:G.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,dark:t.dark||0,progress:t.progress,action:t.action})),
survivors:G.survivors.map(s=>({name:s.name,face:s.face,col:s.col,x:Math.round(s.x),y:Math.round(s.y),eatT:s.eatT,hungry:s.hungry,power:s.power||SURV_POWER,
task:s.task?{type:s.task.type,gx:s.task.tile.gx,gy:s.task.tile.gy}:null}))};
try{localStorage.setItem("goodbyes_save",JSON.stringify(data));}catch(e){}
}
function load(){
try{
const raw=localStorage.getItem("goodbyes_save");
if(!raw)return false;
const d=JSON.parse(raw);
if(d.v!==5)return false;
const opened=!d.tiles.some(t=>t.gx>=OB0&&t.gx<=OB1&&t.gy>=OB0&&t.gy<=OB1&&t.state!=="owned");
G={v:5,t:d.t,day:d.day,dayT:d.dayT,food:d.food,mats:d.mats,pr:d.pr||0,matsSeen:!!d.matsSeen||d.mats>0,opened,names:d.names,faces:d.faces,tiles:[],survivors:[]};
G.tiles=d.tiles.map(t=>({gx:t.gx,gy:t.gy,kind:t.kind,state:t.state,dark:t.dark||0,progress:t.progress,action:t.action}));
G.survivors=d.survivors.map((s,i)=>{
const sv={name:s.name,face:s.face,col:s.col||SURV_COLS[i%SURV_COLS.length],x:s.x,y:s.y,eatT:s.eatT,hungry:s.hungry,power:s.power||SURV_POWER,task:null,arriveAt:0};
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
