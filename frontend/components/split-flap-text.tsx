'use client'

import { useEffect, useRef, useState } from 'react'

const PRIMARY_NAME = 'SUDHANSHU VERMA'

const INITIAL_SEQUENCE = [
  'SUDHANSHU VERMA',
  'AI / ML STUDENT',
  'A BUILDER',
  'A DEVELOPER',
  'A POET'
]

const ALL_PHRASES = [
  'SUDHANSHU VERMA',
  'AI / ML STUDENT',
  'A BUILDER',
  'A DEVELOPER',
  'A PHOTOGRAPHER',
  'MUSIC ENTHUSIAST',
  'SYSTEMS THINKER',
  'PROBLEM SOLVER',
  'A POET'
]

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
  if (phrase === PRIMARY_NAME) return 8000 // 8s for primary name
  if (phrase === 'A POET') return 2200
  return 3400
}

export function SplitFlapText({
  text,
  className = ''
}: {
  text?: string
  className?: string
}) {
  const initialText = text || PRIMARY_NAME
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

      // Mechanical clicks (4 to 7 intermediate flips per changing tile)
      const numSteps = 4 + Math.floor(Math.random() * 4)
      const staggerDelay = index * 60 + Math.floor(Math.random() * 25)

      const stepChars: string[] = []
      for (let s = 1; s < numSteps; s++) {
        stepChars.push(CHAR_SET[Math.floor(Math.random() * (CHAR_SET.length - 1)) + 1])
      }
      stepChars.push(targetChar)

      stepChars.forEach((nextChar, stepIndex) => {
        const stepDelay = staggerDelay + stepIndex * 130
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
          }, 110)
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
    }, maxStepTime + 160)
    timeoutsRef.current.push(finalTimeout)
  }

  useEffect(() => {
    let isMounted = true

    const scheduleRandomNext = (lastPhrase: string) => {
      if (!isMounted) return
      const nextDelay = 7000 + Math.floor(Math.random() * 10000)
      const timer = setTimeout(() => {
        if (!isMounted) return
        let nextPhrase = PRIMARY_NAME
        if (lastPhrase === PRIMARY_NAME) {
          const secondary = ALL_PHRASES.filter(p => p !== PRIMARY_NAME)
          nextPhrase = secondary[Math.floor(Math.random() * secondary.length)]
        } else {
          if (Math.random() < 0.6) {
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

    const runSequence = (stepIndex: number) => {
      if (!isMounted) return
      const current = INITIAL_SEQUENCE[stepIndex]
      const holdTime = getPhraseHoldDuration(current)

      const timer = setTimeout(() => {
        if (!isMounted) return
        const nextIndex = stepIndex + 1
        if (nextIndex < INITIAL_SEQUENCE.length) {
          const next = INITIAL_SEQUENCE[nextIndex]
          flipTo(next, () => {
            runSequence(nextIndex)
          })
        } else {
          scheduleRandomNext(PRIMARY_NAME)
        }
      }, holdTime)
      timeoutsRef.current.push(timer)
    }

    // Start rotation after initial hold on primary name
    runSequence(0)

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
