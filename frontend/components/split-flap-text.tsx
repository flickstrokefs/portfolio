'use client'

import { useEffect, useRef, useState } from 'react'

const INITIAL_SEQUENCE = [
  'A POET',
  'A DEVELOPER',
  'A BUILDER',
  'AI / ML STUDENT',
  'SUDHANSHU VERMA'
]

const ALL_PHRASES = [
  'A POET',
  'A DEVELOPER',
  'A BUILDER',
  'A PHOTOGRAPHER',
  'AI / ML STUDENT',
  'MUSIC ENTHUSIAST',
  'SYSTEMS THINKER',
  'PROBLEM SOLVER',
  'SUDHANSHU VERMA'
]

const PRIMARY_NAME = 'SUDHANSHU VERMA'
const MAX_LENGTH = 16
const CHAR_SET = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ/0123456789'

function padCenter(str: string, len: number = MAX_LENGTH): string {
  const upper = (str || '').toUpperCase()
  if (upper.length >= len) return upper.slice(0, len)
  const left = Math.floor((len - upper.length) / 2)
  const right = len - upper.length - left
  return ' '.repeat(left) + upper + ' '.repeat(right)
}

function getPhraseHoldDuration(phrase: string): number {
  if (phrase === 'A POET') return 1800 // 1.5 - 2s
  if (phrase === PRIMARY_NAME) return 8500 // 6 - 10s
  return 3200 // 2.5 - 4s
}

export function SplitFlapText({
  text,
  className = ''
}: {
  text?: string
  className?: string
}) {
  const initialText = text || INITIAL_SEQUENCE[0]
  const [currentPhrase, setCurrentPhrase] = useState(initialText)
  const [displayChars, setDisplayChars] = useState<string[]>(() =>
    padCenter(initialText).split('')
  )
  const [flippingSlots, setFlippingSlots] = useState<boolean[]>(() =>
    new Array(MAX_LENGTH).fill(false)
  )

  const isTransitioningRef = useRef(false)
  const displayCharsRef = useRef(displayChars)
  displayCharsRef.current = displayChars
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const flipTo = (targetText: string, onComplete?: () => void) => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true

    const targetFormatted = padCenter(targetText)
    const currentChars = [...displayCharsRef.current]
    let maxStepTime = 0

    targetFormatted.split('').forEach((targetChar, index) => {
      const startChar = currentChars[index] || ' '
      if (startChar === targetChar) return

      // Slower mechanical clicks (4 to 7 intermediate flips per changing tile)
      const numSteps = 4 + Math.floor(Math.random() * 4)
      // Small natural cascading stagger across columns
      const staggerDelay = index * 75 + Math.floor(Math.random() * 30)

      const stepChars: string[] = []
      for (let s = 1; s < numSteps; s++) {
        stepChars.push(CHAR_SET[Math.floor(Math.random() * (CHAR_SET.length - 1)) + 1])
      }
      stepChars.push(targetChar)

      stepChars.forEach((nextChar, stepIndex) => {
        // Deliberate, tactile mechanical pace (150ms per flip)
        const stepDelay = staggerDelay + stepIndex * 150
        if (stepDelay > maxStepTime) maxStepTime = stepDelay

        const timeout = setTimeout(() => {
          setDisplayChars(prev => {
            const next = [...prev]
            next[index] = nextChar
            return next
          })
          setFlippingSlots(prev => {
            const next = [...prev]
            next[index] = true
            return next
          })

          const clearAnimTimeout = setTimeout(() => {
            setFlippingSlots(prev => {
              const next = [...prev]
              next[index] = false
              return next
            })
          }, 125)
          timeoutsRef.current.push(clearAnimTimeout)
        }, stepDelay)
        timeoutsRef.current.push(timeout)
      })
    })

    const finalTimeout = setTimeout(() => {
      setDisplayChars(targetFormatted.split(''))
      setFlippingSlots(new Array(MAX_LENGTH).fill(false))
      isTransitioningRef.current = false
      setCurrentPhrase(targetText)
      if (onComplete) onComplete()
    }, maxStepTime + 180)
    timeoutsRef.current.push(finalTimeout)
  }

  useEffect(() => {
    let isMounted = true

    const scheduleRandomNext = (lastPhrase: string) => {
      if (!isMounted) return
      // Random interval between 8 and 20 seconds
      const nextDelay = 8000 + Math.floor(Math.random() * 12000)
      const timer = setTimeout(() => {
        if (!isMounted) return
        let nextPhrase = PRIMARY_NAME
        if (lastPhrase === PRIMARY_NAME) {
          // Choose one of the secondary phrases
          const secondary = ALL_PHRASES.filter(p => p !== PRIMARY_NAME)
          nextPhrase = secondary[Math.floor(Math.random() * secondary.length)]
        } else {
          // 50% chance to return to PRIMARY_NAME, 50% chance to pick another secondary
          if (Math.random() < 0.5) {
            nextPhrase = PRIMARY_NAME
          } else {
            const secondary = ALL_PHRASES.filter(p => p !== lastPhrase && p !== PRIMARY_NAME)
            nextPhrase = secondary[Math.floor(Math.random() * secondary.length)]
          }
        }

        flipTo(nextPhrase, () => {
          scheduleRandomNext(nextPhrase)
        })
      }, nextDelay)
      timeoutsRef.current.push(timer)
    }

    // Step through the initial sequence:
    // 1. "A POET" (1.8s)
    // 2. "A DEVELOPER" (3.2s)
    // 3. "A BUILDER" (3.2s)
    // 4. "AI / ML STUDENT" (3.2s)
    // 5. "SUDHANSHU VERMA" (8.5s) -> then random rotation
    const runInitialSequence = (stepIndex: number) => {
      if (!isMounted) return
      const current = INITIAL_SEQUENCE[stepIndex]
      const holdTime = getPhraseHoldDuration(current)

      const timer = setTimeout(() => {
        if (!isMounted) return
        const nextIndex = stepIndex + 1
        if (nextIndex < INITIAL_SEQUENCE.length) {
          const next = INITIAL_SEQUENCE[nextIndex]
          flipTo(next, () => {
            runInitialSequence(nextIndex)
          })
        } else {
          scheduleRandomNext(PRIMARY_NAME)
        }
      }, holdTime)
      timeoutsRef.current.push(timer)
    }

    runInitialSequence(0)

    return () => {
      isMounted = false
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
    }
  }, [])

  return (
    <span
      className={`split-flap-real ${className}`}
      aria-label={currentPhrase}
    >
      {displayChars.map((char, i) => (
        <span
          className={`flap-tile ${flippingSlots[i] ? 'is-flipping' : ''}`}
          key={i}
        >
          <span className="flap-char">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))}
    </span>
  )
}

export default SplitFlapText
