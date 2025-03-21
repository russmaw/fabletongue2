import { create } from 'zustand'
import { generateStory, generateVocabularyExercise } from '../services/openai'

interface StoryState {
  story: {
    title: string
    content: string
    progress: number
    vocabulary: Array<{
      word: string
      translation: string
      context: string
    }>
  }
  loading: boolean
  error: string | null
  selectedLanguage: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  generateNewStory: (theme: string, genre: string) => Promise<void>
  continueStory: () => Promise<void>
  setLanguage: (language: string) => void
  setDifficulty: (level: 'beginner' | 'intermediate' | 'advanced') => void
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
  selectedLanguage: 'Spanish', // Default language
  difficulty: 'beginner', // Default difficulty

  setLanguage: (language) => set({ selectedLanguage: language }),
  setDifficulty: (level) => set({ difficulty: level }),

  generateNewStory: async (theme, genre) => {
    set({ loading: true, error: null })
    try {
      const storyContent = await generateStory({
        theme,
        genre,
        targetLanguage: get().selectedLanguage,
        difficulty: get().difficulty
      })

      // Parse the story content to extract title, content, and vocabulary
      const lines = storyContent.split('\n')
      const title = lines[0]
      const content = lines.slice(1).join('\n')

      // Generate vocabulary exercises
      const vocabularyContent = await generateVocabularyExercise(
        content,
        get().selectedLanguage,
        get().difficulty
      )

      // Parse vocabulary content into structured format
      const vocabulary = vocabularyContent.split('\n')
        .filter(line => line.includes(':'))
        .map(line => {
          const [word, rest] = line.split(':')
          const [translation, context] = rest.split(' - ')
          return {
            word: word.trim(),
            translation: translation.trim(),
            context: context?.trim() || ''
          }
        })

      set({
        story: {
          title,
          content,
          progress: 0,
          vocabulary
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
        targetLanguage: get().selectedLanguage,
        difficulty: get().difficulty
      })

      // Generate vocabulary for the continuation
      const vocabularyContent = await generateVocabularyExercise(
        continuation,
        get().selectedLanguage,
        get().difficulty
      )

      // Parse new vocabulary
      const newVocabulary = vocabularyContent.split('\n')
        .filter(line => line.includes(':'))
        .map(line => {
          const [word, rest] = line.split(':')
          const [translation, context] = rest.split(' - ')
          return {
            word: word.trim(),
            translation: translation.trim(),
            context: context?.trim() || ''
          }
        })

      set({
        story: {
          ...currentStory,
          content: `${currentStory.content}\n\n${continuation}`,
          progress: currentStory.progress + 1,
          vocabulary: [...currentStory.vocabulary, ...newVocabulary]
        },
        loading: false
      })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to continue story',
        loading: false
      })
    }
  }
}))

export default useStoryStore 