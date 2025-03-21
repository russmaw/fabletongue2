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

interface StoryPrompt {
  theme: string
  genre: string
  targetLanguage: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
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
      `
    case 'intermediate':
      return `
        - Use a mix of present, past, and future tenses
        - Include idiomatic expressions with explanations
        - Create more complex dialogue situations
        - Use descriptive vocabulary and varied sentence structures
        - Incorporate cultural elements and customs
      `
    case 'advanced':
      return `
        - Use sophisticated vocabulary and complex grammar structures
        - Include literary devices and figurative language
        - Create nuanced dialogue and character development
        - Incorporate cultural nuances and historical references
        - Use advanced idiomatic expressions and regional variations
      `
    default:
      return ''
  }
}

export const generateStory = async (prompt: StoryPrompt) => {
  try {
    const openai = createOpenAIClient()
    const difficultyGuidelines = getDifficultyGuidelines(prompt.difficulty)
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a creative storyteller and language teacher specializing in ${prompt.targetLanguage}. 
          Create an engaging and educational story that helps learners improve their language skills.
          
          Story Guidelines:
          ${difficultyGuidelines}
          
          Story Format:
          1. Title in both ${prompt.targetLanguage} and English
          2. Story content in ${prompt.targetLanguage}
          3. Include natural repetition of key phrases
          4. Incorporate dialogue with common expressions
          5. Weave cultural elements naturally into the story
          
          Theme: ${prompt.theme}
          Genre: ${prompt.genre}
          
          After the story, provide:
          - Brief summary in English
          - List of key expressions used
          - Cultural notes (if any)`,
        },
        {
          role: 'user',
          content: `Create a ${prompt.difficulty} level story in ${prompt.targetLanguage} about ${prompt.theme} in the ${prompt.genre} genre.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    })

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No story content received from OpenAI')
    }

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating story:', error)
    if (error instanceof Error) {
      throw new Error(`Failed to generate story: ${error.message}`)
    }
    throw new Error('Failed to generate story: Unknown error')
  }
}

export const generateVocabularyExercise = async (
  text: string,
  targetLanguage: string,
  difficulty: string
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
  generateStory,
  generateVocabularyExercise,
} 