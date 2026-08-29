# S / LAB Portfolio — Architecture

## 1. Technical Stack

### Framework

- Next.js 16
- React 19
- TypeScript 5.7

### Styling

- Global CSS
- Tailwind CSS infrastructure is installed, but the current visual system is primarily implemented through `app/globals.css`.

### Motion

- Framer Motion
- GSAP may be used only when it provides a clear advantage over CSS/Framer Motion.

### 3D / Physics

- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/rapier`
- `meshline`

These are primarily for the physical Lanyard artifact.

### Icons

- `lucide-react`

### Analytics

- `@vercel/analytics`

---

## 2. Current Project Structure

```text
/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── lab-notebook.tsx
│   ├── lanyard.tsx
│   ├── split-flap-text.tsx
│   └── ui/
│       └── button.tsx
│
├── data/
│   └── content.ts
│
├── lib/
│   └── utils.ts
│
├── public/
│   ├── card.glb
│   ├── lanyard.png
│   └── other static assets
│
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── pnpm-lock.yaml
```

---

## 3. Current Component Responsibilities

### `app/page.tsx`

Entry point.

Should remain thin and delegate the actual page composition to the main notebook component.

### `app/layout.tsx`

Responsible for:

- Global fonts.
- Metadata.
- Viewport.
- Global stylesheet.
- Vercel Analytics.

Current fonts:

- Instrument Serif
- DM Mono
- Kalam

### `app/globals.css`

Owns the visual design system:

- colors
- typography rules
- notebook pages
- grid
- document borders
- stamps
- folders
- annotations
- bulletin board
- timeline
- responsive rules
- motion/reduced-motion rules
- Lanyard containment

Avoid creating arbitrary one-off styles in components when an existing design token or class can be reused.

### `components/lab-notebook.tsx`

Current page composition component.

Contains:

- navigation
- hero
- sections
- project folder interaction
- bulletin board
- contact form
- footer

This file is currently doing too much.

Future refactoring should split major visual systems into components only when doing so makes the architecture clearer.

Suggested future structure:

```text
components/
├── lab-notebook.tsx
├── navigation.tsx
├── hero/
│   ├── hero.tsx
│   ├── split-flap.tsx
│   └── lanyard.tsx
├── sections/
│   ├── specimen-notes.tsx
│   ├── academic-report.tsx
│   ├── toolbox.tsx
│   ├── experiment-logs.tsx
│   ├── practice-board.tsx
│   ├── field-expeditions.tsx
│   ├── credentials.tsx
│   ├── roadmap.tsx
│   └── contact.tsx
├── project/
│   ├── project-folder.tsx
│   └── case-file.tsx
└── ui/
```

Do not perform this refactor merely for aesthetic cleanliness. Refactor when it reduces complexity or makes future edits safer.

### `components/split-flap-text.tsx`

Responsible for the animated nameplate.

The component should preserve the visual impression of a physical airport/railway split-flap display.

### `components/lanyard.tsx`

Responsible for the physical hanging ID artifact.

This is a specialized Three.js component and should remain isolated from the rest of the page.

### `data/content.ts`

Single source for editable portfolio content.

Do not hardcode changing portfolio content throughout JSX.

---

## 4. Page Flow

```text
RootLayout
   ↓
page.tsx
   ↓
LabNotebook
   ├── Navigation
   ├── Cover / Hero
   │    ├── Split Flap
   │    ├── Lanyard
   │    └── Sticky Note
   ├── Specimen Notes
   ├── Academic Report
   ├── Toolbox
   ├── Experiment Logs
   │    └── Project Folder → Case File
   ├── Practice Data
   ├── Field Expeditions
   ├── Credentials
   ├── Future Trajectory
   ├── Contact
   │    └── /api/contact
   └── Footer
```

---

## 5. Data Flow

### Static content

`data/content.ts`
→ page components
→ rendered notebook sections

### Contact

Contact form
→ `POST /api/contact`
→ server response
→ visible submission state

### Future projects API

Potential future architecture:

```text
GET /api/projects
        ↓
project data adapter
        ↓
Experiment Logs
        ↓
Project Folder
        ↓
Case File
```

Do not implement the API unless requested.

---

## 6. Rendering Strategy

The portfolio is primarily a client-side interactive page because it uses:

- Framer Motion
- drag interactions
- hover/tap state
- Three.js
- interactive case files

However, keep static data and noninteractive structures simple.

Do not turn every component into a client component without a reason.

---

## 7. Lanyard Architecture Requirement

The Lanyard must:

- live inside the hero section.
- have a bounded wrapper.
- not create a viewport-sized canvas.
- not intercept unrelated page interactions.
- not overlap later sections.
- respect mobile layout.
- respect reduced motion where applicable.
- remain visually behind important hero content when appropriate.

The Three.js canvas should never determine the page's global height.

---

## 8. Responsive Architecture

Desktop:

- Large editorial hero.
- Two-sided composition.
- Physical artifacts visible beside content.

Tablet:

- Preserve hierarchy.
- Reduce artifact dimensions.
- Avoid collisions.

Mobile:

- Stack content.
- Move physical artifacts into the flow when necessary.
- Never allow the Lanyard or other canvas to cover text.
- Preserve readability over visual fidelity.

---

## 9. Accessibility Architecture

All interactive content must support:

- keyboard navigation
- visible focus states
- semantic buttons/links
- appropriate ARIA labels where needed
- reduced motion
- sufficient text contrast

Hover-only information must have a tap/focus equivalent where the information is important.

---

## 10. Performance

Avoid:

- unnecessary rerenders
- huge DOM trees
- continuously running animations that add no value
- unbounded Three.js canvases
- expensive effects across the entire page

The 3D Lanyard is the most likely expensive visual component and should be isolated accordingly.
