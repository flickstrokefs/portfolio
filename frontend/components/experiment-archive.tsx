'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, X, ExternalLink, Code2 } from 'lucide-react'
import Image from 'next/image'
import { type Project } from '@/data/content'

export default function ExperimentArchive({ projects }: { projects: Project[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const activeProject = projects.find(p => p.id === selectedId) || null

  // Reset active image index when switching projects
  useEffect(() => {
    setActiveImageIndex(0)
  }, [selectedId])

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id))
  }

  const projectImages = activeProject?.images ?? []
  const hasImages = projectImages.length > 0
  const currentImage = hasImages ? projectImages[activeImageIndex] : null

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasImages) return
    setActiveImageIndex(prev => (prev === 0 ? projectImages.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasImages) return
    setActiveImageIndex(prev => (prev === projectImages.length - 1 ? 0 : prev + 1))
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

                  {/* Footer Seal & Actions */}
                  <div className="case-page-footer">
                    <div className="case-actions-group">
                      {activeProject.github && (
                        <a
                          href={activeProject.github.startsWith('http') ? activeProject.github : `https://${activeProject.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="case-seal-button mono cursor-target"
                        >
                          <Code2 size={13} />
                          <span>GITHUB ↗</span>
                        </a>
                      )}
                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl.startsWith('http') ? activeProject.liveUrl : `https://${activeProject.liveUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="case-seal-button live mono cursor-target"
                        >
                          <ExternalLink size={13} />
                          <span>LIVE DEMO ↗</span>
                        </a>
                      )}
                    </div>
                    <span className="page-stamp-code mono">S/LAB EXP-RECORD</span>
                  </div>
                </div>

                {/* RIGHT SPREAD: Technical Blueprint Pinned Sheet or Media Viewer */}
                <div className="spread-page spread-page-right">
                  {/* Top Tape Fasteners */}
                  <div className="sheet-tape-strip top-left" aria-hidden="true" />
                  <div className="sheet-tape-strip top-right" aria-hidden="true" />

                  {hasImages && currentImage ? (
                    /* ── PROJECT MEDIA VIEWER ── */
                    <div className="pinned-blueprint-sheet media-viewer-sheet">
                      <div className="blueprint-sheet-header mono">
                        <div className="schematic-doc-id">
                          <span className="schematic-badge">[ SPECIMEN VISUALS ]</span>
                          <span>EXP-{activeProject.code} // EVIDENCE</span>
                        </div>
                        <span className="schematic-status">
                          {projectImages.length > 1
                            ? `FRAME ${activeImageIndex + 1}/${projectImages.length}`
                            : 'FRAME 1/1'}
                        </span>
                      </div>

                      {/* Primary Image Container */}
                      <div className="project-media-frame">
                        <div className="media-image-wrapper">
                          <Image
                            src={currentImage.src}
                            alt={currentImage.alt || `${activeProject.title} screenshot`}
                            fill
                            sizes="(max-width: 768px) 100vw, 550px"
                            className="project-screenshot-img"
                            priority
                          />
                        </div>

                        {/* Navigation controls if multiple images */}
                        {projectImages.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevImage}
                              className="media-nav-arrow prev cursor-target"
                              aria-label="Previous screenshot"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="media-nav-arrow next cursor-target"
                              aria-label="Next screenshot"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Indicator Dots for Multiple Images */}
                      {projectImages.length > 1 && (
                        <div className="media-pager-dots" aria-label="Screenshot gallery pages">
                          {projectImages.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => setActiveImageIndex(dotIdx)}
                              className={`pager-dot-btn cursor-target ${dotIdx === activeImageIndex ? 'is-active' : ''}`}
                              aria-label={`View image ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Image Caption & Direct Actions */}
                      <div className="media-sheet-caption-row">
                        <p className="mono media-caption-text">
                          {currentImage.caption || currentImage.alt}
                        </p>
                        <div className="media-dossier-links">
                          {activeProject.github && (
                            <a
                              href={activeProject.github.startsWith('http') ? activeProject.github : `https://${activeProject.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="media-action-stamp mono cursor-target"
                            >
                              GITHUB ↗
                            </a>
                          )}
                          {activeProject.liveUrl && (
                            <a
                              href={activeProject.liveUrl.startsWith('http') ? activeProject.liveUrl : `https://${activeProject.liveUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="media-action-stamp live mono cursor-target"
                            >
                              LIVE DEMO ↗
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="blueprint-sheet-footer mono">
                        <span className="foot-note">PHOTOGRAPHIC LOG & ARTIFACT EVIDENCE</span>
                        <span className="foot-rev">VERIFIED CAPTURE</span>
                      </div>
                    </div>
                  ) : (
                    /* ── TECHNICAL SCHEMATIC FALLBACK ── */
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
                  )}
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
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {projects.map((project, idx) => {
                const isOdd = idx % 2 !== 0
                const tabOffsetClass = `tab-pos-${(idx % 4) + 1}`

                return (
                  <motion.div
                    key={project.id}
                    className={`physical-folder-object tab-color-${project.accent} ${tabOffsetClass} cursor-target`}
                    onClick={() => handleSelect(project.id)}
                    whileHover={shouldReduceMotion ? {} : { y: -6, rotate: isOdd ? 0.6 : -0.6, scale: 1.01 }}
                    transition={{ duration: 0.18 }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open case file ${project.code}: ${project.title}`}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleSelect(project.id)
                      }
                    }}
                  >
                    {/* Manila Folder Tab Ear */}
                    <div className={`folder-tab-ear tab-color-${project.accent}`}>
                      <span className="folder-exp-code">{project.code}</span>
                      <span className="folder-tab-name">{project.title}</span>
                      <span className="tab-open-indicator">↗ INSPECT</span>
                    </div>

                    {/* Corner Paperclip & Dog-ear */}
                    <div className="folder-corner-paperclip" aria-hidden="true">
                      <svg viewBox="0 0 28 72" width="16" height="42" fill="none" stroke="#7e7663" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M 14,8 L 14,54 C 14,62 6,62 6,54 L 6,18 C 6,10 22,10 22,18 L 22,56 C 22,68 2,68 2,56 L 2,24" />
                      </svg>
                    </div>

                    {/* Manila Folder Cover Front */}
                    <div className="folder-cover-face">
                      <div className="folder-cover-top mono">
                        <span className="archive-stamp">[ CASE FILE ]</span>
                        <span className="folder-status-pill">{project.status}</span>
                      </div>

                      <div className="folder-center-title-block">
                        <h3 className="folder-title serif">{project.title}</h3>
                        <p className="folder-synopsis serif">{project.objective}</p>
                      </div>

                      <div className="folder-cover-bottom">
                        <div className="folder-stack-tags mono">
                          {project.tools.slice(0, 3).map((tool, tIdx) => (
                            <span key={tIdx} className="mini-tag">{tool}</span>
                          ))}
                        </div>
                        <div className="inspect-cue mono">
                          <span>INSPECT FILE</span>
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

          <rect x="25" y="35" width="100" height="50" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="58" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">SIG_STREAM</text>
          <text x="75" y="72" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">NOISY SENSORS</text>

          <path d="M 125,60 L 175,60" fill="none" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="125" cy="60" r="3" fill={dotColor} />
          <circle cx="175" cy="60" r="3" fill={dotColor} />

          <rect x="175" y="35" width="120" height="150" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="235" y="56" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">FASTAPI ENGINE</text>
          <line x1="185" y1="66" x2="285" y2="66" stroke="#253c52" strokeWidth="1" />
          <rect x="188" y="78" width="94" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="235" y="96" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">STATE NORMALIZER</text>
          <rect x="188" y="118" width="94" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="235" y="136" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">ANOMALY BUFFER</text>
          <text x="235" y="170" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">LATENCY: &lt;12ms</text>

          <path d="M 295,92 L 355,92 L 355,55 L 390,55" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 295,132 L 355,132 L 355,160 L 390,160" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          <rect x="390" y="30" width="105" height="50" rx="3" fill="#0c1b2a" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="442" y="53" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">REACT DASHBOARD</text>
          <text x="442" y="68" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">REAL-TIME HUD</text>

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

          <rect x="25" y="35" width="100" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="56" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">TURBIDITY PROBE</text>
          <text x="75" y="68" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">OPTICAL SCATTER</text>

          <rect x="25" y="90" width="100" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="111" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">pH ELECTRODE</text>
          <text x="75" y="123" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">mV DIFFERENTIAL</text>

          <rect x="25" y="145" width="100" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="75" y="166" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">TDS / THERMAL</text>
          <text x="75" y="178" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">ONE-WIRE BUS</text>

          <path d="M 125,56 L 165,56 L 165,110 L 195,110" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 125,111 L 195,111" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 125,166 L 165,166 L 165,112 L 195,112" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          <rect x="195" y="45" width="130" height="135" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="260" y="70" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">ARDUINO MCU</text>
          <rect x="208" y="85" width="104" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="260" y="103" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">ADC COND. / FILTER</text>
          <rect x="208" y="125" width="104" height="28" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="260" y="143" fill="#bad2e6" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">THRESHOLD LOGIC</text>

          <path d="M 325,112 L 385,112" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="325" cy="112" r="3" fill={dotColor} />
          <circle cx="385" cy="112" r="3" fill={dotColor} />

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

          <rect x="25" y="45" width="105" height="50" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="77" y="68" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">USER PROMPT</text>
          <text x="77" y="82" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">NATURAL INPUT</text>

          <path d="M 130,70 L 180,70" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <circle cx="130" cy="70" r="3" fill={dotColor} />
          <circle cx="180" cy="70" r="3" fill={dotColor} />

          <rect x="180" y="35" width="140" height="150" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="250" y="56" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">MIWA CONTEXT ENG.</text>
          <line x1="190" y1="66" x2="310" y2="66" stroke="#253c52" strokeWidth="1" />
          <rect x="195" y="78" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="250" y="95" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">CONTEXT WINDOW</text>
          <rect x="195" y="112" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="250" y="129" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">CONFIDENCE FILTER</text>
          <text x="250" y="165" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">LATENCY: STREAMING</text>

          <path d="M 320,70 L 380,70" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 320,125 L 380,125" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          <rect x="380" y="45" width="115" height="50" rx="3" fill="#0c1b2a" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="437" y="68" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">STREAMED RESP.</text>
          <text x="437" y="82" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">CHUNKS / TOKEN</text>

          <rect x="380" y="105" width="115" height="50" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="437" y="128" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">HUMAN STATE</text>
          <text x="437" y="142" fill={dotColor} fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">STATUS: CALM</text>
        </svg>
      )

    case 'avionics':
      return (
        <svg viewBox="0 0 520 220" className="schematic-svg" aria-label="Rocket Avionics Telemetry Path">
          <defs>
            <pattern id="avionics-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="520" height="220" fill="url(#avionics-grid-pattern)" />

          <rect x="25" y="35" width="95" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="72" y="56" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">IMU / ACCEL</text>
          <text x="72" y="68" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">6-DOF I2C</text>

          <rect x="25" y="90" width="95" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="72" y="111" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">BARO / ALTI</text>
          <text x="72" y="123" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">SPI PRESSURE</text>

          <rect x="25" y="145" width="95" height="42" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="72" y="166" fill="#e8edf2" fontSize="8.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">GPS MOD</text>
          <text x="72" y="178" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">UART NMEA</text>

          <path d="M 120,56 L 165,56 L 165,110 L 190,110" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 120,111 L 190,111" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 120,166 L 165,166 L 165,112 L 190,112" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          <rect x="190" y="40" width="135" height="145" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="257" y="64" fill="#e8edf2" fontSize="9.5" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">FLIGHT COMP. MCU</text>
          <rect x="202" y="78" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="257" y="95" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">APOGEE DETECTOR</text>
          <rect x="202" y="112" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="257" y="129" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">PYRO RECOVERY CH</text>
          <text x="257" y="165" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">BUS: 100Hz POLLING</text>

          <path d="M 325,112 L 385,112" fill="none" stroke={strokeColor} strokeWidth="2" />
          <circle cx="325" cy="112" r="3" fill={dotColor} />
          <circle cx="385" cy="112" r="3" fill={dotColor} />

          <rect x="385" y="70" width="115" height="85" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="442" y="95" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">TELEMETRY RF</text>
          <text x="442" y="112" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">LINK: 433 MHz</text>
          <text x="442" y="128" fill="#7d93a8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">GROUND LINK OK</text>
          <text x="442" y="142" fill="#bad2e6" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">PACKET LOSS: 0%</text>
        </svg>
      )

    case 'heartbeat':
      return (
        <svg viewBox="0 0 520 220" className="schematic-svg" aria-label="Heartbeat Biometric Feedback Loop">
          <defs>
            <pattern id="heartbeat-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="520" height="220" fill="url(#heartbeat-grid-pattern)" />

          <rect x="25" y="55" width="105" height="50" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="77" y="78" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">PULSE SENSOR</text>
          <text x="77" y="92" fill="#7d93a8" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">PPG IR TRANSDUCER</text>

          <path d="M 130,80 L 180,80" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <circle cx="130" cy="80" r="3" fill={dotColor} />
          <circle cx="180" cy="80" r="3" fill={dotColor} />

          <rect x="180" y="35" width="140" height="150" rx="3" fill="#081422" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="250" y="58" fill="#e8edf2" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">ESP32 LOW-POWER</text>
          <line x1="190" y1="68" x2="310" y2="68" stroke="#253c52" strokeWidth="1" />
          <rect x="195" y="80" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="250" y="97" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">ANALOG PEAK DETECT</text>
          <rect x="195" y="115" width="110" height="26" rx="2" fill="#122538" stroke="#3b5a78" strokeWidth="1" />
          <text x="250" y="132" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">HAPTIC PWM TIMING</text>
          <text x="250" y="165" fill={dotColor} fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">CURRENT: &lt;4.2mA</text>

          <path d="M 320,90 L 375,90 L 375,60 L 395,60" fill="none" stroke={strokeColor} strokeWidth="1.8" />
          <path d="M 320,130 L 375,130 L 375,150 L 395,150" fill="none" stroke={strokeColor} strokeWidth="1.8" />

          <rect x="395" y="35" width="105" height="50" rx="3" fill="#0c1b2a" stroke="#5d85a6" strokeWidth="1.5" />
          <text x="447" y="58" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">HAPTIC MOTOR</text>
          <text x="447" y="72" fill="#bad2e6" fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">TACTILE PULSE</text>

          <rect x="395" y="125" width="105" height="50" rx="3" fill="#0c1b2a" stroke={strokeColor} strokeWidth="1.5" />
          <text x="447" y="148" fill="#e8edf2" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">DIFFUSED LED</text>
          <text x="447" y="162" fill={dotColor} fontSize="7.5" fontFamily="var(--font-mono)" textAnchor="middle">WARM GLOW SYNC</text>
        </svg>
      )

    default:
      return null
  }
}
