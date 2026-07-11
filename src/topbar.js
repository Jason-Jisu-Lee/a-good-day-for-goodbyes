let gearOpen=false,volDrag=null;
const NOTE=["...X.","...XX","...X.","...X.",".XXX.","XXXX.",".XX.."];
const GEAR=[".X.X.","XXXXX",".XXX.","XX.XX",".XXX.","XXXXX",".X.X."];
function glyph(rows,x,y,n,col){
cx.fillStyle=col;
for(let r=0;r<rows.length;r++)for(let c=0;c<rows[r].length;c++)if(rows[r][c]==="X")px(x+c*n,y+r*n,n,n,col);
}
function volPanelRect(){
const l=L();
return {x:W-140,y:l.hud+26,w:124,h:44};
}
function drawTopbar(){
const l=L();
const nx=W-92,ny=l.hud+8;
uiButtons.push({id:"mute",x:nx-4,y:ny-4,w:22,h:22,en:true});
glyph(NOTE,nx,ny,2,OPT.mute?DIM:FG);
if(OPT.mute)px(nx-2,ny+6,16,2,MID);
const gx=W-120,gy=l.hud+8;
uiButtons.push({id:"gear",x:gx-4,y:gy-4,w:22,h:22,en:true});
glyph(GEAR,gx,gy,2,gearOpen?FG:MID);
const overVol=hover==="mute"||hover==="volM"||hover==="volF"||volDrag;
if(overVol){
const r=volPanelRect();
px(r.x,r.y,r.w,r.h,BG);
edgeR(r.x,r.y,r.w,r.h,DIM);
glyph(NOTE,r.x+8,r.y+7,1,MID);
glyph(GEAR,r.x+8,r.y+27,1,MID);
uiButtons.push({id:"volM",x:r.x+20,y:r.y+4,w:96,h:16,en:true});
uiButtons.push({id:"volF",x:r.x+20,y:r.y+24,w:96,h:16,en:true});
px(r.x+22,r.y+10,90,4,DIM);
px(r.x+22,r.y+10,Math.round(90*OPT.volM),4,FG);
px(r.x+22,r.y+30,90,4,DIM);
px(r.x+22,r.y+30,Math.round(90*OPT.volF),4,FG);
}
if(gearOpen){
btn("tomenu","MAIN MENU",W-160,l.hud+30,144);
}
}
function volFromX(x){
const r=volPanelRect();
return Math.max(0,Math.min(1,(x-(r.x+22))/90));
}
