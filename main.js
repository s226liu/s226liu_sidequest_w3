let currentState = "start";
let trust = 50;
let uiRoot;

const TRUST_MIN = 0;
const TRUST_MAX = 100;

const clampTrust = (value) => Math.min(TRUST_MAX, Math.max(TRUST_MIN, value));

const setState = (nextState) => {
  if (currentState === nextState) return;
  if (currentState === "start" && typeof exitStart === "function") exitStart();
  if (currentState === "game" && typeof exitGame === "function") exitGame();
  if (currentState === "win" && typeof exitWin === "function") exitWin();
  if (currentState === "lose" && typeof exitLose === "function") exitLose();

  currentState = nextState;

  if (currentState === "start" && typeof enterStart === "function") enterStart();
  if (currentState === "game" && typeof enterGame === "function") enterGame();
  if (currentState === "win" && typeof enterWin === "function") enterWin();
  if (currentState === "lose" && typeof enterLose === "function") enterLose();
};

const clearUI = () => {
  if (!uiRoot) return;
  uiRoot.html("");
};

const addButton = (label, onClick, isSecondary = false) => {
  const button = createButton(label);
  button.parent(uiRoot);
  button.addClass("ui-button");
  if (isSecondary) button.addClass("secondary");
  button.mousePressed(onClick);
  return button;
};

const addCaption = (text) => {
  const caption = createP(text);
  caption.parent(uiRoot);
  caption.addClass("ui-caption");
  return caption;
};

function setup() {
  const app = select("#app");
  const canvas = createCanvas(820, 460);
  canvas.parent(app);
  uiRoot = createDiv("");
  uiRoot.id("ui");
  uiRoot.parent(app);
  textFont("Spectral");
  setState("start");
}

function draw() {
  background(230, 222, 209);
  if (currentState === "start" && typeof drawStart === "function") drawStart();
  if (currentState === "game" && typeof drawGame === "function") drawGame();
  if (currentState === "win" && typeof drawWin === "function") drawWin();
  if (currentState === "lose" && typeof drawLose === "function") drawLose();
}

function windowResized() {
  const width = Math.min(820, windowWidth - 40);
  const height = Math.min(460, Math.round(width * 0.56));
  resizeCanvas(width, height);
}
