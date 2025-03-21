import { keyframes } from '@emotion/react'

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const glowPulse = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(255, 223, 186, 0.2),
                0 0 10px rgba(255, 223, 186, 0.2),
                0 0 15px rgba(255, 223, 186, 0.2);
  }
  50% {
    box-shadow: 0 0 10px rgba(255, 223, 186, 0.5),
                0 0 20px rgba(255, 223, 186, 0.3),
                0 0 30px rgba(255, 223, 186, 0.3);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 223, 186, 0.2),
                0 0 10px rgba(255, 223, 186, 0.2),
                0 0 15px rgba(255, 223, 186, 0.2);
  }
`

export const scrollReveal = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`

export const runeGlow = keyframes`
  0% {
    filter: drop-shadow(0 0 2px rgba(255, 223, 186, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 5px rgba(255, 223, 186, 0.6));
  }
  100% {
    filter: drop-shadow(0 0 2px rgba(255, 223, 186, 0.3));
  }
`

// Animation utility functions
export const getAnimationStyles = (animation: keyof typeof animations, duration = '0.3s') => {
  return {
    animation: `${animations[animation]} ${duration} ease-out`,
  }
}

const animations = {
  fadeIn,
  glowPulse,
  scrollReveal,
  runeGlow,
} as const 