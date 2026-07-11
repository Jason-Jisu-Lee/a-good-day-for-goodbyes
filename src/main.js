addEventListener("resize",fit);
if(location.hash.includes("game")){fit();if(!load())newGame();mode="game";}
fit();
requestAnimationFrame(step);
