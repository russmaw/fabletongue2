import React from 'react'
import {
  Box,
  Text,
  ScaleFade,
  useColorModeValue
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { FaTrophy } from 'react-icons/fa'

interface AchievementPopupProps {
  title: string
  description: string
  icon: string
  isOpen: boolean
  onClose: () => void
}

const glowPulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(255, 223, 186, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 223, 186, 0.6); }
  100% { box-shadow: 0 0 10px rgba(255, 223, 186, 0.3); }
`

const AchievementPopup: React.FC<AchievementPopupProps> = ({
  title,
  description,
  icon,
  isOpen,
  onClose
}) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('fantasy.200', 'fantasy.700')

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <ScaleFade in={isOpen} unmountOnExit>
      <Box
        position="fixed"
        bottom="4"
        right="4"
        maxW="sm"
        bg={bgColor}
        borderWidth="2px"
        borderColor={borderColor}
        borderRadius="lg"
        p={4}
        display="flex"
        alignItems="center"
        gap={4}
        animation={`${glowPulse} 2s infinite`}
        zIndex="toast"
        boxShadow="lg"
      >
        <Box
          fontSize="2xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="fantasy.500"
        >
          <FaTrophy />
          <Text ml={2}>{icon}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="lg" color="fantasy.500">
            Achievement Unlocked!
          </Text>
          <Text fontWeight="semibold">{title}</Text>
          <Text fontSize="sm" color="gray.500">
            {description}
          </Text>
        </Box>
      </Box>
    </ScaleFade>
  )
}

export default AchievementPopup 