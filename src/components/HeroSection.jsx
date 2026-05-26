import { motion } from 'framer-motion'
import { PROFILE, PROOF_POINTS } from '../data/profile'

export function HeroSection({ onCopyEmail }) {
  return (
    <motion.div
      className="hero-section panel-glass"
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="hero-copy-inner">
        <p className="mono">FEATURE REEL</p>
        <h1>{PROFILE.role}</h1>
        <p className="hero-summary">{PROFILE.summary}</p>

        <div className="hero-meta">
          <span>MCA (Generative AI)</span>
          <span>Fresher Profile</span>
          <span>{PROFILE.location}</span>
        </div>

        <div className="hero-cta-row">
          <a href="#work" className="signal-btn">View Work</a>
          <a href="/Resume.pdf" className="outline-btn" download>Download Resume</a>
        </div>

        <p className="signal-status">Open to AI internships and junior roles. Open to relocation.</p>

        <div className="proof-strip">
          {PROOF_POINTS.map((p) => (
            <div key={p.label} className="proof-item">
              <span>{p.label}</span>
              <strong>{p.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default HeroSection
