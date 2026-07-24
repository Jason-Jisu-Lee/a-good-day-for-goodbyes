function dragGlow(x,y){
const l=L();
cx.save();
cx.scale(S,S);
cx.beginPath();
cx.moveTo(x,y+3*l.sc-17.5*l.sc);
cx.lineTo(x+35.5*l.sc,y+3*l.sc);
cx.lineTo(x,y+3*l.sc+17.5*l.sc);
cx.lineTo(x-35.5*l.sc,y+3*l.sc);
cx.closePath();
cx.fillStyle="rgba(242,242,240,0.12)";
cx.fill();
cx.restore();
}
function drawDrag(){
if(!G||!dragS||!dragPt)return;
const l=L();
let ex=dragPt.x,ey=dragPt.y,snapped=false;
if(dragT){
const q=tpos(dragT);
const cyy=q.y+3*l.sc,hw=35.5*l.sc,hh=17.5*l.sc;
const vx=dragS.x-q.x,vy=dragS.y-cyy;
const m=Math.abs(vx)/hw+Math.abs(vy)/hh;
if(m>1){ex=q.x+vx/m;ey=cyy+vy/m;snapped=true;}
else return;
}
cx.save();
cx.scale(S,S);
cx.strokeStyle=FG;
cx.lineWidth=1.5;
cx.lineCap="round";
cx.globalAlpha=snapped?0.9:0.4;
cx.beginPath();
cx.moveTo(dragS.x,dragS.y);
cx.lineTo(ex,ey);
cx.stroke();
cx.fillStyle=FG;
cx.beginPath();
cx.arc(ex,ey,3*Math.max(l.sc,0.8),0,Math.PI*2);
cx.fill();
cx.restore();
cx.globalAlpha=1;
}
