function drawRoster(){
const l=L();
let y=l.hud+104;
for(const s of G.survivors){
const st=statusOf(s);
const idle=!s.task;
cx.save();
cx.scale(S,S);
cx.fillStyle=s.col;
cx.beginPath();
cx.arc(21,y+6,5,0,Math.PI*2);
cx.fill();
cx.restore();
text7(s.name,32,y,1,null,idle?FG:MID);
text7(st,96,y,1,null,idle?FG:DIM);
y+=18;
}
}
