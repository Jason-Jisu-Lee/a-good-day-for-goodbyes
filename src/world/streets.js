function drawStreets(){
const l=L(),d=DXY();
const cellLen=Math.hypot(d.dx,d.dy);
const dash=cellLen/5.8;
const gap=dash*0.6;
const yoff=3.75*l.sc;
cx.save();
cx.scale(S,S);
cx.lineWidth=1.3*l.sc;
cx.lineCap="butt";
cx.setLineDash([dash,gap]);
cx.lineDashOffset=0;
for(let fam=0;fam<2;fam++){
for(let k=0;k<GRID-1;k++){
const pairs=[];
for(let r=0;r<GRID;r++){
const t1=fam===0?tAt(k,r):tAt(r,k);
const t2=fam===0?tAt(k+1,r):tAt(r,k+1);
if(!t1||!t2||!drawnTile(t1)||!drawnTile(t2)){pairs.push(null);continue;}
const rev1=revealedT(t1),rev2=revealedT(t2);
if(!rev1&&!rev2){pairs.push(null);continue;}
const p1=tpos(t1),p2=tpos(t2);
pairs.push({full:rev1&&rev2,mx:(p1.x+p2.x)/2,my:(p1.y+p2.y)/2+yoff});
}
let r=0;
while(r<GRID){
if(!pairs[r]){r++;continue;}
let r2=r;
while(r2+1<GRID&&pairs[r2+1])r2++;
const m=r2-r+1;
const A=pairs[r],B=pairs[r2];
const inv=1/Math.hypot(d.dx,d.dy);
const dirx=(fam===0?-d.dx:d.dx)*inv,diry=d.dy*inv;
const sx=A.mx-dirx*cellLen/2,sy=A.my-diry*cellLen/2;
const ex=B.mx+dirx*cellLen/2,ey=B.my+diry*cellLen/2;
const g=cx.createLinearGradient(sx,sy,ex,ey);
const a0=A.full?0.55:0;
const a1=B.full?0.55:0;
g.addColorStop(0,"rgba(214,192,118,"+a0+")");
for(let i=0;i<m;i++){
const f=(i+0.5)/m;
const a=pairs[r+i].full?0.55:0.26;
g.addColorStop(f,"rgba(214,192,118,"+a+")");
}
g.addColorStop(1,"rgba(214,192,118,"+a1+")");
cx.strokeStyle=g;
cx.beginPath();
cx.moveTo(sx,sy);
cx.lineTo(ex,ey);
cx.stroke();
r=r2+1;
}
}
}
cx.restore();
}
