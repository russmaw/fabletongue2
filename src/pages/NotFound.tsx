import { Container, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container maxW="container.md" py={20}>
      <VStack gap={8} textAlign="center">
        <Heading
          size="4xl"
          bgGradient="linear(to-r, brand.400, accent.400)"
          bgClip="text"
        >
          404
        </Heading>
        <Heading size="xl">Page Not Found</Heading>
        <Text fontSize="lg" color="gray.600">
          Oops! It seems you've wandered into uncharted territory. Let's get you back on track.
        </Text>
        <Button
          onClick={() => navigate('/')}
          colorScheme="brand"
          size="lg"
        >
          Return to Home
        </Button>
      </VStack>
    </Container>
  )
}

export default NotFound 