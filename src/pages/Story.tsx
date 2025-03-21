import React from 'react'
import { Container, VStack, Text, Button, Heading, Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

interface VocabularyItem {
  word: string
  translation: string
  context: string
}

interface StoryData {
  title: string
  content: string
  progress: number
  vocabulary: VocabularyItem[]
}

const Story = () => {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [story, setStory] = React.useState<StoryData>({
    title: '',
    content: '',
    progress: 0,
    vocabulary: [],
  })

  // Placeholder for story loading logic
  React.useEffect(() => {
    const loadStory = async () => {
      setLoading(true)
      try {
        // TODO: Implement story loading from backend
        // For now, using mock data
        setStory({
          title: 'The Enchanted Forest',
          content: 'Once upon a time, in a magical forest...',
          progress: 0,
          vocabulary: [
            { word: 'enchanted', translation: 'magical', context: 'The enchanted forest was full of mysteries.' },
            { word: 'forest', translation: 'woods', context: 'The forest was dense and dark.' },
          ],
        })
      } catch (error) {
        console.error('Error loading story:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStory()
  }, [id])

  return (
    <Container maxW="container.lg" py={8}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <VStack gap={6} align="stretch">
          <Heading size="xl" textAlign="center">
            {story.title}
          </Heading>

          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" lineHeight="tall">
              {story.content}
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Heading size="md" mb={4}>
              Vocabulary
            </Heading>
            <VStack gap={3} align="stretch">
              {story.vocabulary.map((item, index) => (
                <Box key={index} p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="bold">{item.word}</Text>
                  <Text color="gray.600">{item.translation}</Text>
                  <Text fontSize="sm" fontStyle="italic">
                    Context: {item.context}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>

          <Button
            colorScheme="brand"
            size="lg"
            onClick={() => {
              // TODO: Implement continue story logic
              console.log('Continue story')
            }}
          >
            Continue Story
          </Button>
        </VStack>
      )}
    </Container>
  )
}

export default Story 