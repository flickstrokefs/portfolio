'use client'

import { useEffect, useRef } from 'react'
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
  hoverDuration = 0.2,
  parallaxOn = true,
  cursorColor = '#f4efdf',
  cursorColorOnTarget = '#cf4a45'
}: TargetCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reticleRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<HTMLSpanElement>(null)
  const trRef = useRef<HTMLSpanElement>(null)
  const brRef = useRef<HTMLSpanElement>(null)
  const blRef = useRef<HTMLSpanElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

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

    // Idle Spin Animation
    const spinTween = gsap.to(reticle, {
      rotation: '+=360',
      duration: spinDuration,
      ease: 'none',
      repeat: -1,
      paused: false
    })

    // Default rest state offsets (from center)
    const baseSize = 16

    const resetCorners = (duration = 0.2) => {
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
      const pad = 10
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const halfW = rect.width / 2 + pad
      const halfH = rect.height / 2 + pad

      const targetX = parallaxOn ? centerX + (clientX - centerX) * 0.08 : centerX
      const targetY = parallaxOn ? centerY + (clientY - centerY) * 0.08 : centerY

      gsap.to(reticle, {
        x: targetX,
        y: targetY,
        rotation: 0,
        duration: hoverDuration,
        ease: 'power3.out'
      })

      gsap.to(tl, { x: -halfW, y: -halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power3.out' })
      gsap.to(tr, { x: halfW, y: -halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power3.out' })
      gsap.to(br, { x: halfW, y: halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power3.out' })
      gsap.to(bl, { x: -halfW, y: halfH, borderColor: cursorColorOnTarget, duration: hoverDuration, ease: 'power3.out' })
      gsap.to(dot, { opacity: 0.35, backgroundColor: cursorColorOnTarget, scale: 0.8, duration: hoverDuration })
    }

    const unlockFromTarget = (clientX: number, clientY: number) => {
      isHoveringTarget = false
      currentTarget = null
      resetCorners(hoverDuration)
      spinTween.play()
      gsap.to(reticle, {
        x: clientX,
        y: clientY,
        duration: 0.12,
        ease: 'power2.out'
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      if (!hasMoved) {
        hasMoved = true
        gsap.set(reticle, { x: clientX, y: clientY })
        gsap.to(container, { opacity: 1, duration: 0.15 })
      }

      const elementUnder = document.elementFromPoint(clientX, clientY)
      const target = elementUnder?.closest(targetSelector) as HTMLElement | null

      if (target) {
        if (target !== currentTarget) {
          lockOnTarget(target, clientX, clientY)
        } else if (parallaxOn) {
          const rect = target.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          gsap.to(reticle, {
            x: centerX + (clientX - centerX) * 0.08,
            y: centerY + (clientY - centerY) * 0.08,
            duration: 0.15,
            ease: 'power2.out'
          })
        }
      } else {
        if (isHoveringTarget) {
          unlockFromTarget(clientX, clientY)
        } else {
          gsap.to(reticle, {
            x: clientX,
            y: clientY,
            duration: 0.08,
            ease: 'power2.out'
          })
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
  }, [targetSelector, spinDuration, hideDefaultCursor, hoverDuration, parallaxOn, cursorColor, cursorColorOnTarget])

  return (
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
    </div>
  )
}
