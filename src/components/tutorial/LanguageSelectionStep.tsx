import React from 'react';
import {
  Button,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useTutorialStore } from '../../stores/tutorialStore';
import { useLanguageStore } from '../../stores/languageStore';

const languages = [
  { id: 'spanish', name: 'Spanish', flag: '🇪🇸' },
  { id: 'french', name: 'French', flag: '🇫🇷' },
  { id: 'german', name: 'German', flag: '🇩🇪' },
  { id: 'italian', name: 'Italian', flag: '🇮🇹' },
];

export const LanguageSelectionStep: React.FC = () => {
  const { setCurrentStep, completeStep } = useTutorialStore();
  const { setLanguage } = useLanguageStore();
  const toast = useToast();

  const handleLanguageSelect = (languageId: string) => {
    setLanguage(languageId);
    completeStep('language-selection');
    setCurrentStep(2);
    toast({
      title: 'Language Selected!',
      description: `Great choice! Let's learn ${languages.find(l => l.id === languageId)?.name}.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="center" textAlign="center">
      <Heading as="h2" size="lg" color="purple.600">
        Choose Your Language
      </Heading>
      <Text fontSize="lg" color="gray.600">
        Select the language you want to learn. We'll create personalized stories and exercises for you.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
        {languages.map((language) => (
          <Box
            key={language.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            cursor="pointer"
            _hover={{ borderColor: 'purple.500' }}
            onClick={() => handleLanguageSelect(language.id)}
          >
            <VStack spacing={2}>
              <Text fontSize="4xl">{language.flag}</Text>
              <Text fontSize="xl" fontWeight="bold">
                {language.name}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
}; 