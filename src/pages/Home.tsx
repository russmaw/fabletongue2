import React from 'react'
import { Box, Container, Heading, Text, SimpleGrid, Card, CardBody, CardHeader, Button, VStack, useColorModeValue } from '@chakra-ui/react'
import { FaBook, FaMoon } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const cardBg = useColorModeValue('white', 'gray.700')
  const cardHoverBg = useColorModeValue('gray.50', 'gray.600')

  const modes = [
    {
      title: 'Story Mode',
      description: 'Immerse yourself in longer, interactive stories that adapt to your learning level.',
      icon: <FaBook size="2em" />,
      action: () => navigate('/story'),
    },
    {
      title: 'Bedtime Stories',
      description: 'Short, relaxing stories perfect for evening practice sessions.',
      icon: <FaMoon size="2em" />,
      action: () => navigate('/story?mode=bedtime'),
    },
  ]

  return (
    <Box py={{ base: 8, md: 12, lg: 16 }}>
      <Container maxW="container.xl">
        <VStack spacing={{ base: 6, md: 8, lg: 10 }} align="stretch">
          <Box textAlign="center" mb={{ base: 8, md: 12 }}>
            <Heading
              as="h1"
              size={{ base: 'xl', md: '2xl' }}
              mb={4}
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
            >
              Welcome to FableTongue
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color={useColorModeValue('gray.600', 'gray.300')}
              maxW="2xl"
              mx="auto"
            >
              Choose your learning adventure and start improving your language skills through engaging stories.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6, lg: 8 }}>
            {modes.map((mode) => (
              <Card
                key={mode.title}
                bg={cardBg}
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  bg: cardHoverBg,
                }}
                transition="all 0.3s"
                cursor="pointer"
                onClick={mode.action}
              >
                <CardHeader>
                  <Box color="brand.500" mb={4}>
                    {mode.icon}
                  </Box>
                  <Heading size="md">{mode.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text color={useColorModeValue('gray.600', 'gray.300')}>
                    {mode.description}
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="brand"
                    size={{ base: 'md', md: 'lg' }}
                    w="full"
                  >
                    Start Learning
                  </Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Box
            mt={{ base: 8, md: 12 }}
            p={{ base: 6, md: 8 }}
            bg={cardBg}
            rounded="lg"
            textAlign="center"
          >
            <Heading size="md" mb={4}>
              Track Your Progress
            </Heading>
            <Text mb={6}>
              View your learning statistics and achievements in your profile.
            </Text>
            <Button
              onClick={() => navigate('/profile')}
              size={{ base: 'md', md: 'lg' }}
              colorScheme="accent"
            >
              View Profile
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home 