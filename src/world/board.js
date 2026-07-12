function L(){
if(PORT)return {ox:270,oy:100,sc:0.5,pnX:45,pnY:470,pnW:450,pnH:300,hud:20};
return {ox:480,oy:120,sc:1,pnX:756,pnY:60,pnW:188,pnH:392,hud:12};
}
function DXY(){const l=L();return {dx:96*l.sc,dy:60*l.sc,hw:66*l.sc,hh:42*l.sc};}
function tpos(t){const l=L(),d=DXY();return {x:l.ox+(t.gx-t.gy)*d.dx,y:l.oy+(t.gx+t.gy)*d.dy};}
function tAt(gx,gy){return gx>=0&&gx<4&&gy>=0&&gy<4?G.tiles[gy*4+gx]:null;}
function isOrigin(t){return t.gx>=1&&t.gx<=2&&t.gy>=1&&t.gy<=2;}
function revealedT(t){return t.state==="scouted"||t.state==="owned";}
function ownedAdjacent(t){for(const o of G.tiles){if(o.state!=="owned")continue;if(Math.abs(o.gx-t.gx)+Math.abs(o.gy-t.gy)===1)return true;}return false;}
function adjRevealed(t){for(const o of G.tiles){if(!revealedT(o))continue;if(Math.abs(o.gx-t.gx)+Math.abs(o.gy-t.gy)===1)return true;}return false;}
function drawnTile(t){return revealedT(t)||isOrigin(t)||(G.opened&&adjRevealed(t));}
function visibleTile(t){return drawnTile(t);}
function tileAt(mx,my){
const d=DXY();
for(const t of G.tiles){
const p=tpos(t);
const m=Math.abs(mx-p.x)/d.hw+Math.abs(my-p.y)/d.hh;
if(m<=1)return visibleTile(t)?t:null;
}
return null;
}
