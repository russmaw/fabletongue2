import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateStoryContent, generateVocabularyExercise } from '../services/openai'

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

interface Word {
  id: string
  word: string
  translation: string
  pronunciation: string
  example: string
}

interface StoryChoice {
  text: string
  description: string
  nextNodeId?: string
  learnedWords?: string[]
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
  storyHistory: StoryNode[]
  learnedWords: string[]
  targetLanguage: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isLoading: boolean
  error: string | null
  startStory: (language: string, difficulty: 'beginner' | 'intermediate' | 'advanced') => Promise<void>
  makeChoice: (choiceIndex: number) => Promise<void>
  learnWord: (wordId: string) => void
  resetStory: () => void
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

// Demo story data
const demoStory: Record<string, StoryNode> = {
  start: {
    id: 'start',
    text: "¡Hola! ¿Cómo estás?",
    choices: [
      {
        text: "¡Muy bien, gracias!",
        nextNodeId: 'greeting',
        learnedWords: ['bien', 'gracias'],
      },
      {
        text: "No muy bien...",
        nextNodeId: 'concern',
        learnedWords: ['no', 'bien'],
      },
    ],
    newWords: [
      {
        id: 'hola',
        text: '¡Hola!',
        translation: 'Hello!',
        pronunciation: 'oh-lah',
        example: '¡Hola! ¿Cómo estás?',
      },
      {
        id: 'como',
        text: '¿Cómo',
        translation: 'How',
        pronunciation: 'koh-moh',
        example: '¿Cómo estás?',
      },
      {
        id: 'estas',
        text: 'estás',
        translation: 'are you',
        pronunciation: 'ehs-tahs',
        example: '¿Cómo estás?',
      },
    ],
  },
  greeting: {
    id: 'greeting',
    text: "¡Me alegro! ¿Te gustaría tomar un café?",
    choices: [
      {
        text: "¡Sí, por favor!",
        nextNodeId: 'coffee',
        learnedWords: ['sí', 'por favor'],
      },
      {
        text: "No, gracias.",
        nextNodeId: 'decline',
        learnedWords: ['no', 'gracias'],
      },
    ],
    newWords: [
      {
        id: 'alegro',
        text: 'alegro',
        translation: 'glad',
        pronunciation: 'ah-leh-groh',
        example: '¡Me alegro!',
      },
      {
        id: 'cafe',
        text: 'café',
        translation: 'coffee',
        pronunciation: 'kah-feh',
        example: '¿Te gustaría tomar un café?',
      },
    ],
  },
  concern: {
    id: 'concern',
    text: "Lo siento. ¿Qué te pasa?",
    choices: [
      {
        text: "Estoy cansado.",
        nextNodeId: 'tired',
        learnedWords: ['cansado'],
      },
      {
        text: "Tengo hambre.",
        nextNodeId: 'hungry',
        learnedWords: ['hambre'],
      },
    ],
    newWords: [
      {
        id: 'siento',
        text: 'siento',
        translation: 'sorry',
        pronunciation: 'syehn-toh',
        example: 'Lo siento.',
      },
      {
        id: 'pasa',
        text: 'pasa',
        translation: 'happening',
        pronunciation: 'pah-sah',
        example: '¿Qué te pasa?',
      },
    ],
  },
};

export const useStoryStore = create<StoryState>((set, get) => ({
  currentNode: null,
  storyHistory: [],
  learnedWords: [],
  targetLanguage: '',
  difficulty: 'beginner',
  isLoading: false,
  error: null,

  startStory: async (language: string, difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    set({ isLoading: true, error: null })
    try {
      const response = await generateStoryContent({
        targetLanguage: language,
        difficulty,
      })

      const newNode: StoryNode = {
        id: Date.now().toString(),
        content: response.content,
        newWords: response.newWords.map(word => ({
          id: word.word,
          ...word,
        })),
        choices: response.choices.map(choice => ({
          ...choice,
          nextNodeId: undefined,
          learnedWords: [],
        })),
        culturalNotes: response.culturalNotes,
      }

      set({
        currentNode: newNode,
        storyHistory: [newNode],
        learnedWords: [],
        targetLanguage: language,
        difficulty,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to start story',
        isLoading: false,
      })
    }
  },

  makeChoice: async (choiceIndex: number) => {
    const { currentNode, storyHistory, targetLanguage, difficulty, learnedWords } = get()
    if (!currentNode) return

    set({ isLoading: true, error: null })
    try {
      const response = await generateStoryContent({
        targetLanguage,
        difficulty,
        previousContent: currentNode.content,
        learnedWords,
        currentScene: currentNode.id,
        playerChoices: currentNode.choices.map(c => c.text),
      })

      const newNode: StoryNode = {
        id: Date.now().toString(),
        content: response.content,
        newWords: response.newWords.map(word => ({
          id: word.word,
          ...word,
        })),
        choices: response.choices.map(choice => ({
          ...choice,
          nextNodeId: undefined,
          learnedWords: [],
        })),
        culturalNotes: response.culturalNotes,
      }

      // Update the previous node's choice with the new node's ID
      const updatedHistory = [...storyHistory]
      const lastNode = updatedHistory[updatedHistory.length - 1]
      if (lastNode) {
        lastNode.choices[choiceIndex].nextNodeId = newNode.id
      }

      set({
        currentNode: newNode,
        storyHistory: [...updatedHistory, newNode],
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to generate next story part',
        isLoading: false,
      })
    }
  },

  learnWord: (wordId: string) => {
    const { currentNode, learnedWords } = get()
    if (!currentNode) return

    const word = currentNode.newWords.find(w => w.id === wordId)
    if (word && !learnedWords.includes(wordId)) {
      set({ learnedWords: [...learnedWords, wordId] })
    }
  },

  resetStory: () => {
    set({
      currentNode: null,
      storyHistory: [],
      learnedWords: [],
      targetLanguage: '',
      difficulty: 'beginner',
      error: null,
    })
  },
})) 