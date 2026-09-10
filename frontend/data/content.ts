export interface Profile {
  name: string
  role: string
  institution: string
  year: string
  classification: string
  bio: string
  github: string
  linkedin: string
  coding: string
  email: string
}

export interface Discipline {
  name: string
  subtitle: string
}

export interface Academic {
  programme: string
  specialization: string
  institution: string
  academicSpanStart: number
  academicSpanEnd: number
  currentSemester: number
  totalSemesters: number
  registrationCode: string
  registrationStatus: string
  recordStatus: string
  cgpa: number
  cgpaScale: number
  disciplines: Discipline[]
  // snake_case aliases for compatibility with backend responses
  academic_span_start?: number
  academic_span_end?: number
  current_semester?: number
  total_semesters?: number
  registration_code?: string
  registration_status?: string
  record_status?: string
  cgpa_scale?: number
}

export interface SkillItem {
  name: string
  level: string
}

export interface SkillCompartment {
  category: string
  subtitle: string
  skills: SkillItem[]
}

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface Project {
  id: string
  code: string
  title: string
  objective: string
  tools: string[]
  contribution: string
  outcome: string
  learning: string
  accent: 'red' | 'blue' | 'ink'
  images?: ProjectImage[] | null
  github?: string | null
  liveUrl?: string | null
}

export interface Achievement {
  date: string
  title: string
  note: string
}

export interface RoadmapItem {
  label: string
  title: string
  detail: string
}

export const profile: Profile = {
  name: 'Sudhanshu',
  role: 'B.Tech AI/ML · Multidisciplinary Systems',
  institution: 'Lovely Professional University',
  year: '2024-2028',
  classification: 'Embedded Systems × Web Development × AI/ML',
  bio: 'I am an AI/ML student who likes to move between the physical and digital worlds — wiring sensors, shaping interfaces, and teaching machines to notice useful patterns. This notebook documents the experiments, questions, and systems I am building along the way.',
  github: 'github.com/flickstrokefs',
  linkedin: 'linkedin.com/in/flickstroke',
  coding: 'leetcode.com/u/flickstroke',
  email: 'sudhanshuvermafs@gmail.com'
}

export const staticAcademic: Academic = {
  programme: 'B.Tech Artificial Intelligence & Machine Learning',
  specialization: 'Artificial Intelligence & Machine Learning',
  institution: 'Lovely Professional University',
  academicSpanStart: 2024,
  academicSpanEnd: 2028,
  currentSemester: 3,
  totalSemesters: 8,
  registrationCode: '2024-28-LPU',
  registrationStatus: 'ACTIVE',
  recordStatus: 'VERIFIED',
  cgpa: 9.27,
  cgpaScale: 10.0,
  academic_span_start: 2024,
  academic_span_end: 2028,
  current_semester: 3,
  total_semesters: 8,
  registration_code: '2024-28-LPU',
  registration_status: 'ACTIVE',
  record_status: 'VERIFIED',
  cgpa_scale: 10.0,
  disciplines: [
    { name: 'Data Structures', subtitle: 'Algorithms · Complexity' },
    { name: 'Computer Vision', subtitle: 'Spatial Signal Processing' },
    { name: 'Embedded Systems', subtitle: 'Firmware · Hardware Control' },
    { name: 'Human-Computer Int.', subtitle: 'Ergonomics · Interface Models' }
  ]
}

export const academic: Academic = staticAcademic

export const staticSkills: SkillCompartment[] = [
  {
    category: 'Hardware / Firmware',
    subtitle: 'Interface with reality',
    skills: [
      { name: 'Arduino', level: 'Intermediate' },
      { name: 'C/C++', level: 'Intermediate' },
      { name: 'ESP32', level: 'Beginner' },
      { name: 'Sensors', level: 'Beginner' }
    ]
  },
  {
    category: 'Web Development',
    subtitle: 'Building interfaces',
    skills: [
      { name: 'React', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Next.js', level: 'Beginner' },
      { name: 'FastAPI', level: 'Beginner' }
    ]
  },
  {
    category: 'AI / ML',
    subtitle: 'Teaching machines to notice',
    skills: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'scikit-learn', level: 'Intermediate' },
      { name: 'Computer Vision', level: 'Beginner' },
      { name: 'Prompt Design', level: 'Beginner' }
    ]
  }
]

export const skills: SkillCompartment[] = staticSkills

export const staticProjects: Project[] = [
  {
    id: 'sentinel',
    code: 'EXP-01',
    title: 'SENTINEL / NEXAURA',
    objective: 'Design a responsive intelligence layer for monitoring complex signals.',
    tools: ['Python', 'React', 'FastAPI'],
    contribution: 'Mapped the system flow, built the interface, and shaped the data contracts.',
    outcome: 'A clear prototype for turning noisy inputs into actionable alerts.',
    learning: 'Good systems make the next decision easier, not louder.',
    accent: 'red',
    images: [
      {
        src: '/projects/sentinel/cover.svg',
        alt: 'Sentinel telemetry dashboard interface',
        caption: 'Primary real-time anomaly monitoring HUD'
      },
      {
        src: '/projects/sentinel/image-1.svg',
        alt: 'Feature vector extraction and clustering map',
        caption: 'Sensor ingestion and anomaly buffer classification'
      }
    ],
    github: 'https://github.com/flickstrokefs/sentinel',
    liveUrl: 'https://sentinel-demo.vercel.app'
  },
  {
    id: 'aqua',
    code: 'EXP-02',
    title: 'AquaSentinel',
    objective: 'Explore an affordable sensing system for water-quality awareness.',
    tools: ['Arduino', 'C++', 'Sensors'],
    contribution: 'Prototyped the sensor enclosure and wrote the first firmware loop.',
    outcome: 'A field-ready concept for sampling, logging, and flagging anomalies.',
    learning: 'The environment is part of the interface.',
    accent: 'blue',
    images: null,
    github: null,
    liveUrl: null
  },
  {
    id: 'miwa',
    code: 'EXP-03',
    title: 'MIWA',
    objective: 'Build a small conversational interface that feels calm and useful.',
    tools: ['TypeScript', 'LLMs', 'UX'],
    contribution: 'Designed the interaction model and evaluated prompt behavior.',
    outcome: 'A focused assistant prototype with deliberate, human-readable states.',
    learning: 'Intelligence needs a good rhythm to feel trustworthy.',
    accent: 'ink',
    images: null,
    github: null,
    liveUrl: null
  },
  {
    id: 'avionics',
    code: 'EXP-04',
    title: 'Rocket Avionics',
    objective: 'Understand how onboard systems report state under constraints.',
    tools: ['Embedded C', 'Telemetry', 'CAD'],
    contribution: 'Studied telemetry paths and documented component responsibilities.',
    outcome: 'A systems map connecting sensor, flight computer, and ground station.',
    learning: 'Constraints are where architecture becomes visible.',
    accent: 'blue',
    images: null,
    github: null,
    liveUrl: null
  },
  {
    id: 'heartbeat',
    code: 'EXP-05',
    title: 'Heartbeat Keychain',
    objective: 'Make a tiny object that turns biometric rhythm into a tactile signal.',
    tools: ['ESP32', 'Pulse sensor', '3D print'],
    contribution: 'Created the interaction prototype and tested low-power behavior.',
    outcome: 'A pocket-sized experiment in personal, ambient feedback.',
    learning: 'Small interfaces can carry surprisingly human stories.',
    accent: 'red',
    images: null,
    github: null,
    liveUrl: null
  }
]

export const projects: Project[] = staticProjects

export const staticAchievements: Achievement[] = [
  {
    date: 'OCT 2024',
    title: 'Smart India Hackathon (SIH) Internal Nominee',
    note: 'Selected at university stage for IoT automated sensor station prototype.'
  },
  {
    date: 'NOV 2024',
    title: 'NASA Space Apps Challenge Participant',
    note: 'Explored Earth observation telemetry pipelines under 48-hour deadline.'
  },
  {
    date: 'FEB 2025',
    title: 'Robotics & Mechatronics Symposium Finalist',
    note: 'Demonstrated low-latency telemetry transceiver module with fail-safes.'
  }
]

export const achievements: Achievement[] = staticAchievements

export const staticResponsibilities: string[] = [
  'Technical Lead · University Robotics & Automation Chapter',
  'Hardware Systems Contributor · IoT Research Group',
  'Peer Mentor · Data Structures & Algorithms Study Track',
  'Field Operations Member · LPU Space Systems Club'
]

export const responsibilities: string[] = staticResponsibilities

export const staticRoadmap: RoadmapItem[] = [
  {
    label: 'NOW / SEM 03',
    title: 'Embedded Linux & Spatial Vision',
    detail: 'Building deterministic pipelines on ARM targets and exploring OpenCV sensor fusion.'
  },
  {
    label: 'NEXT / SEM 04',
    title: 'Edge Tensor Runtime & Low-Power RF',
    detail: 'Quantizing neural network weights for microcontrollers using micro-TVM and LoRa.'
  },
  {
    label: 'LATER / YEARS 03-04',
    title: 'Autonomous System Deployment',
    detail: 'Field validation of multi-agent robotic networks under unreliable link conditions.'
  }
]

export const roadmap: RoadmapItem[] = staticRoadmap
export const staticProfile: Profile = profile
