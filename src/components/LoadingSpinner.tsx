import { Spinner, Center, VStack, Text } from '@chakra-ui/react'

const LoadingSpinner = () => {
  return (
    <Center minH="100vh">
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.600">Loading...</Text>
      </VStack>
    </Center>
  )
}

export default LoadingSpinner 