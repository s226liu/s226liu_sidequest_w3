let choices = [];
let storyIndex = 0;

const roll = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const applyDelta = (value, delta) => {
  if (Array.isArray(delta)) return value + roll(delta[0], delta[1]);
  return value + delta;
};

const storyBeats = [
  {
    text: "A stranger appears by the fallen antenna.",
    options: [
      { label: "Offer your tools", trust: [3, 8], health: [1, 4], energy: [-8, -3] },
      { label: "Hold the tools back", trust: [-4, 1], health: [-1, 2], energy: [2, 6] },
      { label: "Ask them to fix it together", trust: [1, 5], health: [0, 3], energy: [-6, -2] },
    ],
  },
  {
    text: "The beacon hums. The forest listens.",
    options: [
      { label: "Ask about your crew", trust: [2, 6], health: [-4, -1], energy: [-5, -2] },
      { label: "Take the beacon and run", trust: [-6, -1], health: [-5, -1], energy: [-2, 1] },
    ],
  },
  {
    text: "A second signal echoes from deeper in the fog.",
    options: [
      { label: "Follow the echo", trust: [3, 7], health: [-8, -3], energy: [-6, -2] },
      { label: "Stay and secure the beacon", trust: [-2, 2], health: [2, 6], energy: [4, 8] },
    ],
  },
  {
    text: "You find a cache with a logbook and a locked case.",
    options: [
      { label: "Read the logbook together", trust: [4, 8], health: [-1, 2], energy: [-5, -2] },
      { label: "Pocket the key quietly", trust: [-4, -1], health: [1, 4], energy: [2, 6] },
      { label: "Leave the cache untouched", trust: [-1, 3], health: [0, 2], energy: [0, 4] },
    ],
  },
  {
    text: "The stranger asks for a final decision at the ridge.",
    options: [
      { label: "Share the map coordinates", trust: [5, 9], health: [-4, -1], energy: [-6, -3] },
      { label: "Erase the trail behind you", trust: [-3, 1], health: [2, 6], energy: [3, 7] },
      { label: "Split up and compare routes", trust: [0, 4], health: [-2, 2], energy: [-2, 2] },
    ],
  },
  {
    text: "The path narrows. The fog drains your strength.",
    options: [
      { label: "Push forward together", trust: [4, 7], health: [-10, -5], energy: [-8, -4] },
      { label: "Rest and make a plan", trust: [0, 3], health: [4, 8], energy: [6, 10] },
    ],
  },
  {
    text: "A final broadcast requests a response code.",
    options: [
      { label: "Share the code", trust: [4, 8], health: [-3, 0], energy: [-6, -2] },
      { label: "Jam the signal", trust: [-5, -2], health: [-2, 1], energy: [-3, 0] },
      { label: "Send a partial reply", trust: [1, 5], health: [-1, 1], energy: [-2, -1] },
    ],
  },
];

const enterGame = () => {
  clearUI();
  storyIndex = 0;
  trust = clampTrust(trust);
  health = clampStat(health);
  energy = clampStat(energy);
  renderGameUI();
};

const exitGame = () => {
  clearUI();
  choices = [];
};

const renderGameUI = () => {
  clearUI();
  addCaption(`Trust: ${trust}  |  Health: ${health}  |  Energy: ${energy}`);

  const beat = storyBeats[storyIndex];
  if (!beat) return;

  const line = createP(beat.text);
  line.parent(uiRoot);
  line.addClass("ui-caption");

  choices = beat.options.map((option) =>
    addButton(option.label, () => {
      trust = clampTrust(applyDelta(trust, option.trust));
      health = clampStat(applyDelta(health, option.health));
      energy = clampStat(applyDelta(energy, option.energy));
      storyIndex += 1;
      if (storyIndex >= storyBeats.length) {
        const survived = health > 0 && energy > 0;
        const earnedTrust = trust >= 60;
        setState(survived && earnedTrust ? "win" : "lose");
      } else {
        renderGameUI();
      }
    }, option.trust < 0)
  );
};

const drawGame = () => {
  noStroke();
  fill(11, 95, 122, 18);
  rect(30, 30, width - 60, height - 60, 24);
  fill(31, 26, 23);
  textAlign(LEFT, TOP);
  textSize(22);
  text("The Signal in the Glade", 50, 50);

  textSize(16);
  text(`Beat ${storyIndex + 1} of ${storyBeats.length}`, 50, 88);

  const beat = storyBeats[storyIndex];
  const storyText = beat ? beat.text : "The story concludes.";
  textSize(20);
  text(storyText, 50, 130, width - 100, height - 220);

  textSize(16);
  text(`Trust: ${trust}`, 50, height - 90);
  text(`Health: ${health}`, 200, height - 90);
  text(`Energy: ${energy}`, 360, height - 90);
};
