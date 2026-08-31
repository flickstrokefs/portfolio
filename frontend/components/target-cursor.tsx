'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

interface TargetCursorProps {
  targetSelector?: string
  spinDuration?: number
  hideDefaultCursor?: boolean
  hoverDuration?: number
  parallaxOn?: boolean
  cursorColor?: string
  cursorColorOnTarget?: string
}

export default function TargetCursor({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.15,
  parallaxOn = true,
  cursorColor = '#f4efdf',
  cursorColorOnTarget = '#cf4a45'
}: TargetCursorProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const reticleRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<HTMLSpanElement>(null)
  const trRef = useRef<HTMLSpanElement>(null)
  const brRef = useRef<HTMLSpanElement>(null)
  const blRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    const origCursor = document.body.style.cursor
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none'
    }

    const container = containerRef.current
    const reticle = reticleRef.current
    const tl = tlRef.current
    const tr = trRef.current
    const br = brRef.current
    const bl = blRef.current
    const dot = dotRef.current

    if (!container || !reticle || !tl || !tr || !br || !bl || !dot) return

    // Initially hide until first mouse interaction
    gsap.set(container, { opacity: 0 })

    let isHoveringTarget = false
    let currentTarget: HTMLElement | null = null
    let hasMoved = false

    // Idle Spin Animation for corners
    const spinTween = gsap.to(reticle, {
      rotation: '+=360',
      duration: spinDuration,
      ease: 'none',
      repeat: -1,
      paused: false
    })

    // Default rest state offsets (from center)
    const baseSize = 14

    const resetCorners = (duration = 0.15) => {
      gsap.to(tl, { x: -baseSize, y: -baseSize, borderColor: cursorColor, duration, ease: 'power2.out' })
      gsap.to(tr, { x: baseSize, y: -baseSize, borderColor: cursorColor, duration, ease: 'power2.out' })
      gsap.to(br, { x: baseSize, y: baseSize, borderColor: cursorColor, duration, ease: 'power2.out' })
      gsap.to(bl, { x: -baseSize, y: baseSize, borderColor: cursorColor, duration, ease: 'power2.out' })
      gsap.to(dot, { opacity: 1, backgroundColor: cursorColor, scale: 1, duration })
    }

    resetCorners(0)

    const lockOnTarget = (target: HTMLElement, clientX: number, clientY: number) => {
      isHoveringTarget = true
      currentTarget = target
      spinTween.pause()

      const rect = target.getBoundingClientRect()
      
      // Guard against large container targets pulling the cursor away
      const isCompact = rect.width <= 260 && rect.height <= 120
      const pad = 6
      const halfW = isCompact ? Math.min(rect.width / 2 + pad, 130) : 24
      const halfH = isCompact ? Math.min(rect.height / 2 + pad, 60) : 24

      if (isCompact) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const targetX = parallaxOn ? clientX + (centerX - clientX) * 0.35 : centerX
        const targetY = parallaxOn ? clientY + (centerY - clientY) * 0.35 : centerY

        gsap.to(reticle, {
          x: targetX,
          y: targetY,
          rotation: 0,
          duration: hoverDuration,
          ease: 'power2.out'
        })
      } else {
        // Direct tracking with zero offset for larger targets
        gsap.set(reticle, { x: clientX, y: clientY, rotation: 0 })
      }

      gsap.to(tl, { x: -halfW, y: -halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power2.out' })
      gsap.to(tr, { x: halfW, y: -halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power2.out' })
      gsap.to(br, { x: halfW, y: halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power2.out' })
      gsap.to(bl, { x: -halfW, y: halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power2.out' })
      gsap.to(dot, { opacity: 0.4, backgroundColor: cursorColorOnTarget, scale: 0.85, duration: hoverDuration })
    }

    const unlockFromTarget = (clientX: number, clientY: number) => {
      isHoveringTarget = false
      currentTarget = null
      resetCorners(hoverDuration)
      spinTween.play()
      gsap.set(reticle, { x: clientX, y: clientY })
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      if (!hasMoved) {
        hasMoved = true
        gsap.set(reticle, { x: clientX, y: clientY })
        gsap.to(container, { opacity: 1, duration: 0.1 })
      }

      const elementUnder = document.elementFromPoint(clientX, clientY)
      const target = elementUnder?.closest(targetSelector) as HTMLElement | null

      if (target) {
        if (target !== currentTarget) {
          lockOnTarget(target, clientX, clientY)
        } else {
          const rect = target.getBoundingClientRect()
          const isCompact = rect.width <= 260 && rect.height <= 120
          if (isCompact && parallaxOn) {
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const targetX = clientX + (centerX - clientX) * 0.35
            const targetY = clientY + (centerY - clientY) * 0.35
            gsap.set(reticle, { x: targetX, y: targetY })
          } else {
            gsap.set(reticle, { x: clientX, y: clientY })
          }
        }
      } else {
        if (isHoveringTarget) {
          unlockFromTarget(clientX, clientY)
        } else {
          // Pure zero-lag 1:1 mouse tracking
          gsap.set(reticle, { x: clientX, y: clientY })
        }
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      spinTween.kill()
      if (hideDefaultCursor) {
        document.body.style.cursor = origCursor
      }
    }
  }, [mounted, targetSelector, spinDuration, hideDefaultCursor, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget])

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <div
      ref={containerRef}
      className="target-cursor-wrapper"
      aria-hidden="true"
    >
      <div ref={reticleRef} className="target-cursor-reticle">
        <span ref={tlRef} className="reticle-corner corner-tl" />
        <span ref={trRef} className="reticle-corner corner-tr" />
        <span ref={brRef} className="reticle-corner corner-br" />
        <span ref={blRef} className="reticle-corner corner-bl" />
        <span ref={dotRef} className="reticle-center-dot" />
      </div>
    </div>,
    document.body
  )
}
