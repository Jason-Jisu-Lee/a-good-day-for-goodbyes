function drawStreets(){
const l=L();
const eLen=Math.hypot(34.5,17.25)*l.sc;
const half=eLen*0.44;
const inv=1/Math.hypot(2,1);
cx.save();
cx.scale(S,S);
cx.lineWidth=1.3*l.sc;
cx.lineCap="butt";
cx.setLineDash([5*l.sc,4.6*l.sc]);
for(let fam=0;fam<2;fam++){
const ux=2*inv,uy=(fam===0?-1:1)*inv;
for(let k=0;k<3;k++){
for(let r=0;r<4;r++){
const t1=fam===0?tAt(k,r):tAt(r,k);
const t2=fam===0?tAt(k+1,r):tAt(r,k+1);
if(!t1||!t2||!drawnTile(t1)||!drawnTile(t2))continue;
const rev1=revealedT(t1),rev2=revealedT(t2);
if(!rev1&&!rev2)continue;
const a=(rev1&&rev2)?0.55:0.2;
const p1=tpos(t1),p2=tpos(t2);
const mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
cx.strokeStyle="rgba(214,192,118,"+a+")";
cx.beginPath();
cx.moveTo(mx-ux*half,my-uy*half);
cx.lineTo(mx+ux*half,my+uy*half);
cx.stroke();
}
}
}
cx.restore();
}
