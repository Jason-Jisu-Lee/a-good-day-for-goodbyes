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
W=PORT?540:960;H=PORT?960:540;
k=Math.min(innerWidth/W,innerHeight/H);
if(viewItch)k=Math.min(k,1);
S=k*dpr;
cv.style.width=W*k+"px";cv.style.height=H*k+"px";
cv.width=Math.max(1,Math.round(W*S));cv.height=Math.max(1,Math.round(H*S));
cx.imageSmoothingEnabled=false;
}
