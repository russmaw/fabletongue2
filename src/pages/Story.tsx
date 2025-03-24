import React from 'react'
import {
  VStack,
  Heading,
  Box,
} from '@chakra-ui/react'
import { InteractiveStory } from '../components/story/InteractiveStory'

export const Story: React.FC = () => {
  return (
    <Box maxW="container.xl" mx="auto" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            Your Story Journey
          </Heading>
        </Box>
        <InteractiveStory />
      </VStack>
    </Box>
  )
}

export default Story 