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
  HStack
} from '@chakra-ui/react'
import { FaArrowRight, FaRedo } from 'react-icons/fa'
import useOnboardingStore from '../../stores/onboardingStore'
import useStoryStore from '../../stores/storyStore'
import FantasyFrame from '../fantasy/FantasyFrame'
import ScrollContainer from '../fantasy/ScrollContainer'
import AchievementPopup from '../achievements/AchievementPopup'

const tutorialSteps = [
  {
    title: 'Welcome, Brave Scholar!',
    description: 'Embark on a magical journey of language learning through enchanted tales and ancient wisdom.',
    action: 'Begin Your Adventure'
  },
  {
    title: 'Choose Your Path',
    description: 'Select the language you wish to master. Fear not, you can always explore other tongues later in your journey.',
    action: 'Choose Language'
  },
  {
    title: 'Your First Tale',
    description: 'Now, let us begin your first story. You can type your own prompts or choose from our magical suggestions.',
    action: 'Start Your Tale'
  }
]

const Welcome: React.FC = () => {
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
  const [currentAchievement, setCurrentAchievement] = React.useState(achievements[0])

  const handleNext = () => {
    if (currentStep === 1 && selectedLanguage) {
      // Set the language in the story store
      setLanguage(selectedLanguage)
      // Unlock achievement
      unlockAchievement('language_selected')
      setCurrentAchievement(achievements.find(a => a.id === 'language_selected')!)
      onOpen()
    }
    
    if (currentStep === tutorialSteps.length - 1) {
      // Complete tutorial
      setHasCompletedTutorial(true)
      unlockAchievement('tutorial_complete')
      setCurrentAchievement(achievements.find(a => a.id === 'tutorial_complete')!)
      onOpen()
    }
    
    setCurrentStep(currentStep + 1)
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
              onClick={resetTutorial}
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
              {tutorialSteps[currentStep].title}
            </Heading>

            <ScrollContainer variant="pristine">
              <Text variant="scroll" p={4} textAlign="center">
                {tutorialSteps[currentStep].description}
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
              {tutorialSteps[currentStep].action}
            </Button>
          </VStack>
        </FantasyFrame>
      </VStack>

      <AchievementPopup
        title={currentAchievement.title}
        description={currentAchievement.description}
        icon={currentAchievement.icon}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}

export default Welcome 