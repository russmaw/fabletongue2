import React from 'react'
import { Box, Image, ImageProps, Tooltip } from '@chakra-ui/react'

interface LanguageRuneProps extends Omit<ImageProps, 'src' | 'alt'> {
  language: string
  showTooltip?: boolean
}

const languageInfo: Record<string, { name: string, family: string }> = {
  spanish: { name: 'Spanish (Español)', family: 'Romance' },
  french: { name: 'French (Français)', family: 'Romance' },
  italian: { name: 'Italian (Italiano)', family: 'Romance' },
  portuguese: { name: 'Portuguese (Português)', family: 'Romance' },
  romanian: { name: 'Romanian (Română)', family: 'Romance' },
  german: { name: 'German (Deutsch)', family: 'Germanic' },
  dutch: { name: 'Dutch (Nederlands)', family: 'Germanic' },
  swedish: { name: 'Swedish (Svenska)', family: 'Germanic' },
  russian: { name: 'Russian (Русский)', family: 'Slavic' },
  polish: { name: 'Polish (Polski)', family: 'Slavic' },
  japanese: { name: 'Japanese (日本語)', family: 'Asian' },
  korean: { name: 'Korean (한국어)', family: 'Asian' },
  mandarin: { name: 'Mandarin (普通话)', family: 'Asian' },
}

const LanguageRune: React.FC<LanguageRuneProps> = ({ 
  language, 
  showTooltip = true,
  ...props 
}) => {
  const normalizedLang = language.toLowerCase()
  const info = languageInfo[normalizedLang]

  const rune = (
    <Box
      position="relative"
      width={props.width || "24px"}
      height={props.height || "24px"}
      {...props}
    >
      <Image
        src={`/textures/icons/language-runes/${normalizedLang}.svg`}
        alt={info?.name || language}
        width="100%"
        height="100%"
        fallback={
          <Box
            width="100%"
            height="100%"
            borderWidth="2px"
            borderRadius="sm"
            borderColor="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            fontFamily="serif"
          >
            {language.slice(0, 2).toUpperCase()}
          </Box>
        }
      />
    </Box>
  )

  if (showTooltip && info) {
    return (
      <Tooltip 
        label={`${info.name} - ${info.family} Language Family`}
        placement="top"
      >
        {rune}
      </Tooltip>
    )
  }

  return rune
}

export default LanguageRune 