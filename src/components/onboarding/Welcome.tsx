import React from 'react'
import {
  VStack,
  Text,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSecurity } from '../../contexts/SecurityContext'

export const Welcome: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useSecurity()

  const handleStart = () => {
    login('demo-token') // In a real app, this would be a proper login flow
    navigate('/tutorial')
  }

  return (
    <Container maxW="container.md" py={16}>
      <VStack spacing={8} align="center" textAlign="center">
        <Heading
          as="h1"
          size="2xl"
          bgGradient="linear(to-r, purple.500, purple.700)"
          bgClip="text"
        >
          Welcome to FableTongue
        </Heading>
        
        <Text fontSize="xl" color="gray.600">
          Embark on an immersive journey of language learning through interactive stories.
          Learn naturally as you make choices and shape your own narrative.
        </Text>

        <Button
          size="lg"
          colorScheme="purple"
          onClick={handleStart}
          px={8}
        >
          Start Your Journey
        </Button>
      </VStack>
    </Container>
  )
}

export default Welcome 