import ProjectCard from './ProjectCard'
import { PROJECTS } from '../data/profile'

export function ProjectGrid({ count = 3 }) {
  const items = PROJECTS.slice(0, count)

  return (
    <section className="work-grid" id="work">
      {items.map((p, i) => (
        <ProjectCard key={p.name} project={p} index={i} />
      ))}
    </section>
  )
}

export default ProjectGrid
