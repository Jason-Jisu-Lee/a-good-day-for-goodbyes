const dbg=document.createElement("div");
dbg.id="dbg";
dbg.hidden=true;
dbg.style.cssText="position:fixed;top:6px;left:6px;background:#111;border:1px solid #444;color:#ddd;font:11px monospace;padding:8px;z-index:9;user-select:none";
dbg.innerHTML='<div id="dbgstat"></div><div style="margin-top:6px"><button data-a="food">+25 FOOD</button> <button data-a="mats">+25 MATS</button></div><div style="margin-top:6px">SPEED <button data-a="x1">X1</button> <button data-a="x5">X5</button> <button data-a="x20">X20</button></div><div style="margin-top:6px"><button data-a="save">SAVE</button> <button data-a="wipe">WIPE</button></div>';
document.body.appendChild(dbg);
dbg.addEventListener("click",e=>{
const a=e.target.dataset&&e.target.dataset.a;
if(!a||!G)return;
if(a==="food")G.food+=25;
if(a==="mats")G.mats+=25;
if(a==="x1")ts=1;
if(a==="x5")ts=5;
if(a==="x20")ts=20;
if(a==="save")save();
if(a==="wipe")wipe();
});
function toggleDbg(){dbg.hidden=!dbg.hidden;if(dbg.hidden)ts=1;}
if(location.hash.includes("debug"))dbg.hidden=false;

const szb=document.createElement("button");
szb.textContent="VIEW: DESKTOP";
szb.style.cssText="position:fixed;top:6px;right:70px;background:#111;border:1px solid #333;color:#888;font:11px monospace;padding:5px 9px;z-index:9;cursor:pointer";
document.body.appendChild(szb);
szb.addEventListener("click",()=>{viewItch=!viewItch;szb.textContent=viewItch?"VIEW: ITCH 960":"VIEW: DESKTOP";fit();});
const rsb=document.createElement("button");
rsb.textContent="RESET";
rsb.style.cssText="position:fixed;top:6px;right:6px;background:#111;border:1px solid #333;color:#888;font:11px monospace;padding:5px 9px;z-index:9;cursor:pointer";
document.body.appendChild(rsb);
rsb.addEventListener("click",()=>{wipe();});
