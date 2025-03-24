import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Container,
  Heading,
  useColorModeValue,
  Icon,
  HStack,
  Collapse,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import { FaArrowRight, FaBook, FaLightbulb, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import { InteractiveStory } from '../story/InteractiveStory';
import { useTutorialStore } from '../../stores/tutorialStore';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const FeatureCard: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      p={4}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="md"
    >
      <HStack spacing={4}>
        <Icon as={icon} boxSize={6} color={color} />
        <Box>
          <Text fontWeight="bold">{title}</Text>
          <Text fontSize="sm" color="gray.500">
            {description}
          </Text>
        </Box>
      </HStack>
    </MotionBox>
  );
};

export const StoryDemoStep: React.FC = () => {
  const { nextStep } = useTutorialStore();
  const { isOpen, onToggle } = useDisclosure();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const features = [
    {
      id: 'interactive',
      icon: FaBook,
      title: 'Interactive Stories',
      description: 'Each story adapts to your choices and helps you learn vocabulary in context.',
      color: 'blue.500',
    },
    {
      id: 'learning',
      icon: FaLightbulb,
      title: 'Learn as You Play',
      description: 'Click on highlighted words to see translations and mark them as learned.',
      color: 'green.500',
    },
    {
      id: 'progress',
      icon: FaStar,
      title: 'Track Progress',
      description: "Monitor your learning progress and see how many words you have mastered.",
      color: 'yellow.500',
    },
  ];

  return (
    <VStack spacing={8} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading size="lg" mb={4}>
          Welcome to Interactive Story Learning
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Let's explore how you'll learn through immersive stories
        </Text>
      </MotionBox>

      <Box
        p={6}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        boxShadow="xl"
      >
        <VStack spacing={6} align="stretch">
          {features.map((feature) => (
            <Tooltip
              key={feature.id}
              label="Click to learn more"
              placement="right"
            >
              <Box
                cursor="pointer"
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              >
                <FeatureCard {...feature} />
              </Box>
            </Tooltip>
          ))}

          <Collapse in={isOpen}>
            <Box mt={4}>
              <Text fontWeight="bold" mb={2}>
                Try it out:
              </Text>
              <InteractiveStory />
            </Box>
          </Collapse>

          <Button
            rightIcon={<Icon as={isOpen ? FaChevronUp : FaChevronDown} />}
            variant="ghost"
            onClick={onToggle}
            colorScheme="blue"
          >
            {isOpen ? 'Hide Story Demo' : 'Show Story Demo'}
          </Button>
        </VStack>
      </Box>

      <MotionBox
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          rightIcon={<Icon as={FaArrowRight} />}
          colorScheme="blue"
          size="lg"
          onClick={nextStep}
          w="100%"
        >
          Continue to Main Story
        </Button>
      </MotionBox>
    </VStack>
  );
}; 