function sheetRows(rows){const c=mk(rows[0].length,rows.length);const g=c.getContext("2d");g.fillStyle=FG;for(let y=0;y<rows.length;y++)for(let x=0;x<rows[y].length;x++)if(rows[y][x]==="X")g.fillRect(x,y,1,1);return c;}
const DISCORD=["..............","..XX......XX..",".XXXXXXXXXXXX.",".XXXXXXXXXXXX.","XXXXXXXXXXXXXX","XXX..XXXX..XXX","XXX..XXXX..XXX","XXX..XXXX..XXX","XXXXXXXXXXXXXX","XXXXXXXXXXXXXX",".XXXXXXXXXXXX.","..XXX....XXX..","...X......X...",".............."];
function steamSheet(){const n=14,c=mk(n),g=c.getContext("2d");g.fillStyle=FG;
const on=(x,y)=>g.fillRect(x,y,1,1);
for(let y=0;y<n;y++)for(let x=0;x<n;x++){const dx=x-6.5,dy=y-6.5,d=Math.sqrt(dx*dx+dy*dy);if(d<=6.4&&d>=5.3){const ang=Math.atan2(dy,dx)*180/Math.PI;if(!(ang>108&&ang<168))on(x,y);}}
for(let y=0;y<n;y++)for(let x=0;x<n;x++){const dx=x-7.5,dy=y-5.6,d=Math.sqrt(dx*dx+dy*dy);if(d<=2.5&&d>=1.3)on(x,y);}
for(let t=0;t<=1;t+=0.05){const x=6.2-4.2*t,y=7.4+3.9*t;on(Math.round(x),Math.round(y));on(Math.round(x+1),Math.round(y));on(Math.round(x),Math.round(y+1));}
return c;}
const IC_DISCORD=sheetRows(DISCORD),IC_STEAM=steamSheet();
const NOTE=["......XXX.","......XXXX","......X..X","......X...","......X...","......X...","......X...","...XXXX...","..XXXXX...","..XXXXX...","...XXX...."];
const GEAR=["....XXX....",".X..XXX..X.",".XXXXXXXXX.","..XXXXXXX..","XXXX...XXXX","XXX.....XXX","XXXX...XXXX","..XXXXXXX..",".XXXXXXXXX.",".X..XXX..X.","....XXX...."];
const SPKR=["...X....X..","..XX..X..X.","XXXX...X..X","XXXX...X..X","XXXX...X..X","..XX..X..X.","...X....X.."];
function glyph(rows,x,y,n,col){
cx.fillStyle=col;
for(let r=0;r<rows.length;r++)for(let c=0;c<rows[r].length;c++)if(rows[r][c]==="X")px(x+c*n,y+r*n,n,n,col);
}
