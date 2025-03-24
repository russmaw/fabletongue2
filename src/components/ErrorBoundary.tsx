import React, { Component, ErrorInfo } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxW="container.md" py={16}>
          <VStack spacing={8} align="center" textAlign="center">
            <Heading
              as="h1"
              size="xl"
              color="purple.600"
            >
              Oops! Something went wrong
            </Heading>
            <Text fontSize="lg" color="gray.600">
              We apologize for the inconvenience. Please try reloading the page.
            </Text>
            {this.state.error && (
              <Box
                p={4}
                bg="red.50"
                borderRadius="md"
                borderWidth="1px"
                borderColor="red.200"
                w="100%"
              >
                <Text color="red.600" fontSize="sm" fontFamily="monospace">
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
            <Button
              colorScheme="purple"
              size="lg"
              onClick={this.handleReload}
            >
              Reload Page
            </Button>
          </VStack>
        </Container>
      );
    }

    return this.props.children;
  }
} 