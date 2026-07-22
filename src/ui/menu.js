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
menuButtons.push({id:"WISHLIST",x:W-116,y:8,w:32,h:32,ic:"steam",ix:W-114,iy:12,dead:true});
menuButtons.push({id:"DISCORD",x:W-78,y:8,w:32,h:32,ic:"discord",ix:W-76,iy:12,dead:true});
menuButtons.push({id:"MMUTE",x:W-40,y:8,w:32,h:32,mute:true});
return bs;
}
let vizLast=0,vizW=0,vizBeatP=0,VB=[];
function vizBuild(){
VB=[];
vizW=W;
let x=4,i=0;
while(x<W-40){
const tall=i%5===2;
const w=24+((i*47)%30);
const h=tall?58+((i*31)%42):24+((i*31)%36);
VB.push({x,w,h,seed:i*13,ant:tall&&i%2?4+i%6:0,wl:[]});
x+=w+5;i++;
}
}
function drawMenuViz(){
if(vizW!==W)vizBuild();
const now=performance.now();
const dt=vizLast?Math.min(0.1,(now-vizLast)/1000):0.016;
vizLast=now;
const au=menuAudio(dt,now);
vizBeatP=Math.max(0,vizBeatP-dt*6);
if(au.beat)vizBeatP=1;
const hz=H-26,qa=au.quietK*(1-fade);
const surge=1+vizBeatP*0.7;
cx.save();
cx.scale(S,S);
cx.fillStyle=FG;
for(const b of VB){
cx.globalAlpha=0.09*qa;
cx.fillRect(b.x,hz-b.h,b.w,1);
cx.fillRect(b.x,hz-b.h,1,b.h);
cx.fillRect(b.x+b.w-1,hz-b.h,1,b.h);
if(b.ant){cx.globalAlpha=0.14*qa;cx.fillRect(b.x+(b.w>>1),hz-b.h-b.ant,1,b.ant);}
let wi=0;
for(let wy=hz-b.h+5;wy<hz-5;wy+=8)
for(let wx=b.x+4;wx<b.x+b.w-4;wx+=7){
const k=(b.seed+wi*7)%MZ_N;
if(b.wl[wi]===undefined)b.wl[wi]=0;
if(au.on.indexOf(k)>=0)b.wl[wi]=1;
b.wl[wi]*=Math.exp(-dt/0.55);
const r=((b.seed*31+wi*17)%97)/97;
const base=Math.min(1,Math.max(0,(au.phrase*0.5-r*0.45)*6))*0.3;
const snap=b.wl[wi]>0.7?1:b.wl[wi]*0.8;
const glow=Math.min(1,Math.max(snap,base)*surge)*qa;
if(glow>0.03){
cx.globalAlpha=glow;
cx.fillRect(wx,wy,3,4);
cx.globalAlpha=glow*0.2;
cx.fillRect(wx,hz+Math.round((hz-wy)*0.22),3,2);
}
wi++;
}
}
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
cx.globalAlpha=(hover===b.id?1:0.5)*(1-fade);
if(b.ic==="steam")steamIcon(b.ix,b.iy,12,FG);
else discordIcon(b.ix,b.iy,12,FG);
cx.globalAlpha=1-fade;
}else{
if(hover===b.id){px(b.x,b.y,b.w,b.h,FG);text3(b.label,W/2,b.ty,b.scale,"c",BG);}
else text3(b.label,W/2,b.ty,b.scale,"c");
}
}
cx.globalAlpha=1;
}
