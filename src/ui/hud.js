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
const tally={};
for(const t of G.tiles){
if(t.state==="owned"&&t.kind==="grocery"&&!t.action){
const r=genPM(arrived(t).length);
inc+=r;tally[r]=(tally[r]||0)+1;
}
}
const srcs=Object.keys(tally).sort((a,b)=>a-b).map(r=>tally[r]+" X "+r+"/MIN");
const expn=G.survivors.length*(60/EAT_EVERY);
uiButtons.push({id:"inc",x:14,y:l.hud+20,w:96,h:13,en:true});
uiButtons.push({id:"exp",x:14,y:l.hud+34,w:96,h:13,en:true});
text7("+"+inc+"/MIN",16,l.hud+22,1,null,MID);
text7("-"+expn+"/MIN",16,l.hud+36,1,null,MID);
if(hover==="inc")tip(16,l.hud+52,srcs.length?srcs:["0 X "+GEN_PM+"/MIN"]);
if(hover==="exp")tip(16,l.hud+52,[G.survivors.length+" X "+(60/EAT_EVERY)+"/MIN"]);
if(G.matsSeen||G.mats>0)text7("MATERIALS "+Math.floor(G.mats),160,l.hud,2);
text7("SURVIVORS "+G.survivors.length+"/6",160,l.hud+22,1,null,MID);
text7("DAY "+G.day,16,H-24,1,null,MID);
}
