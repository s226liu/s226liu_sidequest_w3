const TRUST_KEY = "signal-trust";
const TRUST_START = 50;
const TRUST_MIN = 0;
const TRUST_MAX = 100;

const clamp = (value) => Math.min(TRUST_MAX, Math.max(TRUST_MIN, value));

const getTrust = () => {
  const stored = Number(localStorage.getItem(TRUST_KEY));
  if (Number.isNaN(stored)) {
    localStorage.setItem(TRUST_KEY, String(TRUST_START));
    return TRUST_START;
  }
  return clamp(stored || TRUST_START);
};

const setTrust = (value) => {
  const next = clamp(value);
  localStorage.setItem(TRUST_KEY, String(next));
  return next;
};

const renderStats = () => {
  const statNodes = document.querySelectorAll("[data-stat='trust']");
  const value = getTrust();
  statNodes.forEach((node) => {
    node.textContent = value;
  });
};

const bindChoices = () => {
  const buttons = document.querySelectorAll(".choice");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const delta = Number(button.dataset.delta || 0);
      setTrust(getTrust() + delta);
      const next = button.dataset.next;
      if (next) {
        window.location.href = next;
      }
    });
  });
};

const bindReset = () => {
  const resetButtons = document.querySelectorAll("[data-reset]");
  resetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem(TRUST_KEY, String(TRUST_START));
      window.location.href = "index.html";
    });
  });
};

const bindEndingGate = () => {
  const gate = document.querySelector("[data-ending]");
  if (!gate) return;
  const trust = getTrust();
  const min = Number(gate.dataset.min || TRUST_MIN);
  const max = Number(gate.dataset.max || TRUST_MAX);
  const good = gate.dataset.good;
  const bad = gate.dataset.bad;
  if (trust >= min && trust <= max) {
    if (good) window.location.href = good;
  } else {
    if (bad) window.location.href = bad;
  }
};

renderStats();
bindChoices();
bindReset();
bindEndingGate();
