# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: young Indian adults, roughly 18–35, who don't think of themselves as patients but recognize themselves in everyday complaints — fatigue, poor sleep, stress, digestive discomfort, PCOS-related concerns, hair fall, stubborn weight/belly fat, irregular routines, and confusion from contradictory health content online. They arrive skeptical of both generic wellness content and clinical/hospital framing, having already been burned by contradictory advice (see Positioning).

## Product Purpose

Make India Safe is a preventative health-education and longevity movement. Its core bet: many of the everyday complaints above are not isolated problems but downstream effects of gut health, and gut health is treatable/improvable through understanding rather than guesswork. The product's job is to help people understand those connections clearly enough to act — not to diagnose or replace medical care.

Go-to-market model (durable, current as of 2026-08-11):
- The company runs **free masterclasses**, one topic at a time (currently: Diet & Diabetes, session 2026-08-01). This is not the permanent scope — future masterclasses will rotate through other symptom areas (stress, sleep, PCOS, gut/digestion, weight), each still framed through gut health as the central lever.
- The landing page's "next masterclass" is a **changing, updatable slot** — copy, imagery, and the reservation form's topic options must not be hardcoded to Diet & Diabetes as if it were permanent. Whatever masterclass is currently live is what the page and form should reflect.
- **Paid courses are a planned future offering**, not live yet. Do not build course purchase flows now, but the information architecture should not preclude them later.

## Positioning

**"The answers to your health may begin somewhere you rarely think about. Your gut."** (confirmed hero headline, updated 2026-08-12 — supersedes the earlier "You shouldn't need a medical degree..." line, which remains valid as a secondary/legacy line but is no longer the hero's primary headline.)

Mechanism a neighboring wellness or hospital-marketing product could not truthfully copy: Make India Safe treats **gut health as the central, causally load-bearing lever** connecting digestion, energy, mood, sleep, weight, and hormonal symptoms (e.g. PCOS) — not just "one factor among many" in a flat list. This is a deliberate, confident positioning choice (confirmed 2026-08-11), stronger than the original design doc's flatter "food ↔ gut ↔ stress ↔ sleep ↔ movement" framing.

This must still be stated with medically responsible hedging — "can be a central factor in," "often shapes," "is closely linked to" — never "every illness starts in the gut," "gut cleansing cures X," or claims that gut health alone explains a named diagnosis. The confidence is in the positioning and narrative throughline, not in individual medical claims.

Secondary campaign line (from design doc, still valid): *"Your symptoms may feel disconnected. Your health isn't."*

## Operating Context

- Visitors reach the page cold, mostly via marketing/social, evaluate it in seconds, and convert through a single "Reserve a Spot" registration for the current masterclass.
- The founder is a practicing doctor (Dr. Yokesh Arul); his personal and clinical story is the trust mechanism, delivered via an existing interactive "book" modal (chapter-by-chapter), not a generic bio block.
- No paid course purchase flow exists yet; conversion is registration-only.

## Capabilities and Constraints

- Stack: React + TypeScript + Vite (existing codebase; not up for reconsideration).
- The reservation form and masterclass copy must be treated as **content that changes per live masterclass**, not fixed to diabetes. Whoever updates the site for the next masterclass should be able to swap topic, date, and interest options without a structural rewrite.
- Course/payment functionality is explicitly out of scope for now — do not build it, but avoid decisions that would block adding it later.
- Undecided: exact cadence/calendar of future masterclass topics, and whether multiple masterclasses will ever run concurrently (current answer: no, one at a time, rotating).

## Brand Commitments

- Name: **Make India Safe**. Founder: **Dr. Yokesh Arul**, an MBBS-trained doctor — real person, not a persona.
- Founder story: the existing 5-chapter narrative in the book modal (`CornerBook.tsx` / `BOOK_PAGES`) — hospital → talking to students → community visit → meeting people → why we started Make India Safe — is **confirmed real content to preserve**, tied to real photography. The design doc's alternate 3-chapter arc ("Becoming a Doctor / One Patient at a Time / Make India Safe") was illustrative only and is not a replacement script (confirmed 2026-08-11).
- Voice: intelligent, approachable, confident, medically responsible, slightly provocative, never preachy, never fear-based (per design doc §14).

## Evidence on Hand

- Real: founder identity and book-modal photography (`/public/images/book/*`), the Diet & Diabetes masterclass session date and topic, existing diabetes-topic carousel/FAQ photography (`/public/images/questions/*`).
- **Not real / placeholder only (confirmed 2026-08-11):** any photography, testimonials, stats, or participant quotes for the broader gut/stress/sleep/PCOS/hair-fall/weight topics. Do not fabricate these — mark them explicitly as needed assets or use labeled placeholders per design doc §10 ("Testimonial placeholder — replace with verified participant feedback before launch").
- Absent entirely: medical disclaimer text, Privacy/Terms/Contact footer content (component exists in code but is unwired), consent-checkbox copy for the registration form.

## Product Principles

1. Gut health is the confident throughline and central lever — not a flat equal-weight factor — but every claim stays hedged to medically responsible language; never implies gut health alone diagnoses or cures a named condition.
2. The site must present as a movement with an evolving masterclass calendar, not a permanent single-topic microsite — current masterclass content is a swappable slot, not hardcoded truth.
3. Trust is carried by the founder's real, specific story (existing 5-chapter book), not generic doctor imagery or invented testimonials.
4. Never fabricate evidence: broader-topic imagery/testimonials are explicitly absent today and must be flagged, not invented, until supplied.
5. Registration stays low-friction (name, contact, age, interest, what to cover) — no course/payment flow yet.

## Accessibility & Inclusion

No product-specific accessibility requirement beyond standard WCAG AA expectations; current implementation has known gaps (missing `:focus-visible` styling on primary CTA, FAQ accordion, and other interactive controls) to address as implementation work, not product scope.
