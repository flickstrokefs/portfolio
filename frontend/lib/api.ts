import {
  achievements as staticAchievements,
  profile as staticProfile,
  projects as staticProjects,
  responsibilities as staticResponsibilities,
  roadmap as staticRoadmap,
  type Project
} from '@/data/content'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE}/projects`, { cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch {
    // Fallback if FastAPI is offline
  }
  return staticProjects
}

export async function fetchProfile() {
  try {
    const res = await fetch(`${API_BASE}/profile`, { cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch {
    // Fallback if FastAPI is offline
  }
  return staticProfile
}

export async function fetchAcademic() {
  try {
    const res = await fetch(`${API_BASE}/academic`, { cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch {
    // Fallback if FastAPI is offline
  }
  return null
}

export async function fetchAchievements() {
  try {
    const res = await fetch(`${API_BASE}/achievements`, { cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch {
    // Fallback if FastAPI is offline
  }
  return staticAchievements
}

export async function fetchCredentials() {
  try {
    const res = await fetch(`${API_BASE}/credentials`, { cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch {
    // Fallback if FastAPI is offline
  }
  return staticResponsibilities
}

export async function fetchRoadmap() {
  try {
    const res = await fetch(`${API_BASE}/roadmap`, { cache: 'no-store' })
    if (res.ok) return await res.json()
  } catch {
    // Fallback if FastAPI is offline
  }
  return staticRoadmap
}
