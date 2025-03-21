import React from 'react'
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Text,
  Container,
  useColorMode,
  As,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Link as RouterLink, LinkProps } from 'react-router-dom'

interface MenuLinkProps extends Omit<React.ComponentProps<typeof Text>, 'as'> {
  to: string
  children: React.ReactNode
}

const MenuLink: React.FC<MenuLinkProps> = ({ to, children, ...props }) => (
  <Text
    as={RouterLink as As}
    to={to}
    px={4}
    py={2}
    rounded="md"
    _hover={{ bg: 'brand.100' }}
    {...props}
  >
    {children}
  </Text>
)

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const MenuItems = () => (
    <>
      <MenuLink to="/">Home</MenuLink>
      <MenuLink to="/story">Stories</MenuLink>
      <MenuLink to="/profile">Profile</MenuLink>
    </>
  )

  return (
    <Box as="nav" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            aria-label="Toggle Navigation"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
          />

          <MenuLink
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color="brand.600"
            _hover={{ color: 'brand.700' }}
          >
            FableTongue
          </MenuLink>

          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <MenuItems />
          </HStack>

          <IconButton
            aria-label="Toggle Color Mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>

        {/* Mobile menu */}
        <Box
          display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
          pb={4}
        >
          <VStack spacing={4} align="stretch">
            <MenuItems />
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default Navigation 