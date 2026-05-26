import { ZONES } from '../data/zones'
import { PROFILE } from '../data/profile'
import { useStoryStore } from '../store/useStoryStore'
import { ActPanel } from './ActPanel'

export function HUD() {
  const currentAct = useStoryStore((state) => state.currentAct)
  const goToAct = useStoryStore((state) => state.goToAct)
  const cameraMode = useStoryStore((state) => state.cameraMode)
  const toggleCameraMode = useStoryStore((state) => state.toggleCameraMode)
  const easterEggUnlocked = useStoryStore((state) => state.easterEggUnlocked)

  const activeZone = ZONES.find((zone) => zone.act === currentAct) ?? ZONES[0]
  const visibleActs = ZONES.filter((zone) => !zone.hidden)
  const mainActCount = Math.max(visibleActs.length - 1, 1)
  const progress = Math.min(Math.round((Math.min(currentAct, 4) / mainActCount) * 100), 100)

  return (
    <div className="hud-layer">
      <header className="hud-header glass-panel">
        <p className="mono">{PROFILE.name.toUpperCase()}.EXE</p>
        <h1>{PROFILE.role}</h1>
        <p className="muted">{PROFILE.location}</p>
        <p className="muted">{PROFILE.phone} | {PROFILE.email}</p>
        <div className="link-row">
          {PROFILE.links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <aside className="zone-callout glass-panel" id="hud-zone-label">
        <p className="mono">ACT {activeZone.act}</p>
        <h2>{activeZone.label}</h2>
        <p className="muted">{activeZone.subtitle}</p>
        <div className="progress-inline" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="progress-inline-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="mono">STORY PROGRESS {progress}%</p>
      </aside>

      <aside className="interaction-card glass-panel">
        <p className="mono">MODE: {cameraMode.toUpperCase()}</p>
        <p>[F] Toggle Story / Free Roam</p>
        <p>[0-4] Jump to Act</p>
        <p>Type VIBE to unlock hidden zone</p>
        {easterEggUnlocked && <p className="highlight">Easter room unlocked</p>}
        <button className="mode-btn" onClick={toggleCameraMode}>
          {cameraMode === 'story' ? 'Unlock Free Roam' : 'Return to Story Cam'}
        </button>
        <p className="tiny-note">Tip: in free roam, scroll to zoom and drag to orbit.</p>
      </aside>

      <aside className="act-detail-panel glass-panel">
        <ActPanel act={currentAct} />
      </aside>

      <nav className="progress-wrap glass-panel" aria-label="Story chapters">
        {visibleActs.map((zone) => (
          <button
            key={zone.id}
            onClick={() => goToAct(zone.act)}
            className={zone.act === currentAct ? 'chapter active' : 'chapter'}
          >
            <span className="mono">{zone.act}</span>
            <span>{zone.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
