import React, { useState } from 'react';
import {
  Button,
  Heading,
  Text,
  VStack,
  Box,
  useToast,
  Input,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useTutorialStore } from '../../stores/tutorialStore';
import { useNavigate } from 'react-router-dom';

export const PracticeStep: React.FC = () => {
  const { completeStep } = useTutorialStore();
  const navigate = useNavigate();
  const toast = useToast();
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const exampleText = "¡Hola! ¿Cómo estás?";
  const translation = "Hello! How are you?";
  const isCorrect = userInput.toLowerCase() === translation.toLowerCase();

  const handleCheck = () => {
    setShowFeedback(true);
    if (isCorrect) {
      completeStep('practice');
      toast({
        title: 'Congratulations!',
        description: 'You\'ve completed the tutorial!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => navigate('/story'), 2000);
    }
  };

  return (
    <VStack spacing={6} align="center" textAlign="center">
      <Heading as="h2" size="lg" color="purple.600">
        Let's Practice!
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Try translating this simple greeting to test what you've learned.
      </Text>
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        bg="purple.50"
        w="100%"
      >
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            {exampleText}
          </Text>
          <HStack w="100%">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your translation..."
              size="lg"
              isDisabled={showFeedback}
            />
            <Button
              colorScheme="purple"
              size="lg"
              onClick={handleCheck}
              isDisabled={!userInput || showFeedback}
            >
              Check
            </Button>
          </HStack>
          {showFeedback && (
            <Box
              p={4}
              bg={isCorrect ? 'green.50' : 'red.50'}
              borderRadius="md"
              borderWidth="1px"
              borderColor={isCorrect ? 'green.200' : 'red.200'}
              w="100%"
            >
              <HStack spacing={2}>
                <Icon
                  as={isCorrect ? FaCheck : FaTimes}
                  color={isCorrect ? 'green.500' : 'red.500'}
                />
                <Text>
                  {isCorrect
                    ? 'Correct! Well done!'
                    : `Not quite. The correct translation is: "${translation}"`}
                </Text>
              </HStack>
            </Box>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}; 