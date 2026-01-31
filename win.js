const enterWin = () => {
  clearUI();
  const title = createP("Reunion");
  title.parent(uiRoot);
  title.addClass("ui-title");
  addCaption(`Trust: ${trust}`);
  addCaption("Your trust unlocked the hidden camp. The crew steps out.");
  addButton("Play again", () => {
    trust = 50;
    setState("start");
  });
  addButton("Continue with new trust", () => setState("game"), true);
};

const drawWin = () => {
  background(255, 241, 201);
  noStroke();
  fill(11, 95, 122, 60);
  ellipse(width * 0.5, height * 0.5, 280, 280);
  fill(31, 26, 23);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("The signal welcomes you.", width / 2, height / 2);
};
