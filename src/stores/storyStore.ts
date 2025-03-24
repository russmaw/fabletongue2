import { create } from 'zustand'
import { generateStoryContent } from '../services/openai'

interface Word {
  id: string
  word: string
  translation: string
  pronunciation: string
  example: string
}

interface StoryChoice {
  id: string
  text: string
  description: string
  nextNodeId: string
}

interface StoryNode {
  id: string
  content: string
  newWords: Word[]
  choices: StoryChoice[]
  culturalNotes?: string[]
}

interface StoryState {
  currentNode: StoryNode | null
  learnedWords: string[]
  isLoading: boolean
  makeChoice: (choiceIndex: number) => Promise<void>
  learnWord: (wordId: string) => void
  resetStory: () => void
  startStory: () => Promise<void>
}

const useStoryStore = create<StoryState>((set, get) => ({
  currentNode: null,
  learnedWords: [],
  isLoading: false,

  startStory: async () => {
    set({ isLoading: true })
    try {
      const response = await generateStoryContent({
        targetLanguage: 'Spanish', // TODO: Get from language store
        difficulty: 'beginner',
        previousContent: '',
        learnedWords: [],
      })

      const initialNode: StoryNode = {
        id: 'initial',
        content: response.content,
        newWords: response.newWords.map((word, index) => ({
          id: `${word.word}-${index}`,
          word: word.word,
          translation: word.translation,
          pronunciation: word.pronunciation,
          example: word.example,
        })),
        choices: response.choices.map((choice, index) => ({
          id: `choice-${index}`,
          text: choice.text,
          description: choice.description,
          nextNodeId: `node-${index}`,
        })),
        culturalNotes: response.culturalNotes,
      }

      set({ currentNode: initialNode })
    } catch (error) {
      console.error('Error starting story:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  makeChoice: async (choiceIndex: number) => {
    const { currentNode } = get()
    if (!currentNode || !currentNode.choices[choiceIndex]) return

    set({ isLoading: true })
    try {
      const choice = currentNode.choices[choiceIndex]
      const response = await generateStoryContent({
        targetLanguage: 'Spanish', // TODO: Get from language store
        difficulty: 'beginner',
        previousContent: currentNode.content,
        learnedWords: get().learnedWords,
        currentScene: choice.text,
      })

      const newNode: StoryNode = {
        id: choice.nextNodeId,
        content: response.content,
        newWords: response.newWords.map((word, index) => ({
          id: `${word.word}-${index}`,
          word: word.word,
          translation: word.translation,
          pronunciation: word.pronunciation,
          example: word.example,
        })),
        choices: response.choices.map((c, index) => ({
          id: `choice-${index}`,
          text: c.text,
          description: c.description,
          nextNodeId: `node-${index}`,
        })),
        culturalNotes: response.culturalNotes,
      }

      set({ currentNode: newNode })
    } catch (error) {
      console.error('Error making choice:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  learnWord: (wordId: string) => {
    const { learnedWords } = get()
    if (!learnedWords.includes(wordId)) {
      set({ learnedWords: [...learnedWords, wordId] })
    }
  },

  resetStory: () => {
    set({
      currentNode: null,
      learnedWords: [],
      isLoading: false,
    })
  },
}))

export { useStoryStore } 