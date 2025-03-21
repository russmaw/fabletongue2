import React, { useEffect, useCallback } from 'react'
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
  useColorModeValue,
  Fade
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
  const handleClose = useCallback(() => {
    // Ensure we clean up properly
    setTimeout(onClose, 300) // Allow animation to complete
  }, [onClose])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isOpen) {
      timer = setTimeout(() => {
        handleClose()
      }, 5000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isOpen, handleClose])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <Fade in={isOpen}>
        <ModalContent
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="xl"
          p={4}
          maxW="sm"
          animation={`${glowAnimation} 2s infinite`}
          boxShadow="xl"
        >
          <ModalCloseButton />
          <ModalHeader textAlign="center" fontSize="2xl" pb={0}>
            Achievement Unlocked!
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="center" py={4}>
              <Box 
                fontSize="4xl" 
                animation={`${glowAnimation} 1s infinite`}
              >
                {icon}
              </Box>
              <Text fontWeight="bold" fontSize="xl">
                {title}
              </Text>
              <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
                {description}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Fade>
    </Modal>
  )
}

export default React.memo(AchievementPopup) 