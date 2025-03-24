import React from 'react';
import {
  Button,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useTutorialStore } from '../../stores/tutorialStore';

export const WelcomeStep: React.FC = () => {
  const { setCurrentStep, completeStep } = useTutorialStore();
  const toast = useToast();

  const handleNext = () => {
    completeStep('welcome');
    setCurrentStep(1);
    toast({
      title: 'Welcome!',
      description: 'Let\'s begin your language learning journey.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="center" textAlign="center">
      <Heading as="h2" size="lg" color="purple.600">
        Welcome to the Tutorial
      </Heading>
      <Text fontSize="lg" color="gray.600">
        We'll guide you through the basics of using FableTongue and show you how to make the most of your language learning experience.
      </Text>
      <Button
        colorScheme="purple"
        size="lg"
        onClick={handleNext}
        mt={4}
      >
        Let's Begin
      </Button>
    </VStack>
  );
}; 