import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface ScrollContainerProps extends BoxProps {
  variant?: 'default' | 'aged' | 'pristine'
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children, variant = 'default', ...props }) => {
  const getBackgroundOpacity = () => {
    switch (variant) {
      case 'aged':
        return 0.15
      case 'pristine':
        return 0.08
      default:
        return 0.12
    }
  }

  return (
    <Box
      position="relative"
      padding="6"
      marginY="8"
      borderRadius="md"
      backgroundColor="parchment.50"
      boxShadow="md"
      {...props}
    >
      {/* Background Texture */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage="url('/textures/backgrounds/parchment.svg')"
        backgroundSize="200px 200px"
        backgroundRepeat="repeat"
        opacity={getBackgroundOpacity()}
        borderRadius="inherit"
        pointerEvents="none"
      />

      {/* Content */}
      <Box
        position="relative"
        zIndex={1}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ScrollContainer 