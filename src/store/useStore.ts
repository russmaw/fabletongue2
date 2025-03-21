import { create } from 'zustand'

interface Story {
  id: string
  title: string
  content: string
  progress: number
  vocabulary: Array<{
    word: string
    translation: string
    context: string
  }>
}

interface UserProgress {
  level: number
  xp: number
  streak: number
  achievements: Array<{
    id: number
    title: string
    description: string
    unlocked: boolean
  }>
}

interface AppState {
  stories: Story[]
  currentStory: Story | null
  userProgress: UserProgress
  isLoading: boolean
  setStories: (stories: Story[]) => void
  setCurrentStory: (story: Story | null) => void
  updateUserProgress: (progress: Partial<UserProgress>) => void
  setLoading: (loading: boolean) => void
}

const useStore = create<AppState>((set) => ({
  stories: [],
  currentStory: null,
  userProgress: {
    level: 1,
    xp: 0,
    streak: 0,
    achievements: [],
  },
  isLoading: false,
  setStories: (stories) => set({ stories }),
  setCurrentStory: (story) => set({ currentStory: story }),
  updateUserProgress: (progress) =>
    set((state) => ({
      userProgress: { ...state.userProgress, ...progress },
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}))

export default useStore 