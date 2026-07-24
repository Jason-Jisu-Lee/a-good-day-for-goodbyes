const T_HOUSE=new Image();T_HOUSE.src="asset/tiles/smooth_house_only.png?v=2";
const T_APT=new Image();T_APT.src="asset/tiles/smooth_apt_only.png?v=2";
const T_TILE=new Image();T_TILE.src="asset/tiles/smooth_tile.png?v=2";
const T_LAMP=new Image();T_LAMP.src="asset/tiles/streetlamp.png?v=2";
const T_LH=new Image();T_LH.src="asset/tiles/lighthouse_only.png?v=1";
const T_MAT=new Image();T_MAT.src="asset/tiles/material.png?v=3";
const PROP_ART={light:{img:T_LAMP,w:60},light2:{img:T_LH,w:64},scrap:{img:T_MAT,w:66}};
function stampProp(img,x,y,w){
const l=L();
const h=w*img.height/img.width;
smoothBlit(img,x-w/2*l.sc,y+(19-h)*l.sc,w*l.sc,h*l.sc);
}
function smoothBlit(img,x,y,w,h){
cx.save();
cx.scale(S,S);
cx.imageSmoothingEnabled=true;
cx.imageSmoothingQuality="high";
cx.drawImage(img,x,y,w,h);
cx.restore();
}
function diaDashFallback(x,y,col){
const d=DXY();
for(let i=0;i<=28;i++){
if(i%7>=4)continue;
const xx=i*d.hw/28,yy=i*d.hh/28;
px(x+xx,y-d.hh+yy,1,1,col);
px(x-xx-1,y-d.hh+yy,1,1,col);
px(x+xx,y+d.hh-yy-1,1,1,col);
px(x-xx-1,y+d.hh-yy-1,1,1,col);
}
}
let T_TILE_RED=null;
function tileRed(){
if(T_TILE_RED)return T_TILE_RED;
if(!T_TILE.width)return null;
const c=mk(T_TILE.width,T_TILE.height);
const g=c.getContext("2d");
g.drawImage(T_TILE,0,0);
g.globalCompositeOperation="source-in";
g.fillStyle=DANGER;
g.fillRect(0,0,c.width,c.height);
T_TILE_RED=c;
return c;
}
function floorFill(x,y){
const l=L(),fy=y+3*l.sc,hw=31.5*l.sc,hh=15.5*l.sc;
cx.save();
cx.scale(S,S);
cx.beginPath();
cx.moveTo(x,fy-hh);
cx.lineTo(x+hw,fy);
cx.lineTo(x,fy+hh);
cx.lineTo(x-hw,fy);
cx.closePath();
cx.fillStyle="#20201e";
cx.fill();
cx.restore();
}
function stampTile(x,y,danger){
const l=L();
if(T_TILE.width){
const img=danger?tileRed():T_TILE;
smoothBlit(img,x-36.5*l.sc,y-16.5*l.sc,73*l.sc,39*l.sc);
}
else diaDashFallback(x,y,danger?DANGER:FG);
}
function stampHouse(x,y){
const l=L();
if(T_HOUSE.width){smoothBlit(T_HOUSE,x-27.35*l.sc,y-29.3*l.sc,55.2*l.sc,46.4*l.sc);return true;}
return false;
}
function stampApt(x,y){
const l=L();
if(T_APT.width){smoothBlit(T_APT,x-27.35*l.sc,y-34.5*l.sc,55.2*l.sc,51.6*l.sc);return true;}
return false;
}
