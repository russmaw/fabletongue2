import React from 'react'
import { Container, VStack, Text, Button, Heading, Box, useColorModeValue, Card, CardBody, Skeleton, Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { useParams, useLocation } from 'react-router-dom'
import { FaVolumeUp, FaBookmark, FaLightbulb } from 'react-icons/fa'

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

  const location = useLocation()
  const isBedtimeMode = location.search.includes('mode=bedtime')
  
  const bgColor = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

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
    <Box py={{ base: 4, md: 8 }}>
      <Container maxW="container.lg">
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px">
            <CardBody>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size={{ base: 'md', md: 'lg' }}>
                  {isBedtimeMode ? 'Bedtime Story' : 'Your Adventure'}
                </Heading>
                <Flex gap={2}>
                  <Tooltip label="Read aloud">
                    <IconButton
                      aria-label="Read aloud"
                      icon={<FaVolumeUp />}
                      variant="ghost"
                      size={{ base: 'sm', md: 'md' }}
                    />
                  </Tooltip>
                  <Tooltip label="Save for later">
                    <IconButton
                      aria-label="Save for later"
                      icon={<FaBookmark />}
                      variant="ghost"
                      size={{ base: 'sm', md: 'md' }}
                    />
                  </Tooltip>
                  <Tooltip label="Show vocabulary">
                    <IconButton
                      aria-label="Show vocabulary"
                      icon={<FaLightbulb />}
                      variant="ghost"
                      size={{ base: 'sm', md: 'md' }}
                    />
                  </Tooltip>
                </Flex>
              </Flex>

              {loading ? (
                <VStack spacing={4} align="stretch">
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </VStack>
              ) : (
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  lineHeight="tall"
                  color={textColor}
                  whiteSpace="pre-wrap"
                >
                  {story.content}
                </Text>
              )}
            </CardBody>
          </Card>

          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px">
            <CardBody>
              <VStack spacing={4}>
                <Heading size={{ base: 'sm', md: 'md' }}>What happens next?</Heading>
                <Button
                  colorScheme="brand"
                  size={{ base: 'md', md: 'lg' }}
                  w="full"
                  isLoading={loading}
                >
                  Continue the adventure
                </Button>
                {!isBedtimeMode && (
                  <Button
                    colorScheme="accent"
                    size={{ base: 'md', md: 'lg' }}
                    w="full"
                    variant="outline"
                    isLoading={loading}
                  >
                    Choose a different path
                  </Button>
                )}
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
}

export default Story 