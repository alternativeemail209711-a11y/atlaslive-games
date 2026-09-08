/* ============================================================
   ATLASLIVE — shared engine
   Loaded by every game page alongside data.js. Handles:
   - Mode (Test / Live / Offline) — persists across games
   - Per-game difficulty — persists per game
   - Round Top 10 (per session), All-Time Total (Live), My
     Score (Offline) — each independently resettable
   - Geo helpers (distance + compass direction) for
     location-guessing games
   ============================================================ */

const AL = (() => {
  const KEY_SETTINGS = "atlaslive_settings_v1";
  const KEY_TOTAL     = "atlaslive_total_scores_v1";
  const KEY_OFFLINE   = "atlaslive_offline_score_v1";

  /* ---------- settings (mode + per-game difficulty) ---------- */
  function loadSettings() {
    try { return JSON.parse(localStorage.getItem(KEY_SETTINGS)) || {}; }
    catch { return {}; }
  }
  function saveSettings(patch) {
    const s = { ...loadSettings(), ...patch };
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(s));
    return s;
  }
  function getMode() { return loadSettings().mode || "test"; }
  function setMode(mode) { saveSettings({ mode }); }
  function getTier(gameKey, fallback) {
    const s = loadSettings();
    return (s.tiers && s.tiers[gameKey]) || fallback;
  }
  function setTier(gameKey, tier) {
    const s = loadSettings();
    const tiers = { ...(s.tiers || {}), [gameKey]: tier };
    saveSettings({ tiers });
  }
  // Generic per-game customization (timer length, board size, etc.)
  function getGameConfig(gameKey, field, fallback) {
    const s = loadSettings();
    const g = (s.games && s.games[gameKey]) || {};
    return field in g ? g[field] : fallback;
  }
  function setGameConfig(gameKey, field, value) {
    const s = loadSettings();
    const games = { ...(s.games || {}) };
    games[gameKey] = { ...(games[gameKey] || {}), [field]: value };
    saveSettings({ games });
  }

  /* ---------- all-time total (Live mode) ---------- */
  function loadTotals() {
    try { return JSON.parse(localStorage.getItem(KEY_TOTAL)) || {}; }
    catch { return {}; }
  }
  function saveTotals(t) { localStorage.setItem(KEY_TOTAL, JSON.stringify(t)); }
  function addToTotal(name, points) {
    const t = loadTotals();
    t[name] = (t[name] || 0) + points;
    saveTotals(t);
  }
  function resetTotals() { localStorage.removeItem(KEY_TOTAL); }

  /* ---------- offline (solo) score ---------- */
  function loadOfflineScore() {
    const v = parseInt(localStorage.getItem(KEY_OFFLINE), 10);
    return Number.isFinite(v) ? v : 0;
  }
  function addOfflineScore(points) {
    const v = loadOfflineScore() + points;
    localStorage.setItem(KEY_OFFLINE, String(v));
    return v;
  }
  function resetOfflineScore() { localStorage.removeItem(KEY_OFFLINE); }

  /* ---------- geo math (Distance Detective etc.) ---------- */
  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }
  function bearingCompass(lat1, lon1, lat2, lon2) {
    const toRad = d => d * Math.PI / 180;
    const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2));
    const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
      Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1));
    const brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round(brng / 45) % 8];
  }
  const ARROWS = { N: "↑", NE: "↗", E: "→", SE: "↘", S: "↓", SW: "↙", W: "←", NW: "↖" };

  /* ---------- misc ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }
  function normalize(s) {
    return String(s).trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ");
  }

  /* ---------- scoreboard renderer ----------
     Renders Round Top 10 / All-Time Total tabs into a container.
     Call renderScoreboard(container, roundBoardArray, activeTab)
     whenever scores change or the tab switches. */
  function renderScoreboard(container, roundBoard, activeTab) {
    container.innerHTML = "";
    let rows = [];
    if (activeTab === "round") {
      rows = roundBoard;
    } else {
      const totals = loadTotals();
      rows = Object.entries(totals)
        .map(([name, points]) => ({ name, points }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);
    }
    if (!rows.length) {
      container.innerHTML = `<div class="board-empty">No scores yet — award a round to see names here.</div>`;
      return;
    }
    rows.forEach((r, i) => {
      const row = document.createElement("div");
      row.className = "board-row";
      row.innerHTML = `<span class="board-rank">${i + 1}</span><span class="board-name">${escapeHtml(r.name)}</span><span class="board-pts">${r.points}</span>`;
      container.appendChild(row);
    });
  }

  return {
    getMode, setMode, getTier, setTier, getGameConfig, setGameConfig,
    loadTotals, addToTotal, resetTotals,
    loadOfflineScore, addOfflineScore, resetOfflineScore,
    haversineKm, bearingCompass, ARROWS,
    escapeHtml, normalize, renderScoreboard,
  };
})();
