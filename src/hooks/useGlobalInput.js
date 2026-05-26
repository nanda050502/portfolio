import { useEffect } from 'react'
import { EASTER_SEQUENCE } from '../data/zones'
import { useStoryStore } from '../store/useStoryStore'

export function useGlobalInput() {
  const appendTypedKey = useStoryStore((state) => state.appendTypedKey)
  const typedSequence = useStoryStore((state) => state.typedSequence)
  const unlockEasterEgg = useStoryStore((state) => state.unlockEasterEgg)
  const clearTypedSequence = useStoryStore((state) => state.clearTypedSequence)
  const goToAct = useStoryStore((state) => state.goToAct)
  const toggleCameraMode = useStoryStore((state) => state.toggleCameraMode)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === 'f') {
        toggleCameraMode()
      }

      if (event.key >= '0' && event.key <= '4') {
        goToAct(Number(event.key))
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        appendTypedKey(event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [appendTypedKey, goToAct, toggleCameraMode])

  useEffect(() => {
    if (typedSequence.includes(EASTER_SEQUENCE)) {
      unlockEasterEgg()
      goToAct(5)
      clearTypedSequence()
    }
  }, [typedSequence, unlockEasterEgg, clearTypedSequence, goToAct])
}
