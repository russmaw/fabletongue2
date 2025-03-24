import React from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
        <Text color="gray.600" fontSize="lg">
          Loading...
        </Text>
      </VStack>
    </Box>
  );
};

export default LoadingSpinner; 