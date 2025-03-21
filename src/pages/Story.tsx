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
  Divider
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { FaVolumeUp, FaBookmark, FaLightbulb, FaDiceD20, FaScroll } from 'react-icons/fa'
import useStoryStore from '../stores/storyStore'

const FantasySelect = ({ children, ...props }: any) => (
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

const FantasyButton = ({ children, ...props }: any) => (
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

const Story = () => {
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

  // Generate initial story
  React.useEffect(() => {
    if (!story.content) {
      generateNewStory('fantasy', 'adventure').catch((error: Error) => {
        toast({
          title: 'Error generating story',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
    }
  }, [])

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

  const handleContinue = async () => {
    try {
      await continueStory()
    } catch (error: unknown) {
      toast({
        title: 'Error continuing story',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value)
    // Regenerate story with new language
    generateNewStory('fantasy', 'adventure').catch((error: Error) => {
      toast({
        title: 'Error generating story',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  }

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value as 'beginner' | 'intermediate' | 'advanced')
    // Regenerate story with new difficulty
    generateNewStory('fantasy', 'adventure').catch((error) => {
      toast({
        title: 'Error generating story',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    })
  }

  return (
    <Box 
      py={{ base: 2, md: 6 }} 
      px={{ base: 2, md: 4 }}
      minH="100vh"
      bg={bgColor}
      backgroundImage="url('/parchment-bg.jpg')"
      backgroundSize="cover"
      backgroundAttachment="fixed"
      backgroundPosition="center"
    >
      <Container maxW="container.md">
        <VStack spacing={{ base: 3, md: 5 }} align="stretch">
          <Card 
            bg={cardBgColor} 
            borderColor={borderColor} 
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="xl"
          >
            <CardBody>
              <VStack spacing={4}>
                <Flex 
                  w="full" 
                  justify="space-between" 
                  align="center"
                  direction={{ base: 'column', sm: 'row' }}
                  gap={3}
                >
                  <Heading 
                    size={{ base: 'md', md: 'lg' }}
                    fontFamily="serif"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <FaScroll />
                    {story.title || (isBedtimeMode ? 'Bedtime Tale' : 'Your Quest')}
                  </Heading>
                  <Flex gap={2} flexWrap="wrap" justify={{ base: 'center', sm: 'flex-end' }}>
                    <Tooltip label="Read aloud">
                      <IconButton
                        aria-label="Read aloud"
                        icon={<FaVolumeUp />}
                        variant="outline"
                        size={{ base: 'sm', md: 'md' }}
                        borderWidth="2px"
                      />
                    </Tooltip>
                    <Tooltip label="Save to journal">
                      <IconButton
                        aria-label="Save to journal"
                        icon={<FaBookmark />}
                        variant="outline"
                        size={{ base: 'sm', md: 'md' }}
                        borderWidth="2px"
                      />
                    </Tooltip>
                    <Tooltip label="View scrolls">
                      <IconButton
                        aria-label="View scrolls"
                        icon={<FaLightbulb />}
                        variant="outline"
                        size={{ base: 'sm', md: 'md' }}
                        borderWidth="2px"
                      />
                    </Tooltip>
                  </Flex>
                </Flex>

                <Divider borderColor={borderColor} />

                <Flex 
                  w="full" 
                  gap={4} 
                  direction={{ base: 'column', sm: 'row' }}
                >
                  <FormControl>
                    <FormLabel fontFamily="serif">Tongue of Choice</FormLabel>
                    <FantasySelect value={selectedLanguage} onChange={handleLanguageChange}>
                      {/* Romance Languages */}
                      <option value="Spanish">Spanish (Español)</option>
                      <option value="French">French (Français)</option>
                      <option value="Italian">Italian (Italiano)</option>
                      <option value="Portuguese">Portuguese (Português)</option>
                      <option value="Romanian">Romanian (Română)</option>
                      {/* Germanic Languages */}
                      <option value="German">German (Deutsch)</option>
                      <option value="Dutch">Dutch (Nederlands)</option>
                      <option value="Swedish">Swedish (Svenska)</option>
                      {/* Slavic Languages */}
                      <option value="Russian">Russian (Русский)</option>
                      <option value="Polish">Polish (Polski)</option>
                      {/* Asian Languages */}
                      <option value="Japanese">Japanese (日本語)</option>
                      <option value="Korean">Korean (한국어)</option>
                      <option value="Mandarin">Mandarin (普通话)</option>
                    </FantasySelect>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontFamily="serif">Mastery Level</FormLabel>
                    <FantasySelect value={difficulty} onChange={handleDifficultyChange}>
                      <option value="beginner">Novice</option>
                      <option value="intermediate">Adept</option>
                      <option value="advanced">Master</option>
                    </FantasySelect>
                  </FormControl>
                </Flex>
              </VStack>

              <Box 
                mt={6}
                p={4}
                bg={scrollBg}
                borderRadius="md"
                borderWidth="2px"
                borderColor={borderColor}
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url("/scroll-texture.png")',
                  backgroundSize: 'cover',
                  opacity: 0.1,
                  pointerEvents: 'none',
                }}
              >
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
                    fontFamily="serif"
                    position="relative"
                    zIndex={1}
                  >
                    {story.content}
                  </Text>
                )}
              </Box>
            </CardBody>
          </Card>

          {story.vocabulary.length > 0 && (
            <Card 
              bg={cardBgColor} 
              borderColor={borderColor} 
              borderWidth="2px"
              borderRadius="lg"
              boxShadow="xl"
            >
              <CardBody>
                <Heading 
                  size="md" 
                  mb={4}
                  fontFamily="serif"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <FaScroll />
                  Ancient Scrolls
                </Heading>
                <VStack align="stretch" spacing={3}>
                  {story.vocabulary.map((item: { word: string; translation: string; context: string }, index: number) => (
                    <Box 
                      key={index}
                      p={3}
                      bg={scrollBg}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                    >
                      <Text fontWeight="bold" fontFamily="serif">{item.word}</Text>
                      <Text>{item.translation}</Text>
                      <Text fontSize="sm" color="gray.500" fontStyle="italic">{item.context}</Text>
                    </Box>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          )}

          <Card 
            bg={cardBgColor} 
            borderColor={borderColor} 
            borderWidth="2px"
            borderRadius="lg"
            boxShadow="xl"
          >
            <CardBody>
              <VStack spacing={4}>
                <Heading 
                  size={{ base: 'sm', md: 'md' }}
                  fontFamily="serif"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  Choose Your Path
                </Heading>
                <FantasyButton
                  size={{ base: 'md', md: 'lg' }}
                  w="full"
                  isLoading={loading}
                  onClick={handleContinue}
                  leftIcon={<FaDiceD20 />}
                >
                  Continue the Quest
                </FantasyButton>
                {!isBedtimeMode && (
                  <FantasyButton
                    size={{ base: 'md', md: 'lg' }}
                    w="full"
                    variant="outline"
                    isLoading={loading}
                    onClick={() => generateNewStory('fantasy', 'adventure')}
                    leftIcon={<FaScroll />}
                  >
                    Begin a New Tale
                  </FantasyButton>
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