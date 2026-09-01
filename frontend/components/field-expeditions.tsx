'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Compass,
  Award,
  Cpu,
  Bot,
  Brain,
  Droplets,
  Rocket,
  Users,
  Sparkles,
  MapPin
} from 'lucide-react'

export default function FieldExpeditions() {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="expeditions-scrapbook-root" aria-label="Field Expeditions Scrapbook">
      {/* Editorial Section Subheader Kicker */}
      <div className="expeditions-header-meta mono">
        <span className="meta-tag">[ EXPEDITIONS LOG // VOL. 06 ]</span>
        <span className="meta-sub">EXPERIENCES, COMPETITIONS, ACHIEVEMENTS &amp; CREDENTIALS</span>
      </div>

      {/* Main Two-Column Scrapbook Workspace: Left Timeline Rail + Right Scrapbook Board */}
      <div className="expeditions-layout-grid">
        
        {/* ── LEFT TIMELINE RAIL (Desktop) ── */}
        <aside className="expeditions-timeline-rail mono" aria-hidden="true">
          <div className="timeline-spine-line" />
          
          <div className="timeline-node-list">
            <div className="timeline-node is-active">
              <span className="node-dot">01</span>
              <div className="node-info">
                <span className="node-date">2025.08</span>
                <span className="node-label">ACADEMIC JOURNEY</span>
              </div>
            </div>

            <div className="timeline-node">
              <span className="node-dot">02</span>
              <div className="node-info">
                <span className="node-date">2026.01 – 03</span>
                <span className="node-label">WATER MANAGEMENT</span>
              </div>
            </div>

            <div className="timeline-node">
              <span className="node-dot highlight">03</span>
              <div className="node-info">
                <span className="node-date">2026.03</span>
                <span className="node-label">IIT MANDI ROCKETRY</span>
              </div>
            </div>

            <div className="timeline-node">
              <span className="node-dot">04</span>
              <div className="node-info">
                <span className="node-date">2026.05</span>
                <span className="node-label">NEUROLEAN AI</span>
              </div>
            </div>

            <div className="timeline-node">
              <span className="node-dot highlight">05</span>
              <div className="node-info">
                <span className="node-date">2026.06</span>
                <span className="node-label">WALL-E LINE ROBOT</span>
              </div>
            </div>

            <div className="timeline-node">
              <span className="node-dot">06</span>
              <div className="node-info">
                <span className="node-date">PRESENT</span>
                <span className="node-label">LEADERSHIP DOSSIER</span>
              </div>
            </div>

            <div className="timeline-node">
              <span className="node-dot highlight">07</span>
              <div className="node-info">
                <span className="node-date">VERIFIED</span>
                <span className="node-label">CREDENTIALS CLUSTER</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN SCRAPBOOK CANVAS (3 Columns on Desktop, 1 on Mobile) ── */}
        <div className="scrapbook-canvas-board">

          {/* ════════════════════════════════════════════════════════════
              01 / ACADEMIC JOURNEY — B.Tech Journey Begins (Polaroid + Paper)
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            className="scrapbook-card card-academic card-paper card-rot-neg1 cursor-target"
            whileHover={shouldReduceMotion ? {} : { y: -5, rotate: 0, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveCard('card-01')}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Brass Paperclip */}
            <div className="card-fixture-paperclip top-left" aria-hidden="true">
              <svg viewBox="0 0 28 72" width="18" height="48" fill="none" stroke="#7e7663" strokeWidth="2.4" strokeLinecap="round">
                <path d="M 14,8 L 14,54 C 14,62 6,62 6,54 L 6,18 C 6,10 22,10 22,18 L 22,56 C 22,68 2,68 2,56 L 2,24" />
              </svg>
            </div>

            {/* Circular Stamp Badge */}
            <div className="stamp-badge-round red" aria-label="Learn Build Impact Stamp">
              <svg viewBox="0 0 100 100" className="stamp-svg">
                <path id="stamp-curve-1" d="M 18,50 A 32,32 0 1,1 82,50 A 32,32 0 1,1 18,50" fill="none" />
                <text className="stamp-text mono" fontSize="9.5" fill="#a6312f" letterSpacing="0.14em">
                  <textPath href="#stamp-curve-1" startOffset="50%" textAnchor="middle">
                    ★ LEARN · BUILD · IMPACT ★
                  </textPath>
                </text>
              </svg>
              <span className="stamp-inner-code mono">LPU</span>
            </div>

            <div className="card-header mono">
              <span className="card-idx">01 / ACADEMIC JOURNEY</span>
              <span className="card-date">2025.08 – PRESENT</span>
            </div>

            <h3 className="card-title serif">B.Tech Journey Begins</h3>
            <div className="card-subtitle mono">Lovely Professional University</div>

            <p className="card-body-text">
              Pursuing B.Tech in Computer Science &amp; Engineering with specialization in <strong>Artificial Intelligence &amp; Machine Learning</strong>. Grounded in algorithms, sensor architectures, and autonomous systems.
            </p>

            <div className="card-stats-pill mono">
              <span>CUMULATIVE CGPA</span>
              <strong>9.26 / 10.0</strong>
            </div>

            {/* Mini Campus Polaroid Frame */}
            <div className="mini-polaroid-frame polaroid-tilt-right">
              <div className="polaroid-image-slot slot-campus">
                <div className="slot-grid-mesh" />
                <MapPin size={24} className="slot-icon" />
                <span className="slot-label mono">CAMPUS SPECIMEN // LPU</span>
              </div>
              <span className="polaroid-caption hand">“Foundation for heavy engineering.”</span>
            </div>
          </motion.div>


          {/* ════════════════════════════════════════════════════════════
              02 / PROJECT — Smart Water Management System (Lined Notebook Card)
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            className="scrapbook-card card-lined-notebook card-rot-pos1 cursor-target"
            whileHover={shouldReduceMotion ? {} : { y: -5, rotate: 0, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveCard('card-02')}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Top Masking Tape Strip */}
            <div className="card-fixture-tape top-center" aria-hidden="true" />

            <div className="card-header mono">
              <span className="card-idx">02 / EMBEDDED PROJECT</span>
              <span className="card-date">2026.01 – 2026.03</span>
            </div>

            <h3 className="card-title serif">Smart Water Management System</h3>
            
            <div className="card-tags-row mono">
              <span className="mini-tag">ESP32</span>
              <span className="mini-tag">Arduino</span>
              <span className="mini-tag">IoT</span>
              <span className="mini-tag">Sensors</span>
              <span className="mini-tag">Supabase</span>
            </div>

            <p className="card-body-text">
              Engineered an automated IoT-based irrigation and reservoir awareness telemetry system. Deployed multi-sensor probes for real-time soil moisture, thermal gradient, precipitation, and ultrasonic water-level monitoring.
            </p>

            {/* Live-style Sensor Telemetry Readout Box */}
            <div className="mock-sensor-panel mono">
              <div className="sensor-panel-header">
                <span className="led-sensor-active" />
                <span>FIELD TELEMETRY // TELEM_02</span>
              </div>
              <div className="sensor-metrics-grid">
                <div className="sensor-readout">
                  <span className="sensor-label">SOIL MOISTURE</span>
                  <strong className="sensor-val text-green">68% <small>OPTIMAL</small></strong>
                </div>
                <div className="sensor-readout">
                  <span className="sensor-label">TEMPERATURE</span>
                  <strong className="sensor-val">24.2°C</strong>
                </div>
                <div className="sensor-readout">
                  <span className="sensor-label">WATER LEVEL</span>
                  <strong className="sensor-val text-blue">82% <small>STABLE</small></strong>
                </div>
              </div>
            </div>

            <div className="card-footer-note hand">
              <Droplets size={14} />
              <span>“The physical world doesn&apos;t wait for a re-render.”</span>
            </div>
          </motion.div>


          {/* ════════════════════════════════════════════════════════════
              03 / ACHIEVEMENT — IIT Mandi Rocketry (Polaroid + Red Stamp)
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            className="scrapbook-card card-polaroid-prominent card-rot-neg2 cursor-target"
            whileHover={shouldReduceMotion ? {} : { y: -5, rotate: 0, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveCard('card-03')}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Top Pushpin */}
            <div className="card-fixture-pushpin pin-red" aria-hidden="true" />

            {/* Rubber Stamp: RUNNER-UP */}
            <div className="rubber-stamp-badge stamp-rust">
              <span>RUNNER-UP</span>
              <small>IIT MANDI ROCKETRY</small>
            </div>

            <div className="card-header mono">
              <span className="card-idx">03 / COMPETITION</span>
              <span className="card-date">2026.03</span>
            </div>

            <h3 className="card-title serif">IIT Mandi Rocketry Competition</h3>

            {/* Main Polaroid Specimen Photo */}
            <div className="polaroid-photo-box">
              <div className="polaroid-screen slot-rocket">
                <div className="slot-grid-mesh" />
                <Rocket size={32} className="slot-icon text-red" />
                <div className="telemetry-hud-overlay mono">
                  <span>ALT: 420m</span>
                  <span>BURNOUT: 2.4s</span>
                </div>
              </div>
              <div className="polaroid-footer-strip mono">
                <span>SPECIMEN_ID: ROCKET_STAGE_01</span>
                <span>VERIFIED RUN</span>
              </div>
            </div>

            <p className="card-body-text">
              Constructed high-g telemetry avionics and calibrated motor burn timing under extreme environmental constraints. Secured <strong>Runner-Up</strong> across national university teams.
            </p>

            <div className="card-accent-pill mono">
              <Award size={13} />
              <span>NATIONAL RUNNER-UP LAUREL</span>
            </div>
          </motion.div>


          {/* ════════════════════════════════════════════════════════════
              04 / PROJECT — NeuroLean (Graph Paper AI Card)
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            className="scrapbook-card card-graph-paper card-rot-pos2 cursor-target"
            whileHover={shouldReduceMotion ? {} : { y: -5, rotate: 0, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveCard('card-04')}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Brass Paperclip */}
            <div className="card-fixture-paperclip top-right" aria-hidden="true">
              <svg viewBox="0 0 28 72" width="18" height="48" fill="none" stroke="#68737d" strokeWidth="2.4" strokeLinecap="round">
                <path d="M 14,8 L 14,54 C 14,62 6,62 6,54 L 6,18 C 6,10 22,10 22,18 L 22,56 C 22,68 2,68 2,56 L 2,24" />
              </svg>
            </div>

            <div className="card-header mono">
              <span className="card-idx">04 / INTELLIGENT SYSTEM</span>
              <span className="card-date">2026.05</span>
            </div>

            <div className="title-with-icon">
              <Brain size={22} className="card-title-icon" />
              <h3 className="card-title serif">NeuroLean</h3>
            </div>

            <div className="card-tags-row mono">
              <span className="mini-tag">AI/ML</span>
              <span className="mini-tag">Web Architecture</span>
              <span className="mini-tag">Personalized Learning</span>
            </div>

            <p className="card-body-text">
              An AI-assisted cognitive learning platform focused on personalized recommendation graphs, adaptive question pacing, and real-time student mastery modeling.
            </p>

            {/* Neural Graph Visual Blueprint Snippet */}
            <div className="graph-sketch-diagram mono">
              <div className="diagram-node">STUDENT STATE</div>
              <div className="diagram-arrow">→</div>
              <div className="diagram-node active">KNOWLEDGE GRAPH</div>
              <div className="diagram-arrow">→</div>
              <div className="diagram-node">PROMPT ENGINE</div>
            </div>

            <div className="card-footer-note hand">
              <span>“Adaptive intelligence tailored to individual human friction.”</span>
            </div>
          </motion.div>


          {/* ════════════════════════════════════════════════════════════
              05 / PROJECT — WALL-e Line Following Robot (Robotics Polaroid + Badge)
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            className="scrapbook-card card-robotics card-rot-neg1 cursor-target"
            whileHover={shouldReduceMotion ? {} : { y: -5, rotate: 0, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveCard('card-05')}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Corner Tape */}
            <div className="card-fixture-tape top-left-angle" aria-hidden="true" />

            {/* 4th Place Badge */}
            <div className="achievement-badge-pill mono">
              <Sparkles size={12} />
              <span>4TH PLACE // IIT ROPAR</span>
            </div>

            <div className="card-header mono">
              <span className="card-idx">05 / ROBOTICS PLATFORM</span>
              <span className="card-date">2026.06</span>
            </div>

            <h3 className="card-title serif">WALL-e Line Following Robot</h3>

            <div className="card-tags-row mono">
              <span className="mini-tag">Arduino</span>
              <span className="mini-tag">Sensors</span>
              <span className="mini-tag">Motors</span>
              <span className="mini-tag">Control Logic</span>
            </div>

            {/* Polaroid Robot Chassis View */}
            <div className="polaroid-photo-box mini">
              <div className="polaroid-screen slot-robot">
                <div className="slot-grid-mesh" />
                <Bot size={30} className="slot-icon" />
                <span className="slot-label mono">CHASSIS REV_2 // 8-SENSOR ARRAY</span>
              </div>
            </div>

            <p className="card-body-text">
              Designed and assembled a high-speed differential-drive line-following robot with custom PID control loops, IR sensor arrays, and sub-millisecond path correction.
            </p>

            <div className="card-footer-note hand">
              <span>“Smooth trajectories require ruthless tuning.”</span>
            </div>
          </motion.div>


          {/* ════════════════════════════════════════════════════════════
              06 / ROLES & LEADERSHIP — Archival Leadership Dossier
              ════════════════════════════════════════════════════════════ */}
          <motion.div
            className="scrapbook-card card-kraft-dossier card-rot-pos1 cursor-target"
            whileHover={shouldReduceMotion ? {} : { y: -5, rotate: 0, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setActiveCard('card-06')}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Wax Seal Stamp */}
            <div className="dossier-verified-stamp mono" aria-label="Official Verified Record Stamp">
              <span>OFFICIAL DOSSIER</span>
              <strong>VERIFIED</strong>
            </div>

            <div className="card-header mono">
              <span className="card-idx">06 / ARCHIVAL RECORD</span>
              <span className="card-date">CONTINUOUS</span>
            </div>

            <h3 className="card-title serif">Roles &amp; Leadership</h3>
            <p className="card-body-text dossier-intro">
              Leadership appointments, institutional responsibilities, and competitive delegations:
            </p>

            {/* Leadership Line Items */}
            <div className="leadership-records-list">
              <div className="leadership-record-item">
                <div className="record-icon-box">
                  <Cpu size={16} />
                </div>
                <div className="record-details">
                  <div className="record-role-line">
                    <strong className="record-role">Hardware Head</strong>
                    <span className="record-timeline mono">Present</span>
                  </div>
                  <span className="record-org mono">CREST-DSRP, Lovely Professional University</span>
                </div>
              </div>

              <div className="leadership-record-item">
                <div className="record-icon-box">
                  <Award size={16} />
                </div>
                <div className="record-details">
                  <div className="record-role-line">
                    <strong className="record-role">Runner-Up</strong>
                    <span className="record-timeline mono">Jan 2026</span>
                  </div>
                  <span className="record-org mono">SPECTRA, LPU Inter-University Competition</span>
                </div>
              </div>

              <div className="leadership-record-item">
                <div className="record-icon-box">
                  <Users size={16} />
                </div>
                <div className="record-details">
                  <div className="record-role-line">
                    <strong className="record-role">Events Organized &amp; Participated</strong>
                    <span className="record-timeline mono">2026</span>
                  </div>
                  <span className="record-org mono">Innotek 2026 · Cognitia 2026 · Smart India Hackathon (SIH)</span>
                </div>
              </div>

              <div className="leadership-record-item">
                <div className="record-icon-box">
                  <Rocket size={16} />
                </div>
                <div className="record-details">
                  <div className="record-role-line">
                    <strong className="record-role">Runner-Up</strong>
                    <span className="record-timeline mono">Mar 2026</span>
                  </div>
                  <span className="record-org mono">IIT Mandi National Rocketry Championship</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════════════════════════
              07 / CREDENTIALS & APPOINTMENTS (Merged 4-Card Cluster)
              ════════════════════════════════════════════════════════════ */}
          <div className="scrapbook-credentials-cluster">
            <div className="credentials-cluster-header mono">
              <span className="cluster-tag">[ CREDENTIALS &amp; APPOINTMENTS // VERIFIED REPUTATION ]</span>
              <span className="cluster-sub">INSTITUTIONAL MEMBERSHIPS &amp; RECOGNITION</span>
            </div>

            <div className="credentials-cards-row">
              {/* Card 1: AI Club · Core Member */}
              <motion.div
                className="credential-id-badge cred-rot-neg1 cursor-target"
                whileHover={shouldReduceMotion ? {} : { y: -4, rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.18 }}
              >
                <div className="badge-fixture-pin" aria-hidden="true" />
                <div className="badge-header mono">
                  <span className="badge-code">CRED-01</span>
                  <span className="badge-stamp">VERIFIED</span>
                </div>
                <div className="badge-body">
                  <div className="badge-icon-box">
                    <Brain size={18} />
                  </div>
                  <div className="badge-content">
                    <h4 className="badge-role serif">Core Member</h4>
                    <span className="badge-org mono">AI Club · LPU</span>
                  </div>
                </div>
                <div className="badge-footer mono">
                  <span>STATUS: ACTIVE</span>
                  <span className="badge-led" />
                </div>
              </motion.div>

              {/* Card 2: Robotics Lab · Project Lead */}
              <motion.div
                className="credential-id-badge cred-rot-pos1 cursor-target"
                whileHover={shouldReduceMotion ? {} : { y: -4, rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.18 }}
              >
                <div className="badge-fixture-tape" aria-hidden="true" />
                <div className="badge-header mono">
                  <span className="badge-code">CRED-02</span>
                  <span className="badge-stamp">VERIFIED</span>
                </div>
                <div className="badge-body">
                  <div className="badge-icon-box">
                    <Bot size={18} />
                  </div>
                  <div className="badge-content">
                    <h4 className="badge-role serif">Project Lead</h4>
                    <span className="badge-org mono">Robotics Lab</span>
                  </div>
                </div>
                <div className="badge-footer mono">
                  <span>STATUS: ACTIVE</span>
                  <span className="badge-led" />
                </div>
              </motion.div>

              {/* Card 3: Campus Tech Fest · Coordinator */}
              <motion.div
                className="credential-id-badge cred-rot-neg2 cursor-target"
                whileHover={shouldReduceMotion ? {} : { y: -4, rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.18 }}
              >
                <div className="badge-fixture-pin pin-blue" aria-hidden="true" />
                <div className="badge-header mono">
                  <span className="badge-code">CRED-03</span>
                  <span className="badge-stamp">VERIFIED</span>
                </div>
                <div className="badge-body">
                  <div className="badge-icon-box">
                    <Sparkles size={18} />
                  </div>
                  <div className="badge-content">
                    <h4 className="badge-role serif">Coordinator</h4>
                    <span className="badge-org mono">Campus Tech Fest</span>
                  </div>
                </div>
                <div className="badge-footer mono">
                  <span>STATUS: VERIFIED</span>
                  <span className="badge-led" />
                </div>
              </motion.div>

              {/* Card 4: Peer Learning Circle · Mentor */}
              <motion.div
                className="credential-id-badge cred-rot-pos2 cursor-target"
                whileHover={shouldReduceMotion ? {} : { y: -4, rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.18 }}
              >
                <div className="badge-fixture-tape right" aria-hidden="true" />
                <div className="badge-header mono">
                  <span className="badge-code">CRED-04</span>
                  <span className="badge-stamp">VERIFIED</span>
                </div>
                <div className="badge-body">
                  <div className="badge-icon-box">
                    <Users size={18} />
                  </div>
                  <div className="badge-content">
                    <h4 className="badge-role serif">Mentor</h4>
                    <span className="badge-org mono">Peer Learning Circle</span>
                  </div>
                </div>
                <div className="badge-footer mono">
                  <span>STATUS: ACTIVE</span>
                  <span className="badge-led" />
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ── EXPEDITIONS SCRAPBOOK FOOTER ── */}
      <div className="expeditions-scrapbook-footer">
        <div className="footer-left-handnote hand">
          <Compass size={18} className="compass-icon" />
          <span>“keep exploring, keep building.”</span>
        </div>

        <div className="footer-center-quote serif">
          <span className="quote-dash mono">—</span>
          <em>Every experiment teaches. Every challenge builds.</em>
          <span className="quote-dash mono">—</span>
        </div>

        <div className="footer-right-code mono">
          <span>FIELD LOG // 06 COMPLETE</span>
        </div>
      </div>
    </div>
  )
}
