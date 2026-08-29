# S / LAB Portfolio — AI Editing Rules

These rules apply to any AI agent modifying this repository.

## 1. Primary Rule

**Do not redesign the project unless explicitly asked.**

The visual identity already exists.

When fixing something, preserve the established design language unless the requested change requires otherwise.

---

## 2. Design Identity

The site is:

- a physical laboratory notebook
- a field record
- an engineering archive
- an experimental workspace

It is NOT:

- a SaaS dashboard
- a generic developer portfolio
- a cyberpunk site
- a glassmorphism template
- a futuristic AI landing page

Every visual decision should reinforce the notebook/lab metaphor.

---

## 3. Color Rules

Use the existing CSS variables as the source of truth.

Do not introduce random new colors.

Primary visual relationships:

- deep navy / blueprint blue for technical pages
- warm paper/cream for notebook pages
- muted ink for body text
- red as a controlled annotation/stamp/accent color
- yellow/tan for physical notes

Red should remain an accent, not become the site's dominant background.

---

## 4. Typography Rules

Current typography:

- Instrument Serif → editorial headlines
- DM Mono → technical labels, metadata, codes
- Kalam → handwritten notes/annotations

Do not replace these with generic modern UI fonts unless explicitly instructed.

Do not make every piece of text uppercase.

Do not use decorative fonts for long-form body text.

---

## 5. Interaction Rules

Interactions should communicate physicality or information.

Good:

- folder opens like a case file
- note can be dragged
- annotation reveals a margin note
- split-flap characters cycle
- route draws itself
- subtle hover movement
- physical hanging object reacts to interaction

Bad:

- random floating particles
- constant parallax everywhere
- excessive 3D
- cursor trails
- gratuitous glowing effects
- animations that delay reading
- animations that make content harder to access

---

## 6. Motion Rules

Prefer:

1. CSS transitions
2. Framer Motion
3. GSAP only when needed

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

No interaction should depend entirely on animation.

Do not add looping animations unless they have a clear purpose.

---

## 7. Lanyard Rules

The Lanyard is currently out of scope unless explicitly requested.

When modifying it:

- use the intended React Bits implementation.
- do not replace it with a fake CSS lanyard unless explicitly asked.
- keep it inside the hero.
- keep its canvas bounded.
- prevent cross-section bleed.
- prevent it from covering navigation or text.
- do not give it a global/fixed viewport canvas.
- do not solve overlap by blindly increasing z-index values.

If the problem is architectural, fix the wrapper/containment rather than hiding the symptom.

---

## 8. Split-Flap Rules

The `SUDHANSHU` nameplate should visually behave like a split-flap display.

Do not replace it with:

- a normal text heading
- a generic typing effect
- a CSS gradient text effect

If the existing component is adequate, improve it instead of replacing it.

---

## 9. Component Rules

Before creating a new component:

1. Check whether an existing component already handles the job.
2. Check whether the behavior belongs in the existing section.
3. Only create a new component when it improves clarity or reuse.

Do not create dozens of microscopic components just to make the file tree look impressive.

Humans already have enough folder structures.

---

## 10. Content Rules

Do not invent portfolio achievements, projects, credentials, grades, employers, links, or personal facts.

If content is missing:

- preserve the existing placeholder mechanism, or
- mark the content as TODO,
- do not fabricate it.

Editable content belongs in `data/content.ts`.

---

## 11. Link Rules

Do not invent URLs.

Preserve existing valid links.

Use proper `https://` links where required.

Email links should use `mailto:`.

---

## 12. Contact Form Rules

The contact form must:

- validate required fields.
- handle failed requests.
- show a visible submission state.
- avoid silently losing data.
- avoid exposing secrets in client code.

Do not hardcode API keys or credentials.

---

## 13. Error Handling

Never swallow errors silently.

For async operations:

- catch expected failures.
- provide a useful UI state.
- log useful diagnostic information where appropriate.
- avoid exposing sensitive server details to users.

Never replace a broken feature with fake success behavior.

---

## 14. Dependencies

Prefer existing dependencies.

Installed major libraries include:

- Next.js
- React
- Framer Motion
- Three.js
- React Three Fiber
- Drei
- Rapier
- GSAP
- Lucide React

Do not install another library for a problem that can reasonably be solved with the existing stack.

Before adding a dependency, verify that it is genuinely necessary.

---

## 15. CSS Rules

Use the existing design variables.

Avoid:

- inline style explosions
- duplicate CSS rules
- conflicting media queries
- arbitrary `!important`
- z-index escalation wars

If multiple later overrides are fighting earlier rules, clean up the underlying CSS instead.

---

## 16. Layout Rules

Every section owns its own visual layer.

Do not allow:

- hero artifacts to bleed into later sections
- canvases to cover unrelated sections
- absolute elements to escape their intended container
- overflow hacks to hide real layout bugs

Prefer proper containment and stacking contexts.

---

## 17. Mobile Rules

Mobile is not a shrunken desktop.

For every significant visual change:

- check narrow screens.
- prevent horizontal overflow.
- preserve text hierarchy.
- move physical artifacts into normal flow when needed.
- never let interaction layers block content.

---

## 18. Validation Rules

After meaningful code changes:

1. Run TypeScript/build checks.
2. Check console errors.
3. Check the affected interaction.
4. Check desktop.
5. Check mobile.
6. Check reduced-motion behavior when motion was changed.

Do not claim a feature is fixed without validating it.

---

## 19. Editing Strategy

When asked to fix one thing:

- change the smallest relevant surface.
- do not rewrite unrelated sections.
- do not "clean up" unrelated code.
- preserve working behavior.
- explain significant architectural changes in the commit/change summary.

The AI's job is to improve the existing project, not demonstrate how much code it can generate.
