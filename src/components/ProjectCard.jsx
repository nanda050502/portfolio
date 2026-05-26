import { motion } from 'framer-motion'

export function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      className="work-card panel-glass"
      initial={{ opacity: 0, y: 36, x: index % 2 === 0 ? -26 : 26 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.52, ease: 'easeOut', delay: index * 0.06 }}
    >
      <p className="story-kicker">CASE STUDY</p>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      <div className="chip-row">
        {project.stack?.slice(0, 4).map((item) => (
          <span key={item} className="chip">{item}</span>
        ))}
      </div>

      <div
        className="case-poster"
        aria-hidden="true"
        style={project.poster ? { backgroundImage: `url(${project.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <div className="case-poster-copy">
          <span>Case Study</span>
          <strong>{project.name}</strong>
          <small>{project.tagline ?? 'Built as part of academic and applied portfolio'}</small>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
