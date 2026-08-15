# Homepage visual audit — 2026-08-14

Full-site review of `/` against the operator's Apple-discipline brief: one
dominant idea per viewport, oversized editorial type, confident negative space,
motion that explains the message, no cards/grids/panels/arrows, nothing that
could pass for a docs or SaaS layout. Audited from source plus live screenshots
at 1440px in `en` and `zh`. This file records the verdicts and tracks the work;
remove entries as they land, and the file when the pass is complete.

## The shared direction: the light language

Screens should not share a template; they share a *vocabulary of light*. The AI
screen established it (context gathering as points of light around a statement);
the Capabilities rebuild extended it (a drawn line of light carrying knowledge
between stations). Remaining redesigns draw from the same vocabulary — light
travels, gathers, illuminates what becomes active — rather than reusing any
screen's layout. Geometry is constructed, not drawn: the Capabilities thread
derives every radius and run from measured layout (`src/lib/home/thread.ts`),
and new light geometry should hold that bar.

## Verdicts

| # | Screen | Verdict | Status |
|---|--------|---------|--------|
| 0 | Hero brand curtain | KEEP (minor tune) | **done 2026-08-14** |
| 1 | 01 About | TUNE | **done 2026-08-14** |
| 2 | 02 Capabilities | REBUILD | **done 2026-08-14** |
| 3 | 03 AI | KEEP | — |
| 4 | 04 Applications | TUNE (heavy) | **done 2026-08-14** |
| 5 | 05 Collaboration | TUNE (heavy) | **done 2026-08-14** |
| 6 | 06 Support band | KEEP | operator: leave as is |
| 7 | Footer | KEEP | — |

### 0 · Hero — KEEP (done)

Message (who MolCrafts is) and focal point (gradient wordmark) match; the most
disciplined screen on the page. The one gap — no scent that the argument
continues below — is closed with light: a faint plumb line under the subtitle
with a pulse that keeps falling down it (`animate-hero-descent`), fading in
after the curtain settles, paused while the hero is off screen, and standing
still (line only, which still points down) under reduced motion.

### 1 · 01 About — TUNE (done)

Was: the statement heading and editorial split worked, but below the rule four
text voices competed (H3, paragraph, three-promise list, solid button), the
bright green button was the strongest element on screen, and its `ArrowRight`
violated the no-arrows constraint. It was also the last screen on the generic
blur+rise `Reveal` — no motion of its own.
Now, with copy untouched: the light holds a structural place, not a
decorative one. A bright **ground line** runs the full width of the block's
base — this screen's one concrete object, as the thread is 02's and the stage
is 04's — with its light pooling around it. The three promises are **courses
of light** stepping up from that ground, widest and brightest at the
foundation, so they read as labels on a built structure rather than a text
list. The motion is the message: the ground is laid first, the claim settles
out of it, the rule draws, and the courses stack bottom-first
(`approachGroundReveal` / `approachRise` / `approachLineLay`). The button was
demoted to an underline-of-light entry, which removed the page's last arrow
icon and its last solid-button focal point; the headline carries the screen
again.

### 2 · 02 Capabilities — REBUILD (done)

Was: heading + numbered 01/02/03 run with the right half of the screen empty —
a list the reader had to read in full, the audit's worst glanceability.
Now: the statement carries the screen; the three claims are stations on a
diagonal cascade (each starting on the column where the previous one ends), lit
in reading order by a drawn thread of light whose fillets are exact
quarter-circles derived from the measured row gap. Copy unchanged; motion
variants in `animations.ts`; geometry pure and unit-tested.

### 3 · 03 AI — KEEP

The Statement Scene reference. Constellation, gather-on-entry, idle drift, and
sweep all explain the message. Do not touch. (In `zh` the screen stays English
by operator decision.)

### 4 · 04 Applications — TUNE (done)

Was: the right concept (a morphing Kinetic Field, the page's only route to
product pages) undersold by its art direction — a `28rem` bordered rounded box
floating in an empty screen read as a dashboard panel, compressed entries
(icon + hairline + vertical label) as a toolbar, a timid brand panel, and an
`ArrowRight` on the Explore link.
Now: the stage is one unboxed field that escapes the measure (`-mx-16`) and
grew to `clamp(24rem,52vh,32rem)`; waiting entries are columns of light with
the enlarged product name centred as the column's lit node; the active glow is
a blurred solid ellipse — never a radial gradient, whose farthest-corner
falloff clips at the element edge and draws a seam; the expanded panel splits
mark : detail at the golden section (`1fr:1.618fr`, detail is the main part
and its body takes the lead rung); the detail column drops the
name/application the mark already states; the Explore link is an underline
of light, no arrow, no Lucide icons anywhere in the stage. Interaction fixes
that came out of it: activation moved from `pointerenter` to `pointermove`
(a stationary cursor no longer flip-flops the morph as entries slide under
it), and a clipping wrapper contains mid-morph reflow the old container border
used to hide. Interaction, keyboard, focus, and touch behaviour preserved.

### 5 · 05 Collaboration — TUNE (done)

Was: the intent (one field, three depths, travelling light) was right and the
hover states worked, but the resting state failed — three near-equal text
columns, five heading-level elements competing, and a depth gradient
(0.05-alpha field, 1.24fr→0.82fr narrowing) below perception threshold; the
argument existed only in code comments.
Now, with copy untouched: depth is on the screen at rest. Each statement
stands on a **route line of light** (the established vocabulary: a line of
light is a route in) that is longer and brighter the deeper the phase, opens
further when brought forward, and doubles as the link affordance the finale
needed. The ground's dot grid was raised to visibility and a second, finer
grid fades in toward the embedded end, so density genuinely increases; each
phase rests in its own pool of light (blurred solid ellipses per the 04
lesson) deepening left to right. The travelling spotlight now appears only on
interaction — a spotlight parked over the middle argued against the
left-to-right deepening — and phase wake rests were reordered to increase
with depth (0.3 / 0.5 / 0.7). Hover forward/recede, first-tap-forward touch
behaviour, and the entry sweep are all preserved.

### 6 · 06 Support band — KEEP (operator: leave as is)

Correctly a band, not a screen. The audit suggested compressing the header
apparatus while there is a single sponsor; the operator decided 2026-08-14 to
leave the band untouched.

### 7 · Footer — KEEP.

## Cross-cutting findings

- **Arrows**: cleared — the `ArrowRight` in About's button and the
  Applications Explore link were the last two; both are now underlines of
  light.
- **Motion**: every content screen now has motion that explains its own
  message — 01 builds from the ground, 02 draws the thread, 03 gathers the
  constellation, 04 morphs the stage, 05 sweeps and deepens. The generic
  blur+rise `Reveal` remains only on block headers that have no bespoke
  screen (Applications' header via `HomeBlock`, the Support band).
- **Header template**: title-left / lead-right / gradient rule recurs on four
  screens. Keep the shared measure (the document spine), vary what the header
  row does per screen.
- **Typography**: `stage.ts` two-rung ladder + statement rung is sound; keep.
  Five font families are loaded (Geist, DM Sans, JetBrains Mono, Outfit,
  Playfair Display) — verify all are used and drop dead weight. `zh` fallback
  verified live; `sv` not yet screenshotted.
- **Narrative**: Hero → About → Capabilities → AI → Applications →
  Collaboration argues cleanly with no adjacent duplication. The finale is
  Collaboration's three routes (by approved copy design, no Contact screen) —
  which makes 05's affordance fix load-bearing for conversion.

## Status

Every screen in the pass is closed as of 2026-08-14: 02 rebuilt, 04 and 05
retuned, 01 rebuilt around the ground line, the hero's descent pulse added,
and the Support band left as is by operator decision. Open threads that
outlived the pass: verify the `sv` locale on a live viewport, and audit
whether all five loaded font families are still used.
