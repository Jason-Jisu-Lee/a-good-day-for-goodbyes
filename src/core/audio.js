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
menuAnalyser();
if(musicPending&&mode==="menu"){
musicPending=false;
const p=MUSIC.play();
if(p&&p.catch)p.catch(()=>{musicPending=true;});
}
}
let AAC=null,AN=null,ANF=null,synthT=0;
function menuAnalyser(){
if(AN||location.protocol==="file:"||!(window.AudioContext||window.webkitAudioContext))return;
try{
AAC=new (window.AudioContext||window.webkitAudioContext)();
AN=AAC.createAnalyser();
AN.fftSize=1024;
AN.smoothingTimeConstant=0.8;
AN.connect(AAC.destination);
const src=AAC.createMediaElementSource(MUSIC);
src.connect(AN);
ANF=new Uint8Array(AN.frequencyBinCount);
}catch(e){AN=null;}
}
function menuSpectrum(n,dt){
synthT+=dt;
const out=new Array(n);
let live=false;
if(AN&&!MUSIC.paused&&!OPT.mute){
if(AAC.state==="suspended")AAC.resume();
AN.getByteFrequencyData(ANF);
let sum=0;
for(let i=0;i<n;i++){
const bin=Math.floor(Math.pow(i/n,1.7)*(ANF.length*0.68))+2;
const v=ANF[bin]/255;
out[i]=v;
sum+=v;
}
if(sum>0.5)live=true;
}
if(!live){
for(let i=0;i<n;i++)out[i]=0.10+0.07*Math.sin(synthT*0.7+i*0.37)+0.04*Math.sin(synthT*1.31+i*1.13);
}
return out;
}
