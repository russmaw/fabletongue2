import React from 'react'
import { Container, VStack, HStack, Text, Heading, Box, Badge, Button, useColorModeValue, SimpleGrid, Icon, Tooltip, Flex } from '@chakra-ui/react'
import { FaFire, FaStar, FaTrophy, FaRedo } from 'react-icons/fa'
import useOnboardingStore from '../stores/onboardingStore'
import FantasyFrame from '../components/fantasy/FantasyFrame'

interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  unlockedAt?: string
}

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
  achievements: Achievement[]
  recentStories: RecentStory[]
}

const Profile = () => {
  const { achievements, resetTutorial } = useOnboardingStore()

  // Mock user data - will be replaced with actual data from backend
  const userData: UserData = {
    name: 'Language Explorer',
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 15,
    achievements: [
      { id: 1, title: 'First Story', description: 'Completed your first story', icon: <FaStar /> },
      { id: 2, title: 'Streak Master', description: '7 days streak achieved', icon: <FaFire /> },
      { id: 3, title: 'Vocabulary Champion', description: 'Learned 100 words', icon: <FaTrophy /> },
    ],
    recentStories: [
      { id: 1, title: 'The Enchanted Forest', progress: 100 },
      { id: 2, title: 'Mystery of the Ancient Ruins', progress: 75 },
      { id: 3, title: 'Tales of the Starlight Kingdom', progress: 30 },
    ],
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
              onClick={resetTutorial}
              size="sm"
            >
              Reset Tutorial
            </Button>
          </Tooltip>
        </Flex>

        {/* Profile Header */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
          <VStack align="start">
            <Heading size="lg">{userData.name}</Heading>
            <Text color="gray.600">Level {userData.level} Explorer</Text>
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
              bg="gray.100"
              borderRadius="full"
              overflow="hidden"
            >
              <Box
                w={`${(userData.xp / userData.nextLevelXp) * 100}%`}
                h="full"
                bg="brand.500"
              />
            </Box>
            <Text fontSize="sm" color="gray.600" mt={1}>
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
              {userData.achievements.map((achievement) => (
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
                      <Text fontSize="2xl">{achievement.icon}</Text>
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
                    <Text fontSize="sm" color="gray.500">{achievement.description}</Text>
                    {achievement.unlockedAt && (
                      <Text fontSize="xs" color="gray.500">
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
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
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
                borderColor="gray.200"
                _hover={{ bg: 'gray.50' }}
              >
                <Text fontWeight="bold" mb={2}>
                  {story.title}
                </Text>
                <Box
                  w="full"
                  h="2"
                  bg="gray.100"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Box
                    w={`${story.progress}%`}
                    h="full"
                    bg="brand.500"
                  />
                </Box>
                <Text fontSize="sm" color="gray.600" mt={1}>
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