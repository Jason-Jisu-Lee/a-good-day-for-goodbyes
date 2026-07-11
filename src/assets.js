function sheetRows(rows){const c=mk(rows[0].length,rows.length);const g=c.getContext("2d");g.fillStyle=FG;for(let y=0;y<rows.length;y++)for(let x=0;x<rows[y].length;x++)if(rows[y][x]==="X")g.fillRect(x,y,1,1);return c;}
const DISCORD=["..............","..XX......XX..",".XXXXXXXXXXXX.",".XXXXXXXXXXXX.","XXXXXXXXXXXXXX","XXX..XXXX..XXX","XXX..XXXX..XXX","XXX..XXXX..XXX","XXXXXXXXXXXXXX","XXXXXXXXXXXXXX",".XXXXXXXXXXXX.","..XXX....XXX..","...X......X...",".............."];
function steamSheet(){const n=14,c=mk(n),g=c.getContext("2d");g.fillStyle=FG;
const on=(x,y)=>g.fillRect(x,y,1,1);
for(let y=0;y<n;y++)for(let x=0;x<n;x++){const dx=x-6.5,dy=y-6.5,d=Math.sqrt(dx*dx+dy*dy);if(d<=6.4&&d>=5.3){const ang=Math.atan2(dy,dx)*180/Math.PI;if(!(ang>108&&ang<168))on(x,y);}}
for(let y=0;y<n;y++)for(let x=0;x<n;x++){const dx=x-7.5,dy=y-5.6,d=Math.sqrt(dx*dx+dy*dy);if(d<=2.5&&d>=1.3)on(x,y);}
for(let t=0;t<=1;t+=0.05){const x=6.2-4.2*t,y=7.4+3.9*t;on(Math.round(x),Math.round(y));on(Math.round(x+1),Math.round(y));on(Math.round(x),Math.round(y+1));}
return c;}
const IC_DISCORD=sheetRows(DISCORD),IC_STEAM=steamSheet();

const RING=(()=>{const c=mk(15),g=c.getContext("2d");g.fillStyle=FG;for(let y=0;y<15;y++)for(let x=0;x<15;x++){const d=Math.hypot(x-7,y-7);if(d<=7.2&&d>=4.6)g.fillRect(x,y,1,1);}return c;})();
const RING_D=(()=>{const c=mk(15),g=c.getContext("2d");g.fillStyle=MID;for(let y=0;y<15;y++)for(let x=0;x<15;x++){const d=Math.hypot(x-7,y-7);if(d<=7.2&&d>=4.6)g.fillRect(x,y,1,1);}return c;})();

const T_HOUSE=new Image();T_HOUSE.src="asset/tiles/ref_house150.png?v=1";
const T_APT=new Image();T_APT.src="asset/tiles/ref_apt155.png?v=1";
const T_TILE=new Image();T_TILE.src="asset/tiles/ref_tile155.png?v=1";

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
