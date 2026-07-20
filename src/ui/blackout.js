const BO_YEL="#e3c15c";
const BO_FAM='"Segoe UI Black","Segoe UI",sans-serif',BO_WT="800",BO_SP=0.1,BO_DIM=0.5;
let boT=-1,boOut=-1,boOutA=0;
function boWordStart(){boT=0;boOut=-1;}
function boEnv(t){return t<0.6?t/0.6:(t<1.8?1:Math.max(0,(2.8-t)/1));}
function boDismiss(){if(boT>=0.6&&boOut<0){boOut=boT;boOutA=boEnv(boT);}}
function updateBlackout(dt){
if(boT<0)return;
boT+=dt;
if(boOut>=0?(boT-boOut)>=0.3:boT>=2.8)boT=-1;
}
function drawBlackoutWord(){
if(boT<0)return;
const a=boOut>=0?boOutA*Math.max(0,1-(boT-boOut)/0.3):boEnv(boT);
if(a<=0)return;
cx.save();
cx.scale(S,S);
cx.fillStyle="rgba(0,0,0,"+(BO_DIM*a)+")";
cx.fillRect(0,0,W,H);
cx.globalAlpha=a;
cx.fillStyle=BO_YEL;
cx.textBaseline="middle";
cx.textAlign="left";
const s="BLACKOUT",target=W*0.94;
cx.font=BO_WT+" 100px "+BO_FAM;
const w0=[...s].map(ch=>cx.measureText(ch).width);
const tw0=w0.reduce((v,w)=>v+w,0)+100*BO_SP*(s.length-1);
const size=Math.min(150,100*target/tw0);
cx.font=BO_WT+" "+size+"px "+BO_FAM;
const ws=[...s].map(ch=>cx.measureText(ch).width);
const gap=size*BO_SP;
let tw=ws.reduce((v,w)=>v+w+gap,-gap);
let x=W/2-tw/2;
for(let i=0;i<s.length;i++){cx.fillText(s[i],x,H/2);x+=ws[i]+gap;}
cx.restore();
}
