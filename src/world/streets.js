function drawStreets(){
const l=L(),d=DXY();
const P0=Math.hypot(64,40);
const rev=[];
for(const t of G.tiles)if(revealedT(t))rev.push(tpos(t));
if(!rev.length)return;
const step=2/P0;
for(let fam=0;fam<2;fam++){
for(let k=0;k<3;k++){
for(let w=-0.6;w<=3.6;w+=step){
const rw=Math.round(w);
if(rw<0||rw>3)continue;
const t1=fam===0?tAt(k,rw):tAt(rw,k);
const t2=fam===0?tAt(k+1,rw):tAt(rw,k+1);
if(!t1||!t2||!drawnTile(t1)||!drawnTile(t2))continue;
if((w*P0+400)%20>=12)continue;
let x,y;
if(fam===0){x=l.ox+((k+0.5)-w)*d.dx;y=l.oy+((k+0.5)+w)*d.dy;}
else{x=l.ox+(w-(k+0.5))*d.dx;y=l.oy+(w+(k+0.5))*d.dy;}
let col=null;
if(revealedT(t1)&&revealedT(t2))col="#5a5a5a";
else{
let D=1e9;
for(const p of rev){const v=Math.hypot(x-p.x,y-p.y);if(v<D)D=v;}
D/=P0*l.sc;
if(D<0.95)col="#5a5a5a";
else if(D<1.15)col="#4a4a4a";
else if(D<1.32)col="#333333";
else if(D<1.45)col="#262626";
}
if(col)px(x-l.sc,y-l.sc,2*l.sc,2*l.sc,col);
}
}
}
}
