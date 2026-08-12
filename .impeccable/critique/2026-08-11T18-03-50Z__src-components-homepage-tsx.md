---
target: landing page (HomePage.tsx + ReservePage.tsx)
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 2
timestamp: 2026-08-11T18-03-50Z
slug: src-components-homepage-tsx
---
### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Sticky CTA and reveal-on-scroll work; no pending/loading state on form submit |
| 2 | Match Between System & Real World | 4/4 | India-specific food examples (rice, jaggery), symptom-first language, no jargon |
| 3 | User Control and Freedom | 3/4 | Back nav works; no way to edit a submitted reservation, no undo |
| 4 | Consistency and Standards | 2/4 | `FaqAccordion` is an unmodified third-party component in raw Tailwind grays, breaking the site's `--ink/--bg/--line` token system; `CreepyButton`'s cartoon eyes clash with the editorial serif/black-white system |
| 5 | Error Prevention | 1/4 | Reservation form ships `noValidate` with zero manual validation — every `required` attribute is decorative |
| 6 | Recognition Rather Than Recall | 4/4 | Single continuous scroll narrative, no cross-page memory demands |
| 7 | Flexibility and Efficiency of Use | n/a | Persuade-mode single-path landing page; no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3/4 | Clean editorial typography undercut by a heading animation that periodically erases itself |
| 9 | Error Recovery | 0/4 | No error messaging exists anywhere in the reservation form |
| 10 | Help and Documentation | n/a | Not applicable to a landing page; footer disclaimer covers the minimum |
| **Total** | | **20/32** | **Acceptable (63%)** |

### Design Specificity Verdict

**LLM assessment**: This is genuinely authored for Make India Safe, not a reskinned template. The rice/jaggery/insulin-resistance FAQ set, the India-specific "Then/Now" lifestyle table, the gut-as-central-hub framing, and the "does any of this sound familiar" recognition-tag cloud could not be dropped into a generic wellness site without a copy rewrite — the specificity bar is cleared convincingly. The one place genericness leaks in is `src/components/ui/faq-accordion.tsx`: it's a visibly unmodified third-party component (its own fallback data literally reads "Vengeance UI... dark-mode first component library") styled in raw Tailwind `neutral-*` grays instead of the site's token system. It reads as bolted on, not designed for this brand.

**Deterministic scan**: `detect.mjs --json` against `src/` returned zero findings (exit 0). No rule violations, no false positives to adjudicate — the automated detector is clean. This is expected for a hand-authored, non-templated codebase; it does not contradict the human findings below, which are about product-specific logic and content bugs the detector isn't built to catch (stale dates, missing validation, color-cycling contrast).

**Visual overlays**: Not available. No browser automation tool is exposed in this session (confirmed via tool search — only `WebFetch`, which cannot mutate a page or read console output, was available). Assessment A completed a code-only review of the JSX/CSS instead and states this explicitly; Assessment B attempted to start the dev server for browser visualization, confirmed no automation tool could use it, and shut the server down cleanly. No user-visible overlay exists for this run.

### Overall Impression

The page's content and voice are the real thing — an India-specific, evidence-honest, gut-health-forward landing page that clears the "could this be any wellness startup" bar with room to spare. But three separate mechanical bugs undercut that work before a visitor ever gets to weigh the brand's credibility: the promoted masterclass date has already passed, the reservation form accepts and celebrates a completely empty submission, and the signature heading animation cycles through white-on-white and periodically erases itself. For a brand whose entire pitch is "you can trust us to be medically responsible and precise," these are the opposite of reassuring if a skeptical visitor happens to notice any one of them.

### What's Working

1. **Honest empty state for testimonials** (`HomePage.tsx`, `stories__status`): "We're collecting real feedback... we don't publish quotes we haven't earned." This directly enacts PRODUCT.md's evidence-honesty constraint instead of fabricating social proof — rare discipline for a landing page under conversion pressure.
2. **India-specific, symptom-first copy throughout** — the food-label FAQ questions, the recognition-tag cloud, the Then/Now table. This is the strongest evidence the page was actually authored for this audience rather than adapted from a template.
3. **Persistent, non-naggy conversion path** — a sticky header CTA keeps "Reserve a Spot" one click away through the whole scroll without a popup or exit-intent modal, consistent with the "never fear-based" voice commitment.

### Priority Issues

**[P0] Reservation form has no real validation — it accepts and celebrates a blank submission.**
- **Why it matters**: `ReservePage.tsx:171` sets `noValidate` on the `<form>`, and `handleSubmit` (lines 112–116) does nothing but `preventDefault()` and `setSubmitted(true)`. Every `required` attribute becomes cosmetic. A visitor can submit a completely empty form and see a personalized thank-you with blank interpolated values (name, time). For a health-education brand built on being medically careful, a form that can't even confirm who registered is a credibility risk the moment anyone tests it.
- **Fix**: Remove `noValidate` to restore native browser constraint validation, or add explicit field validation before calling `setSubmitted(true)`.
- **Suggested command**: `/impeccable harden`

**[P0] Heading animation cycles through white-on-white and periodically erases itself.**
- **Why it matters**: `GradientText` (used by every H1/H2 via `HeadingGradient`) defaults to `colors: ['#000000', '#ffffff', '#000000']` clipped to text, panning on an 8s yoyo loop. The page background (`--bg` in `index.css`) is `#ffffff`. Every heading on the page passes through white-text-on-white-background once per cycle — momentarily illegible. Confirmed in source: no `prefers-reduced-motion` handling exists anywhere in the codebase.
- **Fix**: Keep the gradient's color stops away from the exact page-background value, or add a solid-color fallback and respect `prefers-reduced-motion`.
- **Suggested command**: `/impeccable polish`

**[P1] The promoted masterclass date has already passed.**
- **Why it matters**: `src/lib/masterclass.ts` sets `CURRENT_MASTERCLASS.dateTexts` to `'1 August 2026' / '1 Aug 2026' / 'Save the date'`. Today is 2026-08-11 — the page is actively asking visitors to reserve a spot for a session that happened 10 days ago, and "Save the date" is now actively misleading. PRODUCT.md explicitly calls this out as a swappable slot that must stay current; as shipped, it isn't. This is the single most damaging thing a skeptical visitor could notice, because it undercuts the "medically responsible, precise" positioning directly.
- **Fix**: Update `CURRENT_MASTERCLASS` to the next live topic/date now. Longer-term, derive the three date-text variants from one date value instead of three hand-maintained strings, so this can't silently drift again.
- **Suggested command**: `/impeccable harden`

**[P1] The founder's story — the stated primary trust mechanism — is effectively undiscoverable.**
- **Why it matters**: PRODUCT.md names Dr. Yokesh Arul's real, specific story (delivered via the book modal) as the trust mechanism, deliberately preferred over generic doctor imagery or testimonials. As shipped, `CornerBook.tsx` is a small fixed bottom-right icon (150×215px) with only an `aria-label` and no on-page invitation — his name never appears anywhere in `HomePage.tsx`'s flowing copy, only inside the closed book itself. A skeptical first-time visitor has no signal that clicking it reveals anything, let alone the brand's central credibility asset.
- **Fix**: Add a visible teaser in the page flow (e.g. near "Our approach" or "What we're trying to fix") that names the doctor and explicitly invites the visitor to open his story.
- **Suggested command**: `/impeccable clarify`

**[P2] Reservation form contradicts the product's own low-friction principle, and offers no reassurance at the highest-anxiety field.**
- **Why it matters**: PRODUCT.md principle 5 specifies "name, contact, age, interest, what to cover — low friction." The shipped form requires first name, last name, email, phone, age, city, interest, a free-text topic field, and consent — 9 required fields. Separately, nothing near the age field or the consent checkbox tells an anxious visitor "no payment," "we won't spam you," or how symptom-interest data is used — exactly where a PCOS/weight/hormone-topic visitor needs reassurance most. The `getAgePeekMessage()` snark ("the 'I'll sort it later' club") delivered via a googly-eyed `CreepyButton` right next to that field also risks reading as the dismissive tone the brand voice explicitly rejects.
- **Fix**: Trim to spec (make phone or the free-text field optional; reconsider whether last name/city earn their place), and add one reassurance line near consent (no cost, no spam, data used only to contact about this session).
- **Suggested command**: `/impeccable clarify`

### Persona Red Flags

**Jordan (First-Timer)**: Never learns a real doctor is behind the site unless he notices and clicks an unlabeled corner icon — the biggest trust signal for a skeptical newcomer is entirely opt-in and unmarked. Scanning the FAQ, he sees 13 questions with no visual separation between the 7 covering the live Diet & Diabetes session and the 6 covering future topics (gut, stress, PCOS, weight) — easy to misread as "this masterclass covers everything." If he arrives today (2026-08-11), he registers for a session date that's already passed with no indication anything is wrong.

**Riley (Stress-Tester)**: Submits the reserve form empty, or with garbage in `age` (negative, `abc`, `99999999`) — because of the `noValidate` + no-manual-validation bug, it silently "succeeds" and shows a broken personalized thank-you with blank fields. The `age` input declares `max={120}` but that constraint is never enforced at the form level, so out-of-range values pass through as if valid. Checking the live date against today, Riley immediately discovers the promoted masterclass already happened.

**Casey (Mobile)**: `CornerBook` is `position: fixed` at every scroll depth on mobile, permanently occupying bottom-right thumb-reach real estate with no way to dismiss it. `CreepyButton`'s googly eyes track `onMouseMove`/`onTouchMove` but only reset via `onMouseLeave` — there's no `onTouchEnd`/`onTouchCancel` handler, so on a touch device the eyes can be left frozen off-center indefinitely after she lifts her finger.

### Minor Observations

- Multiple perpetual-motion elements run simultaneously site-wide (gradient yoyo on every heading, flip-text loop on the brand mark, rotating text on the date) with no `prefers-reduced-motion` handling anywhere in the codebase.
- Footer links to `/privacy` and `/terms` point at pages PRODUCT.md confirms don't exist yet — likely dead links if clicked.
- FAQ has 13 items in one flat list and the recognition-tag cloud has 15 pills unsegmented — both exceed the ≤4-items-per-group chunking guideline with no progressive disclosure.
- The closing section is a warm, well-placed emotional peak, but the very next thing a visitor reads is a legal-disclaimer paragraph in the footer — ending on hedging language rather than warmth.

### Questions to Consider

- If the founder's real story is meant to be the trust mechanism, has anyone watched an unprompted first-time visitor actually find and open the book icon?
- The hero copy is careful to say "we explain the connection, not a cure-all" — so why does the reservation form silently accept and celebrate an empty submission with nobody's name in it?
- Was the animated gradient heading ever seen rendered on an actual light-mode screen, or only in the component's original dark-background demo?
