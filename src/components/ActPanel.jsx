import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
} from '../data/profile'

function Act0() {
  return (
    <section className="act-panel-content">
      <h3>Booting Identity</h3>
      <p>{PROFILE.summary}</p>
      <div className="detail-grid">
        <p>{PROFILE.location}</p>
        <p>{PROFILE.phone}</p>
        <p>{PROFILE.email}</p>
      </div>
    </section>
  )
}

function Act1() {
  return (
    <section className="act-panel-content">
      <h3>Origin Story</h3>
      <ul>
        {EDUCATION.map((entry) => (
          <li key={entry.degree}>
            <strong>{entry.degree}</strong>
            <span>{entry.school}</span>
            <span>{entry.year} | {entry.score}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Act2() {
  return (
    <section className="act-panel-content">
      <h3>Workshop Projects</h3>
      <ul>
        {PROJECTS.slice(0, 3).map((project) => (
          <li key={project.name}>
            <strong>{project.name}</strong>
            <span>{project.summary}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Act3() {
  return (
    <section className="act-panel-content">
      <h3>Arsenal Skills</h3>
      <ul>
        {SKILL_GROUPS.map((group) => (
          <li key={group.title}>
            <strong>{group.title}</strong>
            <span>{group.items.slice(0, 6).join(', ')}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Act4() {
  return (
    <section className="act-panel-content">
      <h3>Broadcast Tower</h3>
      <ul>
        {EXPERIENCE.map((item) => (
          <li key={item.role}>
            <strong>{item.role} - {item.org}</strong>
            <span>{item.date} | {item.location}</span>
            <span>{item.highlights[0]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Act5() {
  return (
    <section className="act-panel-content">
      <h3>Hidden Archive</h3>
      <p>Additional credentials and interests unlocked.</p>
      <ul>
        {CERTIFICATIONS.slice(0, 2).map((cert) => (
          <li key={cert}>
            <span>{cert}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ActPanel({ act }) {
  if (act === 1) return <Act1 />
  if (act === 2) return <Act2 />
  if (act === 3) return <Act3 />
  if (act === 4) return <Act4 />
  if (act === 5) return <Act5 />
  return <Act0 />
}
