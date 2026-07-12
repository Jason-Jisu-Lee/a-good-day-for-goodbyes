const T_HOUSE=new Image();T_HOUSE.src="asset/tiles/ref_house75.png?v=1";
const T_APT=new Image();T_APT.src="asset/tiles/ref_apt77.png?v=1";
const T_TILE=new Image();T_TILE.src="asset/tiles/ref_tile77.png?v=1";
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
function stampTile(x,y){
const l=L();
if(T_TILE.width){cx.globalCompositeOperation="lighter";blitS(T_TILE,x-35*l.sc,y-53*l.sc,77*l.sc,78*l.sc);cx.globalCompositeOperation="source-over";}
else diaDashFallback(x,y,FG);
}
function stampHouse(x,y){
const l=L();
if(T_HOUSE.width){cx.globalCompositeOperation="lighter";blitS(T_HOUSE,x-35*l.sc,y-38*l.sc,75*l.sc,63*l.sc);cx.globalCompositeOperation="source-over";return true;}
return false;
}
function stampApt(x,y){
const l=L();
if(T_APT.width){cx.globalCompositeOperation="lighter";blitS(T_APT,x-35*l.sc,y-53*l.sc,77*l.sc,78*l.sc);cx.globalCompositeOperation="source-over";return true;}
return false;
}
