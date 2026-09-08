# AtlasLive — Flag → Capital (Prototype)

This is the first working game for your platform. It runs entirely as a
webpage — nothing to install, nothing to code. Once it's online, you open
the link in your phone's browser, go live using TikTok's **Mobile Gaming
LIVE Mode** (which broadcasts your screen), and TikTok's own comment feed
automatically appears on top for your viewers to see. You read the
comments yourself and tap to award the winner — no bots involved.

## What's in this folder
- `index.html` — the page structure
- `style.css` — all the visual styling
- `app.js` — the game logic
- `data.js` — the list of countries/capitals (easy to extend later)

## Part 1 — Put this on GitHub (no coding, just uploading)
1. Go to [github.com](https://github.com) and log in.
2. Click the **+** icon (top right) → **New repository**.
3. Name it something like `atlaslive-games`. Leave it **Public**. Click **Create repository**.
4. On the next page, click **uploading an existing file**.
5. Drag all 4 files from this folder into the upload box (`index.html`, `style.css`, `app.js`, `data.js`).
6. Scroll down, click **Commit changes**. Done — your code is now on GitHub.

## Part 2 — Host it live on Render (no coding, just clicking)
1. Go to [render.com](https://render.com) and log in.
2. Click **New +** → **Static Site**.
3. Connect your GitHub account if it asks, then choose the `atlaslive-games` repository.
4. Leave the build settings blank/default (this site needs no build step — it's plain HTML).
5. Click **Create Static Site**.
6. Wait about a minute. Render will give you a live web address like
   `https://atlaslive-games.onrender.com` — that's your game link.

## Part 3 — Using it while live
1. Open that Render link in your phone's browser.
2. Start your TikTok LIVE using **Mobile Gaming LIVE Mode** so TikTok broadcasts your screen.
3. In the app: pick a difficulty, pick **Test** to rehearse or **Live** once you're streaming, tap **Start Round**.
4. Only the flag shows. Watch TikTok's comment overlay for guesses.
5. Tap a hint if the round is stalling, or tap the gift boost if someone sends a gift (it helps everyone equally, not just that one viewer).
6. When someone nails the capital, type their name and tap **Award**. Tap **Next Round** to continue.
7. The scoreboard at the bottom tracks this round's Top 10 and an all-time Total per viewer, saved on your phone.

## Sharing this with your friend
Send her the same Render link (or have her follow Part 1–2 herself with her
own free GitHub/Render accounts if she wants her own copy). Either way, the
game itself needs zero setup on her end beyond opening the link and going
live the same way.

## What's next
This is the template. Once you've tried it live and tell me what to
adjust — timer length, point values, country list, visual tweaks — we
build the next game (Word Search, Sudoku, etc.) the same way, reusing this
same look and the same host-controls pattern.
