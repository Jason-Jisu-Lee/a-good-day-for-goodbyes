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
const n1=revealedT(t1)?1:0,n2=revealedT(t2)?1:0;
const p1=tpos(t1),p2=tpos(t2);
pairs.push({rev:n1+n2,mx:(p1.x+p2.x)/2,my:(p1.y+p2.y)/2+yoff});
}
const solid=r=>pairs[r]&&pairs[r].rev>=1;
const core=r=>pairs[r]&&pairs[r].rev===2;
let r=0;
while(r<GRID){
if(!solid(r)){r++;continue;}
let r2=r;
while(r2+1<GRID&&solid(r2+1))r2++;
const extS=r>0?(pairs[r-1]&&core(r)?1:0.4):0;
const extE=r2<GRID-1?(pairs[r2+1]&&core(r2)?1:0.4):0;
const m=(r2-r+1)+extS+extE;
const inv=1/Math.hypot(d.dx,d.dy);
const dirx=(fam===0?-d.dx:d.dx)*inv,diry=d.dy*inv;
const A=pairs[r],B=pairs[r2];
const sx=A.mx-dirx*cellLen*(0.5+extS),sy=A.my-diry*cellLen*(0.5+extS);
const ex=B.mx+dirx*cellLen*(0.5+extE),ey=B.my+diry*cellLen*(0.5+extE);
const g=cx.createLinearGradient(sx,sy,ex,ey);
g.addColorStop(0,"rgba(214,192,118,"+(extS>0?0:0.55)+")");
if(extS>0)g.addColorStop(extS/m,"rgba(214,192,118,0.55)");
if(extE>0)g.addColorStop((m-extE)/m,"rgba(214,192,118,0.55)");
g.addColorStop(1,"rgba(214,192,118,"+(extE>0?0:0.55)+")");
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
