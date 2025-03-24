import React from 'react'
import {
  Container,
  VStack,
  Heading,
  Box,
} from '@chakra-ui/react'
import { InteractiveStory } from '../components/story/InteractiveStory'

export const Story: React.FC = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            Your Story Journey
          </Heading>
        </Box>
        <InteractiveStory />
      </VStack>
    </Container>
  )
}

export default Story 