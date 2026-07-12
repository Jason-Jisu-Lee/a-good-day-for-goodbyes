function drawGame(){
uiButtons=[];
drawTiles();
drawSurvivors();
drawFloats();
drawHUD();
drawTopbar();
drawPanel();
}
function draw(){
px(0,0,W,H,BG);
if(mode==="menu")drawMenu();
else drawGame();
const fs=innerWidth>=screen.width-2&&innerHeight>=screen.height-2;
if(!fs)edgeR(0,0,W,H,"#1c1c1c");
}
let simLast=Date.now();
setInterval(()=>{
const now=Date.now();
const dt=Math.min(2,(now-simLast)/1000);
simLast=now;
if(mode==="game"&&G)sim(dt*ts);
},100);
setInterval(save,10000);
document.addEventListener("visibilitychange",()=>{if(document.hidden)save();});
let last=performance.now();
function step(t){
const dt=Math.min(100,t-last)/1000;last=t;
if(fading){fade=Math.min(1,fade+dt*3.5);if(fade>=1){fading=false;if(!G&&!load())newGame();mode="game";menuMusic(false);}}
if(mode==="game"&&G){
visual(dt);
updateFloats(dt);
hoverA+=((hoverTile?1:0)-hoverA)*Math.min(1,dt*10);
}
frames++;fpsT+=dt;if(fpsT>=1){fps=frames;frames=0;fpsT=0;}
if(!dbg.hidden){
let line="win "+innerWidth+"x"+innerHeight+" | dpr "+dpr+" | scr "+screen.width+"x"+screen.height+" | S "+S+" | k "+k.toFixed(2);
if(G)line+=" | fps "+fps+" | day "+G.day+" | food "+G.food.toFixed(1)+" | mats "+G.mats.toFixed(1)+" | pop "+G.survivors.length+" | x"+ts;
document.getElementById("dbgstat").textContent=line;
}
draw();
requestAnimationFrame(step);
}
