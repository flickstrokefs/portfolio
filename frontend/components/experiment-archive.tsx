'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { type Project } from '@/data/content'

export default function ExperimentArchive({ projects }: { projects: Project[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const activeProject = projects.find(p => p.id === selectedId) || null

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id))
  }

  return (
    <div className="physical-archive-container" aria-label="Physical Case File Archive">
      {/* Archive Meta Banner */}
      <div className="archive-workbench-header mono">
        <div className="workbench-status">
          <span className="archive-dot" />
          <span>CABINET: SPECIMEN LOGS // VOL. 04</span>
        </div>
        <div className="workbench-actions">
          <span>{selectedId ? 'CASE FILE OPEN FOR INSPECTION' : 'CLICK OR TAP ANY CASE FILE TO OPEN SPREAD'}</span>
          {selectedId && (
            <button
              onClick={() => setSelectedId(null)}
              className="workbench-close-btn cursor-target"
              aria-label="Close active case file"
            >
              <X size={13} /> CLOSE FILE
            </button>
          )}
        </div>
      </div>

      {/* Main Archive Desk Workspace */}
      <div className={`archive-desk-surface ${selectedId ? 'has-active-dossier' : ''}`}>
        <AnimatePresence mode="sync">
          {activeProject ? (
            /* ─────────────────────────────────────────────────────────────
               OPENED STATE: Two-Page Physical Case File Folder Dossier
               ───────────────────────────────────────────────────────────── */
            <motion.div
              key={`open-${activeProject.id}`}
              className="opened-folder-wrapper"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Folder Top Manila Tab with Tab Accent & Close Action */}
              <div className={`opened-folder-tab-bar tab-accent-${activeProject.accent}`}>
                <div className="folder-tab-left mono">
                  <span className="folder-tab-badge">{activeProject.code}</span>
                  <span className="folder-tab-title">{activeProject.title}</span>
                  <span className="folder-tab-stamp">● ACTIVE INSPECTION</span>
                </div>
                <button
                  className="folder-tab-close-btn mono cursor-target"
                  onClick={() => setSelectedId(null)}
                  aria-label="Close case file"
                >
                  <X size={14} />
                  <span>CLOSE CASE FILE</span>
                </button>
              </div>

              {/* Physical Manila Folder Body Spread */}
              <div className={`opened-folder-body spread-accent-${activeProject.accent}`}>
                {/* Physical Top Paperclip */}
                <div className="spread-paperclip" aria-hidden="true">
                  <svg viewBox="0 0 28 72" width="22" height="58" fill="none" stroke="#68737d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 14,8 L 14,54 C 14,62 6,62 6,54 L 6,18 C 6,10 22,10 22,18 L 22,56 C 22,68 2,68 2,56 L 2,24" />
                  </svg>
                </div>

                {/* Spine Crease / Binding Line */}
                <div className="spread-spine-crease" aria-hidden="true" />

                {/* LEFT SPREAD: Case Information Document */}
                <div className="spread-page spread-page-left">
                  {/* Stamped Watermark Header */}
                  <div className="page-header-row mono">
                    <div className="classified-tag">
                      <span className="dot" />
                      <span>CLASSIFIED // FIELD DEPLOYMENT</span>
                    </div>
                    <span className="archive-serial">REF: {activeProject.code}-2025</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="case-project-title serif">{activeProject.title}</h3>

                  {/* Objective */}
                  <div className="case-field-group">
                    <span className="case-field-label mono">OBJECTIVE //</span>
                    <p className="case-objective-text serif">{activeProject.objective}</p>
                  </div>

                  {/* Tools / Stack */}
                  <div className="case-field-group">
                    <span className="case-field-label mono">TOOLS / STACK //</span>
                    <div className="tools-chip-row mono">
                      {activeProject.tools.map((tool, idx) => (
                        <span key={idx} className="tool-chip">
                          <span className="tool-dot" /> {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contribution & Outcome Two-Column Grid */}
                  <div className="case-two-col-grid">
                    <div className="case-col-cell">
                      <span className="case-field-label mono">CONTRIBUTION //</span>
                      <p className="case-detail-text">{activeProject.contribution}</p>
                    </div>
                    <div className="case-col-cell">
                      <span className="case-field-label mono">OUTCOME //</span>
                      <p className="case-detail-text">{activeProject.outcome}</p>
                    </div>
                  </div>

                  {/* Key Learning Handwritten Note */}
                  <div className="case-learning-aside">
                    <span className="case-field-label mono">KEY LEARNING //</span>
                    <p className="hand case-learning-quote">“{activeProject.learning}”</p>
                    <svg className="aside-red-swash" viewBox="0 0 160 10" aria-hidden="true">
                      <path d="M 4,5 Q 45,9 85,4 T 156,5" fill="none" stroke="#cf4a45" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Footer Seal Action Link */}
                  <div className="case-page-footer">
                    <a href="#contact" className="case-seal-button mono">
                      <span>GITHUB CROSS-REFERENCE</span>
                      <ArrowUpRight size={14} />
                    </a>
                    <span className="page-stamp-code mono">S/LAB EXP-RECORD</span>
                  </div>
                </div>

                {/* RIGHT SPREAD: Technical Blueprint Pinned Sheet */}
                <div className="spread-page spread-page-right">
                  {/* Top Tape Fasteners */}
                  <div className="sheet-tape-strip top-left" aria-hidden="true" />
                  <div className="sheet-tape-strip top-right" aria-hidden="true" />

                  {/* Blueprint Sheet Card */}
                  <div className="pinned-blueprint-sheet">
                    <div className="blueprint-sheet-header mono">
                      <div className="schematic-doc-id">
                        <span className="schematic-badge">[ SCHEMATIC ]</span>
                        <span>DWG-{activeProject.code} // SYSTEM MAP</span>
                      </div>
                      <span className="schematic-status">REV 2.1 VERIFIED</span>
                    </div>

                    {/* Dedicated SVG System Map Diagram */}
                    <div className="blueprint-schematic-canvas">
                      <ProjectTechnicalSchematic projectId={activeProject.id} accent={activeProject.accent} />
                    </div>

                    <div className="blueprint-sheet-footer mono">
                      <span className="foot-note">ARCHITECTURE FLOW & SIGNAL PATH</span>
                      <span className="foot-rev">SYS_BUS // VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Files Quick-Switcher Tray */}
              <div className="archive-quick-switcher">
                <span className="switcher-label mono">ARCHIVE FOLDERS:</span>
                <div className="switcher-tabs-row">
                  {projects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      className={`switcher-tab-chip mono cursor-target ${p.id === activeProject.id ? 'is-active' : ''} accent-${p.accent}`}
                    >
                      <span className="chip-code">{p.code}</span>
                      <span className="chip-name">{p.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─────────────────────────────────────────────────────────────
               CLOSED STATE: Physical Staggered & Overlapping Folder Archive
               ───────────────────────────────────────────────────────────── */
            <motion.div
              key="closed-archive-grid"
              className="folders-archive-grid"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {projects.map((project, index) => {
                // Organic slight independent rotations for realistic desk scatter
                const rotations = [-1.8, 1.4, -0.9, 2.1, -1.2]
                const rot = rotations[index % rotations.length]

                return (
                  <motion.div
                    key={project.id}
                    className={`physical-folder-object folder-accent-${project.accent} cursor-target`}
                    style={{ transform: `rotate(${rot}deg)` }}
                    whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015, transition: { duration: 0.18 } }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleSelect(project.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(project.id) }}
                    aria-label={`Open folder ${project.code} ${project.title}`}
                  >
                    {/* Dog-eared corner */}
                    <div className="folder-dog-ear" aria-hidden="true" />

                    {/* Paperclip on select folders for physical touch */}
                    {index % 2 === 0 && (
                      <div className="folder-corner-paperclip" aria-hidden="true">
                        <svg viewBox="0 0 24 60" width="16" height="42" fill="none" stroke="#727d88" strokeWidth="2.4">
                          <path d="M 12,6 L 12,46 C 12,52 6,52 6,46 L 6,14 C 6,8 18,8 18,14 L 18,48 C 18,58 2,58 2,48 L 2,20" />
                        </svg>
                      </div>
                    )}

                    {/* Folder Tab with EXP code */}
                    <div className={`folder-tab-ear tab-color-${project.accent}`}>
                      <span className="tab-code-label mono">{project.code}</span>
                      <span className="tab-open-indicator mono">OPEN ↗</span>
                    </div>

                    {/* Folder Face Cover */}
                    <div className="folder-cover-face">
                      <div className="folder-cover-top mono">
                        <span className="archive-stamp">S/LAB FILE RECORD</span>
                        <span className="folder-status-pill">CONFIDENTIAL</span>
                      </div>

                      <div className="folder-center-title-block">
                        <h4 className="folder-title serif">{project.title}</h4>
                        <p className="folder-synopsis serif">{project.objective}</p>
                      </div>

                      <div className="folder-cover-bottom">
                        <div className="folder-stack-tags mono">
                          {project.tools.slice(0, 3).map((tool, tIdx) => (
                            <span key={tIdx} className="mini-tag">{tool}</span>
                          ))}
                        </div>
                        <div className="inspect-cue mono">
                          <span>CLICK TO OPEN SPREAD</span>
                          <ArrowUpRight size={13} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Technical SVG Diagrams Customized for Each Experiment
   ───────────────────────────────────────────────────────────── */
function ProjectTechnicalSchematic({ projectId, accent }: { projectId: string; accent: Project['accent'] }) {
  const strokeColor = accent === 'red' ? '#cf4a45' : accent === 'blue' ? '#4a82af' : '#73879c'
  const dotColor = accent === 'red' ? '#cf4a45' : accent === 'blue' ? '#5a9bcf' : '#94a9bf'

  switch (projectId) {
    case 'sentinel':
      return (
        <svg viewBox="0 0 520 220" className="schematic-svg" aria-label="Sentinel Architecture Flow">
          <defs>
            <pattern id="grid-pattern-sentinel" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="520" height="220" fill="url(#grid-pattern-sentinel)" />

          {/* Module 1: Sensor Signal Sources */}
          <rect x="25" y="35" width="100" height="50" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="58" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">SIG_STREAM</text>
          <text x="75" y="72" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">NOISY SENSORS</text>

          {/* Bus Wire to Ingestion */}
          <path d="M 125,60 L 175,60" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="125" cy="60" r="3" fill={dotColor} />
          <circle cx="175" cy="60" r="3" fill={dotColor} />

          {/* Module 2: FastAPI Ingestion Core */}
          <rect x="175" y="35" width="120" height="150" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="235" y="56" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">FASTAPI ENGINE</text>
          <line x1="185" y1="66" x2="285" y2="66" stroke="#253c52" strokeWidth="1" />
          <rect x="188" y="78" width="94" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="235" y="96" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">STATE NORMALIZER</text>
          <rect x="188" y="118" width="94" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="235" y="136" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">ANOMALY BUFFER</text>
          <text x="235" y="170" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">LATENCY: &lt;12ms</text>

          {/* Bus Wire to React UI & Alert Engine */}
          <path d="M 295,92 L 355,92 L 355,55 L 390,55" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 295,132 L 355,132 L 355,160 L 390,160" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          {/* Module 3: React Signal Dashboard */}
          <rect x="390" y="30" width="105" height="50" rx="3" fill="#0c1b2a" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="442" y="53" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">REACT DASHBOARD</text>
          <text x="442" y="68" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">REAL-TIME HUD</text>

          {/* Module 4: Alert Dispatch Matrix */}
          <rect x="390" y="135" width="105" height="50" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="442" y="158" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">ALERT DISPATCH</text>
          <text x="442" y="173" fill={dotColor} fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">ACTIVE BROADCAST</text>
        </svg>
      )

    case 'aqua':
      return (
        <svg viewBox="0 0 520 220" className="schematic-svg" aria-label="AquaSentinel Sensing Pipeline">
          <defs>
            <pattern id="aqua-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="520" height="220" fill="url(#aqua-grid-pattern)" />

          {/* Probe 1: Turbidity Probe */}
          <rect x="25" y="35" width="100" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="56" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">TURBIDITY PROBE</text>
          <text x="75" y="68" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">OPTICAL SCATTER</text>

          {/* Probe 2: pH Electrode */}
          <rect x="25" y="90" width="100" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="111" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">pH ELECTRODE</text>
          <text x="75" y="123" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">mV DIFFERENTIAL</text>

          {/* Probe 3: Temp / TDS */}
          <rect x="25" y="145" width="100" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="166" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">TDS / THERMAL</text>
          <text x="75" y="178" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">ONE-WIRE BUS</text>

          {/* Wiring Harness to Microcontroller */}
          <path d="M 125,56 L 165,56 L 165,110 L 195,110" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 125,111 L 195,111" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 125,166 L 165,166 L 165,112 L 195,112" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          {/* Arduino / Embedded Processing Node */}
          <rect x="195" y="45" width="130" height="135" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="260" y="70" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">ARDUINO MCU</text>
          <rect x="208" y="85" width="104" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="260" y="103" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">ADC COND. / FILTER</text>
          <rect x="208" y="125" width="104" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="260" y="143" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">THRESHOLD LOGIC</text>

          {/* Output to Telemetry Packet */}
          <path d="M 325,112 L 385,112" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="325" cy="112" r="3" fill={dotColor} />
          <circle cx="385" cy="112" r="3" fill={dotColor} />

          {/* Module 3: Field Logger & Alert Flag */}
          <rect x="385" y="80" width="110" height="65" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="440" y="105" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">FIELD LOG / SD</text>
          <text x="440" y="122" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">ANOMALY FLAG: OK</text>
          <text x="440" y="136" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">SAMPLE INTERVAL: 5s</text>
        </svg>
      )

    case 'miwa':
      return (
        <svg viewBox="0 0 520 220" className="schematic-svg" aria-label="MIWA Conversational Architecture">
          <defs>
            <pattern id="miwa-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="520" height="220" fill="url(#miwa-grid-pattern)" />

          {/* Input: Utterance Stream */}
          <rect x="25" y="75" width="105" height="65" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="77" y="102" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">USER PROMPT</text>
          <text x="77" y="118" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">TEXT / VOICE IN</text>

          <path d="M 130,107 L 180,107" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="130" cy="107" r="3" fill={dotColor} />
          <circle cx="180" cy="107" r="3" fill={dotColor} />

          {/* Central State Engine */}
          <rect x="180" y="40" width="140" height="140" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="250" y="65" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">MIWA CONTEXT BUS</text>
          <rect x="195" y="80" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="250" y="97" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">INTENT PARSER</text>
          <rect x="195" y="115" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="250" y="132" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">MEMORY ROSTER</text>
          <text x="250" y="165" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">CALM PACING ENGINE</text>

          <path d="M 320,107 L 375,107" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="320" cy="107" r="3" fill={dotColor} />
          <circle cx="375" cy="107" r="3" fill={dotColor} />

          {/* LLM Synthesis Output */}
          <rect x="375" y="75" width="120" height="65" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="102" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">SYNTHESIS LAYER</text>
          <text x="435" y="118" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">DELIBERATE OUTPUT</text>
          <text x="435" y="132" fill={dotColor} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">LOW COGNITIVE LOAD</text>
        </svg>
      )

    case 'avionics':
      return (
        <svg viewBox="0 0 520 220" className="schematic-svg" aria-label="Avionics State Telemetry Architecture">
          <defs>
            <pattern id="avionics-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="520" height="220" fill="url(#avionics-grid-pattern)" />

          {/* Sensors: IMU + Barometer */}
          <rect x="25" y="45" width="105" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="77" y="66" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">6-DOF IMU</text>
          <text x="77" y="78" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">ACCEL / GYRO</text>

          <rect x="25" y="125" width="105" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="77" y="146" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">BAROMETER</text>
          <text x="77" y="158" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">ALTITUDE / PRESSURE</text>

          <path d="M 130,66 L 160,66 L 160,105 L 185,105" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 130,146 L 160,146 L 160,115 L 185,115" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          {/* Flight Computer Core */}
          <rect x="185" y="40" width="135" height="140" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="252" y="65" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">FLIGHT COMPUTER</text>
          <rect x="198" y="80" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="253" y="97" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">KALMAN STATE EST.</text>
          <rect x="198" y="115" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="253" y="132" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">APOGEE DETECTION</text>
          <text x="252" y="165" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">CYCLE TIME: 100Hz</text>

          <path d="M 320,110 L 375,110" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="320" cy="110" r="3" fill={dotColor} />
          <circle cx="375" cy="110" r="3" fill={dotColor} />

          {/* Ground Telemetry Downlink */}
          <rect x="375" y="75" width="120" height="65" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="102" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">RF DOWNLINK</text>
          <text x="435" y="118" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">GROUND TELEMETRY</text>
          <text x="435" y="132" fill={dotColor} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">PACKET LOSS: 0.02%</text>
        </svg>
      )

    case 'heartbeat':
    default:
      return (
        <svg viewBox="0 0 520 220" className="schematic-svg" aria-label="Heartbeat Keychain Biometric PWM Architecture">
          <defs>
            <pattern id="heart-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="520" height="220" fill="url(#heart-grid-pattern)" />

          {/* Optical Pulse Sensor */}
          <rect x="25" y="70" width="105" height="70" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="77" y="97" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">OPTICAL PPG</text>
          <text x="77" y="113" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">530nm GREEN LED</text>
          <text x="77" y="127" fill={dotColor} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">RAW PHOTODIODE</text>

          <path d="M 130,105 L 180,105" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="130" cy="105" r="3" fill={dotColor} />
          <circle cx="180" cy="105" r="3" fill={dotColor} />

          {/* ESP32 Peak Detector */}
          <rect x="180" y="40" width="135" height="140" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="247" y="65" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">ESP32 LOW-POWER</text>
          <rect x="195" y="80" width="105" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="247" y="97" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">PEAK DETECTION</text>
          <rect x="195" y="115" width="105" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="247" y="132" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">PWM WAVE SHAPER</text>
          <text x="247" y="165" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">DEEP SLEEP: 15uA</text>

          <path d="M 315,105 L 375,105" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="315" cy="105" r="3" fill={dotColor} />
          <circle cx="375" cy="105" r="3" fill={dotColor} />

          {/* Haptic Motor / Tactile Feedback */}
          <rect x="375" y="70" width="120" height="70" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="435" y="97" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">HAPTIC COIL</text>
          <text x="435" y="113" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">TACTILE HEARTBEAT</text>
          <text x="435" y="127" fill={dotColor} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">RESONANT PULSE</text>
        </svg>
      )
  }
}
