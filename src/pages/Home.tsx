import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBook, FaGraduationCap, FaLanguage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSecurity } from '../contexts/SecurityContext';
import { useTutorialStore } from '../stores/tutorialStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSecurity();
  const { isCompleted } = useTutorialStore();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleStart = () => {
    if (isAuthenticated) {
      if (isCompleted) {
        navigate('/story');
      } else {
        navigate('/tutorial');
      }
    } else {
      navigate('/welcome');
    }
  };

  return (
    <Container maxW="container.lg" py={16}>
      <VStack spacing={12} align="center">
        <VStack spacing={4} textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, purple.500, pink.500)"
            bgClip="text"
          >
            Welcome to FableTongue
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Your journey to language mastery begins here
          </Text>
        </VStack>

        <HStack spacing={8} w="100%" justify="center">
          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
            w="300px"
            textAlign="center"
          >
            <Icon as={FaLanguage} boxSize={10} color="purple.500" mb={4} />
            <Heading size="md" mb={2}>
              Interactive Stories
            </Heading>
            <Text color="gray.600" mb={4}>
              Learn through engaging, AI-generated stories in your target language
            </Text>
          </Box>

          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
            w="300px"
            textAlign="center"
          >
            <Icon as={FaBook} boxSize={10} color="purple.500" mb={4} />
            <Heading size="md" mb={2}>
              Vocabulary Learning
            </Heading>
            <Text color="gray.600" mb={4}>
              Master new words naturally through context and practice
            </Text>
          </Box>

          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            boxShadow="lg"
            borderWidth="1px"
            borderColor={borderColor}
            w="300px"
            textAlign="center"
          >
            <Icon as={FaGraduationCap} boxSize={10} color="purple.500" mb={4} />
            <Heading size="md" mb={2}>
              Cultural Immersion
            </Heading>
            <Text color="gray.600" mb={4}>
              Experience language in its cultural context
            </Text>
          </Box>
        </HStack>

        <Button
          size="lg"
          colorScheme="purple"
          onClick={handleStart}
          px={8}
        >
          {isAuthenticated
            ? isCompleted
              ? 'Continue Your Story'
              : 'Start Tutorial'
            : 'Get Started'}
        </Button>
      </VStack>
    </Container>
  );
};

export default Home; 