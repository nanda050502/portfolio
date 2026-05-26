import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BLOG_NOTES, DECLARATION, EXPERIENCE, OFFER_ITEMS, PROFILE, PROJECTS, PROOF_POINTS, SKILL_GROUPS } from '../../data/profile'
import { STORY_SECTIONS } from '../../data/storySections'

const THEME_OPTIONS = [
  { id: 'luxury-dark-editorial', label: 'Luxury Dark Editorial' },
  { id: 'brighter-cinematic-showcase', label: 'Brighter Cinematic Showcase' },
  { id: 'space-tech-infographic', label: 'Space-Tech Infographic' },
  { id: 'minimal-premium-agency', label: 'Minimal Premium Agency Style' },
]

const LOTTIE_STATES = {
  idle: 'https://assets9.lottiefiles.com/packages/lf20_j1adxtyb.json',
  walk: 'https://assets1.lottiefiles.com/packages/lf20_yd8fbnml.json',
}

function Spaceman({ isWalking }) {
  const [hasLottieError, setHasLottieError] = useState(false)

  if (!hasLottieError) {
    return (
      <dotlottie-player
        class="spaceman-lottie"
        src={isWalking ? LOTTIE_STATES.walk : LOTTIE_STATES.idle}
        background="transparent"
        speed={isWalking ? '1' : '0.7'}
        loop
        autoplay
        onError={() => setHasLottieError(true)}
      />
    )
  }

  return (
    <svg viewBox="0 0 120 120" className="spaceman-svg" aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="#0f1830" />
      <ellipse cx="60" cy="46" rx="24" ry="26" fill="#f2f8ff" />
      <ellipse cx="60" cy="46" rx="17" ry="16" fill="#7dd6ff" />
      <rect x="42" y="74" width="36" height="20" rx="8" fill="#d8e8ff" />
      <circle cx="60" cy="84" r="4" fill="#19f5c1" />
      <rect x="26" y="73" width="14" height="10" rx="5" fill="#d8e8ff" />
      <rect x="80" y="73" width="14" height="10" rx="5" fill="#d8e8ff" />
    </svg>
  )
}

function ChoreoSectionCard({ section, index }) {
  return (
    <motion.section
      id={section.id}
      className="story-card"
      style={{ '--section-accent': section.accent }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -42 : 42, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.56, ease: 'easeOut', delay: index * 0.06 }}
    >
      <div className="story-header-row">
        <div>
          <p className="story-kicker">{section.kicker}</p>
          <h2>{section.title}</h2>
          <p className="story-value">{section.value}</p>
        </div>
        <a href="#contact" className="section-link">{section.cta}</a>
      </div>
      <p className="story-description">{section.description}</p>
      {section.metrics && (
        <div className="metric-row">
          {section.metrics.map((metric) => (
            <div className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>
      )}
      <ul>
        {section.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </motion.section>
  )
}

function OfferCard({ item, index }) {
  return (
    <motion.article
      className="offer-card panel-glass"
      initial={{ opacity: 0, y: 24, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
    >
      <p className="mono">What I Offer</p>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </motion.article>
  )
}

function NoteCard({ note, index }) {
  return (
    <motion.article
      className="note-card panel-glass"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.42, ease: 'easeOut', delay: index * 0.05 }}
    >
      <p className="mono">{note.date}</p>
      <h3>{note.title}</h3>
      <p>{note.text}</p>
    </motion.article>
  )
}

export function SpaceStory2D() {
  const scrollContainerRef = useRef(null)
  const idleTimerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: scrollContainerRef })
  const [isWalking, setIsWalking] = useState(false)
  const [copyState, setCopyState] = useState('idle')
  const [theme, setTheme] = useState('luxury-dark-editorial')

  const travel = useTransform(scrollYProgress, [0, 1], [0, 1])
  const parallaxFar = useTransform(scrollYProgress, [0, 1], [0, -70])
  const parallaxMid = useTransform(scrollYProgress, [0, 1], [0, -130])
  const parallaxNear = useTransform(scrollYProgress, [0, 1], [0, -190])
  const signalFill = useTransform(scrollYProgress, [0, 1], [0, 1])

  const pathSegments = useMemo(() => STORY_SECTIONS.length - 1, [])

  const links = PROFILE.links
  const totalProjects = PROJECTS.length
  const totalSkillBuckets = SKILL_GROUPS.length

  useEffect(() => {
    const node = scrollContainerRef.current
    if (!node) return undefined

    const onScroll = () => {
      setIsWalking(true)

      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current)
      }

      idleTimerRef.current = window.setTimeout(() => {
        setIsWalking(false)
      }, 260)
    }

    node.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      node.removeEventListener('scroll', onScroll)
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current)
      }
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopyState('sent')
      window.setTimeout(() => setCopyState('idle'), 1800)
    } catch {
      setCopyState('failed')
      window.setTimeout(() => setCopyState('idle'), 1800)
    }
  }

  return (
    <main className="studio-shell" ref={scrollContainerRef} data-theme={theme}>
      <motion.div className="scroll-meter" style={{ scaleX: signalFill }} />
      <div className="space-noise" aria-hidden="true" />
      <motion.div className="planet planet-far" style={{ y: parallaxFar }} aria-hidden="true" />
      <motion.div className="planet planet-mid" style={{ y: parallaxMid }} aria-hidden="true" />
      <motion.div className="planet planet-near" style={{ y: parallaxNear }} aria-hidden="true" />
      <motion.div className="comet comet-one" style={{ y: parallaxMid }} aria-hidden="true" />
      <motion.div className="comet comet-two" style={{ y: parallaxNear }} aria-hidden="true" />

      <header className="studio-topbar panel-glass">
        <div className="topbar-row">
          <div className="studio-brand">
            <p className="mono">{PROFILE.name.toUpperCase()} STUDIO</p>
            <p className="topbar-tagline">A cinematic portfolio reel built for scroll-first storytelling.</p>
          </div>
          <nav>
            <a href="#hero">Home</a>
            <a href="#work">Work</a>
            <a href="#journey">Journey</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="theme-switcher" role="group" aria-label="Visual direction">
          {THEME_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={theme === option.id ? 'theme-chip active' : 'theme-chip'}
              onClick={() => setTheme(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <section className="hero-grid" id="hero">
        <HeroSection />

        <motion.div
          className="hero-visual panel-glass"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="mono">LIVE REEL</p>
          <div className="hero-video-frame">
            <video
              className="hero-bg-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg?auto=compress&cs=tinysrgb&w=1200"
            >
              <source src="https://videos.pexels.com/video-files/856125/856125-hd_1920_1080_30fps.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay" aria-hidden="true" />
            <div className="spaceman-stage">
              <Spaceman isWalking={isWalking} />
            </div>
          </div>
          <p className="muted">Built through coursework, labs, and self-directed projects in AI, cloud, and software.</p>
          <div className="stats-row">
            <div>
              <strong>{totalProjects}+</strong>
              <span>Projects</span>
            </div>
            <div>
              <strong>{EXPERIENCE.length}</strong>
              <span>Experiences</span>
            </div>
            <div>
              <strong>{totalSkillBuckets}</strong>
              <span>Skill Domains</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="social-strip panel-glass">
        <p className="mono">CONNECT</p>
        <div className="link-row">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="about-grid" id="about">
        <div className="about-copy panel-glass">
          <p className="mono">ABOUT ME</p>
          <h2>Built on Generative AI, grounded in software fundamentals.</h2>
          <p>
            I am an MCA student specializing in Generative AI with a practical focus on
            Python, Java, APIs, cloud basics, and AI product building.
          </p>
          <p>
            I like systems that are useful, clear, and well-built. My approach is simple:
            learn fast, prototype quickly, and refine until the work feels solid.
          </p>
        </div>
        <div className="about-panel panel-glass">
          <p className="mono">PROFILE</p>
          <div className="about-bullets">
            <span>MCA (Generative AI)</span>
            <span>SRM University</span>
            <span>Chennai, India</span>
            <span>Open to relocation</span>
            <span>Entry-level AI roles</span>
          </div>
          <div className="about-quote">
            <p>“I want to build practical AI systems that are clear, useful, and ready for real teams.”</p>
          </div>
        </div>
      </section>

      <section className="offer-grid" id="offer">
        <div className="section-heading panel-glass">
          <p className="mono">WHAT I OFFER</p>
          <h2>Practical capability across AI, automation, and software delivery.</h2>
        </div>
        {OFFER_ITEMS.map((item, index) => (
          <OfferCard key={item.title} item={item} index={index} />
        ))}
      </section>

      <section className="expertise-banner panel-glass" id="expertise">
        <div>
          <p className="mono">PROOF</p>
          <h2>Education, projects, tools, and certifications in one place.</h2>
          <p className="story-value">A compact proof layer that makes the page feel larger and more credible.</p>
        </div>
        <div className="expertise-chips">
          <span>Generative AI</span>
          <span>Python</span>
          <span>Cloud Fundamentals</span>
          <span>Streamlit</span>
          <span>Java</span>
          <span>Problem Solving</span>
        </div>
      </section>

      <section className="work-grid" id="work">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.name}
            className="work-card panel-glass"
            initial={{ opacity: 0, y: 36, x: index % 2 === 0 ? -26 : 26 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.52, ease: 'easeOut', delay: index * 0.08 }}
          >
            <p className="story-kicker">CASE STUDY</p>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <div className="chip-row">
              {project.stack.slice(0, 4).map((item) => (
                <span key={item} className="chip">{item}</span>
              ))}
            </div>
            <div className="case-poster" aria-hidden="true">
              <div className="case-poster-copy">
                <span>Case Study</span>
                <strong>{project.name}</strong>
                <small>Built as part of my academic and applied portfolio</small>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="brand-proof panel-glass" id="brands">
        <div>
          <p className="mono">BRANDS / CONTEXT</p>
          <h2>Organizations and environments that shaped the work.</h2>
        </div>
        <div className="brand-list">
          <span>SRM University</span>
          <span>Talencia Global</span>
          <span>BCG Simulation</span>
          <span>Google Cloud</span>
          <span>Vertex AI</span>
          <span>OpenRouter</span>
        </div>
      </section>

      <section className="blog-grid" id="blog">
        <div className="section-heading panel-glass">
          <p className="mono">BLOG / NOTES</p>
          <h2>Short insights on how I think and build.</h2>
        </div>
        {BLOG_NOTES.map((note, index) => (
          <NoteCard key={note.title} note={note} index={index} />
        ))}
      </section>

      <section className="stats-strip panel-glass" id="stats">
        <div>
          <strong>{PROJECTS.length}</strong>
          <span>Projects</span>
        </div>
        <div>
          <strong>{EXPERIENCE.length}</strong>
          <span>Learning Tracks</span>
        </div>
        <div>
          <strong>{SKILL_GROUPS.length}</strong>
          <span>Skill Areas</span>
        </div>
        <div>
          <strong>{OFFER_ITEMS.length}</strong>
          <span>Services</span>
        </div>
      </section>

      <motion.section
        className="journey-wrap"
        id="journey"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="rocket-track panel-glass" aria-hidden="true">
          <div className="track-line" />
          <motion.div className="track-progress" style={{ scaleY: signalFill }} />
          <motion.div className="spaceman-wrap" style={{ top: useTransform(travel, (v) => `${v * (pathSegments * 86)}px`) }}>
            <Spaceman isWalking={isWalking} />
          </motion.div>
          {STORY_SECTIONS.map((section, index) => (
            <a key={section.id} href={`#${section.id}`} className="track-stop" style={{ top: `${index * 86}px` }}>
              <span>{section.kicker}</span>
              <strong>{section.label}</strong>
            </a>
          ))}
        </div>

        <div className="story-scroll">
        {STORY_SECTIONS.map((section, index) => (
          <ChoreoSectionCard key={section.id} section={section} index={index} />
        ))}
        </div>
      </motion.section>

      <section className={copyState === 'sent' ? 'contact-signal panel-glass active' : 'contact-signal panel-glass'} id="contact">
        <p className="mono">SIGNAL TRANSMISSION</p>
        <h3>Let’s build something sharp.</h3>
        <p className="muted">Open to AI internships, junior roles, and collaborative projects.</p>
        <div className="hero-cta-row">
          <button type="button" onClick={copyEmail} className="signal-btn">Copy Email</button>
          <a className="outline-btn" href={`mailto:${PROFILE.email}`}>Open Mail</a>
        </div>
        <p className="signal-status">
          {copyState === 'sent' && 'Transmission sent: email copied'}
          {copyState === 'failed' && 'Transmission failed: clipboard unavailable'}
          {copyState === 'idle' && DECLARATION}
        </p>
        <motion.span
          aria-hidden="true"
          className="signal-ring"
          animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
        />
      </section>
    </main>
  )
}
