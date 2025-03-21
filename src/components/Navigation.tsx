import { Box, Flex, Button, IconButton, useColorMode, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaSun, FaMoon, FaBook, FaUser } from 'react-icons/fa'

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box as="nav" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={1}>
      <Flex maxW="container.xl" mx="auto" px={4} h={16} align="center" justify="space-between">
        <Flex align="center">
          <RouterLink to="/">
            <Button variant="ghost" leftIcon={<FaBook />} fontSize="xl" fontWeight="bold">
              LoreLingo
            </Button>
          </RouterLink>
        </Flex>

        <Flex align="center" gap={4}>
          <IconButton
            aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<FaUser />}
            >
              <Avatar size="sm" name="User" src="" />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navigation 