function tip(x,y,lines){
let w=0;
for(const s of lines)w=Math.max(w,tw7(s,1));
px(x,y,w+12,lines.length*14+8,BG);
edgeR(x,y,w+12,lines.length*14+8,DIM);
for(let i=0;i<lines.length;i++)text7(lines[i],x+6,y+5+i*14,1);
}
function drawHUD(){
const l=L();
text7("FOOD "+Math.floor(G.food),16,l.hud,2);
let inc=0;
const srcs=[];
for(const t of G.tiles){
if(t.state==="owned"&&!t.blocked&&t.kind==="grocery"&&!t.action){
const n=arrived(t).length;
if(n>0){inc+=n*FOOD_PM;srcs.push(n+" X "+FOOD_PM+"/MIN");}
}
}
const expn=G.survivors.length*3;
uiButtons.push({id:"inc",x:14,y:l.hud+20,w:96,h:13,en:true});
uiButtons.push({id:"exp",x:14,y:l.hud+34,w:96,h:13,en:true});
text7("+"+inc+"/MIN",16,l.hud+22,1,null,MID);
text7("-"+expn+"/MIN",16,l.hud+36,1,null,MID);
if(hover==="inc")tip(16,l.hud+52,srcs.length?srcs:["0 X "+FOOD_PM+"/MIN"]);
if(hover==="exp")tip(16,l.hud+52,[G.survivors.length+" X 3/MIN"]);
if(G.matsSeen||G.mats>0)text7("MATERIALS "+Math.floor(G.mats),160,l.hud,2);
text7("DAY "+G.day,16,H-24,1,null,MID);
}
