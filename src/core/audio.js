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
AN.smoothingTimeConstant=0.35;
AN.connect(AAC.destination);
const src=AAC.createMediaElementSource(MUSIC);
src.connect(AN);
ANF=new Uint8Array(AN.frequencyBinCount);
}catch(e){AN=null;}
}
const MZ_N=24;
const mzPrev=new Float32Array(MZ_N),mzThr=new Float32Array(MZ_N).fill(0.02),mzCool=new Float32Array(MZ_N),mzHist=new Float32Array(50);
let mzHI=0,mzGm=0.2,mzLastBeat=0,mzQuietT=0,mzTok=6,mzPhr=0;
function menuAudio(dt,tms){
const out={on:[],beat:0,quietK:1,phrase:0};
let live=false,lvl=0;
for(let i=0;i<MZ_N;i++)mzCool[i]=Math.max(0,mzCool[i]-dt);
mzTok=Math.min(6,mzTok+dt*10);
if(AN&&!MUSIC.paused&&!OPT.mute){
if(AAC.state==="suspended")AAC.resume();
AN.getByteFrequencyData(ANF);
let s=0;for(let i=0;i<300;i++)s+=ANF[i];
const raw=s/300/255;
if(raw>0.008)live=true;
mzGm=Math.max(mzGm*0.996,raw);
const ag=0.9/Math.max(0.12,mzGm);
lvl=Math.min(1,raw*ag);
let fl=0;
for(let i=0;i<MZ_N;i++){
const bin=2+Math.floor(Math.pow(i/MZ_N,1.35)*138);
const v=Math.min(1,Math.max(0,(ANF[bin]/255-0.04)*1.1)*ag);
const f=Math.max(0,v-mzPrev[i]);
mzPrev[i]=v;
if(i<6)fl+=f;
if(f>Math.max(0.035,mzThr[i]*2.2)&&mzCool[i]<=0&&mzTok>=1){
out.on.push(i);
mzCool[i]=0.18;
mzTok-=1;
}
mzThr[i]=mzThr[i]*0.97+f*0.03;
}
fl/=6;
mzHist[mzHI]=fl;mzHI=(mzHI+1)%50;
let m=0;for(let i=0;i<50;i++)m+=mzHist[i];
m/=50;
let sd=0;for(let i=0;i<50;i++)sd+=(mzHist[i]-m)*(mzHist[i]-m);
sd=Math.sqrt(sd/50);
if(fl>m+sd*1.7+0.012&&tms-mzLastBeat>200){mzLastBeat=tms;out.beat=1;}
}
if(!live){
synthT+=dt;
const q=(synthT%17)>14;
lvl=q?0.02:0.35+0.2*Math.sin(synthT*0.5);
if(!q){
if(Math.random()<dt*3.5&&mzTok>=1){out.on.push(Math.floor(Math.random()*MZ_N));mzTok-=1;}
if(synthT*1000-mzLastBeat>950){mzLastBeat=synthT*1000;out.beat=1;}
}
}
if(lvl<0.05)mzQuietT+=dt;else mzQuietT=0;
out.quietK=Math.max(0,1-Math.max(0,mzQuietT-0.25)*2.5);
mzPhr=Math.max(lvl,mzPhr*Math.exp(-dt/1.2));
out.phrase=mzPhr;
return out;
}
