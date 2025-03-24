import React from 'react';
import {
  Button,
  Heading,
  Text,
  VStack,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useTutorialStore } from '../../stores/tutorialStore';

export const StoryIntroStep: React.FC = () => {
  const { setCurrentStep, completeStep } = useTutorialStore();
  const toast = useToast();

  const handleNext = () => {
    completeStep('story-intro');
    setCurrentStep(3);
    toast({
      title: 'Story Introduction Complete!',
      description: 'Now let\'s learn about the interactive elements.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="center" textAlign="center">
      <Heading as="h2" size="lg" color="purple.600">
        How Stories Work
      </Heading>
      <Text fontSize="lg" color="gray.600">
        In FableTongue, you'll learn through interactive stories where your choices matter.
        Each story is carefully crafted to help you learn new vocabulary and grammar naturally.
      </Text>
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        bg="purple.50"
        w="100%"
      >
        <VStack spacing={4} align="start">
          <Text fontWeight="bold">Key Features:</Text>
          <Text>• Click on words to see translations</Text>
          <Text>• Listen to pronunciation by clicking the speaker icon</Text>
          <Text>• Make choices that affect the story's outcome</Text>
          <Text>• Track your progress and learned vocabulary</Text>
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