function volPanelRect(){
const l=L();
return {x:W-152,y:l.hud+30,w:136,h:46};
}
function drawTopbar(){
const l=L();
const ny=l.hud+4;
const nx=W-30;
uiButtons.push({id:"vol",x:nx-4,y:ny-4,w:24,h:26,en:true});
glyph(NOTE,nx,ny,2,openPanel==="vol"?FG:MID);
const gx=W-60;
uiButtons.push({id:"gear",x:gx-4,y:ny-4,w:26,h:26,en:true});
glyph(GEAR,gx,ny,2,openPanel==="set"?FG:MID);
if(openPanel==="vol"){
const r=volPanelRect();
px(r.x,r.y,r.w,r.h,BG);
edgeR(r.x,r.y,r.w,r.h,DIM);
glyph(NOTE,r.x+8,r.y+6,1,MID);
glyph(SPKR,r.x+7,r.y+29,1,MID);
uiButtons.push({id:"volM",x:r.x+22,y:r.y+4,w:104,h:18,en:true});
uiButtons.push({id:"volF",x:r.x+22,y:r.y+26,w:104,h:18,en:true});
px(r.x+26,r.y+11,96,4,DIM);
px(r.x+26,r.y+11,Math.round(96*OPT.volM),4,FG);
px(r.x+26,r.y+33,96,4,DIM);
px(r.x+26,r.y+33,Math.round(96*OPT.volF),4,FG);
}
if(openPanel==="set"){
const sx=W-136,sw=120,sh=26;
const rows=[["disp",DISP_NAME[OPT.disp]],["tomenu","MAIN MENU"],["abandon",abandonArm?"ABANDON?":"ABANDON"]];
for(let i=0;i<rows.length;i++){
const sy=l.hud+30+i*30;
px(sx,sy,sw,sh,BG);
uiButtons.push({id:rows[i][0],x:sx,y:sy,w:sw,h:sh,en:true});
if(hover===rows[i][0]){px(sx,sy,sw,sh,FG);text7(rows[i][1],sx+sw/2,sy+9,1,"c",BG);}
else{edgeR(sx,sy,sw,sh,DIM);text7(rows[i][1],sx+sw/2,sy+9,1,"c",MID);}
}
}
}
function volFromX(x){
const r=volPanelRect();
return Math.max(0,Math.min(1,(x-(r.x+26))/96));
}
