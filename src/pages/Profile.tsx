import React from 'react'
import { Container, VStack, HStack, Text, Heading, Box, Badge } from '@chakra-ui/react'
import { FaFire, FaStar, FaTrophy } from 'react-icons/fa'

interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ReactNode
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

      {/* Achievements */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading size="md" mb={4}>
          Achievements
        </Heading>
        <VStack gap={4} align="stretch">
          {userData.achievements.map((achievement) => (
            <Box
              key={achievement.id}
              p={4}
              borderRadius="md"
              border="1px"
              borderColor="gray.200"
              _hover={{ bg: 'gray.50' }}
            >
              <HStack gap={3}>
                <Box color="brand.500">{achievement.icon}</Box>
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">{achievement.title}</Text>
                  <Text fontSize="sm" color="gray.600">
                    {achievement.description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>

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
    </Container>
  )
}

export default Profile 