const BO_YEL="#e3c15c";
const BO_FAM='Tahoma,Geneva,sans-serif',BO_WT="700",BO_SP=0.1,BO_DIM=0.5;
let boT=-1,boOut=-1,boOutA=0,darkR=-1;
function boWordStart(){boT=0;boOut=-1;darkR=-1;}
function boEnv(t){return t<0.72?t/0.72:(t<2.16?1:Math.max(0,(3.36-t)/1.2));}
function boDismiss(){if(boT>=0.72&&boOut<0){boOut=boT;boOutA=boEnv(boT);}}
function updateBlackout(dt){
if(boT>=0){boT+=dt;if(boOut>=0?(boT-boOut)>=0.3:boT>=3.36)boT=-1;}
if(G&&G.boDay>0){if(boT<0){if(darkR<0)darkR=0;else darkR+=dt;}}
else darkR=-1;
}
function darkVisible(){return !!(G&&G.boDay>0&&darkR>=2);}
function darkAlpha(){if(darkR<2)return 0;const p=Math.min(1,(darkR-2)/3.5);return p*p;}
function darkShown(){
const need=(G&&G.boNeed)||0;
if(darkR<5.5)return Math.min(1,need);
const q=Math.min(1,(darkR-5.5)/1.3);
return Math.max(1,Math.round(1+(need-1)*q*q));
}
function drawBlackoutWord(){
if(boT<0)return;
const a=boOut>=0?boOutA*Math.max(0,1-(boT-boOut)/0.3):boEnv(boT);
if(a<=0)return;
const vs=boHeightVS((G&&G.boCount)||1);
cx.save();
cx.scale(S,S);
cx.fillStyle="rgba(0,0,0,"+(BO_DIM*a)+")";
cx.fillRect(0,0,W,H);
cx.globalAlpha=a;
cx.fillStyle=(G&&G.boFast)?DANGER:BO_YEL;
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
cx.translate(0,H/2);cx.scale(1,vs);cx.translate(0,-H/2);
let x=W/2-tw/2;
for(let i=0;i<s.length;i++){cx.fillText(s[i],x,H/2);x+=ws[i]+gap;}
cx.restore();
}
