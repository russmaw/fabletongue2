import React from 'react'
import { Container, Heading, Text, SimpleGrid, Button, VStack, Box } from '@chakra-ui/react'
import { FaBook, FaMoon } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <Container maxW="container.xl">
      {/* Hero Section */}
      <Box textAlign="center" py={20}>
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, brand.400, accent.400)"
          bgClip="text"
          mb={4}
        >
          Learn Languages Through Stories
        </Heading>
        <Text fontSize="xl" color="gray.600" mb={8}>
          Embark on magical journeys while mastering new languages
        </Text>
      </Box>

      {/* Story Modes */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={20}>
        <Box
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
          cursor="pointer"
          onClick={() => navigate('/story/create')}
        >
          <VStack spacing={4} align="flex-start">
            <Box p={2} bg="brand.100" borderRadius="lg">
              <FaBook size="2em" color="#0ea5e9" />
            </Box>
            <Heading size="lg">Long Story Mode</Heading>
            <Text color="gray.600">
              Dive into epic adventures that evolve with your choices. Perfect for immersive language learning through continuous storytelling.
            </Text>
            <Button colorScheme="brand" size="lg">
              Start Your Journey
            </Button>
          </VStack>
        </Box>

        <Box
          p={8}
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
          cursor="pointer"
          onClick={() => navigate('/story/bedtime')}
        >
          <VStack spacing={4} align="flex-start">
            <Box p={2} bg="accent.100" borderRadius="lg">
              <FaMoon size="2em" color="#d946ef" />
            </Box>
            <Heading size="lg">Bedtime Mode</Heading>
            <Text color="gray.600">
              Short, calming stories perfect for evening practice. Each tale takes 10-15 minutes and ends with a happy conclusion.
            </Text>
            <Button colorScheme="accent" size="lg">
              Begin a Tale
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  )
}

export default Home 