let choices = [];
let storyIndex = 0;

const storyBeats = [
  {
    text: "A stranger appears by the fallen antenna.",
    options: [
      { label: "Offer your tools", delta: 10 },
      { label: "Hold the tools back", delta: -8 },
    ],
  },
  {
    text: "The beacon hums. The forest listens.",
    options: [
      { label: "Ask about your crew", delta: 8 },
      { label: "Take the beacon and run", delta: -10 },
    ],
  },
  {
    text: "A second signal echoes from deeper in the fog.",
    options: [
      { label: "Follow the echo", delta: 6 },
      { label: "Stay and secure the beacon", delta: -4 },
    ],
  },
  {
    text: "You find a cache with a logbook and a locked case.",
    options: [
      { label: "Read the logbook together", delta: 7 },
      { label: "Pocket the key quietly", delta: -6 },
    ],
  },
  {
    text: "The stranger asks for a final decision at the ridge.",
    options: [
      { label: "Share the map coordinates", delta: 9 },
      { label: "Erase the trail behind you", delta: -8 },
    ],
  },
];

const enterGame = () => {
  clearUI();
  storyIndex = 0;
  trust = clampTrust(trust);
  renderGameUI();
};

const exitGame = () => {
  clearUI();
  choices = [];
};

const renderGameUI = () => {
  clearUI();
  addCaption(`Trust: ${trust}`);

  const beat = storyBeats[storyIndex];
  if (!beat) return;

  const line = createP(beat.text);
  line.parent(uiRoot);
  line.addClass("ui-caption");

  choices = beat.options.map((option) =>
    addButton(option.label, () => {
      trust = clampTrust(trust + option.delta);
      storyIndex += 1;
      if (storyIndex >= storyBeats.length) {
        setState(trust >= 60 ? "win" : "lose");
      } else {
        renderGameUI();
      }
    }, option.delta < 0)
  );
};

const drawGame = () => {
  noStroke();
  fill(11, 95, 122, 25);
  rect(30, 30, width - 60, height - 60, 24);
  fill(31, 26, 23);
  textSize(20);
  textAlign(LEFT, TOP);
  text("The fog shifts with every choice.", 50, 50, width - 100, height - 100);
};
