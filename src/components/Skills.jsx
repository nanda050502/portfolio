import { motion } from 'framer-motion'
import { SKILL_GROUPS } from '../data/profile'

export function Skills() {
  return (
    <section className="skills-grid panel-glass" id="skills">
      <div className="section-heading">
        <p className="mono">SKILLS</p>
        <h2>Core capabilities</h2>
      </div>

      <div className="skill-groups">
        {SKILL_GROUPS.map((group) => (
          <motion.article
            key={group.title}
            className="skill-group"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.42 }}
          >
            <h3>{group.title}</h3>
            <div className="chips">
              {group.items.map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Skills
