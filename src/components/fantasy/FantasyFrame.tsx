import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface FantasyFrameProps extends BoxProps {
  variant?: 'default' | 'ornate' | 'simple'
}

const FantasyFrame: React.FC<FantasyFrameProps> = ({ children, variant = 'default', ...props }) => {
  const cornerSize = variant === 'ornate' ? '64px' : '32px'
  const cornerOpacity = variant === 'simple' ? 0.5 : 1

  return (
    <Box
      position="relative"
      padding={variant === 'ornate' ? 8 : 4}
      {...props}
    >
      {/* Top Left Corner */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width={cornerSize}
        height={cornerSize}
        backgroundImage="url('/textures/decorative/corner.svg')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        opacity={cornerOpacity}
      />
      
      {/* Top Right Corner */}
      <Box
        position="absolute"
        top={0}
        right={0}
        width={cornerSize}
        height={cornerSize}
        backgroundImage="url('/textures/decorative/corner.svg')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        transform="rotate(90deg)"
        opacity={cornerOpacity}
      />
      
      {/* Bottom Left Corner */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        width={cornerSize}
        height={cornerSize}
        backgroundImage="url('/textures/decorative/corner.svg')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        transform="rotate(-90deg)"
        opacity={cornerOpacity}
      />
      
      {/* Bottom Right Corner */}
      <Box
        position="absolute"
        bottom={0}
        right={0}
        width={cornerSize}
        height={cornerSize}
        backgroundImage="url('/textures/decorative/corner.svg')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        transform="rotate(180deg)"
        opacity={cornerOpacity}
      />
      
      {children}
    </Box>
  )
}

export default FantasyFrame 