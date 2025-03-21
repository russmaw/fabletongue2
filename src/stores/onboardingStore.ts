import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string | null
}

interface OnboardingState {
  currentStep: number
  hasCompletedTutorial: boolean
  selectedLanguage: string | null
  achievements: Achievement[]
  setCurrentStep: (step: number) => void
  setHasCompletedTutorial: (completed: boolean) => void
  setSelectedLanguage: (language: string) => void
  unlockAchievement: (id: string) => void
  resetTutorial: () => void
}

const initialAchievements: Achievement[] = [
  {
    id: 'tutorial_started',
    title: 'First Steps',
    description: 'Begin your language learning journey',
    icon: '🌟',
    unlockedAt: null
  },
  {
    id: 'language_selected',
    title: 'Language Chosen',
    description: 'Selected your target language',
    icon: '🎯',
    unlockedAt: null
  },
  {
    id: 'tutorial_complete',
    title: 'Ready to Learn',
    description: 'Completed the tutorial',
    icon: '🏆',
    unlockedAt: null
  }
]

const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      currentStep: 0,
      hasCompletedTutorial: false,
      selectedLanguage: null,
      achievements: initialAchievements,
      setCurrentStep: (step) => set({ currentStep: step }),
      setHasCompletedTutorial: (completed) => set({ hasCompletedTutorial: completed }),
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map(achievement =>
          achievement.id === id
            ? { ...achievement, unlockedAt: new Date().toISOString() }
            : achievement
        )
      })),
      resetTutorial: () => set({
        currentStep: 0,
        hasCompletedTutorial: false,
        selectedLanguage: null,
        achievements: initialAchievements
      })
    }),
    {
      name: 'onboarding-storage'
    }
  )
)

export default useOnboardingStore 