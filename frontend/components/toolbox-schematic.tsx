'use client'

import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Cpu, Code2, Brain, Zap } from 'lucide-react'
import { type SkillCompartment, skills as staticSkills } from '@/data/content'

interface ToolboxSchematicProps {
  skills?: SkillCompartment[]
}

function getSymbolType(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('arduino')) return 'arduino'
  if (n.includes('c++') || n.includes('c /') || n.includes('c/c++') || n.includes('embedded c')) return 'terminal'
  if (n.includes('esp')) return 'esp'
  if (n.includes('sensor')) return 'sensor'
  if (n.includes('react')) return 'react'
  if (n.includes('type') || n.includes('ts')) return 'ts'
  if (n.includes('next')) return 'next'
  if (n.includes('fastapi') || n.includes('api')) return 'zap'
  if (n.includes('python')) return 'python'
  if (n.includes('scikit') || n.includes('sklearn') || n.includes('learn')) return 'nodes'
  if (n.includes('vision') || n.includes('cv') || n.includes('eye')) return 'eye'
  if (n.includes('prompt')) return 'prompt'
  return 'cpu'
}

function getDomainMeta(category: string, index: number) {
  const cat = category.toLowerCase()
  if (cat.includes('hardware') || cat.includes('firmware')) {
    return {
      id: 'hardware',
      code: 'MOD-01',
      serialNo: 'SN: HW-8842-A',
      icon: 'cpu' as const,
      annotation: '“Sensing the real world.”'
    }
  }
  if (cat.includes('web')) {
    return {
      id: 'webdev',
      code: 'MOD-02',
      serialNo: 'SN: WEB-4096-B',
      icon: 'code' as const,
      annotation: '“Making systems people can use.”'
    }
  }
  if (cat.includes('ai') || cat.includes('ml')) {
    return {
      id: 'aiml',
      code: 'MOD-03',
      serialNo: 'SN: AI-2048-C',
      icon: 'brain' as const,
      annotation: '“Teaching machines to notice patterns.”'
    }
  }
  return {
    id: `mod-${index + 1}`,
    code: `MOD-0${index + 1}`,
    serialNo: `SN: MOD-${index + 1}`,
    icon: 'code' as const,
    annotation: '“Engineering the system.”'
  }
}

function SchematicComponentGlyph({ type }: { type: string }) {
  switch (type) {
    case 'arduino':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <rect x="5" y="6" width="34" height="32" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="7" y="3" width="7" height="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="29" y="3" width="6" height="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="15" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17" cy="18" r="1.5" fill="currentColor" />
          <path d="M 13 18 L 9 18 M 13 22 L 9 22 M 13 25 L 9 25 M 31 18 L 35 18 M 31 22 L 35 22 M 31 25 L 35 25" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="34" x2="36" y2="34" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 3" />
          <ellipse cx="22" cy="10" rx="3" ry="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )
    case 'terminal':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <path d="M 7 10 L 21 10 C 31 10 37 15 37 22 C 37 29 31 34 21 34 L 7 34 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 2 15 L 7 15 M 2 29 L 7 29" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 37 22 L 42 22" stroke="currentColor" strokeWidth="2" />
          <circle cx="21" cy="22" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 27 19 L 27 25 M 24 22 L 30 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 32 19 L 32 25 M 29 22 L 35 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'esp':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <rect x="9" y="5" width="26" height="34" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 14 11 L 18 11 L 18 7 L 22 7 L 22 11 L 26 11 L 26 7 L 30 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="9" y1="14" x2="35" y2="14" stroke="currentColor" strokeWidth="1.5" />
          <rect x="13" y="18" width="18" height="16" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="22" cy="26" r="3" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M 5 20 L 9 20 M 5 25 L 9 25 M 5 30 L 9 30 M 35 20 L 39 20 M 35 25 L 39 25 M 35 30 L 39 30" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'sensor':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <circle cx="22" cy="22" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="22" cy="22" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="22" cy="22" r="2" fill="currentColor" />
          <path d="M 13 14 C 18 10 26 10 31 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 13 30 C 18 34 26 34 31 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 8 22 L 2 22 M 42 22 L 36 22 M 22 8 L 22 2 M 22 42 L 22 36" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )
    case 'react':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <ellipse cx="22" cy="22" rx="17" ry="6.5" transform="rotate(30 22 22)" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="22" cy="22" rx="17" ry="6.5" transform="rotate(90 22 22)" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <ellipse cx="22" cy="22" rx="17" ry="6.5" transform="rotate(150 22 22)" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="22" cy="22" r="3.2" fill="currentColor" />
          <circle cx="34" cy="15" r="1.6" fill="currentColor" />
          <circle cx="10" cy="29" r="1.6" fill="currentColor" />
        </svg>
      )
    case 'ts':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <rect x="6" y="6" width="32" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M 6 12 L 12 6" stroke="currentColor" strokeWidth="1.5" />
          <text x="10" y="29" fontFamily="var(--font-mono)" fontSize="18" fontWeight="bold" fill="currentColor">TS</text>
          <path d="M 28 10 L 33 10 M 28 14 L 33 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'next':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <circle cx="22" cy="22" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="22" cy="22" r="12.5" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M 14 31 L 14 13 L 29.5 31 L 29.5 13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'zap':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <rect x="7" y="8" width="30" height="28" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 25 3 L 11 23 L 23 23 L 19 41 L 33 21 L 21 21 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
          <circle cx="32" cy="14" r="1.5" fill="currentColor" />
        </svg>
      )
    case 'python':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <path d="M 22 4 C 14 4 14 7.5 14 10.5 L 14 15.5 L 28 15.5 L 28 10.5 C 28 7.5 28 4 22 4 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 22 40 C 30 40 30 36.5 30 33.5 L 30 28.5 L 16 28.5 L 16 33.5 C 16 36.5 16 40 22 40 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 14 15.5 L 8 15.5 C 5.5 15.5 5.5 19 5.5 22.5 C 5.5 26 5.5 29.5 8 29.5 L 14 29.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 30 15.5 L 36 15.5 C 38.5 15.5 38.5 19 38.5 22.5 C 38.5 26 38.5 29.5 36 29.5 L 30 29.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="9" r="1.8" fill="currentColor" />
          <circle cx="26" cy="35" r="1.8" fill="currentColor" />
        </svg>
      )
    case 'nodes':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <circle cx="10" cy="11" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="34" cy="11" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="22" cy="33" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="14.5" y1="11" x2="29.5" y2="11" stroke="currentColor" strokeWidth="1.8" />
          <line x1="13" y1="14.5" x2="19.5" y2="29" stroke="currentColor" strokeWidth="1.8" />
          <line x1="31" y1="14.5" x2="24.5" y2="29" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="22" cy="18" r="2.5" fill="currentColor" />
        </svg>
      )
    case 'eye':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <path d="M 3 22 C 9 11 35 11 41 22 C 35 33 9 33 3 22 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="22" cy="22" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="22" cy="22" r="3" fill="currentColor" />
          <path d="M 6 8 L 10 8 M 6 8 L 6 12 M 38 8 L 34 8 M 38 8 L 38 12 M 6 36 L 10 36 M 6 36 L 6 32 M 38 36 L 34 36 M 38 36 L 38 32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'prompt':
      return (
        <svg viewBox="0 0 44 44" className="schematic-glyph-svg">
          <rect x="5" y="7" width="34" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="5" y1="14" x2="39" y2="14" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="10" cy="10.5" r="1.4" fill="currentColor" />
          <circle cx="14" cy="10.5" r="1.4" fill="currentColor" />
          <path d="M 11 21 L 17 25.5 L 11 30" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="20" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )
    default:
      return <Cpu className="schematic-glyph-svg" />
  }
}

export default function ToolboxSchematic({ skills = staticSkills }: ToolboxSchematicProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const domainPanels = useMemo(() => {
    const rawList = skills && skills.length > 0 ? skills : staticSkills
    return rawList.map((compartment, index) => {
      const meta = getDomainMeta(compartment.category, index)
      return {
        id: meta.id,
        code: meta.code,
        serialNo: meta.serialNo,
        category: compartment.category.toUpperCase(),
        subtitle: (compartment.subtitle || '').toUpperCase(),
        icon: meta.icon,
        annotation: meta.annotation,
        skills: compartment.skills.map((s, sIdx) => ({
          id: `${meta.id}-${sIdx}`,
          name: s.name,
          level: s.level,
          symbolType: getSymbolType(s.name),
          isLongWire: sIdx >= 2
        }))
      }
    })
  }, [skills])

  return (
    <div className="schematic-wide-wrapper" aria-label="Physical Electronics Wiring Schematic">
      {/* Top-Left Ambient Workshop Lamp Glow */}
      <div className="lamp-ambient-glow" aria-hidden="true">
        <div className="lamp-beam-spot" />
      </div>

      {/* Collision-Free Outer Margin Sticky Notes */}
      <motion.div
        className="desk-margin-note note-left-corner"
        drag={!shouldReduceMotion}
        dragSnapToOrigin
        whileHover={{ scale: 1.05, rotate: -2 }}
      >
        <div className="tape-strip" />
        <p className="hand note-quote">“Better Tools.<br />Bigger Ideas.”</p>
        <span className="mono note-caption">— lab margin</span>
      </motion.div>

      <motion.div
        className="desk-margin-note note-right-corner"
        drag={!shouldReduceMotion}
        dragSnapToOrigin
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <div className="tape-strip" />
        <p className="hand note-quote">“Same tools.<br />Bigger dreams.”</p>
        <span className="mono note-caption">— bench note</span>
      </motion.div>

      {/* Drafting Dot Grid Overlay */}
      <div className="drafting-dot-grid" aria-hidden="true" />

      {/* Top Header Tagline Row */}
      <div className="schematic-top-tagline-row">
        <div className="tagline-container">
          <p className="hand subhead-quote">
            “A system is only as good as the tools that <span className="red-underline-target">power it.</span>”
          </p>
          <svg className="hand-underline-path" viewBox="0 0 130 9" aria-hidden="true">
            <path d="M 2,5 Q 40,8 85,4 T 128,5" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="corner-blueprint-ref mono">
          <span>SYSTEM SCHEMATIC // DWG-03-REV5</span>
          <span className="ref-status">CONNECTED HARNESS</span>
        </div>
      </div>

      {/* 1. THREE PHYSICAL INSTRUMENT PANELS */}
      <div className="schematic-domain-panels">
        {domainPanels.map((domain, dIndex) => (
          <div key={domain.id} className="domain-panel-container">
            <div className="domain-schematic-card">
              {/* Corner Screw Rivets */}
              <span className="panel-rivet top-left" />
              <span className="panel-rivet top-right" />
              <span className="panel-rivet bottom-left" />
              <span className="panel-rivet bottom-right" />

              {/* Panel Header */}
              <div className="domain-panel-header">
                <div className="title-row-top">
                  <span className="panel-mod-code mono">{domain.code}</span>
                  <span className="panel-serial-no mono">{domain.serialNo}</span>
                </div>
                <div className="title-icon-group">
                  {domain.icon === 'cpu' && <Cpu className="domain-icon" />}
                  {domain.icon === 'code' && <Code2 className="domain-icon" />}
                  {domain.icon === 'brain' && <Brain className="domain-icon" />}
                  <h3 className="domain-title mono">{domain.category}</h3>
                </div>
                <span className="domain-subtitle mono">{domain.subtitle}</span>
              </div>

              {/* Rust-Red Handwritten Margin Annotation */}
              <div className="rust-red-annotation hand">
                <span>{domain.annotation}</span>
                <svg className="rust-arrow-svg" viewBox="0 0 40 25" aria-hidden="true">
                  <path d="M 4,20 Q 20,16 32,5" fill="none" stroke="var(--red)" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M 24,8 L 32,5 L 30,14" fill="none" stroke="var(--red)" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>

              {/* ──────────────────────────── MAIN HORIZONTAL CIRCUIT BUS ─────────────────────────── */}
              <div className="panel-circuit-bus-line" aria-hidden="true">
                <span className="bus-track-wire" />
                <span className="bus-terminal-point left" />
                <span className="bus-terminal-point right" />
              </div>

              {/* 2. 2×2 CIRCUIT COMPONENT SKILLS */}
              <div className="panel-skills-grid-2x2">
                {domain.skills.map((skill, index) => {
                  const isActive = activeSkill === skill.id
                  const isBottomRow = skill.isLongWire
                  const isIntermediate = skill.level.toLowerCase().includes('intermediate')
                  return (
                    <motion.div
                      key={skill.id}
                      className={`floating-skill-node node-idx-${index} ${isBottomRow ? 'row-bottom' : 'row-top'} ${isActive ? 'active-skill' : ''}`}
                      onMouseEnter={() => setActiveSkill(skill.id)}
                      onMouseLeave={() => setActiveSkill(null)}
                      whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                    >
                      {/* Vertical Wire Pin Connector from Bus */}
                      <div className={`wire-pin-connector ${isBottomRow ? 'pin-long' : 'pin-short'} ${isActive ? 'wire-lit' : ''}`} />
                      <span className={`solder-node-dot ${isBottomRow ? 'dot-sub' : 'dot-main'} ${isActive ? 'dot-lit' : ''}`} />

                      {/* Character-Rich Component Glyph */}
                      <div className="bare-component-icon">
                        <SchematicComponentGlyph type={skill.symbolType} />
                      </div>

                      {/* Tool Name */}
                      <strong className="skill-name-label serif">{skill.name}</strong>

                      {/* Proficiency Tag */}
                      <span className={`skill-level-tag mono level-${isIntermediate ? 'intermediate' : 'beginner'}`}>
                        {isIntermediate ? '● INTERMEDIATE' : '○ BEGINNER'}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom Output Port Terminal Block on Panel Boundary */}
              <div className="panel-bottom-output-terminal mono" aria-hidden="true">
                <span className="terminal-screw" />
                <span className="terminal-label">OUT // CH_{dIndex + 1}</span>
                <span className="terminal-screw" />
              </div>
            </div>

            {/* Inter-Panel Junction Connectors */}
            {dIndex < domainPanels.length - 1 && (
              <div className="interpanel-junction-prong mono" aria-hidden="true">
                <span className="prong-wire" />
                <div className="terminal-plug">[ = BUS = ]</div>
                <span className="prong-wire" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 2. PHYSICAL WIRING HARNESS DIRECTLY TERMINATING INTO SYSTEM BUS */}
      <div className="physical-wiring-harness-area" aria-label="Physical Circuit Wiring Harness">
        <svg className="master-wiring-harness-svg" viewBox="0 0 1000 95" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 166,0 L 166,45 L 410,45 L 410,95" fill="none" stroke="#2b3b4c" strokeWidth="2.2" strokeLinejoin="miter" />
          <circle cx="166" cy="0" r="3.5" fill="#2b3b4c" />
          <circle cx="166" cy="45" r="3" fill="#2b3b4c" />
          <circle cx="410" cy="45" r="3" fill="#2b3b4c" />

          <path d="M 500,0 L 500,95" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="square" />
          <circle cx="500" cy="0" r="4" fill="var(--red)" />
          <circle cx="500" cy="45" r="3.5" fill="var(--red)" />

          <path d="M 833,0 L 833,45 L 590,45 L 590,95" fill="none" stroke="#2b3b4c" strokeWidth="2.2" strokeLinejoin="miter" />
          <circle cx="833" cy="0" r="3.5" fill="#2b3b4c" />
          <circle cx="833" cy="45" r="3" fill="#2b3b4c" />
          <circle cx="590" cy="45" r="3" fill="#2b3b4c" />

          <text x="250" y="36" fontFamily="var(--font-mono)" fontSize="11" fill="#58687a" letterSpacing="1" fontWeight="600">BUS_SIG_01:HW</text>
          <text x="635" y="36" fontFamily="var(--font-mono)" fontSize="11" fill="#58687a" letterSpacing="1" fontWeight="600">BUS_SIG_03:AI</text>
        </svg>

        {/* 3. PHYSICAL INDUSTRIAL SYSTEM BUS MODULE / JUNCTION BOX */}
        <div className="industrial-system-bus-enclosure" aria-label="Central System Bus Industrial Module">
          <div className="bus-top-terminal-strip mono" aria-hidden="true">
            <div className="terminal-socket"><span className="pin-screw" /><span>PORT_01: HW</span></div>
            <div className="terminal-socket active-port"><span className="pin-screw" /><span>PORT_02: WEB</span></div>
            <div className="terminal-socket"><span className="pin-screw" /><span>PORT_03: AI</span></div>
          </div>

          <div className="bus-chassis-faceplate">
            <span className="chassis-bolt top-left" />
            <span className="chassis-bolt top-right" />
            <span className="chassis-bolt bottom-left" />
            <span className="chassis-bolt bottom-right" />

            <div className="chassis-header-row">
              <div className="chassis-id mono">
                <span className="tag-label">MOD-CORE</span>
                <span className="tag-rev">REV 5.0</span>
              </div>
              <div className="chassis-title-group">
                <Zap className="chassis-bolt-icon" />
                <h4 className="chassis-engraved-title mono">⚡ SYSTEM BUS</h4>
              </div>
              <div className="chassis-status-indicator mono">
                <span className="status-led-beacon" />
                <span className="status-label">ACTIVE</span>
              </div>
            </div>

            <p className="hand chassis-quote">“Everything connects to ground eventually.”</p>
          </div>
        </div>
      </div>
    </div>
  )
}
