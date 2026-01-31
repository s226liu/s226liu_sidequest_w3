let startButtons = [];

const enterStart = () => {
  clearUI();
  const title = createP("Signal in the Glade");
  title.parent(uiRoot);
  title.addClass("ui-title");
  addCaption(`Trust: ${trust}`);
  addCaption("A short tale about trust. Choose how to approach the beacon.");

  startButtons = [
    addButton("Begin the walk", () => setState("game")),
    addButton("Start with high trust", () => {
      trust = 70;
      setState("game");
    }, true),
  ];
};

const exitStart = () => {
  clearUI();
  startButtons = [];
};

const drawStart = () => {
  noStroke();
  fill(11, 95, 122, 30);
  ellipse(width * 0.2, height * 0.3, 220, 220);
  fill(196, 124, 52, 40);
  ellipse(width * 0.8, height * 0.6, 240, 240);

  fill(31, 26, 23);
  textSize(28);
  textAlign(LEFT, TOP);
  text("The beacon pulses in the fog.", 40, 40, width - 80, height - 80);

  textSize(16);
  text("Press space to begin.", 40, height - 60);
};

function keyPressed() {
  if (currentState === "start" && key === " ") {
    setState("game");
  }
}
