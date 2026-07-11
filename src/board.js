function L(){
if(PORT)return {ox:270,oy:100,sc:0.5,pnX:45,pnY:470,pnW:450,pnH:300,hud:20};
return {ox:480,oy:120,sc:1,pnX:756,pnY:60,pnW:188,pnH:392,hud:12};
}
function DXY(){const l=L();return {dx:96*l.sc,dy:60*l.sc,hw:66*l.sc,hh:42*l.sc};}
function tpos(t){const l=L(),d=DXY();return {x:l.ox+(t.gx-t.gy)*d.dx,y:l.oy+(t.gx+t.gy)*d.dy};}
function tAt(gx,gy){return gx>=0&&gx<4&&gy>=0&&gy<4?G.tiles[gy*4+gx]:null;}
function ownedAdjacent(t){for(const o of G.tiles){if(o.state!=="owned")continue;if(Math.abs(o.gx-t.gx)+Math.abs(o.gy-t.gy)===1)return true;}return false;}
function visibleTile(t){return t.state!=="unknown"||ownedAdjacent(t);}
function drawnTile(t){return t.state!=="unknown"||(t.gx>=1&&t.gx<=2&&t.gy>=1&&t.gy<=2);}
function tileAt(mx,my){
const d=DXY();
for(const t of G.tiles){
const p=tpos(t);
const m=Math.abs(mx-p.x)/d.hw+Math.abs(my-p.y)/d.hh;
if(m<=1)return visibleTile(t)?t:null;
}
return null;
}
function ringUnder(p,col){
const l=L(),d=DXY();
const hw=d.hw+6*l.sc,hh=d.hh+4*l.sc;
for(let i=0;i<=hw;i++){
const yy=hh-i*hh/hw;
px(p.x+i,p.y-yy,1,1,col);
px(p.x-i,p.y-yy,1,1,col);
px(p.x+i,p.y+yy,1,1,col);
px(p.x-i,p.y+yy,1,1,col);
}
}
