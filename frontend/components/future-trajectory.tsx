'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Compass, Navigation, ArrowUpRight, Radio, Sparkles } from 'lucide-react'
import { type RoadmapItem } from '@/data/content'

interface FutureTrajectoryProps {
  roadmap: RoadmapItem[]
}

export default function FutureTrajectory({ roadmap }: FutureTrajectoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' })
  const shouldReduceMotion = useReducedMotion()

  const defaultRoadmap: RoadmapItem[] = [
    {
      label: 'NOW',
      title: 'Build fundamentals',
      detail: 'Ship small systems. Read deeply. Keep the notes honest.'
    },
    {
      label: 'NEXT',
      title: 'Join a research-minded team',
      detail: 'Work where embedded data meets usable intelligence.'
    },
    {
      label: 'LATER',
      title: 'Design humane machines',
      detail: 'Lead products and experiments with real-world consequence.'
    }
  ]

  const items = roadmap && roadmap.length >= 3 ? roadmap : defaultRoadmap

  return (
    <div className="trajectory-chart-root" ref={containerRef} aria-label="Future Trajectory Navigation Blueprint">
      {/* Blueprint Navigation Metadata Header */}
      <div className="trajectory-meta-bar mono">
        <div className="meta-left">
          <span className="meta-pulse-dot" />
          <span>PLOTTED COURSE // NAV_ROUTE_2026</span>
          <span className="meta-sep">/</span>
          <span className="meta-coord">BEARING: 048° TRUE</span>
        </div>
        <div className="meta-right">
          <span>CHART SCALE: 1:50,000 // THREE-STAGE TRAJECTORY</span>
        </div>
      </div>

      {/* Main Roadmap Blueprint Canvas */}
      <div className="trajectory-canvas-surface">
        {/* Background Grid Pattern & Technical Compass Watermark */}
        <div className="blueprint-grid-overlay" aria-hidden="true" />
        <div className="blueprint-compass-watermark" aria-hidden="true">
          <Compass size={180} strokeWidth={0.8} />
        </div>

        {/* ── SINGLE CONNECTING ROUTE SVG (Desktop Horizontal / Smooth Hand-Plotted Waypoint Curve) ── */}
        <div className="trajectory-svg-connector desktop-only" aria-hidden="true">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="route-svg">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cf4a45" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#d5a49d" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6ba4d4" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Faint Background Track Line */}
            <path
              d="M 166,60 C 330,25 380,95 500,60 C 620,25 670,95 834,60"
              fill="none"
              stroke="rgba(169, 197, 220, 0.15)"
              strokeWidth="2"
              strokeDasharray="4,4"
            />

            {/* Main Plotted Route Line (Single Animated Stroke) */}
            <motion.path
              d="M 166,60 C 330,25 380,95 500,60 C 620,25 670,95 834,60"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6,5"
              strokeLinecap="round"
              initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>

        {/* ── THREE MILESTONES GRID (Shared Baseline Alignment) ── */}
        <div className="trajectory-milestones-grid">
          {items.map((item, idx) => {
            const milestoneNumber = String(idx + 1).padStart(2, '0')
            const isNow = idx === 0
            const isNext = idx === 1
            const isLater = idx === 2

            const delayTime = shouldReduceMotion ? 0 : 0.3 + idx * 0.35

            return (
              <motion.div
                key={item.label || idx}
                className={`trajectory-milestone-column stage-${item.label.toLowerCase()} ${isNow ? 'is-active-stage' : ''}`}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: delayTime, ease: 'easeOut' }}
              >
                {/* 1. Milestone Waypoint Circle (Top Anchor) */}
                <div className="waypoint-anchor-row">
                  <div className={`milestone-circle mono ${isNow ? 'active-pulse' : ''}`}>
                    <span className="circle-num">{milestoneNumber}</span>
                    {isNow && <span className="circle-sonar-ring" aria-hidden="true" />}
                  </div>
                </div>

                {/* 2. Timeline Tag & State Indicator */}
                <div className="milestone-badge-row mono">
                  <span className={`milestone-status-chip chip-${item.label.toLowerCase()}`}>
                    {item.label}
                  </span>
                  <span className="milestone-phase-code">
                    {isNow ? '● ACTIVE PHASE' : isNext ? '○ HORIZON T+1' : '◇ HORIZON T+2'}
                  </span>
                </div>

                {/* 3. Milestone Heading (Editorial Serif) */}
                <h3 className="milestone-title serif">
                  {item.title}
                </h3>

                {/* 4. Milestone Description Copy */}
                <p className="milestone-detail">
                  {item.detail}
                </p>

                {/* 5. Chart Technical Footprint Annotation */}
                <div className="milestone-annotation mono">
                  <span className="anno-tag">WAYPOINT_{milestoneNumber}</span>
                  <span className="anno-status">
                    {isNow ? 'IN FLIGHT' : isNext ? 'QUEUED' : 'EXPEDITION'}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Blueprint Navigation Bottom Legend */}
      <div className="trajectory-chart-footer mono">
        <div className="footer-left">
          <Navigation size={14} className="nav-arrow-icon" />
          <span>PLOTTED TRAJECTORY IS ITERATIVE · COORDINATES UPDATE AS CODE SHIPS</span>
        </div>
        <div className="footer-right">
          <span>SYS_NAV // VERIFIED CONTINUUM</span>
        </div>
      </div>
    </div>
  )
}
