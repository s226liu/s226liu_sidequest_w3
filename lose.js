const enterLose = () => {
  clearUI();
  const title = createP("Silence");
  title.parent(uiRoot);
  title.addClass("ui-title");
  addCaption("The beacon fades. The forest keeps its secrets.");
  addButton("Try again", () => {
    trust = 50;
    setState("start");
  });
  addButton("Re-enter with low trust", () => {
    trust = 30;
    setState("game");
  }, true);
};

const drawLose = () => {
  background(214, 206, 196);
  noStroke();
  fill(31, 26, 23, 40);
  rect(width * 0.2, height * 0.25, width * 0.6, height * 0.5, 20);
  fill(31, 26, 23);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Only static answers.", width / 2, height / 2);
};
