/* ============================================================
   ATLASLIVE — Flag → Capital
   Host-controlled, single-device, TikTok Mobile Gaming LIVE mode.
   No comment-reading automation: the host reads TikTok's native
   comment overlay and manually awards the winner in this app.
   ============================================================ */

const STORAGE_KEY = "atlaslive_total_scores_v1";

let state = {
  tier: "explorer",
  mode: "test",           // "test" | "live"
  currentCountry: null,
  hintsUsed: 0,
  hintsAvailable: 2,
  pointsRemaining: 20,
  timerSeconds: 30,
  timerHandle: null,
  usedThisSession: new Set(),
  roundBoard: [],          // [{name, points}] — resets on page reload
  giftBoostUsed: false,
};

/* ---------- persistence (all-time total board) ---------- */
function loadTotals() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}
function saveTotals(totals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(totals));
}
function addToTotal(name, points) {
  const totals = loadTotals();
  totals[name] = (totals[name] || 0) + points;
  saveTotals(totals);
}

/* ---------- setup screen ---------- */
const tierGrid = document.getElementById("tierGrid");
Object.entries(TIER_INFO).forEach(([key, info]) => {
  const btn = document.createElement("div");
  btn.className = "tier-btn" + (key === state.tier ? " active" : "");
  btn.dataset.tier = key;
  btn.innerHTML = `<span class="tname">${info.label}</span><span class="tpts">${info.points} pts</span>`;
  btn.addEventListener("click", () => {
    state.tier = key;
    [...tierGrid.children].forEach(c => c.classList.toggle("active", c.dataset.tier === key));
  });
  tierGrid.appendChild(btn);
});

document.getElementById("btnTest").addEventListener("click", () => setMode("test"));
document.getElementById("btnLive").addEventListener("click", () => setMode("live"));

function setMode(mode) {
  state.mode = mode;
  document.getElementById("btnTest").classList.toggle("active", mode === "test");
  document.getElementById("btnLive").classList.toggle("active", mode === "live");
  const pill = document.getElementById("modePill");
  const label = document.getElementById("modeLabel");
  pill.className = "mode-pill " + mode;
  label.textContent = mode === "live" ? "Live" : "Test Mode";
}

document.getElementById("startBtn").addEventListener("click", startRound);

/* ---------- round flow ---------- */
function pickCountry() {
  const pool = COUNTRY_DATA.filter(c => c.tier === state.tier && !state.usedThisSession.has(c.name));
  const source = pool.length ? pool : COUNTRY_DATA.filter(c => c.tier === state.tier);
  const pick = source[Math.floor(Math.random() * source.length)];
  state.usedThisSession.add(pick.name);
  return pick;
}

function startRound() {
  const info = TIER_INFO[state.tier];
  state.currentCountry = pickCountry();
  state.hintsUsed = 0;
  state.hintsAvailable = info.hints;
  state.pointsRemaining = info.points;
  state.giftBoostUsed = false;
  state.timerSeconds = 30;

  document.getElementById("setupScreen").classList.add("hidden");
  document.getElementById("roundScreen").classList.remove("hidden");
  document.getElementById("flagDisplay").textContent = state.currentCountry.flag;
  document.getElementById("roundTierLabel").textContent = `${info.label.toUpperCase()} · ${info.points} PTS`;
  document.getElementById("hintDisplay").textContent = "";
  document.getElementById("answerReveal").classList.add("hidden");
  document.getElementById("winnerName").value = "";
  document.getElementById("giftBoost").classList.add("hidden");
  updateHintsLeftLabel();
  buildHintButtons();
  startTimer();
}

function updateHintsLeftLabel() {
  const left = state.hintsAvailable - state.hintsUsed;
  document.getElementById("hintsLeftLabel").textContent =
    left > 0 ? `${left} hint${left === 1 ? "" : "s"} available` : "No hints left";
}

function buildHintButtons() {
  const row = document.getElementById("hintRow");
  row.innerHTML = "";
  const labels = ["Continent", "First letter", "Letter count"];
  for (let i = 0; i < state.hintsAvailable; i++) {
    const b = document.createElement("button");
    b.className = "hint-btn";
    b.textContent = labels[i] || `Hint ${i + 1}`;
    b.dataset.index = i;
    b.addEventListener("click", () => useHint(i, b));
    row.appendChild(b);
  }
}

function useHint(index, btnEl) {
  if (btnEl.disabled) return;
  btnEl.disabled = true;
  state.hintsUsed++;
  state.pointsRemaining = Math.max(5, state.pointsRemaining - 5);
  updateHintsLeftLabel();

  const c = state.currentCountry;
  const display = document.getElementById("hintDisplay");
  const texts = [
    `Continent: ${c.continent}`,
    `The capital starts with "${c.capital[0]}"`,
    `The capital name has ${c.capital.replace(/\s/g, "").length} letters`,
  ];
  display.textContent = texts[index] || `Hint: ${c.capital[0]}...`;

  // Randomly (deterministically per round) offer a gift boost after the first hint,
  // giving the host a natural moment to acknowledge a gift without automation.
  if (index === 0 && !state.giftBoostUsed) {
    document.getElementById("giftBoost").classList.remove("hidden");
  }
}

document.getElementById("giftBoostBtn").addEventListener("click", () => {
  if (state.giftBoostUsed) return;
  state.giftBoostUsed = true;
  const c = state.currentCountry;
  document.getElementById("hintDisplay").textContent =
    `Bonus reveal for everyone: capital ends in "${c.capital.slice(-1)}"`;
  document.getElementById("giftBoost").classList.add("hidden");
});

/* ---------- timer ---------- */
function startTimer() {
  clearInterval(state.timerHandle);
  updateTimerDisplay();
  state.timerHandle = setInterval(() => {
    state.timerSeconds--;
    updateTimerDisplay();
    if (state.timerSeconds <= 0) {
      clearInterval(state.timerHandle);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById("timer");
  const m = Math.floor(state.timerSeconds / 60);
  const s = Math.max(0, state.timerSeconds % 60);
  el.textContent = `${m}:${String(s).padStart(2, "0")}`;
  el.classList.toggle("urgent", state.timerSeconds <= 10);
}

/* ---------- awarding & reveal ---------- */
document.getElementById("awardBtn").addEventListener("click", () => {
  const name = document.getElementById("winnerName").value.trim();
  if (!name) return;
  clearInterval(state.timerHandle);

  if (state.mode === "live") {
    addToRoundBoard(name, state.pointsRemaining);
    addToTotal(name, state.pointsRemaining);
    renderBoards();
  }

  showAnswer(`${name} wins it — ${state.currentCountry.capital} (+${state.pointsRemaining} pts)`);
});

document.getElementById("revealBtn").addEventListener("click", () => {
  clearInterval(state.timerHandle);
  showAnswer(`Answer: ${state.currentCountry.capital}`);
});

function showAnswer(text) {
  const el = document.getElementById("answerReveal");
  el.textContent = text;
  el.classList.remove("hidden");
}

document.getElementById("nextBtn").addEventListener("click", () => {
  document.getElementById("roundScreen").classList.add("hidden");
  document.getElementById("setupScreen").classList.remove("hidden");
});

/* ---------- scoreboards ---------- */
function addToRoundBoard(name, points) {
  const existing = state.roundBoard.find(r => r.name.toLowerCase() === name.toLowerCase());
  if (existing) existing.points += points;
  else state.roundBoard.push({ name, points });
  state.roundBoard.sort((a, b) => b.points - a.points);
  state.roundBoard = state.roundBoard.slice(0, 10);
}

let activeTab = "round";
document.getElementById("tabRound").addEventListener("click", () => switchTab("round"));
document.getElementById("tabTotal").addEventListener("click", () => switchTab("total"));

function switchTab(tab) {
  activeTab = tab;
  document.getElementById("tabRound").classList.toggle("active", tab === "round");
  document.getElementById("tabTotal").classList.toggle("active", tab === "total");
  renderBoards();
}

function renderBoards() {
  const list = document.getElementById("boardList");
  list.innerHTML = "";

  let rows = [];
  if (activeTab === "round") {
    rows = state.roundBoard;
  } else {
    const totals = loadTotals();
    rows = Object.entries(totals)
      .map(([name, points]) => ({ name, points }))
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);
  }

  if (!rows.length) {
    list.innerHTML = `<div class="board-empty">No scores yet — award a round to see names here.</div>`;
    return;
  }

  rows.forEach((r, i) => {
    const row = document.createElement("div");
    row.className = "board-row";
    row.innerHTML = `<span class="board-rank">${i + 1}</span><span class="board-name">${escapeHtml(r.name)}</span><span class="board-pts">${r.points}</span>`;
    list.appendChild(row);
  });
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

/* ---------- rules panel ---------- */
document.getElementById("rulesToggle").addEventListener("click", () => {
  document.getElementById("rulesPanel").classList.toggle("hidden");
});

/* ---------- init ---------- */
renderBoards();
