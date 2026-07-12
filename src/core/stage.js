const cv=document.getElementById("cv"),cx=cv.getContext("2d");
let W=960,H=540,k=1,S=1,dpr=1,PORT=false;

function rr(v){return Math.round(v*S);}
function px(x,y,w,h,col){cx.fillStyle=col;const a=rr(x),b=rr(y);cx.fillRect(a,b,rr(x+w)-a,rr(y+h)-b);}
function mk(w,h){const c=document.createElement("canvas");c.width=w;c.height=h||w;return c;}
function blit(c,x,y,n){const a=rr(x),b=rr(y);cx.drawImage(c,a,b,rr(x+c.width*n)-a,rr(y+c.height*n)-b);}
function blitS(img,x,y,w,h){if(!img.width)return false;const a=rr(x),b=rr(y);cx.drawImage(img,a,b,rr(x+w)-a,rr(y+h)-b);return true;}
function edgeR(x,y,w,h,col){px(x,y,w,1,col);px(x,y+h-1,w,1,col);px(x,y,1,h,col);px(x+w-1,y,1,h,col);}

function fit(){
dpr=window.devicePixelRatio||1;
PORT=innerHeight>innerWidth;
const bw=PORT?540:960,bh=PORT?960:540;
const cw=PORT?720:1280,ch=PORT?1280:720;
let kp=Math.min(innerWidth*dpr/bw,innerHeight*dpr/bh);
if(kp>=1)kp=Math.floor(kp);
if(OPT.disp==="win"){
kp=Math.min(kp,dpr);
W=bw;H=bh;
}else{
W=Math.max(bw,Math.min(cw,Math.floor(innerWidth*dpr/kp)));
H=Math.max(bh,Math.min(ch,Math.floor(innerHeight*dpr/kp)));
}
let kf=Math.min(innerWidth/W,innerHeight/H);
if(OPT.disp==="win")kf=Math.min(kf,1);
k=kf;
S=kp;
cv.style.width=W*kf+"px";cv.style.height=H*kf+"px";
cv.style.imageRendering=Math.abs(kf*dpr-kp)<0.001?"pixelated":"auto";
cv.width=Math.max(1,Math.round(W*S));cv.height=Math.max(1,Math.round(H*S));
cx.imageSmoothingEnabled=false;
}
