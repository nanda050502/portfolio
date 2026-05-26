import { motion } from 'framer-motion'
import { EXPERIENCE } from '../data/profile'

export function ExperienceTimeline() {
  return (
    <section className="experience-panel panel-glass" id="journey">
      <div className="section-heading">
        <p className="mono">JOURNEY</p>
        <h2>Experience & applied work</h2>
      </div>

      <div className="experience-list">
        {EXPERIENCE.map((item, i) => (
          <motion.article
            className="experience-item"
            key={`${item.role}-${i}`}
            initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="exp-meta">
              <p className="mono">{item.date}</p>
              <h3>{item.role}</h3>
              <p className="muted">{item.org} — {item.location}</p>
            </div>
            <div className="exp-body">
              <p>{item.highlights[0]}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default ExperienceTimeline
