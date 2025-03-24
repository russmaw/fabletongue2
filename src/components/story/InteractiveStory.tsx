import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  Tooltip,
  useToast,
  Heading,
  Divider,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaVolumeUp, FaBook, FaLightbulb } from 'react-icons/fa';
import { useStoryStore } from '../../stores/storyStore';

interface WordProps {
  word: {
    id: string;
    word: string;
    translation: string;
    pronunciation: string;
    example: string;
  };
  onLearn: (wordId: string) => void;
  isLearned: boolean;
}

const Word: React.FC<WordProps> = ({ word, onLearn, isLearned }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    if (!isLearned) {
      onLearn(word.id);
      setShowTooltip(false);
      toast({
        title: 'Word Learned!',
        description: `${word.word} - ${word.translation}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Tooltip
      label={
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">{word.translation}</Text>
          <Text fontSize="sm" color="gray.500">
            {word.pronunciation}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {word.example}
          </Text>
        </VStack>
      }
      isOpen={showTooltip}
      onOpen={() => setShowTooltip(true)}
      onClose={() => setShowTooltip(false)}
      placement="top"
    >
      <HStack
        as="span"
        cursor={isLearned ? 'default' : 'pointer'}
        color={isLearned ? 'green.500' : 'purple.500'}
        onClick={handleClick}
        _hover={{ textDecoration: isLearned ? 'none' : 'underline' }}
      >
        <Text>{word.word}</Text>
        <Icon as={isLearned ? FaLightbulb : FaBook} boxSize={3} />
      </HStack>
    </Tooltip>
  );
};

export const InteractiveStory: React.FC = () => {
  const { currentNode, makeChoice, learnWord, learnedWords, isLoading } = useStoryStore();

  if (!currentNode) {
    return (
      <Text textAlign="center" color="gray.500">
        No story content available.
      </Text>
    );
  }

  const renderText = () => {
    const words = currentNode.content.split(' ');
    return words.map((word, index) => {
      const newWord = currentNode.newWords.find((w) => w.word === word);
      if (newWord) {
        return (
          <Word
            key={`${newWord.id}-${index}`}
            word={newWord}
            onLearn={learnWord}
            isLearned={learnedWords.includes(newWord.id)}
          />
        );
      }
      return <Text key={index} as="span">{word} </Text>;
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="xl" mb={4}>
          {renderText()}
        </Text>
        <HStack spacing={2} mt={2} flexWrap="wrap">
          {currentNode.newWords.map((word) => (
            <Button
              key={word.id}
              size="sm"
              variant="outline"
              colorScheme={learnedWords.includes(word.id) ? 'green' : 'purple'}
              leftIcon={<Icon as={FaVolumeUp} />}
              onClick={() => {
                // In a real app, this would play audio
                console.log(`Playing pronunciation for: ${word.pronunciation}`);
              }}
            >
              {word.word}
            </Button>
          ))}
        </HStack>
      </Box>

      {currentNode.culturalNotes && currentNode.culturalNotes.length > 0 && (
        <Box bg="purple.50" p={4} borderRadius="md">
          <Heading size="sm" mb={2} color="purple.600">
            Cultural Notes
          </Heading>
          <List spacing={2}>
            {currentNode.culturalNotes.map((note, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon as={FaLightbulb} color="purple.500" />
                <Text>{note}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Divider />

      <VStack spacing={3} align="stretch">
        {currentNode.choices.map((choice, index) => (
          <Button
            key={index}
            colorScheme="purple"
            variant="outline"
            onClick={() => makeChoice(index)}
            textAlign="left"
            whiteSpace="normal"
            height="auto"
            p={4}
            isLoading={isLoading}
          >
            <VStack align="start" spacing={1}>
              <Text fontWeight="bold">{choice.text}</Text>
              <Text fontSize="sm" color="gray.600">
                {choice.description}
              </Text>
            </VStack>
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default InteractiveStory; 