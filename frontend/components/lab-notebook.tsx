'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUp, ArrowUpRight, Code2, GitBranch, Paperclip, Send, Terminal, MapPin, Radio } from 'lucide-react'
import {
  profile as staticProfile,
  academic as staticAcademic,
  projects as staticProjects,
  skills as staticSkills,
  achievements as staticAchievements,
  responsibilities as staticResponsibilities,
  roadmap as staticRoadmap,
  type Profile,
  type Academic,
  type Project,
  type SkillCompartment,
  type Achievement,
  type RoadmapItem
} from '@/data/content'
import {
  fetchProfile,
  fetchAcademic,
  fetchProjects,
  fetchSkills,
  fetchAchievements,
  fetchCredentials,
  fetchRoadmap
} from '@/lib/api'
import SplitFlapText from './split-flap-text'
import Lanyard from './lanyard'
import WorkshopBackdrop from './workshop-backdrop'
import AcademicPanel from './academic-panel'
import ToolboxSchematic from './toolbox-schematic'
import ExperimentArchive from './experiment-archive'
import TargetCursor from './target-cursor'
import BulletinBoard from './bulletin-board'

const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: .45 } } }
function Section({ id, label, title, children, blueprint = false }: { id: string; label: string; title: string; children: React.ReactNode; blueprint?: boolean }) {
  return (
    <motion.section id={id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .12 }} variants={reveal} className={`notebook-section section-contained ${blueprint ? 'blueprint' : 'paper'}`}>
      <div className="section-inner">
        <div className="section-kicker">
          <span>{label}</span>
          <span className="section-rule" />
        </div>
        <h2>{title}</h2>
        {children}
      </div>
    </motion.section>
  )
}

export function LabNotebook() {
  const [status, setStatus] = useState('')
  const [isInsideProjects, setIsInsideProjects] = useState(false)
  const reduceMotion = useReducedMotion()

  const [profileData, setProfileData] = useState<Profile>(staticProfile)
  const [academicData, setAcademicData] = useState<Academic>(staticAcademic)
  const [skillsList, setSkillsList] = useState<SkillCompartment[]>(staticSkills)
  const [projectsList, setProjectsList] = useState<Project[]>(staticProjects)
  const [achievementsList, setAchievementsList] = useState<Achievement[]>(staticAchievements)
  const [credentialsList, setCredentialsList] = useState<string[]>(staticResponsibilities)
  const [roadmapList, setRoadmapList] = useState<RoadmapItem[]>(staticRoadmap)
  const [backendConnected, setBackendConnected] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ left: 0 })
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    }

    // Resilient centralized fetching via Promise.allSettled
    let isMounted = true
    async function loadBackendData() {
      try {
        const results = await Promise.allSettled([
          fetchProfile(),
          fetchAcademic(),
          fetchProjects(),
          fetchSkills(),
          fetchAchievements(),
          fetchCredentials(),
          fetchRoadmap()
        ])

        if (!isMounted) return

        let anySuccess = false

        if (results[0].status === 'fulfilled') {
          setProfileData(results[0].value)
          anySuccess = true
        }
        if (results[1].status === 'fulfilled') {
          setAcademicData(results[1].value)
          anySuccess = true
        }
        if (results[2].status === 'fulfilled') {
          setProjectsList(results[2].value)
          anySuccess = true
        }
        if (results[3].status === 'fulfilled') {
          setSkillsList(results[3].value)
          anySuccess = true
        }
        if (results[4].status === 'fulfilled') {
          setAchievementsList(results[4].value)
          anySuccess = true
        }
        if (results[5].status === 'fulfilled') {
          setCredentialsList(results[5].value)
          anySuccess = true
        }
        if (results[6].status === 'fulfilled') {
          setRoadmapList(results[6].value)
          anySuccess = true
        }

        if (anySuccess) {
          setBackendConnected(true)
        }
      } catch {
        // Fallback to static content if global network failure
      }
    }

    loadBackendData()
    return () => { isMounted = false }
  }, [])

  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('TRANSMITTING...')
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      })
      setStatus(response.ok ? 'RECEIVED / MESSAGE LOGGED.' : 'TRANSMISSION FAILED.')
      if (response.ok) e.currentTarget.reset()
    } catch {
      setStatus('TRANSMISSION FAILED.')
    }
  }

  return (
    <main>
      <nav className="lab-nav">
        <a href="#top" className="nav-mark">S / LAB<span>_</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Experiments</a>
          <a href="#contact">Contact</a>
        </div>
        <span className="mono nav-status">
          {backendConnected ? '● FASTAPI LIVE / CLOUD' : '● ONLINE / 26'}
        </span>
      </nav>

      <section id="top" className="cover section-contained">
        <div className="cover-grid" />
        <div className="cover-content">
          <div className="label-tag">FIELD NOTEBOOK · VOL. 01</div>
          <SplitFlapText />
          <p className="hand eyebrow">A field notebook on multidisciplinary systems.</p>
          <h1>Building things<br /><em>that notice.</em></h1>
          <p className="cover-copy">A working record of experiments at the intersection of embedded systems, web development, and machine learning.</p>
          <div className="cover-footer">
            <div className="cover-facts mono">
              <span>{profileData.institution}</span>
              <span>ACADEMIC YEAR {profileData.year}</span>
            </div>
            <div className="cover-stamp">
              VERIFIED<br /><small>STUDENT BUILDER</small>
            </div>
          </div>
          <a href="#about" className="scroll-cue"><ArrowDown /> turn the page</a>
        </div>
        <WorkshopBackdrop variant="hero" />
        <Lanyard />
        <motion.div drag={!reduceMotion} dragSnapToOrigin className="sticky-note">
          Remember to<br /><strong>stay curious.</strong><span>— lab margin</span>
        </motion.div>
      </section>

      <Section id="about" label="01 / SPECIMEN NOTES" title="A generalist with a soldering iron.">
        <div className="two-col about-grid">
          <p className="hand big-note">{profileData.bio}</p>
          <motion.div className="classification" whileHover={{ x: 3, y: -2 }}>
            <span>FIELD CLASSIFICATION</span>
            <strong>{profileData.classification}</strong>
            <p className="mono">
              STATUS: LEARNING IN PUBLIC<br />
              LOCATION: PHAGWARA, INDIA
            </p>
            <i>EXAMINED</i>
          </motion.div>
        </div>
      </Section>

      <Section id="academic" label="02 / GRADE REPORT" title="Academic profile" blueprint>
        <AcademicPanel academic={academicData} />
      </Section>

      <Section id="skills" label="03 / TOOLBOX" title="Current instruments.">
        <ToolboxSchematic skills={skillsList} />
      </Section>

      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={reveal}
        className="notebook-section section-contained blueprint"
        onMouseEnter={() => setIsInsideProjects(true)}
        onMouseLeave={() => setIsInsideProjects(false)}
      >
        <div className="section-inner">
          <div className="section-kicker">
            <span>04 / EXPERIMENT LOGS</span>
            <span className="section-rule" />
          </div>
          <h2>Things I have tried to make.</h2>
          <div className="projects-intro">
            <p>Active project records served directly from FastAPI backend.</p>
            <span className="mono">CLICK OR TAP A FOLDER TO INSPECT FILE ↘</span>
          </div>
          <ExperimentArchive projects={projectsList} />
        </div>
        {isInsideProjects && (
          <TargetCursor
            targetSelector=".cursor-target"
            spinDuration={2}
            hideDefaultCursor={true}
            hoverDuration={0.2}
            parallaxOn={true}
            cursorColor="#f4efdf"
            cursorColorOnTarget="#cf4a45"
          />
        )}
      </motion.section>

      <Section id="practice" label="05 / PRACTICE DATA" title="Repetition is a feature.">
        <p className="section-lede">Find the work, the half-built ideas, and the clean commits on the board.</p>
        <BulletinBoard profile={profileData} />
      </Section>

      <Section id="achievements" label="06 / FIELD EXPEDITIONS" title="Outside the classroom">
        <div className="timeline trail">
          {achievementsList.map(item => (
            <details className="timeline-item" key={item.date}>
              <summary>
                <span className="mono date">{item.date}</span>
                <h3>{item.title}</h3>
                <MapPin />
              </summary>
              <p className="hand">{item.note}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="roles" label="07 / CREDENTIALS" title="Places I have helped hold together.">
        <div className="credential-grid">
          {credentialsList.map((item, i) => (
            <motion.div whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }} className="credential" key={item}>
              <span className="mono">CRED-{String(i + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
              <span className="verified">VERIFIED</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="roadmap" label="08 / FUTURE TRAJECTORY" title="The route is still being drawn." blueprint>
        <div className="route-line" />
        <div className="roadmap">
          {roadmapList.map((stop, i) => (
            <div className="waypoint" key={stop.label}>
              <div className="waypoint-dot">{i + 1}</div>
              <span className="mono">{stop.label}</span>
              <h3>{stop.title}</h3>
              <p>{stop.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" label="09 / OPEN CHANNEL" title="Send a signal.">
        <div className="contact-layout">
          <div className="contact-card">
            <Paperclip className="paperclip" />
            <span className="mono">CONTACT CARD / SUDHANSHU</span>
            <h3>Let&apos;s build a<br /><em>useful experiment.</em></h3>
            <div className="contact-links">
              <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer"><Code2 /> LinkedIn</a>
              <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer"><GitBranch /> GitHub</a>
              <a href={`https://${profileData.coding}`} target="_blank" rel="noopener noreferrer"><Terminal /> Coding profile</a>
            </div>
            <a href="#contact" className="resume-button">DOWNLOAD RESUME <ArrowUpRight /></a>
          </div>
          <form onSubmit={submitContact} className="contact-form">
            <label>Name<input name="name" required placeholder="Your name" /></label>
            <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
            <label>Message<textarea name="message" required rows={4} placeholder="What are we making?" /></label>
            <button type="submit"><Send /> {status || 'SEND TRANSMISSION'}</button>
            <span className="mono form-status" role="status">{status && <><Radio /> {status}</>}</span>
          </form>
        </div>
      </Section>

      <footer>
        <span className="mono">S / LAB NOTEBOOK · LAST UPDATED 2026</span>
        <span className="hand">Keep making useful trouble.</span>
        <a href="#top"><ArrowUp /> back to cover</a>
      </footer>
    </main>
  )
}

export default LabNotebook
