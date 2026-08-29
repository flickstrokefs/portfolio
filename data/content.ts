export type Project = {
  id: string
  code: string
  title: string
  objective: string
  tools: string[]
  contribution: string
  outcome: string
  learning: string
  accent: 'red' | 'blue' | 'ink'
}

export const profile = {
  name: 'Sudhanshu',
  role: 'B.Tech AI/ML · Multidisciplinary Systems',
  institution: 'Lovely Professional University',
  year: '2024—2028',
  classification: 'Embedded Systems × Web Development × AI/ML',
  bio: 'I am an AI/ML student who likes to move between the physical and digital worlds — wiring sensors, shaping interfaces, and teaching machines to notice useful patterns. This notebook documents the experiments, questions, and systems I am building along the way.',
  github: 'github.com/sudhanshu-dev',
  linkedin: 'linkedin.com/in/sudhanshu-dev',
  coding: 'leetcode.com/sudhanshu-dev',
}

export const projects: Project[] = [
  { id: 'sentinel', code: 'EXP-01', title: 'SENTINEL / NEXAURA', objective: 'Design a responsive intelligence layer for monitoring complex signals.', tools: ['Python', 'React', 'FastAPI'], contribution: 'Mapped the system flow, built the interface, and shaped the data contracts.', outcome: 'A clear prototype for turning noisy inputs into actionable alerts.', learning: 'Good systems make the next decision easier, not louder.', accent: 'red' },
  { id: 'aqua', code: 'EXP-02', title: 'AquaSentinel', objective: 'Explore an affordable sensing system for water-quality awareness.', tools: ['Arduino', 'C++', 'Sensors'], contribution: 'Prototyped the sensor enclosure and wrote the first firmware loop.', outcome: 'A field-ready concept for sampling, logging, and flagging anomalies.', learning: 'The environment is part of the interface.', accent: 'blue' },
  { id: 'miwa', code: 'EXP-03', title: 'MIWA', objective: 'Build a small conversational interface that feels calm and useful.', tools: ['TypeScript', 'LLMs', 'UX'], contribution: 'Designed the interaction model and evaluated prompt behavior.', outcome: 'A focused assistant prototype with deliberate, human-readable states.', learning: 'Intelligence needs a good rhythm to feel trustworthy.', accent: 'ink' },
  { id: 'avionics', code: 'EXP-04', title: 'Rocket Avionics', objective: 'Understand how onboard systems report state under constraints.', tools: ['Embedded C', 'Telemetry', 'CAD'], contribution: 'Studied telemetry paths and documented component responsibilities.', outcome: 'A systems map connecting sensor, flight computer, and ground station.', learning: 'Constraints are where architecture becomes visible.', accent: 'blue' },
  { id: 'heartbeat', code: 'EXP-05', title: 'Heartbeat Keychain', objective: 'Make a tiny object that turns biometric rhythm into a tactile signal.', tools: ['ESP32', 'Pulse sensor', '3D print'], contribution: 'Created the interaction prototype and tested low-power behavior.', outcome: 'A pocket-sized experiment in personal, ambient feedback.', learning: 'Small interfaces can carry surprisingly human stories.', accent: 'red' },
]

export const achievements = [
  { date: '2025.11', title: 'National Hackathon / Shortlist', note: 'A weekend of diagrams, bad coffee, and one surprisingly elegant prototype.' },
  { date: '2025.08', title: 'Tech Fest / Volunteer Lead', note: 'Coordinated rooms, people, and a small army of extension cords.' },
  { date: '2025.03', title: 'Open Source / First Contribution', note: 'Learned that a tiny documentation fix still moves the whole machine forward.' },
]

export const responsibilities = ['AI Club · Core Member', 'Robotics Lab · Project Lead', 'Campus Tech Fest · Coordinator', 'Peer Learning Circle · Mentor']

export const roadmap = [
  { label: 'NOW', title: 'Build fundamentals', detail: 'Ship small systems. Read deeply. Keep the notes honest.' },
  { label: 'NEXT', title: 'Join a research-minded team', detail: 'Work where embedded data meets usable intelligence.' },
  { label: 'LATER', title: 'Design humane machines', detail: 'Lead products and experiments with real-world consequence.' },
]
