import { create } from 'zustand'

interface StoryPrompt {
  theme: string
  genre: string
  prompt?: string
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface VocabularyItem {
  word: string
  translation: string
  context: string
}

interface GeneratedStory {
  content: string
  vocabulary: VocabularyItem[]
}

interface Story {
  title: string
  content: string
  progress: number
  vocabulary: VocabularyItem[]
}

interface StoryState {
  story: Story
  loading: boolean
  error: string | null
  selectedLanguage: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  generateNewStory: (theme: string, genre: string) => Promise<void>
  continueStory: () => Promise<void>
  setLanguage: (language: string) => void
  setDifficulty: (level: 'beginner' | 'intermediate' | 'advanced') => void
}

const generateStory = async (prompt: StoryPrompt): Promise<GeneratedStory> => {
  const response = await fetch('/api/generate-story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(prompt),
  })

  if (!response.ok) {
    throw new Error('Failed to generate story')
  }

  return response.json()
}

const useStoryStore = create<StoryState>((set, get) => ({
  story: {
    title: '',
    content: '',
    progress: 0,
    vocabulary: []
  },
  loading: false,
  error: null,
  selectedLanguage: 'en',
  difficulty: 'beginner',

  generateNewStory: async (theme: string, genre: string) => {
    set({ loading: true, error: null })
    try {
      const result = await generateStory({
        theme,
        genre,
        language: get().selectedLanguage,
        difficulty: get().difficulty
      })

      set({
        story: {
          title: theme,
          content: result.content,
          progress: 0,
          vocabulary: result.vocabulary
        },
        loading: false
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate story',
        loading: false 
      })
    }
  },

  continueStory: async () => {
    set({ loading: true, error: null })
    try {
      const currentStory = get().story
      
      const continuation = await generateStory({
        theme: 'continuation',
        genre: 'continuation',
        prompt: `Continue the story:\n${currentStory.content}`,
        language: get().selectedLanguage,
        difficulty: get().difficulty
      })

      set({
        story: {
          ...currentStory,
          content: `${currentStory.content}\n\n${continuation.content}`,
          vocabulary: [...currentStory.vocabulary, ...continuation.vocabulary]
        },
        loading: false
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to continue story',
        loading: false 
      })
    }
  },

  setLanguage: (language: string) => set({ selectedLanguage: language }),
  setDifficulty: (level: 'beginner' | 'intermediate' | 'advanced') => set({ difficulty: level })
}))

export default useStoryStore 