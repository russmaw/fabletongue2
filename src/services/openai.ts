import OpenAI from 'openai'

const getOpenAIConfig = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please check your environment variables.')
  }

  return new OpenAI({ apiKey })
}

const createOpenAIClient = () => {
  try {
    return getOpenAIConfig()
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error)
    throw error
  }
}

interface StoryContext {
  targetLanguage: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  previousContent?: string
  learnedWords?: string[]
  currentScene?: string
  playerChoices?: string[]
}

interface StoryResponse {
  content: string
  newWords: Array<{
    word: string
    translation: string
    pronunciation: string
    example: string
  }>
  choices: Array<{
    text: string
    description: string
  }>
  culturalNotes?: string[]
}

const getDifficultyGuidelines = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return `
        - Use simple present tense and basic vocabulary
        - Keep sentences short and clear
        - Repeat key vocabulary naturally throughout the story
        - Focus on everyday situations and basic descriptions
        - Include common greetings and basic expressions
        - Limit new vocabulary to 3-5 words per scene
      `
    case 'intermediate':
      return `
        - Use a mix of present, past, and future tenses
        - Include idiomatic expressions with explanations
        - Create more complex dialogue situations
        - Use descriptive vocabulary and varied sentence structures
        - Incorporate cultural elements and customs
        - Introduce 5-8 new words per scene
      `
    case 'advanced':
      return `
        - Use sophisticated vocabulary and complex grammar structures
        - Include literary devices and figurative language
        - Create nuanced dialogue and character development
        - Incorporate cultural nuances and historical references
        - Use advanced idiomatic expressions and regional variations
        - Introduce 8-12 new words per scene
      `
    default:
      return ''
  }
}

export const generateStoryContent = async (context: StoryContext): Promise<StoryResponse> => {
  try {
    const openai = createOpenAIClient()
    const difficultyGuidelines = getDifficultyGuidelines(context.difficulty)
    
    const systemPrompt = `You are an interactive storyteller and language teacher specializing in ${context.targetLanguage}.
    Create an engaging, branching narrative that helps learners improve their language skills naturally.
    
    Story Guidelines:
    ${difficultyGuidelines}
    
    Story Format:
    1. Write in ${context.targetLanguage}
    2. Include natural dialogue and descriptions
    3. Weave cultural elements naturally into the story
    4. Provide 3-4 meaningful choices that affect the story
    5. Include new vocabulary that fits the context
    
    Previous learned words: ${context.learnedWords?.join(', ') || 'None'}
    Current scene: ${context.currentScene || 'Beginning'}
    
    After each scene, provide:
    1. The story content
    2. New vocabulary with translations and examples
    3. Multiple choice options for the player
    4. Cultural notes (if relevant)`

    const userPrompt = context.previousContent
      ? `Continue the story from this point: ${context.previousContent}`
      : `Start a new story in ${context.targetLanguage} at ${context.difficulty} level.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No story content received from OpenAI')
    }

    // Parse the response into structured data
    const content = completion.choices[0].message.content
    const sections = content.split('\n\n')
    
    // Extract new words
    const newWordsSection = sections.find(s => s.includes('New Vocabulary:'))
    const newWords = newWordsSection
      ? newWordsSection
          .split('\n')
          .slice(1)
          .map(line => {
            const [word, translation, pronunciation, example] = line.split('|').map(s => s.trim())
            return { word, translation, pronunciation, example }
          })
      : []

    // Extract choices
    const choicesSection = sections.find(s => s.includes('Choices:'))
    const choices = choicesSection
      ? choicesSection
          .split('\n')
          .slice(1)
          .map(line => {
            const [text, description] = line.split('|').map(s => s.trim())
            return { text, description }
          })
      : []

    // Extract cultural notes
    const culturalNotesSection = sections.find(s => s.includes('Cultural Notes:'))
    const culturalNotes = culturalNotesSection
      ? culturalNotesSection.split('\n').slice(1)
      : []

    return {
      content: sections[0], // Main story content
      newWords,
      choices,
      culturalNotes,
    }
  } catch (error) {
    console.error('Error generating story content:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to generate story content: ${error.message}`)
    }
    throw new Error('Failed to generate story content: Unknown error')
  }
}

export const generateVocabularyExercise = async (
  text: string,
  targetLanguage: string,
  difficulty: string,
  learnedWords: string[]
) => {
  try {
    const openai = createOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a language teacher creating engaging vocabulary exercises for ${targetLanguage} learners.
          
          Create exercises that include:
          1. Key vocabulary words with:
             - Clear translations
             - Example sentences showing usage
             - Common collocations or phrases
             - Pronunciation tips (if relevant)
          2. Cultural context where appropriate
          3. Grammar notes for important structures
          4. Practice exercises:
             - Fill in the blanks
             - Multiple choice questions
             - Matching exercises
          
          Difficulty level: ${difficulty}
          Previously learned words: ${learnedWords.join(', ')}
          Focus on practical usage and natural language acquisition.`,
        },
        {
          role: 'user',
          content: `Create vocabulary exercises for this ${targetLanguage} text:\n${text}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    })

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No exercise content received from OpenAI')
    }

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating vocabulary exercise:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to generate vocabulary exercise: ${error.message}`)
    }
    throw new Error('Failed to generate vocabulary exercise: Unknown error')
  }
}

export default {
  generateStoryContent,
  generateVocabularyExercise,
} 