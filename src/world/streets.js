function drawStreets(){
const l=L(),d=DXY();
const seg=Math.hypot(d.dx,d.dy);
const pat=11*l.sc;
cx.save();
cx.scale(S,S);
cx.lineWidth=1.4*l.sc;
cx.setLineDash([6*l.sc,5*l.sc]);
cx.lineCap="butt";
for(let fam=0;fam<2;fam++){
for(let k=0;k<3;k++){
for(let r=0;r<4;r++){
const t1=fam===0?tAt(k,r):tAt(r,k);
const t2=fam===0?tAt(k+1,r):tAt(r,k+1);
if(!t1||!t2||!drawnTile(t1)||!drawnTile(t2))continue;
const rev1=revealedT(t1),rev2=revealedT(t2);
if(!rev1&&!rev2)continue;
const a=(rev1&&rev2)?1:0.35;
let ax,ay,bx,by;
if(fam===0){
ax=l.ox+((k+0.5)-(r-0.5))*d.dx;ay=l.oy+((k+0.5)+(r-0.5))*d.dy;
bx=l.ox+((k+0.5)-(r+0.5))*d.dx;by=l.oy+((k+0.5)+(r+0.5))*d.dy;
}else{
ax=l.ox+((r-0.5)-(k+0.5))*d.dx;ay=l.oy+((r-0.5)+(k+0.5))*d.dy;
bx=l.ox+((r+0.5)-(k+0.5))*d.dx;by=l.oy+((r+0.5)+(k+0.5))*d.dy;
}
cx.strokeStyle="rgba(90,90,90,"+a+")";
cx.lineDashOffset=-(((r*seg)%pat));
cx.beginPath();
cx.moveTo(ax,ay);
cx.lineTo(bx,by);
cx.stroke();
}
}
}
cx.restore();
}
