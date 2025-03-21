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

export const generateStory = async (prompt: StoryPrompt) => {
  try {
    const openai = createOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a creative storyteller and language teacher. Create an engaging story in ${
            prompt.targetLanguage
          } suitable for ${
            prompt.difficulty
          } level learners. The story should be ${
            prompt.theme
          } themed and in the ${
            prompt.genre
          } genre. Include 5-10 key vocabulary words with translations and example sentences.`,
        },
        {
          role: 'user',
          content: `Create a ${prompt.difficulty} level story in ${prompt.targetLanguage}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
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
          content: `Create vocabulary exercises for the following ${targetLanguage} text. Include translations, example sentences, and multiple-choice questions suitable for ${difficulty} level learners.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
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