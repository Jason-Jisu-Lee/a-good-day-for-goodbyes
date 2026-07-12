const DISP_NAME={win:"WINDOWED",bord:"BORDERLESS",full:"FULLSCREEN"};
function cycleDisp(){
const order=["win","bord","full"];
OPT.disp=order[(order.indexOf(OPT.disp)+1)%3];
if(OPT.disp==="full"){
if(document.fullscreenEnabled&&!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});
}else if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});
optSave();
fit();
}
document.addEventListener("fullscreenchange",()=>{
if(!document.fullscreenElement&&OPT.disp==="full"){OPT.disp="bord";optSave();}
fit();
});
