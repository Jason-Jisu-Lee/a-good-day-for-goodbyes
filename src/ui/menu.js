function menuLayout(){
const port=H>W;
const mains=[hasSave()||G?"CONTINUE":"NEW GAME","SETTINGS","QUIT GAME"];
const bs=port?{ty:Math.round(H*0.229),ts:3,by:Math.round(H*0.448),bh:64,bsc:3,dy:Math.round(H*0.904)}:{ty:Math.round(H*0.278),ts:4,by:Math.round(H*0.519),bh:52,bsc:3,dy:Math.round(H*0.9)};
menuButtons=[];
for(let i=0;i<mains.length;i++){
const label=mains[i];
const w=tw3(label,bs.bsc)+56;const h=48;
menuButtons.push({id:label,label,x:W/2-w/2,y:bs.by+i*bs.bh-h/2+8,w,h,scale:bs.bsc,ty:bs.by+i*bs.bh});
}
const wl=tw3("WISHLIST",2),dc=tw3("DISCORD",2);
const g1=28+8+wl,g2=28+8+dc,total=g1+44+g2,x0=W/2-total/2;
menuButtons.push({id:"WISHLIST",label:"WISHLIST",x:x0-8,y:bs.dy-10,w:g1+16,h:44,scale:2,ic:"steam",ix:x0,iy:bs.dy,tx:x0+36,ty:bs.dy+9,dead:true});
menuButtons.push({id:"DISCORD",label:"DISCORD",x:x0+g1+44-8,y:bs.dy-10,w:g2+16,h:44,scale:2,ic:"discord",ix:x0+g1+44,iy:bs.dy,tx:x0+g1+44+36,ty:bs.dy+9,dead:true});
menuButtons.push({id:"MMUTE",x:W-40,y:8,w:32,h:32,mute:true});
return bs;
}
let vizLast=0;
function drawMenuViz(){
const now=performance.now();
const dt=vizLast?Math.min(0.1,(now-vizLast)/1000):0.016;
vizLast=now;
const n=64,sp=menuSpectrum(n,dt);
const hz=H-30,bw=W/n,maxH=42;
cx.save();
cx.scale(S,S);
cx.fillStyle=FG;
for(let i=0;i<n;i++){
const h=Math.max(1,sp[i]*maxH);
const x=i*bw+1,w=bw-2;
cx.globalAlpha=0.22*(1-fade);
cx.fillRect(x,hz-h,w,h);
const rh=h*0.4;
for(let yy=0;yy<rh;yy+=2){
cx.globalAlpha=0.1*(1-yy/rh)*(1-fade);
cx.fillRect(x,hz+3+yy,w,1);
}
}
cx.globalAlpha=0.14*(1-fade);
cx.fillRect(0,hz,W,1);
cx.restore();
cx.globalAlpha=1;
}
function drawMenu(){
const bs=menuLayout();
drawMenuViz();
cx.globalAlpha=1-fade;
text3("A GOOD DAY FOR GOODBYES",W/2,bs.ty,bs.ts,"c");
for(const b of menuButtons){
if(b.mute){
const col=hover===b.id?FG:MID;
noteIcon(W-34,12,22,col);
if(OPT.mute){
cx.save();
cx.scale(S,S);
cx.strokeStyle=col;
cx.lineWidth=2;
cx.beginPath();
cx.moveTo(W-38,36);
cx.lineTo(W-12,10);
cx.stroke();
cx.restore();
}
continue;
}
if(b.dead){
cx.globalAlpha=(hover===b.id?1:0.55)*(1-fade);
if(b.ic==="steam")steamIcon(b.ix,b.iy,14,FG);
else discordIcon(b.ix,b.iy,14,FG);
text3(b.label,b.tx,b.ty,2);
cx.globalAlpha=1-fade;
}else{
if(hover===b.id){px(b.x,b.y,b.w,b.h,FG);text3(b.label,W/2,b.ty,b.scale,"c",BG);}
else text3(b.label,W/2,b.ty,b.scale,"c");
}
}
cx.globalAlpha=1;
}
