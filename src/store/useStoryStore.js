import { create } from 'zustand'

export const useStoryStore = create((set, get) => ({
  currentAct: 0,
  cameraMode: 'story',
  enteredActs: [0],
  typedSequence: '',
  easterEggUnlocked: false,

  goToAct: (act) => {
    const safeAct = Math.max(0, Math.min(act, 5))
    const uniqueActs = new Set(get().enteredActs)
    uniqueActs.add(safeAct)

    set({
      currentAct: safeAct,
      enteredActs: Array.from(uniqueActs).sort((a, b) => a - b),
    })
  },

  toggleCameraMode: () => {
    set((state) => ({
      cameraMode: state.cameraMode === 'story' ? 'free' : 'story',
    }))
  },

  setCameraMode: (mode) => set({ cameraMode: mode }),

  appendTypedKey: (key) => {
    const next = `${get().typedSequence}${key}`.slice(-12)
    set({ typedSequence: next })
  },

  unlockEasterEgg: () => set({ easterEggUnlocked: true }),

  clearTypedSequence: () => set({ typedSequence: '' }),
}))
