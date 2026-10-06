# MolCrafts teaser (15 s)

A 15-second brand teaser: a caffeine molecule assembles into the MolCrafts
wordmark, the six applications bond into one stack around Moko, and the end
card lands on molcrafts.org.

| File | Purpose |
| --- | --- |
| `index.html` | The animation. Open it in a browser to play, pause and scrub. |
| `render.mjs` | Renders `index.html` frame by frame (1920×1080, 30 fps) to MP4. |
| `molcrafts-teaser-15s.mp4` | The rendered video. |

The animation is a pure function of time (`window.renderFrame(t)`), so the
video and the web page show exactly the same frames.

## Re-render

Requires Playwright (Chromium) and `ffmpeg`.

```bash
node teaser/render.mjs                         # → teaser/molcrafts-teaser-15s.mp4
node teaser/render.mjs --stills 2,6.5,10,14.9  # → teaser/stills/*.png
```

Copy, colors and the mascot come from the site: `src/lib/home/copy/en.ts`,
`src/lib/home/copy/applications.ts`, `src/lib/ecosystem.ts`,
`src/lib/productAccents.ts`, `src/styles/brand-tokens.css` and
`src/assets/moko.svg`. Update the teaser when those change.

The teaser is not part of the site build.
