# Deli 4 Prez Draft Lottery

A browser-based fantasy draft lottery tool for 6 players. Assigns draft seeds using weighted random odds, with a dramatic animated reveal sequence.

## Features

- Enter 6 player names ranked by standing (Player 1 = best record = highest odds for Seed #1)
- Weighted probability system ensures higher-ranked players are more likely to get better seeds
- Customizable odds via the ⚙️ Customize Odds editor
- Animated reveal sequence (seeds revealed 6 → 1 with audio and fullscreen mode)
- Use [Esc] to exit fullscreen mode of reveal

## Usage

1. Open `index.html` in a browser
2. Enter 6 player names in order (best record first)
3. Click **Generate Seeds**
4. Click **▶️ Play Reveal** to reveal seeds one by one

## Default Odds (Weight Table)

| Position | Seed 1 | Seed 2 | Seed 3 | Seed 4 | Seed 5 | Seed 6 |
|----------|--------|--------|--------|--------|--------|--------|
| 1 (Best) |   50   |   25   |   15   |    7   |    2   |    1   |
| 2        |   25   |   35   |   20   |   12   |    6   |    2   |
| 3        |   15   |   20   |   30   |   20   |   10   |    5   |
| 4        |    7   |   12   |   20   |   30   |   20   |   11   |
| 5        |    2   |    6   |   10   |   20   |   35   |   27   |
| 6 (Worst)|    1   |    2   |    5   |   11   |   27   |   54   |

Weights are relative — they don't need to sum to 100. Use **Reset to Default** in the odds editor to restore these values.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main UI |
| `script.js` | Seed generation, odds logic, modal editor |
| `video-player.js` | Reveal sequence with audio and fullscreen |
| `styles.css` | Styling |
| `audio/reveal.mp3` | Audio played during the reveal |
