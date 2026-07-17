addEventListener("resize",fit);
if(location.hash.includes("game")){fit();if(!load())newGame();mode="game";resetCam();}
fit();
if(mode==="menu")menuMusic(true);
requestAnimationFrame(step);
