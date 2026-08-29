# S / LAB Portfolio — Design System

## 1. Design Direction

### Name

**S / LAB — Field Notebook / Multidisciplinary Systems**

### Visual metaphor

A physical engineering laboratory notebook documenting experiments.

The page should feel:

- tactile
- editorial
- technical
- handmade
- slightly imperfect
- intelligent
- quiet
- curious

It should not feel:

- glossy
- corporate
- cyberpunk
- sterile
- overly futuristic
- like a generic developer portfolio

---

# 2. Color System

Use CSS variables as the source of truth.

Primary palette:

```text
Blueprint Navy
#122A43

Deep Navy
#0B1D30

Paper / Cream
#EEE8D8

Warm Paper
#F4EFDF

Muted Ink
#3E4650

Blueprint Line
#6F8DA8

Soft Blueprint Text
#A9C5DC

Lab Red
#E24E45

Sticky Note Yellow
#EADCA5
```

These are approximate reference values. If the existing CSS variables differ slightly, preserve the existing variables rather than duplicating these values.

### Usage

Navy:

- hero
- blueprint sections
- technical backgrounds

Cream:

- paper sections
- major serif text on dark backgrounds
- physical documents

Red:

- stamps
- annotations
- active states
- important technical markings
- small accents

Yellow:

- sticky notes
- annotations
- physical paper artifacts

Red must remain controlled.

---

# 3. Typography

## Instrument Serif

Primary editorial display font.

Use for:

- hero headline
- major section titles where appropriate
- large editorial statements
- selected project titles

The hero headline is intentionally oversized.

Example:

```text
Building
things
that notice.
```

Do not reduce the headline into a conventional hero heading just to make the layout easier.

---

## DM Mono

Technical language.

Use for:

- navigation status
- section labels
- coordinates
- project codes
- metadata
- technical tags
- timestamps
- status indicators
- academic labels

It should create the feeling of lab equipment/readout text.

---

## Kalam

Handwritten layer.

Use for:

- subject line
- sticky notes
- margin notes
- field observations
- selected narrative annotations

Do not use it for long technical content.

---

# 4. Layout

The site should use strong editorial asymmetry.

Do not center everything.

### Hero

Desktop:

```text
┌──────────────────────────────────────────────────────────┐
│ NAV                                                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  notebook label             physical artifact            │
│  nameplate                                                │
│  handwritten subject                                      │
│  HUGE HEADLINE                                            │
│  supporting copy                                          │
│  stamp                                                    │
│  metadata                                                 │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

The headline owns the left side.

The physical object occupies the right side.

---

# 5. Grid

The blueprint grid is a core identity element.

It should be:

- subtle
- low contrast
- regular
- technical

It must never overpower text.

Do not add additional competing background patterns without a clear reason.

---

# 6. Document Surfaces

Sections alternate between two primary surface types:

### Blueprint page

Dark navy background.

Used for:

- technical reports
- roadmap
- selected project sections

### Paper page

Warm cream background.

Used for:

- notebook observations
- inventory
- credentials
- contact documents

The alternating system creates the feeling of turning pages.

---

# 7. Physicality

Physical details should look like something that could exist on paper or in a lab.

Good visual vocabulary:

- paper
- staples
- clips
- tape
- stamps
- folder tabs
- handwritten notes
- punched holes
- technical labels
- registration marks
- diagrams
- pencil-like imperfections
- photocopy-like shadows
- ID cards
- lanyards

Avoid fake physicality created through excessive shadows or 3D effects.

---

# 8. Shadows

Use restrained offset shadows.

Preferred feeling:

```text
paper
  └── slight physical offset
```

Avoid:

- giant blur shadows
- glowing shadows
- neon shadows

The physical objects should feel printed/cut out, not illuminated by a gaming PC.

---

# 9. Borders

Prefer:

- 1px technical borders
- dashed borders for annotation
- double borders for labels
- imperfect-looking offset borders when appropriate

Avoid:

- rounded-card-everything design
- giant pill shapes
- excessive corner radii

---

# 10. Stamps

Stamps can use:

- red
- slightly rotated text
- imperfect alignment
- technical wording

Examples:

```text
VERIFIED
STUDENT BUILDER
```

```text
EXAMINED
```

```text
REFERENCE / ARCHIVE
```

Use stamps sparingly.

---

# 11. Interaction Design

### Hover

Hover should feel like touching paper or inspecting an artifact.

Examples:

- folder lifts slightly
- annotation appears
- credential shifts slightly
- tool row moves a few pixels
- physical object responds

### Click

Click should reveal information, not create spectacle.

### Drag

Drag is appropriate for physical notes and physical objects.

It must remain optional and should not make navigation harder.

---

# 12. Motion Language

Motion should be:

- short
- physical
- restrained
- purposeful

Examples:

- paper lifting
- stamp appearing
- folder opening
- route drawing
- split-flap cycling
- subtle object swing

Avoid:

- infinite floating animations
- excessive scaling
- camera movement
- constant page parallax

---

# 13. Section Visual Language

| Section | Visual language |
|---|---|
| Hero | Field notebook cover / lab desk |
| About | Handwritten specimen notes |
| Academic | Technical grade report |
| Toolbox | Instrument inventory |
| Projects | Physical folders / case files |
| Practice | Corkboard / bulletin board |
| Achievements | Field log / expedition trail |
| Credentials | Verified records |
| Roadmap | Technical route map |
| Contact | Lab terminal / contact card |
| Footer | Notebook closing page |

---

# 14. Content Hierarchy

Every section should have:

1. technical section label
2. strong title
3. supporting content
4. artifact / visual evidence where appropriate

Avoid sections that are just:

```text
TITLE

[generic card]
[generic card]
[generic card]
```

The artifact is part of the information design.

---

# 15. Responsive Design

### Desktop

Use asymmetry and physical artifacts.

### Tablet

Compress spacing while preserving the hierarchy.

### Mobile

Prioritize:

1. readability
2. navigation
3. content
4. physicality

Physical artifacts can move into normal document flow.

Never preserve a desktop composition at the cost of readable mobile content.

---

# 16. Accessibility

Contrast must remain readable.

Do not use handwritten text as the only way to communicate important information.

Interactive annotations must be keyboard/focus accessible where their information matters.

Motion must respect `prefers-reduced-motion`.

---

# 17. Final Design Test

Ask:

> Does this look like something Sudhanshu could have physically assembled, annotated, stamped, or pinned inside a lab notebook?

If yes, it probably belongs.

If it looks like something from a generic AI startup homepage, reconsider it.
