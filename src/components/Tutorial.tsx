import React from 'react';
import { Box, Container, Progress, VStack } from '@chakra-ui/react';
import { useTutorialStore } from '../stores/tutorialStore';
import { WelcomeStep } from './tutorial/WelcomeStep';
import { LanguageSelectionStep } from './tutorial/LanguageSelectionStep';
import { StoryIntroStep } from './tutorial/StoryIntroStep';
import { InteractiveElementsStep } from './tutorial/InteractiveElementsStep';
import { PracticeStep } from './tutorial/PracticeStep';

export const Tutorial: React.FC = () => {
  const { currentStep, totalSteps } = useTutorialStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <LanguageSelectionStep />;
      case 2:
        return <StoryIntroStep />;
      case 3:
        return <InteractiveElementsStep />;
      case 4:
        return <PracticeStep />;
      default:
        return null;
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Progress
          value={(currentStep / (totalSteps - 1)) * 100}
          colorScheme="purple"
          size="sm"
          borderRadius="full"
        />
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          minH="400px"
        >
          {renderStep()}
        </Box>
      </VStack>
    </Container>
  );
};

export default Tutorial; 