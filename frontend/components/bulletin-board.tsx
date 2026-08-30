'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Move } from 'lucide-react'
import type { profile as staticProfile } from '@/data/content'

interface BulletinBoardProps {
  profile: typeof staticProfile
}

interface NoteConfig {
  id: string
  label: string
  value: string
  url: string
  isEmail?: boolean
  initialPos: { top: string; left?: string; right?: string }
  initialRot: number
  color: string
}

const DEFAULT_PIN_PERCENTS: { [key: string]: { x: number; y: number } } = {
  github: { x: 0.13, y: 0.15 },
  linkedin: { x: 0.47, y: 0.13 },
  coding: { x: 0.84, y: 0.17 },
  resume: { x: 0.25, y: 0.59 },
  email: { x: 0.74, y: 0.61 },
  'scrap-note': { x: 0.49, y: 0.67 }
}

export default function BulletinBoard({ profile }: BulletinBoardProps) {
  const reduceMotion = useReducedMotion()
  const boardRef = useRef<HTMLDivElement>(null)
  const [pinPositions, setPinPositions] = useState<{ [key: string]: { x: number; y: number } }>({})
  const dragStartPosRef = useRef<{ [key: string]: { x: number; y: number } }>({})
  const isDraggingRef = useRef<{ [key: string]: boolean }>({})
  const animFrameRef = useRef<number | null>(null)

  const notesConfig: NoteConfig[] = useMemo(() => [
    {
      id: 'github',
      label: 'GITHUB',
      value: profile.github || 'github.com/flickstrokefs',
      url: 'https://github.com/flickstrokefs',
      initialPos: { top: '10%', left: '5%' },
      initialRot: -3.8,
      color: '#f6ecd2'
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: profile.linkedin || 'linkedin.com/in/flickstroke',
      url: 'https://linkedin.com/in/flickstroke',
      initialPos: { top: '8%', left: '39%' },
      initialRot: 2.4,
      color: '#fcf7e8'
    },
    {
      id: 'coding',
      label: 'CODING',
      value: profile.coding || 'leetcode.com/u/flickstroke',
      url: 'https://leetcode.com/u/flickstroke/',
      initialPos: { top: '12%', right: '6%' },
      initialRot: -2.0,
      color: '#f3e8c6'
    },
    {
      id: 'resume',
      label: 'RESUME',
      value: 'PDF / available soon',
      url: '#contact',
      initialPos: { top: '54%', left: '16%' },
      initialRot: 3.6,
      color: '#f8f2de'
    },
    {
      id: 'email',
      label: 'EMAIL',
      value: 'sudhanshuvermafs@gmail.com',
      url: 'sudhanshuvermafs@gmail.com',
      isEmail: true,
      initialPos: { top: '56%', right: '18%' },
      initialRot: -3.2,
      color: '#eee4c2'
    }
  ], [profile.github, profile.linkedin, profile.coding])

  // Measure and update pin coordinates
  const measurePins = useCallback(() => {
    if (!boardRef.current) return
    const boardRect = boardRef.current.getBoundingClientRect()
    const width = boardRect.width || 1200
    const height = boardRect.height || 600

    const newPositions: { [key: string]: { x: number; y: number } } = {}
    const noteIds = ['github', 'linkedin', 'coding', 'resume', 'email', 'scrap-note']
    let hasChanged = false

    noteIds.forEach(id => {
      const pinEl = boardRef.current?.querySelector(`[data-pin-id="${id}"]`)
      let x = 0
      let y = 0

      if (pinEl && boardRect.width > 0) {
        const pinRect = pinEl.getBoundingClientRect()
        x = Math.round(pinRect.left - boardRect.left + pinRect.width / 2)
        y = Math.round(pinRect.top - boardRect.top + pinRect.height / 2)
      } else {
        const fallback = DEFAULT_PIN_PERCENTS[id] || { x: 0.5, y: 0.5 }
        x = Math.round(width * fallback.x)
        y = Math.round(height * fallback.y)
      }

      newPositions[id] = { x, y }

      const prev = pinPositions[id]
      if (!prev || Math.abs(prev.x - x) > 1 || Math.abs(prev.y - y) > 1) {
        hasChanged = true
      }
    })

    if (hasChanged) {
      setPinPositions(newPositions)
    }
  }, [pinPositions])

  const triggerUpdate = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    animFrameRef.current = requestAnimationFrame(measurePins)
  }, [measurePins])

  useEffect(() => {
    measurePins()
    const timer1 = setTimeout(measurePins, 60)
    const timer2 = setTimeout(measurePins, 300)

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined' && boardRef.current) {
      ro = new ResizeObserver(() => triggerUpdate())
      ro.observe(boardRef.current)
    }

    window.addEventListener('resize', triggerUpdate)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (ro) ro.disconnect()
      window.removeEventListener('resize', triggerUpdate)
    }
  }, [measurePins, triggerUpdate])

  // Click handler with strict drag distance threshold (~6-8px)
  const handleNoteClick = (e: React.MouseEvent, note: NoteConfig) => {
    const isDrag = isDraggingRef.current[note.id]
    if (isDrag) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    if (note.isEmail) {
      window.location.href = `mailto:${note.url}`
    } else if (note.url.startsWith('#')) {
      const el = document.querySelector(note.url)
      el?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(note.url, '_blank', 'noopener,noreferrer')
    }
  }

  // Draw smooth catenary curve string between two pin coordinates
  const renderString = (fromId: string, toId: string, slack = 22) => {
    const p1 = pinPositions[fromId]
    const p2 = pinPositions[toId]
    if (!p1 || !p2) return null

    const midX = (p1.x + p2.x) / 2
    const midY = (p1.y + p2.y) / 2 + slack

    return (
      <g key={`${fromId}-${toId}`}>
        {/* String Shadow */}
        <path
          d={`M ${p1.x} ${p1.y + 3} Q ${midX} ${midY + 4} ${p2.x} ${p2.y + 3}`}
          stroke="rgba(0, 0, 0, 0.35)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Real Red Twine */}
        <path
          d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
          stroke="#bf3428"
          strokeWidth="2"
          strokeDasharray="5 1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    )
  }

  return (
    <div
      ref={boardRef}
      className="bulletin-board-workspace"
      aria-label="Interactive specimen evidence bulletin board"
    >
      {/* Dynamic Detective Board Red Twine Overlay */}
      <svg className="board-twine-canvas" aria-hidden="true">
        {/* GitHub -> Coding (Repositories connected to algorithm practice) */}
        {renderString('github', 'coding', 32)}
        {/* GitHub -> Resume (Projects feed into CV) */}
        {renderString('github', 'resume', 24)}
        {/* LinkedIn -> Email (Professional channel to direct dispatch) */}
        {renderString('linkedin', 'email', 28)}
        {/* Resume -> Scrap note */}
        {renderString('resume', 'scrap-note', 18)}
      </svg>

      {/* 5 Physical Draggable Sticky Notes */}
      {notesConfig.map((note) => (
        <motion.div
          key={note.id}
          drag={!reduceMotion}
          dragConstraints={boardRef}
          dragElastic={0.08}
          dragMomentum={false}
          onPointerDown={(e) => {
            dragStartPosRef.current[note.id] = { x: e.clientX, y: e.clientY }
            isDraggingRef.current[note.id] = false
          }}
          onDragStart={() => {
            isDraggingRef.current[note.id] = true
          }}
          onDrag={(e, info) => {
            const start = dragStartPosRef.current[note.id]
            if (start) {
              const dist = Math.hypot(info.offset.x, info.offset.y)
              if (dist > 6) {
                isDraggingRef.current[note.id] = true
              }
            }
            triggerUpdate()
          }}
          onDragEnd={() => {
            setTimeout(() => {
              isDraggingRef.current[note.id] = false
            }, 50)
            triggerUpdate()
          }}
          onClick={(e) => handleNoteClick(e, note)}
          style={{
            ...note.initialPos,
            backgroundColor: note.color,
            rotate: `${note.initialRot}deg`
          }}
          whileHover={reduceMotion ? {} : { scale: 1.03, zIndex: 30, transition: { duration: 0.16 } }}
          whileDrag={{ scale: 1.06, rotate: 0, zIndex: 40, cursor: 'grabbing' }}
          className="board-pin-note"
          tabIndex={0}
          role="button"
          aria-label={`Inspect ${note.label}: ${note.value}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleNoteClick(e as any, note)
            }
          }}
        >
          {/* Dimensional Thumbtack with realistic 3D highlight */}
          <div className="board-thumbtack" data-pin-id={note.id} aria-hidden="true">
            <span className="tack-head" />
            <span className="tack-pinhole" />
          </div>

          {/* Sticky Tape Header Strip */}
          <div className="note-tape-accent" aria-hidden="true" />

          {/* Note Content */}
          <div className="note-body-content">
            <div className="note-header-row">
              <span className="mono note-category-label">{note.label}</span>
              <span className="note-external-glyph" title="Open Link">
                <ExternalLink size={11} />
              </span>
            </div>
            <strong className="note-value-text">{note.value}</strong>
          </div>

          {/* Footer Drag / Open Affordances */}
          <div className="note-footer-row mono">
            <span className="note-drag-cue">
              <Move size={9} /> drag
            </span>
            <span className="note-link-cue">
              visit ↗
            </span>
          </div>
        </motion.div>
      ))}

      {/* Decorative Pinned Field Scrap (Adds authentic investigative atmosphere) */}
      <motion.div
        drag={!reduceMotion}
        dragConstraints={boardRef}
        dragElastic={0.08}
        onDrag={triggerUpdate}
        onDragEnd={triggerUpdate}
        className="board-scrap-note"
        style={{ top: '62%', left: '43%', rotate: '-1.8deg' }}
        whileHover={{ scale: 1.04, zIndex: 25 }}
        whileDrag={{ scale: 1.06, rotate: 0, zIndex: 40 }}
      >
        <div className="board-thumbtack brass" data-pin-id="scrap-note" aria-hidden="true">
          <span className="tack-head brass-head" />
        </div>
        <p className="hand scrap-quote">
          “Active log · <br />
          Syncs w/ git repos.”
        </p>
        <span className="mono scrap-tag">— lab board</span>
      </motion.div>

      {/* Decorative Unused Empty Pushpin in Corner */}
      <div className="board-empty-pushpin" style={{ bottom: '15%', right: '6%' }} aria-hidden="true">
        <span className="empty-tack-head" />
        <span className="empty-tack-shadow" />
      </div>
    </div>
  )
}
