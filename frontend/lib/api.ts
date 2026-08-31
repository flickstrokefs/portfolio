import {
  profile as staticProfile,
  academic as staticAcademic,
  skills as staticSkills,
  projects as staticProjects,
  achievements as staticAchievements,
  responsibilities as staticResponsibilities,
  roadmap as staticRoadmap,
  type Profile,
  type Academic,
  type Discipline,
  type SkillCompartment,
  type SkillItem,
  type Project,
  type Achievement,
  type RoadmapItem
} from '@/data/content'

// Base URL prefers process.env.NEXT_PUBLIC_API_URL, then falls back to cloud Render backend
const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-iu86.onrender.com'
const API_BASE = `${API_HOST.replace(/\/$/, '')}/api/v1`

export async function fetchProfile(): Promise<Profile> {
  try {
    const res = await fetch(`${API_BASE}/profile`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return {
      name: data.name || staticProfile.name,
      title: data.title || staticProfile.title,
      bio: data.bio || staticProfile.bio,
      institution: data.institution || staticProfile.institution,
      year: data.year || staticProfile.year,
      classification: data.classification || staticProfile.classification,
      github: data.github || staticProfile.github,
      linkedin: data.linkedin || staticProfile.linkedin,
      coding: data.coding || staticProfile.coding,
      email: data.email || staticProfile.email
    }
  } catch {
    return staticProfile
  }
}

export async function fetchAcademic(): Promise<Academic> {
  try {
    const res = await fetch(`${API_BASE}/academic`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const raw = await res.json()

    let spanStart = raw.academic_span_start
    let spanEnd = raw.academic_span_end
    if ((spanStart === undefined || spanEnd === undefined) && raw.academic_span) {
      const parts = String(raw.academic_span).split('—').map((s: string) => s.trim())
      spanStart = parseInt(parts[0], 10) || 2024
      spanEnd = parseInt(parts[1], 10) || 2028
    }

    const disciplines: Discipline[] = Array.isArray(raw.disciplines)
      ? raw.disciplines.map((d: any) => ({
          name: d.name || d.title || 'Discipline',
          subtitle: d.subtitle || ''
        }))
      : staticAcademic.disciplines

    return {
      programme: raw.programme || staticAcademic.programme,
      specialization: raw.specialization || staticAcademic.specialization,
      institution: raw.institution || staticAcademic.institution,
      academic_span_start: spanStart ?? staticAcademic.academic_span_start,
      academic_span_end: spanEnd ?? staticAcademic.academic_span_end,
      current_semester: raw.current_semester ?? staticAcademic.current_semester,
      total_semesters: raw.total_semesters ?? staticAcademic.total_semesters,
      registration_code: raw.registration_code || staticAcademic.registration_code,
      registration_status: raw.registration_status || (raw.status ? raw.status.split('/')[1]?.trim() : 'ACTIVE') || 'ACTIVE',
      record_status: raw.record_status || (raw.status ? raw.status.split('/')[0]?.trim() : 'VERIFIED') || 'VERIFIED',
      cgpa: raw.cgpa !== undefined ? Number(raw.cgpa) : staticAcademic.cgpa,
      cgpa_scale: (raw.cgpa_scale !== undefined ? Number(raw.cgpa_scale) : undefined) ?? (raw.max_cgpa !== undefined ? Number(raw.max_cgpa) : undefined) ?? staticAcademic.cgpa_scale,
      disciplines
    }
  } catch {
    return staticAcademic
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const raw = await res.json()
    const list: any[] = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.projects) ? raw.projects : [])
    if (!list.length) return staticProjects

    return list.map((p, i) => ({
      id: p.id || staticProjects[i]?.id || `proj-${i + 1}`,
      title: p.title || staticProjects[i]?.title || 'Untitled Project',
      synopsis: p.synopsis || staticProjects[i]?.synopsis || '',
      accent: p.accent || staticProjects[i]?.accent || 'red',
      status: p.status || staticProjects[i]?.status || 'ACTIVE',
      stack: Array.isArray(p.stack) ? p.stack : (staticProjects[i]?.stack || []),
      objective: p.objective || staticProjects[i]?.objective || '',
      tools: Array.isArray(p.tools) ? p.tools : (staticProjects[i]?.tools || []),
      takeaway: p.takeaway || staticProjects[i]?.takeaway || '',
      quote: p.quote || staticProjects[i]?.quote || '',
      code: p.code || staticProjects[i]?.code || `EXP-${String(i + 1).padStart(2, '0')}`,
      images: Array.isArray(p.images) && p.images.length > 0 ? p.images : null,
      github: p.github || null,
      liveUrl: p.liveUrl || null
    }))
  } catch {
    return staticProjects
  }
}

export async function fetchSkills(): Promise<SkillCompartment[]> {
  try {
    const res = await fetch(`${API_BASE}/skills`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const raw = await res.json()
    const list: any[] = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.skills) ? raw.skills : [])
    if (!list.length) return staticSkills

    const defaultSubtitles: Record<string, string> = {
      'HARDWARE / FIRMWARE': 'Interface with reality',
      'Hardware / Firmware': 'Interface with reality',
      'WEB DEVELOPMENT': 'Full-stack systems & interaction',
      'Web Development': 'Full-stack systems & interaction',
      'AI / ML': 'Intelligent modeling & perception',
      'AI/ML': 'Intelligent modeling & perception'
    }

    return list.map((c, i) => ({
      category: c.category || staticSkills[i]?.category || 'Instruments',
      subtitle: c.subtitle || defaultSubtitles[c.category] || staticSkills[i]?.subtitle || 'Applied Domain',
      skills: Array.isArray(c.skills)
        ? c.skills.map((s: any) => ({
            name: s.name || '',
            level: s.level || 'Intermediate'
          }))
        : (staticSkills[i]?.skills || [])
    }))
  } catch {
    return staticSkills
  }
}

export async function fetchAchievements(): Promise<Achievement[]> {
  try {
    const res = await fetch(`${API_BASE}/achievements`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data : (data?.achievements || staticAchievements)
  } catch {
    return staticAchievements
  }
}

export async function fetchCredentials(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE}/credentials`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data : (data?.credentials || staticResponsibilities)
  } catch {
    return staticResponsibilities
  }
}

export async function fetchRoadmap(): Promise<RoadmapItem[]> {
  try {
    const res = await fetch(`${API_BASE}/roadmap`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data : (data?.roadmap || staticRoadmap)
  } catch {
    return staticRoadmap
  }
}
