import React from 'react'
import {
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Box,
  Badge,
  Button,
  useColorModeValue,
  SimpleGrid,
  Tooltip,
  Flex,
  useToast
} from '@chakra-ui/react'
import { FaFire, FaStar, FaTrophy, FaRedo } from 'react-icons/fa'
import useOnboardingStore from '../stores/onboardingStore'
import FantasyFrame from '../components/fantasy/FantasyFrame'

interface RecentStory {
  id: number
  title: string
  progress: number
}

interface UserData {
  name: string
  level: number
  xp: number
  nextLevelXp: number
  streak: number
  recentStories: RecentStory[]
}

const Profile = () => {
  const { achievements, resetTutorial } = useOnboardingStore()
  const toast = useToast()

  // Mock user data - will be replaced with actual data from backend
  const userData: UserData = {
    name: 'Language Explorer',
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 15,
    recentStories: [
      { id: 1, title: 'The Enchanted Forest', progress: 100 },
      { id: 2, title: 'Mystery of the Ancient Ruins', progress: 75 },
      { id: 3, title: 'Tales of the Starlight Kingdom', progress: 30 },
    ],
  }

  const handleReset = () => {
    try {
      resetTutorial()
      toast({
        title: 'Tutorial Reset',
        description: 'Your tutorial progress has been reset.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error resetting tutorial:', error)
      toast({
        title: 'Error',
        description: 'Failed to reset tutorial. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const renderAchievementIcon = (iconString: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '🌟': <FaStar />,
      '🔥': <FaFire />,
      '🏆': <FaTrophy />
    }
    return iconMap[iconString] || iconString
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch" maxW="container.lg" mx="auto">
        <Flex justify="space-between" align="center">
          <Heading size="xl" fontFamily="heading">Your Journey</Heading>
          <Tooltip label="Reset Tutorial">
            <Button
              leftIcon={<FaRedo />}
              variant="ghost"
              colorScheme="gray"
              onClick={handleReset}
              size="sm"
            >
              Reset Tutorial
            </Button>
          </Tooltip>
        </Flex>

        {/* Profile Header */}
        <Box bg={useColorModeValue('white', 'gray.800')} p={6} borderRadius="lg" boxShadow="md" mb={8}>
          <VStack align="start">
            <Heading size="lg">{userData.name}</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>Level {userData.level} Explorer</Text>
            <HStack>
              <Badge colorScheme="orange">
                <HStack gap={1}>
                  <FaFire />
                  <Text>{userData.streak} Day Streak</Text>
                </HStack>
              </Badge>
            </HStack>
          </VStack>
          <Box mt={4}>
            <Text mb={2}>Level Progress</Text>
            <Box
              w="full"
              h="2"
              bg={useColorModeValue('gray.100', 'gray.700')}
              borderRadius="full"
              overflow="hidden"
            >
              <Box
                w={`${(userData.xp / userData.nextLevelXp) * 100}%`}
                h="full"
                bg="brand.500"
              />
            </Box>
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} mt={1}>
              {userData.xp} / {userData.nextLevelXp} XP
            </Text>
          </Box>
        </Box>

        <FantasyFrame>
          <VStack spacing={6} p={6}>
            <Heading size="lg" color={useColorModeValue('fantasy.800', 'fantasy.200')}>
              Achievements
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="full">
              {achievements.map((achievement) => (
                <Box
                  key={achievement.id}
                  p={4}
                  borderWidth="2px"
                  borderRadius="lg"
                  borderColor={achievement.unlockedAt ? 'fantasy.500' : 'gray.200'}
                  bg={useColorModeValue('white', 'gray.800')}
                  opacity={achievement.unlockedAt ? 1 : 0.6}
                >
                  <VStack align="start" spacing={2}>
                    <Flex justify="space-between" width="full" align="center">
                      <Box fontSize="2xl">
                        {renderAchievementIcon(achievement.icon)}
                      </Box>
                      {achievement.unlockedAt ? (
                        <Badge colorScheme="green" variant="solid" borderRadius="full" px={2}>
                          Unlocked
                        </Badge>
                      ) : (
                        <Badge colorScheme="gray" variant="solid" borderRadius="full" px={2}>
                          Locked
                        </Badge>
                      )}
                    </Flex>
                    <Text fontWeight="bold">{achievement.title}</Text>
                    <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                      {achievement.description}
                    </Text>
                    {achievement.unlockedAt && (
                      <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')}>
                        Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </Text>
                    )}
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </FantasyFrame>

        {/* Recent Stories */}
        <Box bg={useColorModeValue('white', 'gray.800')} p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>
            Recent Stories
          </Heading>
          <VStack gap={4} align="stretch">
            {userData.recentStories.map((story) => (
              <Box
                key={story.id}
                p={4}
                borderRadius="md"
                border="1px"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                <Text fontWeight="bold" mb={2}>
                  {story.title}
                </Text>
                <Box
                  w="full"
                  h="2"
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Box
                    w={`${story.progress}%`}
                    h="full"
                    bg="brand.500"
                  />
                </Box>
                <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')} mt={1}>
                  {story.progress}% Complete
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Profile 