import React from 'react'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { getAnimationStyles } from '../../styles/animations'
import FantasyFrame from '../fantasy/FantasyFrame'
import ScrollContainer from '../fantasy/ScrollContainer'
import LanguageRune from '../fantasy/LanguageRune'

const FantasyUIExample: React.FC = () => {
  return (
    <Box maxW="800px" mx="auto" p={8}>
      <FantasyFrame variant="ornate">
        <Stack spacing={8} p={6}>
          <Heading
            textAlign="center"
            fontSize="4xl"
            fontFamily="heading"
            {...getAnimationStyles('fadeIn', '0.5s')}
          >
            Welcome to FableTongue
          </Heading>

          <ScrollContainer variant="aged">
            <Text variant="scroll" p={4}>
              Embark on a magical journey through languages, where each word you learn
              strengthens your connection to ancient wisdom and forgotten tales. Choose
              your path wisely, brave scholar, for the knowledge you seek lies within
              these enchanted scrolls.
            </Text>
          </ScrollContainer>

          <Flex justify="center" gap={4}>
            <LanguageRune language="spanish" width="32px" height="32px" />
            <LanguageRune language="french" width="32px" height="32px" />
          </Flex>

          <Button
            variant="fantasy"
            size="lg"
            width="full"
            {...getAnimationStyles('glowPulse', '2s')}
          >
            Begin Your Adventure
          </Button>
        </Stack>
      </FantasyFrame>
    </Box>
  )
}

export default FantasyUIExample 