import React from 'react'
import {
  Container,
  VStack,
  Text,
  Heading,
  Box,
} from '@chakra-ui/react'
import { InteractiveStory } from '../components/story/InteractiveStory'

export const Story: React.FC = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center" color="purple.600">
          Your Story Begins
        </Heading>
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          minH="500px"
        >
          <InteractiveStory />
        </Box>
      </VStack>
    </Container>
  )
}

export default Story 