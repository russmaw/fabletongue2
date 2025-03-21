import React, { useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Box,
  useColorModeValue
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

interface AchievementPopupProps {
  title: string
  description: string
  icon: string
  isOpen: boolean
  onClose: () => void
}

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 10px #ffd700; }
  50% { box-shadow: 0 0 20px #ffd700, 0 0 30px #ffd700; }
  100% { box-shadow: 0 0 10px #ffd700; }
`

const AchievementPopup: React.FC<AchievementPopupProps> = ({
  title,
  description,
  icon,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="xl"
        p={4}
        maxW="sm"
        animation={`${glowAnimation} 2s infinite`}
      >
        <ModalCloseButton />
        <ModalHeader textAlign="center" fontSize="2xl" pb={0}>
          Achievement Unlocked!
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="center" py={4}>
            <Box fontSize="4xl">{icon}</Box>
            <Text fontWeight="bold" fontSize="xl">
              {title}
            </Text>
            <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
              {description}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AchievementPopup 