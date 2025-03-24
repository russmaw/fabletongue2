import React from 'react';
import {
  VStack,
  Text,
  Select,
  Heading,
} from '@chakra-ui/react';
import { useTutorialStore } from '../../stores/tutorialStore';
import { useLanguageStore } from '../../stores/languageStore';

export const LanguageSelectionStep: React.FC = () => {
  const { setCurrentStep, completeStep } = useTutorialStore();
  const { setLanguage } = useLanguageStore();

  const languages = [
    { id: 'es', name: 'Spanish', flag: '🇪🇸' },
    { id: 'fr', name: 'French', flag: '🇫🇷' },
    { id: 'de', name: 'German', flag: '🇩🇪' },
    { id: 'it', name: 'Italian', flag: '🇮🇹' },
  ];

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg">Choose Your Language</Heading>
      <Text fontSize="lg" color="gray.600">
        Select the language you want to learn. We'll create personalized stories and exercises for you.
      </Text>
      <Select 
        placeholder="Select language" 
        onChange={(e) => {
          setLanguage(e.target.value);
          completeStep('language-selection');
          setCurrentStep(2);
        }}
      >
        {languages.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </Select>
    </VStack>
  );
}; 