'use client'

import { motion, useReducedMotion } from 'framer-motion'

const DISCIPLINES = [
  { id: 'ds', num: '01', title: 'DATA STRUCTURES', subtitle: 'Algorithms · Complexity', accent: 'red', rot: -1.2 },
  { id: 'cv', num: '02', title: 'COMPUTER VISION', subtitle: 'Spatial Signal Processing', accent: 'amber', rot: 1.4 },
  { id: 'es', num: '03', title: 'EMBEDDED SYSTEMS', subtitle: 'Firmware · Hardware Control', accent: 'olive', rot: -0.9 },
  { id: 'hci', num: '04', title: 'HUMAN-COMPUTER INT.', subtitle: 'Ergonomics · Interface Models', accent: 'slate', rot: 1.1 },
]

export default function AcademicPanel() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="academic-dossier-wrapper" aria-label="Academic Dossier and Active Disciplines">
      {/* Top Status Bar */}
      <div className="dossier-status-bar mono">
        <div className="status-left">
          <span className="live-led" aria-hidden="true" />
          <span className="telemetry-item">COORD. 31.25°N 75.70°E</span>
          <span className="telemetry-sep">/</span>
          <span className="telemetry-item highlight">REPORT ACTIVE</span>
        </div>
        <div className="status-right">
          <span>ARCHIVE REF: DOSSIER-2024-28 // CLASSIFIED RECORD</span>
        </div>
      </div>

      {/* Main Two-Zone Dossier Layout */}
      <div className="dossier-layout">
        {/* Zone 1: The Open Dossier Spread (Left ~65%) */}
        <motion.div
          className="dossier-book"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Paperclip clipped to top-left corner */}
          <div className="dossier-paperclip" aria-hidden="true">
            <svg viewBox="0 0 28 72" width="24" height="62" fill="none" stroke="#707a84" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 14,8 L 14,54 C 14,62 6,62 6,54 L 6,18 C 6,10 22,10 22,18 L 22,56 C 22,68 2,68 2,56 L 2,24" />
            </svg>
          </div>

          {/* Spiral/Ring Binding down the left edge */}
          <div className="spiral-binding-edge" aria-hidden="true">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="spiral-ring-item">
                <span className="spiral-hole" />
                <span className="spiral-wire" />
              </div>
            ))}
          </div>

          {/* Center Spine Crease Shadow */}
          <div className="center-spine-crease" aria-hidden="true" />

          {/* Left Page of Spread */}
          <div className="dossier-page left-page">
            {/* Faint Coffee-Ring Stain */}
            <div className="coffee-ring-stain" aria-hidden="true">
              <svg viewBox="0 0 120 120" width="120" height="120">
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(120, 85, 50, 0.09)" strokeWidth="6" strokeDasharray="28 6 42 10" />
                <circle cx="58" cy="61" r="46" fill="rgba(120, 85, 50, 0.025)" />
                <circle cx="62" cy="59" r="41" fill="none" stroke="rgba(120, 85, 50, 0.05)" strokeWidth="2.5" strokeDasharray="18 8 30 12" />
              </svg>
            </div>

            <div className="page-inner-content">
              <div className="page-kicker mono">
                <span className="kicker-num">-- 02</span>
                <span className="kicker-title">ACADEMIC DOSSIER</span>
              </div>
              <div className="dashed-separator" />

              <h3 className="dossier-headline serif">
                ACADEMIC<br />PROFILE
              </h3>

              <div className="programme-section">
                <span className="field-label-coral mono">PROGRAMME</span>
                <p className="programme-name serif">
                  B.Tech Artificial Intelligence &amp; Machine Learning
                </p>
              </div>

              <div className="hand-aside-section">
                <p className="hand aside-quote">
                  “Knowledge is experimental. Growth is iterative.”
                </p>
                <svg className="hand-swash-svg" viewBox="0 0 180 14" aria-hidden="true">
                  <path d="M 4,7 Q 55,13 95,6 T 176,7" fill="none" stroke="#cf4a45" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>

              <div className="dossier-footer-row mono">
                <span className="footer-archive">S/LAB ARCHIVE</span>
                <span className="footer-dot">·</span>
                <span className="footer-system">ACADEMIC RECORD SYSTEM</span>
                <span className="footer-spacer-rule" />
                <span className="footer-page-num">PAGE 02</span>
              </div>
            </div>
          </div>

          {/* Right Page of Spread */}
          <div className="dossier-page right-page">
            <div className="page-inner-content">
              {/* Top Row: Institution + Certified Stamp */}
              <div className="institution-header-row">
                <div className="institution-details">
                  <span className="field-label-coral mono">INSTITUTION</span>
                  <h4 className="institution-name serif">Lovely Professional University</h4>
                </div>

                <div className="certified-stamp-badge" aria-label="Certified Entry Stamp">
                  <span className="mono stamp-code">REG: 2024-28-LPU</span>
                  <strong className="mono stamp-title">CERTIFIED ENTRY</strong>
                </div>
              </div>

              <div className="page-separator-rule" />

              {/* Data Meta List */}
              <div className="academic-data-grid mono">
                <div className="data-grid-cell">
                  <span className="cell-title">ACADEMIC SPAN</span>
                  <strong className="cell-value">2024 — 2028</strong>
                </div>
                <div className="data-grid-cell">
                  <span className="cell-title">CURRENT YEAR</span>
                  <strong className="cell-value">YEAR 02 / 04</strong>
                </div>
                <div className="data-grid-cell">
                  <span className="cell-title">REGISTRATION</span>
                  <strong className="cell-value highlight-coral">ACTIVE / ENROLLED</strong>
                </div>
                <div className="data-grid-cell">
                  <span className="cell-title">STATUS</span>
                  <strong className="cell-value highlight-green">VERIFIED</strong>
                </div>
              </div>

              <div className="page-separator-rule" />

              {/* Current Position + Semester Timeline */}
              <div className="position-timeline-block">
                <span className="field-label-coral mono">CURRENT POSITION</span>
                <div className="semesters-callout">
                  <span className="count-num serif">04</span>
                  <span className="count-denom mono">/ <span className="coral-accent">08</span> SEMESTERS</span>
                </div>

                {/* 8-Dot Timeline */}
                <div className="semester-dots-timeline" aria-label="Semester progress: 4 of 8 semesters completed">
                  <div className="timeline-year-labels mono">
                    <span>YEAR 01</span>
                    <span>YEAR 02</span>
                    <span>YEAR 03</span>
                    <span>YEAR 04</span>
                  </div>
                  <div className="timeline-dots-track">
                    <div className="timeline-track-line" />
                    <div className="dots-row">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <div
                          key={sem}
                          className={`dot-station ${sem <= 4 ? 'filled' : 'hollow'} ${sem === 4 ? 'current-station' : ''}`}
                        >
                          <span className="dot-circle" />
                          <span className="dot-num mono">{String(sem).padStart(2, '0')}</span>
                          {sem === 4 && (
                            <div className="here-pointer mono">
                              <span className="pointer-triangle">▲</span>
                              <span className="pointer-text">YOU ARE HERE</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="page-separator-rule" />

              {/* Cumulative GPA Row */}
              <div className="gpa-readout-row">
                <div className="gpa-number-block">
                  <span className="field-label-coral mono">CUMULATIVE GPA</span>
                  <div className="gpa-figures">
                    <span className="gpa-val serif">8.4</span>
                    <span className="gpa-max mono">/ <span className="coral-accent">10.0</span></span>
                  </div>
                </div>

                <div className="gpa-vertical-divider" />

                <div className="gpa-aside-block">
                  <p className="hand gpa-aside-text">
                    “steady output, minimal side effects”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zone 2: Active Disciplines (Right ~35%) */}
        <div className="active-disciplines-column">
          <div className="disciplines-header-strip">
            <span className="mono disciplines-title">ACTIVE DISCIPLINES</span>
            <span className="mono disciplines-load-tag">FULL LOAD: 4/4</span>
          </div>

          <div className="disciplines-tag-stack">
            {DISCIPLINES.map((item) => (
              <motion.div
                key={item.id}
                className={`discipline-file-card tab-${item.accent}`}
                style={{ transform: `rotate(${item.rot}deg)` }}
                whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.18 } }}
              >
                <div className="card-main-body">
                  <span className="card-index-num serif">{item.num}</span>
                  <div className="card-title-group">
                    <h4 className="card-subject-name serif">{item.title}</h4>
                    <span className="card-subtitle mono">{item.subtitle}</span>
                  </div>
                </div>

                <div className={`card-tab-edge color-${item.accent}`}>
                  <span className="grommet-rivet" />
                  <span className="vertical-tab-label mono">ACTIVE</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sticky Note & Field Reference below stack */}
          <div className="stack-bottom-decorations">
            <div className="disciplines-desk-note">
              <div className="note-tape-strip" />
              <p className="hand desk-note-text">“Cross-reference all findings against core principles.”</p>
              <span className="mono desk-note-signature">— S/Lab desk</span>
            </div>

            <div className="field-id-tag-box mono">
              <span className="field-tag-dot" />
              <span>FIELD ID // 02-ACAD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}