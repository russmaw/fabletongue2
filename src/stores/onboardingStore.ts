import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
  hasCompletedTutorial: boolean
  currentStep: number
  selectedLanguage: string | null
  achievements: {
    id: string
    title: string
    description: string
    icon: string
    unlockedAt: string | null
  }[]
  // Actions
  setHasCompletedTutorial: (completed: boolean) => void
  setCurrentStep: (step: number) => void
  setSelectedLanguage: (language: string) => void
  unlockAchievement: (id: string) => void
  resetTutorial: () => void
}

const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedTutorial: false,
      currentStep: 0,
      selectedLanguage: null,
      achievements: [
        {
          id: 'first_story',
          title: 'Apprentice Storyteller',
          description: 'Complete your first language learning story',
          icon: '📚',
          unlockedAt: null
        },
        {
          id: 'language_selected',
          title: 'Path Chosen',
          description: 'Select your first language to master',
          icon: '🗣️',
          unlockedAt: null
        },
        {
          id: 'tutorial_complete',
          title: 'Ready for Adventure',
          description: 'Complete the tutorial and begin your journey',
          icon: '🎯',
          unlockedAt: null
        }
      ],
      setHasCompletedTutorial: (completed) => set({ hasCompletedTutorial: completed }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setSelectedLanguage: (language) => {
        set({ selectedLanguage: language })
        // Unlock the language selection achievement
        set((state) => ({
          achievements: state.achievements.map(achievement => 
            achievement.id === 'language_selected'
              ? { ...achievement, unlockedAt: new Date().toISOString() }
              : achievement
          )
        }))
      },
      unlockAchievement: (id) => set((state) => ({
        achievements: state.achievements.map(achievement =>
          achievement.id === id && !achievement.unlockedAt
            ? { ...achievement, unlockedAt: new Date().toISOString() }
            : achievement
        )
      })),
      resetTutorial: () => set({
        hasCompletedTutorial: false,
        currentStep: 0,
        selectedLanguage: null,
        achievements: [
          {
            id: 'first_story',
            title: 'Apprentice Storyteller',
            description: 'Complete your first language learning story',
            icon: '📚',
            unlockedAt: null
          },
          {
            id: 'language_selected',
            title: 'Path Chosen',
            description: 'Select your first language to master',
            icon: '🗣️',
            unlockedAt: null
          },
          {
            id: 'tutorial_complete',
            title: 'Ready for Adventure',
            description: 'Complete the tutorial and begin your journey',
            icon: '🎯',
            unlockedAt: null
          }
        ]
      })
    }),
    {
      name: 'fabletongue-onboarding'
    }
  )
)

export default useOnboardingStore 