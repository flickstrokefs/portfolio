'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Compass, Navigation } from 'lucide-react'
import { type RoadmapItem } from '@/data/content'

interface FutureTrajectoryProps {
  roadmap?: RoadmapItem[]
}

export default function FutureTrajectory({ roadmap }: FutureTrajectoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const shouldReduceMotion = useReducedMotion()

  const defaultRoadmap: RoadmapItem[] = [
    {
      label: 'NOW',
      title: 'Build tangible tools',
      detail: 'Focus on working prototypes across embedded systems and web architecture.'
    },
    {
      label: 'NEXT',
      title: 'Deepen system intuition',
      detail: 'Advance understanding of machine intelligence, distributed nodes, and telemetry.'
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
      {/* Main Roadmap Blueprint Canvas */}
      <div className="trajectory-canvas-surface">
        {/* Background Grid Pattern & Technical Compass Watermark */}
        <div className="blueprint-grid-overlay" aria-hidden="true" />
        <div className="blueprint-compass-watermark" aria-hidden="true">
          <Compass size={180} strokeWidth={0.8} />
        </div>

        {/* SINGLE CONNECTING ROUTE SVG (Desktop Horizontal / Smooth Hand-Plotted Waypoint Curve) */}
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

        {/* THREE MILESTONES GRID (Shared Baseline Alignment) */}
        <div className="trajectory-milestones-grid">
          {items.map((item, idx) => {
            const milestoneNumber = String(idx + 1).padStart(2, '0')
            const isNow = idx === 0
            const isNext = idx === 1

            const delayTime = shouldReduceMotion ? 0 : 0.3 + idx * 0.35

            return (
              <motion.div
                key={item.label || idx}
                className={`trajectory-milestone-column stage-${item.label.toLowerCase()} ${isNow ? 'is-active-stage' : ''}`}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: delayTime, ease: 'easeOut' }}
              >
                {/* 1. Milestone Circle (Top Anchor) */}
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
                    {isNow ? '● ACTIVE' : isNext ? '○ NEXT' : '◇ LATER'}
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
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Blueprint Navigation Bottom Legend */}
      <div className="trajectory-chart-footer mono">
        <div className="footer-left">
          <Navigation size={14} className="nav-arrow-icon" />
          <span>ROADMAP IS ITERATIVE · UPDATES AS PROJECTS DEPLOY</span>
        </div>
      </div>
    </div>
  )
}
