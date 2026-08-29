'use client'

export function WorkshopBackdrop({
  variant = 'hero',
  className = ''
}: {
  variant?: 'hero' | 'projects'
  className?: string
}) {
  return (
    <div className={`workshop-backdrop ${variant}-backdrop ${className}`} aria-hidden="true">
      <div className="wood-surface" />
      <div className="ambient-wash" />
      <div className="light-cone" />
      <div className="grounding-shadow" />
      <div className="vignette" />
    </div>
  )
}

export default WorkshopBackdrop
