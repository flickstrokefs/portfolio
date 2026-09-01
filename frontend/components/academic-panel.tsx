'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { type Academic } from '@/data/content'

const ACCENTS = ['red', 'amber', 'olive', 'slate']

interface AcademicPanelProps {
  academic: Academic
}

export default function AcademicPanel({ academic }: AcademicPanelProps) {
  const shouldReduceMotion = useReducedMotion()

  const programme = academic?.programme || 'B.Tech Artificial Intelligence & Machine Learning'
  const institution = academic?.institution || 'Lovely Professional University'
  const registrationCode = academic?.registration_code || '2024-28-LPU'
  const academicSpan = academic ? `${academic.academic_span_start} — ${academic.academic_span_end}` : '2024 — 2028'
  const currentYearNum = academic?.current_semester ? Math.ceil(academic.current_semester / 2) : 2
  const totalYearsNum = academic?.total_semesters ? Math.ceil(academic.total_semesters / 2) : 4
  const currentYear = `YEAR ${String(currentYearNum).padStart(2, '0')} / ${String(totalYearsNum).padStart(2, '0')}`
  const currentSemester = academic?.current_semester ?? 3
  const totalSemesters = academic?.total_semesters ?? 8
  const cgpa = academic?.cgpa !== undefined ? Number(academic.cgpa).toFixed(1) : '9.3'
  const maxCgpa = academic?.cgpa_scale !== undefined ? Number(academic.cgpa_scale).toFixed(1) : '10.0'
  const registrationStatus = academic?.registration_status || 'ACTIVE'
  const recordStatus = academic?.record_status || 'VERIFIED'
  const disciplinesList = academic?.disciplines || []

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
          <span>ARCHIVE REF: {registrationCode} // CLASSIFIED RECORD</span>
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
                  {programme}
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
                  <h4 className="institution-name serif">{institution}</h4>
                </div>

                <div className="certified-stamp-badge" aria-label="Certified Entry Stamp">
                  <span className="mono stamp-code">{registrationCode}</span>
                  <strong className="mono stamp-title">{recordStatus} ENTRY</strong>
                </div>
              </div>

              <div className="page-separator-rule" />

              {/* Data Meta List */}
              <div className="academic-data-grid mono">
                <div className="data-grid-cell">
                  <span className="cell-title">ACADEMIC SPAN</span>
                  <strong className="cell-value">{academicSpan}</strong>
                </div>
                <div className="data-grid-cell">
                  <span className="cell-title">CURRENT YEAR</span>
                  <strong className="cell-value">{currentYear}</strong>
                </div>
                <div className="data-grid-cell">
                  <span className="cell-title">REGISTRATION</span>
                  <strong className="cell-value highlight-coral">{registrationStatus}</strong>
                </div>
                <div className="data-grid-cell">
                  <span className="cell-title">STATUS</span>
                  <strong className="cell-value highlight-green">{recordStatus}</strong>
                </div>
              </div>

              <div className="page-separator-rule" />

              {/* Current Position + Semester Timeline */}
              <div className="position-timeline-block">
                <span className="field-label-coral mono">CURRENT POSITION</span>
                <div className="semesters-callout">
                  <span className="count-num serif">{String(currentSemester).padStart(2, '0')}</span>
                  <span className="count-denom mono">/ <span className="coral-accent">{String(totalSemesters).padStart(2, '0')}</span> SEMESTERS</span>
                </div>

                {/* Dynamic Semester Dots Timeline */}
                <div className="semester-dots-timeline" aria-label={`Semester progress: ${currentSemester} of ${totalSemesters} semesters completed`}>
                  <div className="timeline-year-labels mono">
                    <span>YEAR 01</span>
                    <span>YEAR 02</span>
                    <span>YEAR 03</span>
                    <span>YEAR 04</span>
                  </div>
                  <div className="timeline-dots-track">
                    <div className="timeline-track-line" />
                    <div className="dots-row">
                      {[...Array(totalSemesters)].map((_, idx) => {
                        const sem = idx + 1
                        return (
                          <div
                            key={sem}
                            className={`dot-station ${sem <= currentSemester ? 'filled' : 'hollow'} ${sem === currentSemester ? 'current-station' : ''}`}
                          >
                            <span className="dot-circle" />
                            <span className="dot-num mono">{String(sem).padStart(2, '0')}</span>
                            {sem === currentSemester && (
                              <div className="here-pointer mono">
                                <span className="pointer-triangle">▲</span>
                                <span className="pointer-text">YOU ARE HERE</span>
                              </div>
                            )}
                          </div>
                        )
                      })}
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
                    <span className="gpa-val serif">{cgpa}</span>
                    <span className="gpa-max mono">/ <span className="coral-accent">{maxCgpa}</span></span>
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
            <span className="mono disciplines-load-tag">FULL LOAD: {disciplinesList.length}/{disciplinesList.length}</span>
          </div>

          <div className="disciplines-tag-stack">
            {disciplinesList.map((item, i: number) => {
              const rotation = i % 2 === 0 ? -1.2 + i * 0.3 : 1.4 - i * 0.3
              const accentColor = ACCENTS[i % ACCENTS.length]
              const title = item.name
              return (
                <motion.div
                  key={i}
                  className={`discipline-file-card tab-${accentColor}`}
                  style={{ transform: `rotate(${rotation}deg)` }}
                  whileHover={{ y: -3, scale: 1.01, transition: { duration: 0.18 } }}
                >
                  <div className="card-main-body">
                    <span className="card-index-num serif">{String(i + 1).padStart(2, '0')}</span>
                    <div className="card-title-group">
                      <h4 className="card-subject-name serif">{title}</h4>
                      <span className="card-subtitle mono">{item.subtitle}</span>
                    </div>
                  </div>

                  <div className={`card-tab-edge color-${accentColor}`}>
                    <span className="grommet-rivet" />
                    <span className="vertical-tab-label mono">ACTIVE</span>
                  </div>
                </motion.div>
              )
            })}
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