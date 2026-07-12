const T_HOUSE=new Image();T_HOUSE.src="asset/tiles/ref_house150.png?v=2";
const T_APT=new Image();T_APT.src="asset/tiles/ref_apt155.png?v=2";
const T_TILE=new Image();T_TILE.src="asset/tiles/ref_tile155.png?v=2";
function diaDashFallback(x,y,col){
const d=DXY();
for(let i=0;i<=28;i++){
if(i%7>=4)continue;
const xx=i*d.hw/28,yy=i*d.hh/28;
px(x+xx,y-d.hh+yy,2,2,col);
px(x-xx-2,y-d.hh+yy,2,2,col);
px(x+xx,y+d.hh-yy-2,2,2,col);
px(x-xx-2,y+d.hh-yy-2,2,2,col);
}
}
function stampTile(x,y){
const l=L();
if(T_TILE.width){cx.globalCompositeOperation="lighter";blitS(T_TILE,x-71*l.sc,y-108*l.sc,155*l.sc,158*l.sc);cx.globalCompositeOperation="source-over";}
else diaDashFallback(x,y,FG);
}
function stampHouse(x,y){
const l=L();
if(T_HOUSE.width){cx.globalCompositeOperation="lighter";blitS(T_HOUSE,x-71*l.sc,y-77*l.sc,150*l.sc,128*l.sc);cx.globalCompositeOperation="source-over";return true;}
return false;
}
function stampApt(x,y){
const l=L();
if(T_APT.width){cx.globalCompositeOperation="lighter";blitS(T_APT,x-71*l.sc,y-108*l.sc,155*l.sc,158*l.sc);cx.globalCompositeOperation="source-over";return true;}
return false;
}
