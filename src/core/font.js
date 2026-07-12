const FONT_STACK='"Segoe UI",system-ui,Arial,sans-serif';
function text7(s,x,y,n,al,col){
cx.save();
cx.scale(S,S);
cx.font="600 "+Math.round(n*10)+"px "+FONT_STACK;
cx.textBaseline="top";
cx.textAlign=al==="c"?"center":(al==="r"?"right":"left");
cx.fillStyle=col||FG;
cx.fillText(s,x,y);
cx.restore();
}
function tw7(s,n){
cx.save();
cx.font="600 "+Math.round(n*10)+"px "+FONT_STACK;
const w=cx.measureText(s).width;
cx.restore();
return w;
}
function text3(s,x,y,n,al,col){
cx.save();
cx.scale(S,S);
cx.font="700 "+Math.round(n*8)+"px "+FONT_STACK;
cx.textBaseline="top";
cx.textAlign=al==="c"?"center":(al==="r"?"right":"left");
cx.fillStyle=col||FG;
cx.fillText(s,x,y);
cx.restore();
}
function tw3(s,n){
cx.save();
cx.font="700 "+Math.round(n*8)+"px "+FONT_STACK;
const w=cx.measureText(s).width;
cx.restore();
return w;
}
