import React from 'react'
import {
  Container,
  VStack,
  Text,
  Button,
  Heading,
  Box,
  useColorModeValue,
  Card,
  CardBody,
  Skeleton,
  Flex,
  IconButton,
  Tooltip,
  useToast,
  Select,
  FormControl,
  FormLabel,
  Divider,
  ButtonProps,
  SelectProps
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { FaVolumeUp, FaBookmark, FaLightbulb, FaDiceD20 } from 'react-icons/fa'
import useStoryStore from '../stores/storyStore'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

interface FantasySelectProps extends Omit<SelectProps, 'children'> {
  children: React.ReactNode
}

interface FantasyButtonProps extends Omit<ButtonProps, 'children'> {
  children: React.ReactNode
}

const FantasySelect: React.FC<FantasySelectProps> = ({ children, ...props }) => (
  <Select
    bg={useColorModeValue('gray.50', 'gray.700')}
    border="2px"
    borderColor={useColorModeValue('gray.300', 'gray.600')}
    _hover={{
      borderColor: useColorModeValue('gray.400', 'gray.500'),
    }}
    icon={<FaDiceD20 />}
    sx={{
      '& option': {
        background: useColorModeValue('gray.50', 'gray.700'),
        color: useColorModeValue('gray.800', 'gray.100'),
      }
    }}
    {...props}
  >
    {children}
  </Select>
)

const FantasyButton: React.FC<FantasyButtonProps> = ({ children, ...props }) => (
  <Button
    bg={useColorModeValue('gray.700', 'gray.600')}
    color="white"
    _hover={{
      bg: useColorModeValue('gray.600', 'gray.500'),
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
    }}
    _active={{
      bg: useColorModeValue('gray.800', 'gray.700'),
    }}
    transition="all 0.2s"
    textTransform="uppercase"
    letterSpacing="wide"
    fontFamily="serif"
    {...props}
  >
    {children}
  </Button>
)

const Story: React.FC = () => {
  const location = useLocation()
  const toast = useToast()
  const isBedtimeMode = location.search.includes('mode=bedtime')
  
  const {
    story,
    loading,
    error,
    selectedLanguage,
    difficulty,
    generateNewStory,
    continueStory,
    setLanguage,
    setDifficulty
  } = useStoryStore()

  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const cardBgColor = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const borderColor = useColorModeValue('gray.300', 'gray.600')
  const scrollBg = useColorModeValue('gray.100', 'gray.900')

  // Handle errors
  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [error, toast])

  // Generate initial story
  React.useEffect(() => {
    const generateStory = async () => {
      try {
        if (!story?.content) {
          await generateNewStory('fantasy', 'adventure')
        }
      } catch (error) {
        toast({
          title: 'Error generating story',
          description: error instanceof Error ? error.message : 'An unknown error occurred',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    generateStory()
  }, [generateNewStory, story?.content, toast])

  const handleContinueStory = async () => {
    try {
      await continueStory()
    } catch (error) {
      toast({
        title: 'Error continuing story',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
    // Regenerate story with new language
    generateNewStory('fantasy', 'adventure').catch((error) => {
      toast({
        title: 'Error generating story',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  }

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as Difficulty)
    // Regenerate story with new difficulty
    generateNewStory('fantasy', 'adventure').catch((error) => {
      toast({
        title: 'Error generating story',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  }

  if (loading) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8}>
          <Skeleton height="40px" width="200px" />
          <Skeleton height="200px" width="100%" />
          <Skeleton height="40px" width="150px" />
        </VStack>
      </Container>
    )
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <Heading 
              as="h1" 
              size="xl" 
              fontFamily="serif"
              bgGradient="linear(to-r, purple.500, pink.500)"
              bgClip="text"
            >
              {isBedtimeMode ? 'Bedtime Story' : 'Your Adventure'}
            </Heading>
            <Flex gap={2}>
              <Tooltip label="Read aloud">
                <IconButton
                  aria-label="Read aloud"
                  icon={<FaVolumeUp />}
                  variant="ghost"
                />
              </Tooltip>
              <Tooltip label="Save story">
                <IconButton
                  aria-label="Save story"
                  icon={<FaBookmark />}
                  variant="ghost"
                />
              </Tooltip>
              <Tooltip label="Story ideas">
                <IconButton
                  aria-label="Story ideas"
                  icon={<FaLightbulb />}
                  variant="ghost"
                />
              </Tooltip>
            </Flex>
          </Flex>

          <Card 
            bg={cardBgColor} 
            borderWidth="1px" 
            borderColor={borderColor}
            borderRadius="lg"
            boxShadow="lg"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="4px"
              bgGradient="linear(to-r, purple.500, pink.500)"
            />
            <CardBody>
              <VStack spacing={6}>
                <Box 
                  p={6} 
                  bg={scrollBg} 
                  borderRadius="md" 
                  w="full"
                  position="relative"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url(/scroll-texture.png)',
                    opacity: 0.1,
                    pointerEvents: 'none',
                  }}
                >
                  <Text
                    fontSize="lg"
                    color={textColor}
                    whiteSpace="pre-wrap"
                    fontFamily="serif"
                    lineHeight="tall"
                  >
                    {story?.content || 'Loading your story...'}
                  </Text>
                </Box>

                <Divider />

                <VStack spacing={4} w="full">
                  <FormControl>
                    <FormLabel>Language</FormLabel>
                    <FantasySelect
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      isDisabled={loading}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </FantasySelect>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Difficulty</FormLabel>
                    <FantasySelect
                      value={difficulty}
                      onChange={handleDifficultyChange}
                      isDisabled={loading}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </FantasySelect>
                  </FormControl>

                  <FantasyButton
                    w="full"
                    isLoading={loading}
                    onClick={handleContinueStory}
                    leftIcon={<FaDiceD20 />}
                  >
                    Continue the Adventure
                  </FantasyButton>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
}

export default Story 