const MUSIC=new Audio("asset/soundtrack/main_screen.mp3?v=1");
MUSIC.loop=true;
let musicPending=false;
function musicVol(){
MUSIC.volume=OPT.mute?0:Math.min(1,Math.pow(OPT.volM,1.6));
}
function menuMusic(on){
musicVol();
if(on){
const p=MUSIC.play();
if(p&&p.catch)p.catch(()=>{musicPending=true;});
}else{
MUSIC.pause();
MUSIC.currentTime=0;
musicPending=false;
}
}
function musicGesture(){
if(musicPending&&mode==="menu"){
musicPending=false;
const p=MUSIC.play();
if(p&&p.catch)p.catch(()=>{musicPending=true;});
}
}
