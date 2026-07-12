let fN=0;
function spawnFloat(x,y,txt){
fN++;
if(floats.length>40)floats.shift();
floats.push({x:x+(fN%3-1)*8,y,t:0,txt});
}
function updateFloats(dt){
for(const f of floats)f.t+=dt;
floats=floats.filter(f=>f.t<1.1);
}
function drawFloats(){
for(const f of floats){
const k=f.t/1.1;
cx.globalAlpha=1-k*k;
text7(f.txt,f.x,f.y-14*k,1,"c");
cx.globalAlpha=1;
}
}
