# Build Prompt: Modak Run — 5 Levels in 2 Days (for Antigravity)

Paste this as your task prompt. Place all 12 existing image assets in an `assets/` folder first (same files as before — no new art needed, levels are built by varying layout/difficulty, not new sprites).

---

Build a 2D side-scrolling platformer web game called "Modak Run" using Phaser 3 (JavaScript), single HTML file or simple static project (`index.html` + `game.js` + `assets/`), no build tools required.

**Canvas:** Fixed 16:9, base resolution 1280x720. Use `Phaser.Scale.FIT` + `autoCenter: Phaser.Scale.CENTER_BOTH` so it always letterboxes to 16:9, never stretches.

**Theme:** Ganesh Chaturthi platformer. Player controls "Mushak" (mouse, Ganesha's vahana), running through 5 increasingly difficult levels to reach the Ganesh Pandal at the end of each.

**Assets (all in `assets/`, reuse across all 5 levels — do not generate new art):**
`background.png`, `standing_mushak.png`, `mushak_running_1.png`, `mushak_running_2.png`, `jumping_mushak.png`, `platform.png`, `brick1.png`, `brick_with_questionmark.png`, `cat_obstical.png`, `modak.png`, `cheese.png`, `warp_pipe.png`, `ganesh_pandal_image.png`

**Player mechanics (same across all levels):**
- Move: Arrow keys / A-D
- Jump: Spacebar / Up
- Arcade Physics: gravity, ground collision, jump arc
- Sprite states: idle (`standing_mushak.png`), run (alternate `mushak_running_1.png`/`mushak_running_2.png`), jump (`jumping_mushak.png`)
- 3 lives per level, shown in HUD top-left; score in HUD top-right
- Losing all lives on a level = Game Over screen, Retry (restarts that level, not the whole game)
- Reaching `ganesh_pandal_image.png` at the end of a level = Level Complete screen → "Next Level" button (or "Finish Game" on Level 5)

**How to make 5 DISTINCT levels from the SAME assets (this is the core task — build a data-driven level system, not 5 hardcoded scenes):**

Build each level from a level-config object/array defining: platform layout (tile positions + gap positions), block positions (`brick1`/`brick_with_questionmark`), enemy count and patrol ranges, collectible positions, and a `ganesh_pandal_image` end position. Then differentiate the 5 levels purely through these config values plus simple visual variation:

| Level | Difficulty knobs to change |
|---|---|
| **1 — Galli/Lane** | Baseline: 2–3 small gaps, 3 `cat_obstical` enemies, generous platform width, ~15 modak + 5 cheese, 1 warp_pipe obstacle. Tutorial pacing. |
| **2 — Market Street** | Narrower platforms, 4–5 gaps, 4 cats with faster patrol speed, add a vertical hop section (stacked `brick1` steps), slightly tint `background.png` (e.g. warmer overlay) for visual variety |
| **3 — Rooftop Hop** | More vertical platforming — floating `platform.png` segments at varying heights requiring precise jumps, fewer ground sections, 4 cats placed to guard collectible clusters, 2 warp_pipe obstacles |
| **4 — Procession Road** | Longest level, alternating gap-and-block rhythm, 5–6 cats (some patrolling faster/longer ranges), collectibles placed to require near-perfect gap jumps for full score, darker/dusk tint on background |
| **5 — The Pandal (Finale)** | Hardest layout: tightest gap timing, most cats (6+), a final long jump gauntlet before reaching `ganesh_pandal_image`, on reaching it trigger a special "Finish Game" celebration screen instead of "Next Level" |

Each level should escalate difficulty primarily via: gap width/frequency, enemy count and patrol speed, and platform placement — since there's no new art, treat level design (not new sprites) as the main difficulty lever. A slight tint/filter shift per level (using Phaser tint or a colored overlay rectangle) is enough visual differentiation given the 2-day timeline — do not attempt new backgrounds per level.

**Screens:**
- Start Screen: "Modak Run" title, Play button (always starts Level 1), optional level-select if time allows (stretch, skip if tight on time)
- Level Complete Screen: score + "Ganpati Bappa Morya!" + Next Level button
- Final Level Complete Screen (after Level 5): full score summary + "Ganpati Bappa Morya! Game Complete" message
- Game Over Screen: Retry (current level)

**Code structure (important for the 2-day deadline — build this first, then content):**
- One reusable `LevelScene` that takes a level-config object as data, rather than 5 separate hand-coded scenes
- A `levelConfigs.js` (or similar) file holding the 5 config objects (platform layout, gaps, enemy list, collectible list, end position, tint)
- `Preload`, `Menu`, `LevelScene` (parametrized), `LevelComplete`, `GameOver` as your scene set
- This way, once Level 1's config is fully working end-to-end, Levels 2–5 are just new config objects, not new code — this is the only realistic way to hit 5 levels in 2 days

**Priority order given the 2-day constraint:**
1. Day 1 AM: Core player movement, physics, one working level (Level 1 config) fully playable start to finish
2. Day 1 PM: Convert to data-driven LevelScene, HUD, Level Complete / Game Over screens working
3. Day 2 AM: Build configs for Levels 2–4, test each for completability (no impossible jumps)
4. Day 2 PM: Build Level 5 finale + final celebration screen, playtest full 5-level run, fix any broken jump gaps or enemy placement bugs

**Deliverable:** A working local project that runs by opening `index.html`, playable start to finish across all 5 levels using only the existing asset files.
