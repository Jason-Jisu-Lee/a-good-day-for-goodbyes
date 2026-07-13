function toLogical(e){const r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/k,y:(e.clientY-r.top)/k};}
cv.addEventListener("pointerdown",e=>{
musicGesture();
if(mode!=="game")return;
const p=toLogical(e);
for(const b of uiButtons){
if((b.id==="volM"||b.id==="volF")&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){
volDrag=b.id;
if(volDrag==="volM")OPT.volM=volFromX(p.x);else OPT.volF=volFromX(p.x);
return;
}
}
});
cv.addEventListener("pointermove",e=>{
const p=toLogical(e);
if(volDrag){
if(volDrag==="volM")OPT.volM=volFromX(p.x);else OPT.volF=volFromX(p.x);
musicVol();
return;
}
let h=null;
if(mode==="menu"){for(const b of menuButtons)if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)h=b.id;hoverTile=null;}
else{
for(const b of uiButtons)if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)h=b.id;
const tt=h?null:(G?tileAt(p.x,p.y):null);
if(tt!==hoverTile)hoverA=0;
hoverTile=tt;
}
hover=h;
cv.style.cursor=(h&&h!=="none")||hoverTile?"pointer":"default";
});
cv.addEventListener("pointerup",e=>{
if(volDrag){volDrag=null;optSave();return;}
const p=toLogical(e);
if(mode==="menu"){
for(const b of menuButtons){if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){
if(b.id==="MMUTE"){OPT.mute=!OPT.mute;optSave();musicVol();return;}
if(b.id==="NEW GAME"||b.id==="CONTINUE")fading=true;
if(b.id==="QUIT GAME")window.close();
}}
return;
}
for(const b of uiButtons){
if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){
if(!b.en)return;
clickUI(b.id);
return;
}
}
openPanel=null;abandonArm=false;
const t=tileAt(p.x,p.y);
const l=L();
const inPanel=sel&&p.x>=l.pnX&&p.x<=l.pnX+l.pnW&&p.y>=l.pnY&&p.y<=l.pnY+l.pnH;
if(t){sel=t;picker=null;}
else if(!inPanel&&p.y>40){sel=null;picker=null;}
});
function clickUI(id){
if(id!=="abandon")abandonArm=false;
if(id==="vol"){openPanel=openPanel==="vol"?null:"vol";return;}
if(id==="gear"){openPanel=openPanel==="set"?null:"set";return;}
if(id==="disp"){cycleDisp();return;}
if(id==="tomenu"){openPanel=null;save();mode="menu";fade=0;fading=false;sel=null;picker=null;menuMusic(true);return;}
if(id==="abandon"){
if(!abandonArm){abandonArm=true;return;}
abandonArm=false;openPanel=null;
G=null;sel=null;picker=null;hoverTile=null;
try{localStorage.removeItem("goodbyes_save");}catch(e){}
mode="menu";fade=0;fading=false;
return;
}
if(id==="volM"||id==="volF")return;
if(id.startsWith("act_")){
const type=id.slice(4);
const pre=type==="gather"?[]:G.survivors.filter(s=>!s.task&&!s.hungry).slice(0,1);
picker={type,set:new Set(pre)};
return;
}
if(id.startsWith("pick_")){
const rest=id.slice(5);
if(rest==="go"){
if(picker.set.size>0){
for(const s of picker.set)if(s.task)s.task=null;
assign(sel,picker.type==="gather"?"gather":picker.type,[...picker.set]);
picker=null;
}
return;
}
if(rest==="no"){picker=null;return;}
const s=G.survivors[parseInt(rest,10)];
if(lockedS(s))return;
if(picker.set.has(s))picker.set.delete(s);
else if(!(picker.type==="gather"&&picker.set.size>=GATHER_SLOTS))picker.set.add(s);
return;
}
if(id==="stop"){releaseCrew(sel);return;}
}
addEventListener("keydown",e=>{
musicGesture();
if(e.key==="`"){toggleDbg();return;}
if(e.key==="Escape"){
if(mode==="game"){
if(picker){picker=null;return;}
if(sel){sel=null;return;}
save();mode="menu";fade=0;fading=false;sel=null;picker=null;menuMusic(true);
}
}
});
