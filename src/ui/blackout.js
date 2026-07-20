const BO_YEL="#e3c15c";
const BO_FAM='"Segoe UI Black","Segoe UI",sans-serif',BO_WT="800",BO_SP=0.1;
let boT=-1;
function boWordStart(){boT=0;}
function updateBlackout(dt){if(boT>=0){boT+=dt;if(boT>=3.4)boT=-1;}}
function boEnv(t){return t<0.7?t/0.7:(t<2.4?1:Math.max(0,(3.4-t)/1));}
function drawBlackoutWord(){
if(boT<0)return;
const a=boEnv(boT);
if(a<=0)return;
cx.save();
cx.scale(S,S);
cx.fillStyle="rgba(0,0,0,"+(0.72*a)+")";
cx.fillRect(0,0,W,H);
cx.globalAlpha=a;
cx.fillStyle=BO_YEL;
cx.textBaseline="middle";
cx.textAlign="left";
const s="BLACKOUT",target=W*0.94;
const p=Math.min(1,boT/0.9),e=1-Math.pow(1-p,3),sp=BO_SP+(1-e)*0.5;
cx.font=BO_WT+" 100px "+BO_FAM;
const w0=[...s].map(ch=>cx.measureText(ch).width);
const tw0=w0.reduce((v,w)=>v+w,0)+100*sp*(s.length-1);
let size=Math.min(150,100*target/tw0);
cx.font=BO_WT+" "+size+"px "+BO_FAM;
const ws=[...s].map(ch=>cx.measureText(ch).width);
const gap=size*sp;
let tw=ws.reduce((v,w)=>v+w+gap,-gap);
let x=W/2-tw/2;
for(let i=0;i<s.length;i++){cx.fillText(s[i],x,H/2);x+=ws[i]+gap;}
cx.restore();
}
