import {
  staticProfile,
  staticAcademic,
  staticSkills,
  staticProjects,
  staticAchievements,
  staticResponsibilities,
  staticRoadmap,
  type Profile,
  type Academic,
  type Discipline,
  type SkillCompartment,
  type SkillItem,
  type Project,
  type ProjectImage,
  type Achievement,
  type RoadmapItem
} from '@/data/content'

export type {
  Profile,
  Academic,
  Discipline,
  SkillCompartment,
  SkillItem,
  Project,
  ProjectImage,
  Achievement,
  RoadmapItem
}

// Base URL prefers process.env.NEXT_PUBLIC_API_URL, then process.env.BACKEND_API_URL, then Render cloud backend
const API_HOST = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_API_URL || 'https://portfolio-iu86.onrender.com'
const API_BASE = `${API_HOST.replace(/\/$/, '')}/api/v1`

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${API_BASE}/profile`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch profile: HTTP ${res.status}`)
  const data = await res.json()
  return {
    name: String(data.name || staticProfile.name),
    role: String(data.role || data.title || staticProfile.role),
    institution: String(data.institution || staticProfile.institution),
    year: String(data.year || staticProfile.year),
    classification: String(data.classification || staticProfile.classification),
    bio: String(data.bio || staticProfile.bio),
    github: String(data.github || staticProfile.github),
    linkedin: String(data.linkedin || staticProfile.linkedin),
    coding: String(data.coding || staticProfile.coding),
    email: String(data.email || staticProfile.email)
  }
}

export async function fetchAcademic(): Promise<Academic> {
  const res = await fetch(`${API_BASE}/academic`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch academic: HTTP ${res.status}`)
  const raw = await res.json()

  let spanStart = typeof raw.academic_span_start === 'number'
    ? raw.academic_span_start
    : (typeof raw.academicSpanStart === 'number' ? raw.academicSpanStart : undefined)

  let spanEnd = typeof raw.academic_span_end === 'number'
    ? raw.academic_span_end
    : (typeof raw.academicSpanEnd === 'number' ? raw.academicSpanEnd : undefined)

  if ((spanStart === undefined || spanEnd === undefined) && raw.academic_span) {
    const parts = String(raw.academic_span).split('—').map((s: string) => s.trim())
    spanStart = parseInt(parts[0], 10) || 2024
    spanEnd = parseInt(parts[1], 10) || 2028
  }

  const resolvedSpanStart = spanStart ?? staticAcademic.academicSpanStart
  const resolvedSpanEnd = spanEnd ?? staticAcademic.academicSpanEnd

  const disciplines: Discipline[] = Array.isArray(raw.disciplines)
    ? raw.disciplines.map((d: { name?: string; title?: string; subtitle?: string }) => ({
        name: String(d.name || d.title || 'Discipline'),
        subtitle: String(d.subtitle || '')
      }))
    : staticAcademic.disciplines

  const currentSem = typeof raw.current_semester === 'number'
    ? raw.current_semester
    : (typeof raw.currentSemester === 'number' ? raw.currentSemester : staticAcademic.currentSemester)

  const totalSem = typeof raw.total_semesters === 'number'
    ? raw.total_semesters
    : (typeof raw.totalSemesters === 'number' ? raw.totalSemesters : staticAcademic.totalSemesters)

  const regCode = String(raw.registration_code || raw.registrationCode || staticAcademic.registrationCode)
  const regStatus = String(raw.registration_status || raw.registrationStatus || staticAcademic.registrationStatus)
  const recStatus = String(raw.record_status || raw.recordStatus || staticAcademic.recordStatus)
  const cgpaVal = raw.cgpa !== undefined ? Number(raw.cgpa) : staticAcademic.cgpa
  const cgpaScaleVal = raw.cgpa_scale !== undefined
    ? Number(raw.cgpa_scale)
    : (raw.cgpaScale !== undefined ? Number(raw.cgpaScale) : (raw.max_cgpa !== undefined ? Number(raw.max_cgpa) : staticAcademic.cgpaScale))

  return {
    programme: String(raw.programme || staticAcademic.programme),
    specialization: String(raw.specialization || staticAcademic.specialization),
    institution: String(raw.institution || staticAcademic.institution),
    academicSpanStart: resolvedSpanStart,
    academicSpanEnd: resolvedSpanEnd,
    currentSemester: currentSem,
    totalSemesters: totalSem,
    registrationCode: regCode,
    registrationStatus: regStatus,
    recordStatus: recStatus,
    cgpa: cgpaVal,
    cgpaScale: cgpaScaleVal,
    disciplines,
    // snake_case aliases for compatibility
    academic_span_start: resolvedSpanStart,
    academic_span_end: resolvedSpanEnd,
    current_semester: currentSem,
    total_semesters: totalSem,
    registration_code: regCode,
    registration_status: regStatus,
    record_status: recStatus,
    cgpa_scale: cgpaScaleVal
  }
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch projects: HTTP ${res.status}`)
  const raw = await res.json()
  const list: unknown[] = Array.isArray(raw)
    ? raw
    : (raw && typeof raw === 'object' && 'projects' in raw && Array.isArray((raw as { projects: unknown[] }).projects)
      ? (raw as { projects: unknown[] }).projects
      : [])

  if (!list.length) return staticProjects

  return list.map((item, i) => {
    const p = item as Partial<Project> & Record<string, unknown>
    const accentVal = (p.accent === 'red' || p.accent === 'blue' || p.accent === 'ink')
      ? p.accent
      : (staticProjects[i]?.accent || 'red')

    let imagesList: ProjectImage[] | null = null
    if (Array.isArray(p.images) && p.images.length > 0) {
      imagesList = p.images.map((img: { src?: string; alt?: string; caption?: string }) => ({
        src: String(img.src || ''),
        alt: String(img.alt || ''),
        caption: img.caption ? String(img.caption) : undefined
      }))
    } else if (staticProjects[i]?.images) {
      imagesList = staticProjects[i].images
    }

    return {
      id: String(p.id || staticProjects[i]?.id || `proj-${i + 1}`),
      code: String(p.code || staticProjects[i]?.code || `EXP-${String(i + 1).padStart(2, '0')}`),
      title: String(p.title || staticProjects[i]?.title || 'Untitled Project'),
      objective: String(p.objective || staticProjects[i]?.objective || ''),
      tools: Array.isArray(p.tools) ? p.tools.map(String) : (staticProjects[i]?.tools || []),
      contribution: String(p.contribution || staticProjects[i]?.contribution || ''),
      outcome: String(p.outcome || staticProjects[i]?.outcome || ''),
      learning: String(p.learning || staticProjects[i]?.learning || ''),
      accent: accentVal,
      images: imagesList,
      github: typeof p.github === 'string' ? p.github : (staticProjects[i]?.github || null),
      liveUrl: typeof p.liveUrl === 'string' ? p.liveUrl : (staticProjects[i]?.liveUrl || null)
    }
  })
}

export async function fetchSkills(): Promise<SkillCompartment[]> {
  const res = await fetch(`${API_BASE}/skills`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch skills: HTTP ${res.status}`)
  const raw = await res.json()
  const list: unknown[] = Array.isArray(raw)
    ? raw
    : (raw && typeof raw === 'object' && 'skills' in raw && Array.isArray((raw as { skills: unknown[] }).skills)
      ? (raw as { skills: unknown[] }).skills
      : [])

  if (!list.length) return staticSkills

  const defaultSubtitles: Record<string, string> = {
    'HARDWARE / FIRMWARE': 'Interface with reality',
    'Hardware / Firmware': 'Interface with reality',
    'WEB DEVELOPMENT': 'Building interfaces',
    'Web Development': 'Building interfaces',
    'AI / ML': 'Teaching machines to notice',
    'AI/ML': 'Teaching machines to notice'
  }

  return list.map((item, i) => {
    const c = item as Partial<SkillCompartment> & Record<string, unknown>
    const category = String(c.category || staticSkills[i]?.category || 'Instruments')
    const subtitle = String(c.subtitle || defaultSubtitles[category] || staticSkills[i]?.subtitle || 'Applied Domain')
    const rawSkills = Array.isArray(c.skills) ? c.skills : []

    const skills: SkillItem[] = rawSkills.length > 0
      ? rawSkills.map((s: { name?: string; level?: string }) => ({
          name: String(s.name || ''),
          level: String(s.level || 'Intermediate')
        }))
      : (staticSkills[i]?.skills || [])

    return {
      category,
      subtitle,
      skills
    }
  })
}

export async function fetchAchievements(): Promise<Achievement[]> {
  const res = await fetch(`${API_BASE}/achievements`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch achievements: HTTP ${res.status}`)
  const data = await res.json()
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'achievements' in data && Array.isArray(data.achievements)) {
    return data.achievements
  }
  return staticAchievements
}

export async function fetchCredentials(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/credentials`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch credentials: HTTP ${res.status}`)
  const data = await res.json()
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'credentials' in data && Array.isArray(data.credentials)) {
    return data.credentials
  }
  return staticResponsibilities
}

export async function fetchRoadmap(): Promise<RoadmapItem[]> {
  const res = await fetch(`${API_BASE}/roadmap`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch roadmap: HTTP ${res.status}`)
  const data = await res.json()
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'roadmap' in data && Array.isArray(data.roadmap)) {
    return data.roadmap
  }
  return staticRoadmap
}
