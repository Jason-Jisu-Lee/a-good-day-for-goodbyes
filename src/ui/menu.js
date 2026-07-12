function menuLayout(){
const port=H>W;
const mains=[hasSave()||G?"CONTINUE":"NEW GAME","SETTINGS","QUIT GAME"];
const bs=port?{ty:220,ts:3,by:430,bh:64,bsc:3,dy:868}:{ty:150,ts:4,by:280,bh:52,bsc:3,dy:486};
menuButtons=[];
for(let i=0;i<mains.length;i++){
const label=mains[i];
const w=tw3(label,bs.bsc)+56;const h=48;
menuButtons.push({id:label,label,x:W/2-w/2,y:bs.by+i*bs.bh-h/2+8,w,h,scale:bs.bsc,ty:bs.by+i*bs.bh});
}
const wl=tw3("WISHLIST",2),dc=tw3("DISCORD",2);
const g1=28+8+wl,g2=28+8+dc,total=g1+44+g2,x0=W/2-total/2;
menuButtons.push({id:"WISHLIST",label:"WISHLIST",x:x0-8,y:bs.dy-10,w:g1+16,h:44,scale:2,icon:IC_STEAM,ix:x0,iy:bs.dy,tx:x0+36,ty:bs.dy+9,dead:true});
menuButtons.push({id:"DISCORD",label:"DISCORD",x:x0+g1+44-8,y:bs.dy-10,w:g2+16,h:44,scale:2,icon:IC_DISCORD,ix:x0+g1+44,iy:bs.dy,tx:x0+g1+44+36,ty:bs.dy+9,dead:true});
return bs;
}
function drawMenu(){
const bs=menuLayout();
cx.globalAlpha=1-fade;
text3("A GOOD DAY FOR GOODBYES",W/2,bs.ty,bs.ts,"c");
for(const b of menuButtons){
if(b.dead){
cx.globalAlpha=(hover===b.id?1:0.55)*(1-fade);
blit(b.icon,b.ix,b.iy,2);
text3(b.label,b.tx,b.ty,2);
cx.globalAlpha=1-fade;
}else{
if(hover===b.id){px(b.x,b.y,b.w,b.h,FG);text3(b.label,W/2,b.ty,b.scale,"c",BG);}
else text3(b.label,W/2,b.ty,b.scale,"c");
}
}
cx.globalAlpha=1;
}
