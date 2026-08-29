# S / LAB Portfolio — Product Requirements Document

## 1. Project Overview

S / LAB is the personal portfolio of Sudhanshu, a B.Tech student specializing in Artificial Intelligence & Machine Learning.

This is **not** a conventional portfolio website. It should feel like a living physical laboratory notebook: part field notebook, part engineering lab, part archive of experiments.

The site presents the person through the things he builds, studies, documents, and experiments with.

### Core concept

> A multidisciplinary systems builder documenting experiments at the intersection of embedded systems, web development, and machine learning.

The current implementation is a Next.js single-page portfolio with a notebook/document visual language.

---

## 2. Target User

### Primary audience

- Recruiters
- Internship evaluators
- Hackathon judges
- Engineers / developers
- Professors or academic evaluators
- Other students and technical collaborators

### What the visitor should understand within ~10 seconds

1. Who Sudhanshu is.
2. What he studies.
3. What kinds of systems he builds.
4. That he works across hardware, web, and AI/ML.
5. Where to inspect his projects and contact him.

The site should communicate technical ability without looking like a generic developer template.

---

## 3. Product Goals

### Must achieve

- Establish a distinctive visual identity immediately.
- Make the portfolio feel physical and tactile.
- Present academic information clearly.
- Present skills as an instrument/tool inventory.
- Present projects as experiment/case files.
- Present achievements and responsibilities as field records/credentials.
- Provide a clear contact path.
- Work well on desktop and mobile.
- Maintain accessibility and keyboard usability.
- Keep interactions meaningful and restrained.
- Keep content easy to update without rewriting components.

### Nice to have

- Small physical-object interactions.
- Subtle motion and document-like transitions.
- Interactive annotations.
- Future API-backed project data.
- Easter eggs that reward exploration without obstructing navigation.

### Explicitly avoid

- Generic SaaS landing-page aesthetics.
- Excessive gradients.
- Glassmorphism.
- Neon cyberpunk styling.
- Huge amounts of 3D.
- Decorative animation with no purpose.
- Content hidden behind unnecessary interactions.
- Empty project cards.
- Visual effects that compromise readability.

---

## 4. Information Architecture

The homepage is a continuous laboratory notebook containing these sections:

1. Hero / Cover
2. Specimen Notes / About
3. Grade Report / Academic Profile
4. Toolbox / Skills
5. Experiment Logs / Projects
6. Practice Data / Coding & Links
7. Field Expeditions / Achievements
8. Credentials / Responsibilities
9. Future Trajectory / Roadmap
10. Open Channel / Contact
11. Footer

The navigation should provide direct access to the important sections without turning the page into a dashboard.

---

## 5. Current Hero Requirements

The hero is the most important visual area.

It contains:

- `S / LAB_` brand mark.
- `FIELD NOTEBOOK · VOL. 01`
- Split-flap style `SUDHANSHU` nameplate.
- Handwritten subject line.
- Large serif headline:
  - `Building`
  - `things`
  - `that notice.`
- Supporting description.
- `VERIFIED / STUDENT BUILDER` stamp.
- Academic facts.
- `turn the page` cue.
- Sticky note.
- Physical hanging ID/lanyard object.

### Hero composition

The left side owns the typography and identity.

The right side owns the physical artifact.

The physical artifact must remain visually subordinate to the headline.

### Lanyard status

The Lanyard is intentionally **not part of the current immediate editing scope**.

When it is eventually fixed, it must use the intended React Bits Lanyard implementation and be contained inside the hero. It must not become a full-screen canvas or bleed into later sections.

---

## 6. Section Requirements

### 6.1 Specimen Notes

Should communicate:

- AI/ML student identity.
- Interest in physical + digital systems.
- Hardware/sensor work.
- Interface development.
- Machine learning.

Interactive annotations should be subtle and useful.

### 6.2 Grade Report

Show:

- Programme
- Specialization
- Semester
- CGPA
- Subjects of interest

Should feel like a technical academic report rather than a statistics dashboard.

### 6.3 Toolbox

Organize skills into meaningful groups:

- Hardware / Firmware
- Web Development
- AI / ML

Skills should look like instruments in a lab inventory.

### 6.4 Experiment Logs

Projects should be presented as physical folders/case files.

Each project needs enough information to feel real:

- Project title
- Objective
- Tools / stack
- Contribution
- Outcome
- Key learning
- Relevant links where available

Hover/tap can reveal additional information, but the project title and basic purpose must always be visible.

### 6.5 Practice Data

Use a bulletin-board style area for:

- GitHub
- LinkedIn
- Coding profile
- Resume
- Email

Draggable notes are acceptable, but links must remain usable and accessible.

### 6.6 Field Expeditions

Present achievements, events, hackathons, competitions, workshops, or other relevant experiences as a field timeline.

### 6.7 Credentials

Present responsibilities/roles as verified records.

### 6.8 Future Trajectory

Present future goals as a physical route/map/roadmap.

### 6.9 Contact

Provide:

- Contact identity card.
- LinkedIn.
- GitHub.
- Coding profile.
- Resume.
- Contact form.
- Submission status.

The contact form should fail gracefully and should never silently lose user input.

---

## 7. Content Architecture

Content should remain separate from presentation.

Current content source:

`data/content.ts`

Future project data may be supplied by:

`GET /api/projects`

The UI should be designed so the source of project data can change without rewriting the project presentation components.

---

## 8. Functional Requirements

- Navigation anchors must work.
- Buttons must have accessible labels.
- Interactive elements must be keyboard accessible.
- Reduced-motion preferences must be respected.
- Contact submission must display success/failure state.
- Project case files must open and close reliably.
- No interactive canvas may block page navigation.
- No section may visually bleed into another section.
- External links must be valid.
- Mobile layout must remain usable.

---

## 9. Success Criteria

A successful version should feel like:

> Someone opened Sudhanshu's actual engineering notebook.

It should not feel like:

> Someone applied a dark theme to a React portfolio template.

The visual system, interaction design, copy, and component behavior must all support the laboratory-notebook concept.
