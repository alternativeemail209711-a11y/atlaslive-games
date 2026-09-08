# AtlasLive — Game Hub

This is now a small hub with two working games, built to expand as we add
more. It's still a plain webpage — nothing to install, nothing to code.

## What's in this folder
- `index.html` — the Game Hub (shows every game, tap one to play)
- `style.css` — shared visual styling for every game
- `data.js` — shared country/capital/coordinate data
- `shared.js` — shared engine: settings, scoreboards, distance/direction math
- `games/flag-capital.html` + `.js` — Flag → Capital
- `games/distance-detective.html` + `.js` — Distance Detective (new)
- `README.md` — this file

## Part 1 — Put this on GitHub
1. Go to [github.com](https://github.com) and open your existing
   `atlaslive-games` repository (the one from before).
2. Click **Add file** → **Upload files**.
3. Drag in the **whole folder** this time — `index.html`, `style.css`,
   `data.js`, `shared.js`, and the entire `games` folder together. Modern
   GitHub's upload box accepts a dragged folder and keeps the `games/`
   structure intact — you'll see `games/flag-capital.html` etc. listed
   before you commit.
4. If GitHub asks whether to replace existing files with the same name
   (like `index.html`, `style.css`, `data.js`), let it — that's the update.
5. Scroll down, click **Commit changes**.

## Part 2 — Render
Nothing to change here. Render is already watching this repository, so it
will automatically redeploy within a minute or two of your commit. Your
link stays exactly the same as before.

## Part 3 — Using it
1. Open your Render link. You'll land on the **Game Hub** now instead of
   going straight into a game.
2. Tap **Flag → Capital** or **Distance Detective** to open that game.
3. Tap the **⚙** icon on the round screen any time to change:
   - **Mode** — Test (rehearse, nothing saved), Live (on stream, saves to
     scoreboards), or Offline (solo play, just for you)
   - **Difficulty** — Rookie / Explorer / Globetrotter
   - **Round timer** — how many seconds per round
   Your choice is remembered automatically — rounds now continue back to
   back at the same settings until you deliberately change them.
4. Tap **Reset this round's board** or **Reset all-time total** under the
   scoreboard any time you want a clean slate (each asks you to confirm
   first, so nothing resets by accident).
5. The other games listed in the hub ("coming soon") aren't built yet —
   they're there so you can see the full lineup and order we're building
   in: **geography next, then words, then numbers.**

## What's next
Up next in the geography lineup: a Flagle-style zoomed flag reveal, then
City Detective (same distance/direction mechanic for cities), Countryle,
and Travle. After geography, we move to the word games (Word500-style,
Blossom-style, Word Search), then the number games (Sudoku, Kakuro, and
the rest). Tell me if you'd like the order changed, or if anything about
these two games needs adjusting before we keep going.
