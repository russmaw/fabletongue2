import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Progress,
  useColorModeValue,
  Container,
  Heading,
  Icon,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { FaBook, FaStar } from 'react-icons/fa';
import { useStoryStore } from '../stores/storyStore';
import { InteractiveStory } from './story/InteractiveStory';

export const Story: React.FC = () => {
  const { getProgress } = useStoryStore();
  const progress = getProgress();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={4}>
            Your Story Journey
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Continue your language learning adventure
          </Text>
        </Box>

        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          boxShadow="xl"
        >
          <VStack spacing={6} align="stretch">
            <Box>
              <Progress
                value={progress.progress}
                colorScheme="blue"
                mb={4}
                size="lg"
                borderRadius="full"
              />
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.500">
                  Learned {progress.learnedWords} of {progress.totalWords} words
                </Text>
                <Badge colorScheme="green" variant="subtle">
                  <HStack spacing={1}>
                    <Icon as={FaStar} />
                    <Text>{Math.round(progress.progress)}% Complete</Text>
                  </HStack>
                </Badge>
              </HStack>
            </Box>

            <InteractiveStory />
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}; 