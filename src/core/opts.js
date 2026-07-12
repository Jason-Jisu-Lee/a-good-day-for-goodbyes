let OPT={volM:0.8,volF:0.8,disp:"win",mute:false};
function optSave(){try{localStorage.setItem("goodbyes_opts",JSON.stringify(OPT));}catch(e){}}
function optLoad(){
try{
const r=localStorage.getItem("goodbyes_opts");
if(r){
const d=JSON.parse(r);
OPT={volM:+d.volM||0,volF:+d.volF||0,disp:d.disp==="bord"||d.disp==="full"?"bord":"win",mute:!!d.mute};
}
}catch(e){}
}
optLoad();
