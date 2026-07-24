const FG="#f2f2f0",BG="#000000",DIM="#333333",MID="#777777",DANGER="#c8493f";
let mode="menu",fade=0,fading=false,hover=null,menuButtons=[];
let G=null,sel=null,picker=null,uiButtons=[],hoverTile=null,hoverA=0,ts=1,fps=0,frames=0,fpsT=0;
let saveGag=false,openPanel=null,volDrag=null,abandonArm=false,floats=[],overT=-1;
let dragS=null,dragPt=null,dragT=null,hoverSurv=null,hoverSurvA=0,hoverSurvLast=null;
