function drawStreets(){
const l=L();
const half=Math.hypot(34.5,17.25)*l.sc/2;
const segLen=half*2;
const dash=segLen/5.8;
const gap=dash*0.6;
const inv=1/Math.hypot(2,1);
const yoff=3.75*l.sc;
let n=0,axx=0,ayy=0;
for(const t of G.tiles)if(revealedT(t)){const p=tpos(t);axx+=p.x;ayy+=p.y;n++;}
const tcx=n?axx/n:0,tcy=n?ayy/n:0;
cx.save();
cx.scale(S,S);
cx.lineWidth=1.3*l.sc;
cx.lineCap="butt";
cx.setLineDash([dash,gap]);
cx.lineDashOffset=0;
for(let fam=0;fam<2;fam++){
const ux=2*inv,uy=(fam===0?-1:1)*inv;
for(let k=0;k<GRID-1;k++){
for(let r=0;r<GRID;r++){
const t1=fam===0?tAt(k,r):tAt(r,k);
const t2=fam===0?tAt(k+1,r):tAt(r,k+1);
if(!t1||!t2||!drawnTile(t1)||!drawnTile(t2))continue;
const rev1=revealedT(t1),rev2=revealedT(t2);
if(!rev1&&!rev2)continue;
const p1=tpos(t1),p2=tpos(t2);
const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2+yoff;
const x1=mx-ux*half,y1=my-uy*half;
const x2=mx+ux*half,y2=my+uy*half;
if(rev1&&rev2){
cx.strokeStyle="rgba(214,192,118,0.55)";
}else{
const d1=Math.hypot(x1-tcx,y1-tcy),d2=Math.hypot(x2-tcx,y2-tcy);
const g=d1<=d2?cx.createLinearGradient(x1,y1,x2,y2):cx.createLinearGradient(x2,y2,x1,y1);
g.addColorStop(0,"rgba(214,192,118,0.5)");
g.addColorStop(1,"rgba(214,192,118,0)");
cx.strokeStyle=g;
}
cx.beginPath();
cx.moveTo(x1,y1);
cx.lineTo(x2,y2);
cx.stroke();
}
}
}
cx.restore();
}
