import React from 'react'
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Select,
  useColorModeValue,
  Fade,
  useDisclosure,
  IconButton,
  Tooltip,
  HStack,
  useToast
} from '@chakra-ui/react'
import { FaArrowRight, FaRedo } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import useOnboardingStore from '../../stores/onboardingStore'
import useStoryStore from '../../stores/storyStore'
import FantasyFrame from '../fantasy/FantasyFrame'
import ScrollContainer from '../fantasy/ScrollContainer'
import AchievementPopup from '../achievements/AchievementPopup'
import type { Achievement } from '../../stores/onboardingStore'

const tutorialSteps = [
  {
    title: 'Welcome, Brave Scholar!',
    description: 'Embark on a magical journey of language learning through enchanted tales and mystical stories.',
    action: 'Begin Your Journey'
  },
  {
    title: 'Choose Your Path',
    description: 'Select the language you wish to master. Each language opens a new realm of possibilities.',
    action: 'Choose Language'
  },
  {
    title: 'Your First Tale',
    description: 'You\'re ready to begin your first story. Adventure awaits!',
    action: 'Start Reading'
  }
]

const Welcome: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const {
    currentStep,
    setCurrentStep,
    selectedLanguage,
    setSelectedLanguage,
    unlockAchievement,
    setHasCompletedTutorial,
    achievements,
    resetTutorial
  } = useOnboardingStore()
  
  const { setLanguage } = useStoryStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentAchievement, setCurrentAchievement] = React.useState<Achievement | null>(null)

  const handleNext = () => {
    try {
      // Unlock the tutorial_started achievement on first step
      if (currentStep === 0) {
        unlockAchievement('tutorial_started')
        const achievement = achievements.find(a => a.id === 'tutorial_started')
        if (achievement) {
          setCurrentAchievement(achievement)
          onOpen()
        }
      }

      // Handle language selection step
      if (currentStep === 1 && selectedLanguage) {
        setLanguage(selectedLanguage)
        unlockAchievement('language_selected')
        const achievement = achievements.find(a => a.id === 'language_selected')
        if (achievement) {
          setCurrentAchievement(achievement)
          onOpen()
        }
      }
      
      // Handle tutorial completion
      if (currentStep === tutorialSteps.length - 1) {
        setHasCompletedTutorial(true)
        unlockAchievement('tutorial_complete')
        const achievement = achievements.find(a => a.id === 'tutorial_complete')
        if (achievement) {
          setCurrentAchievement(achievement)
          onOpen()
        }
        // Navigate to story after a short delay to show the achievement
        setTimeout(() => {
          navigate('/story')
        }, 2000)
        return
      }
      
      // Progress to next step
      setCurrentStep(currentStep + 1)
    } catch (error) {
      console.error('Error in handleNext:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleReset = () => {
    try {
      resetTutorial()
      setCurrentStep(0)
      setCurrentAchievement(null)
      toast({
        title: 'Tutorial Reset',
        description: 'Your progress has been reset.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error in handleReset:', error)
      toast({
        title: 'Error',
        description: 'Failed to reset tutorial. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      minH="100vh"
      py={8}
      px={4}
      bg={useColorModeValue('gray.50', 'gray.900')}
    >
      <VStack spacing={8} maxW="container.md" mx="auto">
        <HStack w="full" justify="flex-end">
          <Tooltip label="Reset Tutorial" placement="left">
            <IconButton
              aria-label="Reset Tutorial"
              icon={<FaRedo />}
              variant="ghost"
              colorScheme="gray"
              onClick={handleReset}
              size="sm"
            />
          </Tooltip>
        </HStack>

        <FantasyFrame variant="ornate">
          <VStack spacing={6} p={6} align="stretch">
            <Heading
              textAlign="center"
              fontSize="4xl"
              fontFamily="heading"
              color={useColorModeValue('fantasy.800', 'fantasy.200')}
            >
              {tutorialSteps[currentStep]?.title || 'Welcome'}
            </Heading>

            <ScrollContainer variant="pristine">
              <Text variant="scroll" p={4} textAlign="center">
                {tutorialSteps[currentStep]?.description || 'Loading...'}
              </Text>
            </ScrollContainer>

            <Fade in={currentStep === 1}>
              <Box>
                {currentStep === 1 && (
                  <Select
                    placeholder="Select a language"
                    value={selectedLanguage || ''}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    size="lg"
                    variant="filled"
                    bg={useColorModeValue('white', 'gray.700')}
                  >
                    <option value="Spanish">Spanish (Español)</option>
                    <option value="French">French (Français)</option>
                    <option value="German">German (Deutsch)</option>
                    <option value="Italian">Italian (Italiano)</option>
                    <option value="Portuguese">Portuguese (Português)</option>
                    <option value="Japanese">Japanese (日本語)</option>
                    <option value="Korean">Korean (한국어)</option>
                    <option value="Mandarin">Mandarin (普通话)</option>
                  </Select>
                )}
              </Box>
            </Fade>

            <Button
              variant="fantasy"
              size="lg"
              rightIcon={<FaArrowRight />}
              onClick={handleNext}
              isDisabled={currentStep === 1 && !selectedLanguage}
            >
              {tutorialSteps[currentStep]?.action || 'Continue'}
            </Button>
          </VStack>
        </FantasyFrame>
      </VStack>

      {currentAchievement && (
        <AchievementPopup
          title={currentAchievement.title}
          description={currentAchievement.description}
          icon={currentAchievement.icon}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  )
}

export default Welcome 