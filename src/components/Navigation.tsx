import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  useDisclosure,
  HStack,
  Text,
  Container,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box as="nav" width="100%" py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={8}>
            <Text
              as={RouterLink}
              to="/"
              fontSize="xl"
              fontWeight="bold"
              _hover={{ textDecoration: 'none' }}
            >
              FableTongue
            </Text>
          </HStack>

          <HStack spacing={4}>
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              variant="ghost"
            />
            <IconButton
              display={{ base: 'block', md: 'none' }}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              variant="ghost"
              aria-label="Toggle navigation"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navigation 