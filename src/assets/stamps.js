const T_HOUSE=new Image();T_HOUSE.src="asset/tiles/smooth_house.png?v=2";
const T_APT=new Image();T_APT.src="asset/tiles/smooth_apt.png?v=2";
const T_TILE=new Image();T_TILE.src="asset/tiles/smooth_tile.png?v=2";
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
if(T_HOUSE.width){smoothBlit(T_HOUSE,x-34.25*l.sc,y-36.5*l.sc,69*l.sc,58*l.sc);return true;}
return false;
}
function stampApt(x,y){
const l=L();
if(T_APT.width){smoothBlit(T_APT,x-34.25*l.sc,y-43*l.sc,69*l.sc,64.5*l.sc);return true;}
return false;
}
