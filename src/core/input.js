function toLogical(e){const r=cv.getBoundingClientRect();return {x:(e.clientX-r.left)/k,y:(e.clientY-r.top)/k};}
let panDrag=null,pinch=null;
const ptrs=new Map();
cv.addEventListener("wheel",e=>{
if(mode!=="game"||!G)return;
e.preventDefault();
const p=toLogical(e);
setZoom(zoomS*(e.deltaY<0?1.1:0.9),p.x,p.y);
},{passive:false});
cv.addEventListener("pointerdown",e=>{
musicGesture();
if(mode!=="game")return;
const p=toLogical(e);
ptrs.set(e.pointerId,p);
if(ptrs.size===2){
const a=[...ptrs.values()];
pinch={d0:Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y),z0:zoomS,mx:(a[0].x+a[1].x)/2,my:(a[0].y+a[1].y)/2};
panDrag=null;
return;
}
for(const b of uiButtons){
if((b.id==="volM"||b.id==="volF")&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){
volDrag=b.id;
if(volDrag==="volM")OPT.volM=volFromX(p.x);else OPT.volF=volFromX(p.x);
return;
}
}
for(const b of uiButtons)if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h)return;
const l=L();
if(sel&&p.x>=l.pnX&&p.x<=l.pnX+l.pnW&&p.y>=l.pnY&&p.y<=l.pnY+l.pnH)return;
panDrag={sx:p.x,sy:p.y,cx0:camX,cy0:camY,moved:false};
});
cv.addEventListener("pointermove",e=>{
const p=toLogical(e);
if(ptrs.has(e.pointerId))ptrs.set(e.pointerId,p);
if(pinch&&ptrs.size===2){
const a=[...ptrs.values()];
const d=Math.hypot(a[1].x-a[0].x,a[1].y-a[0].y);
if(d>0&&pinch.d0>0)setZoom(pinch.z0*d/pinch.d0,pinch.mx,pinch.my);
return;
}
if(volDrag){
if(volDrag==="volM")OPT.volM=volFromX(p.x);else OPT.volF=volFromX(p.x);
musicVol();
return;
}
if(panDrag){
const dx=p.x-panDrag.sx,dy=p.y-panDrag.sy;
if(Math.abs(dx)+Math.abs(dy)>6)panDrag.moved=true;
if(panDrag.moved){
camX=panDrag.cx0+dx;
camY=panDrag.cy0+dy;
clampCam();
hoverTile=null;hover=null;
cv.style.cursor="grabbing";
return;
}
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
ptrs.delete(e.pointerId);
if(pinch){if(ptrs.size<2)pinch=null;return;}
if(volDrag){volDrag=null;optSave();return;}
if(panDrag){
const moved=panDrag.moved;
panDrag=null;
if(moved)return;
}
const p=toLogical(e);
if(mode==="menu"){
for(const b of menuButtons){if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){
if(b.id==="MMUTE"){OPT.mute=!OPT.mute;optSave();musicVol();return;}
if(b.id==="NEW GAME"||b.id==="CONTINUE")fading=true;
if(b.id==="QUIT GAME")window.close();
}}
return;
}
if(mode==="shop"){
for(const b of uiButtons)if(p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h){if(b.en)shopClick(b.id);return;}
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
if(t){
sel=t;picker=null;
if(G.tut===1&&t.state!=="owned")G.tut=2;
if(t.atk)G.atkTipSeen=true;
}
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
if(id==="endturn"){endTurn();return;}
if(id.startsWith("act_")){
picker={type:id.slice(4),set:new Set()};
return;
}
if(id.startsWith("pick_")){
const rest=id.slice(5);
if(rest==="go"){
if(picker.set.size>0){
for(const s of picker.set)if(s.task)s.task=null;
assign(sel,picker.type,[...picker.set]);
picker=null;
}
return;
}
if(rest==="no"){picker=null;return;}
const s=G.survivors[parseInt(rest,10)];
if(lockedS(s))return;
if(picker.set.has(s))picker.set.delete(s);
else if(picker.type==="gather"?picker.set.size<GATHER_SLOTS:crewUseful(sel.state==="owned"?sel.atkS:tileStrength(sel),picker.set.size))picker.set.add(s);
return;
}
if(id==="stop"){releaseCrew(sel);return;}
if(id==="clear"){clearRubble(sel);return;}
if(id==="ztip"){G.zoomTipSeen=true;return;}
}
cv.addEventListener("pointercancel",e=>{
ptrs.delete(e.pointerId);
if(ptrs.size<2)pinch=null;
panDrag=null;
});
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
