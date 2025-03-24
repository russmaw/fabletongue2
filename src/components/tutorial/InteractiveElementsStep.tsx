import React from 'react';
import {
  Button,
  Heading,
  Text,
  VStack,
  Box,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { FaVolumeUp, FaBook, FaCheck } from 'react-icons/fa';
import { useTutorialStore } from '../../stores/tutorialStore';

export const InteractiveElementsStep: React.FC = () => {
  const { setCurrentStep, completeStep } = useTutorialStore();
  const toast = useToast();

  const handleNext = () => {
    completeStep('interactive-elements');
    setCurrentStep(4);
    toast({
      title: 'Interactive Elements Learned!',
      description: 'Now let\'s practice what you\'ve learned.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="center" textAlign="center">
      <Heading as="h2" size="lg" color="purple.600">
        Interactive Learning Elements
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Let's explore the interactive elements that make learning fun and effective.
      </Text>
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        bg="purple.50"
        w="100%"
      >
        <VStack spacing={6} align="start">
          <Box>
            <Text fontWeight="bold" mb={2}>1. Word Translation</Text>
            <Text>
              Click on any word to see its translation and example usage.
              <Icon as={FaBook} ml={2} color="purple.500" />
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" mb={2}>2. Audio Pronunciation</Text>
            <Text>
              Listen to native pronunciation by clicking the speaker icon.
              <Icon as={FaVolumeUp} ml={2} color="purple.500" />
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" mb={2}>3. Progress Tracking</Text>
            <Text>
              Track your learned words and story progress.
              <Icon as={FaCheck} ml={2} color="purple.500" />
            </Text>
          </Box>
        </VStack>
      </Box>
      <Button
        colorScheme="purple"
        size="lg"
        onClick={handleNext}
        mt={4}
      >
        Continue
      </Button>
    </VStack>
  );
}; 