export const theme = {
  transitions: {
    color: 'transition-colors duration-200',
  },
  rounded: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
    xl: 'rounded-2xl',
  },
  shadows: {
    card: 'shadow-md',
    sidebar: 'shadow-xl',
  },
  light: {
    bg: 'bg-gray-50/80 backdrop-blur-sm',
    cardBg: 'bg-white/90 backdrop-blur-sm',
    sidebar: 'bg-white/95 backdrop-blur-md',
    header: 'bg-white/95 backdrop-blur-md',
    border: 'border-gray-200/60',
    input: 'bg-gray-50/90 backdrop-blur-sm',
    gradient: {
      subtle: 'bg-gradient-to-br from-gray-50 to-gray-100/80',
      accent: 'bg-gradient-to-br from-blue-500 to-blue-600',
      surface: 'bg-gradient-to-br from-white/95 to-gray-50/95'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      muted: 'text-gray-400',
    },
    accent: {
      primary: 'bg-blue-500 hover:bg-blue-600 transition-all duration-200',
      success: 'bg-green-500 hover:bg-green-600 transition-all duration-200',
      warning: 'bg-yellow-500 hover:bg-yellow-600 transition-all duration-200',
      danger: 'bg-red-500 hover:bg-red-600 transition-all duration-200',
    },
  },
  dark: {
    bg: 'bg-black',
    cardBg: 'bg-white/[0.02]',
    sidebar: 'bg-black',
    header: 'bg-black',
    border: 'border-white/10',
    input: 'bg-white/[0.02]',
    text: {
      primary: 'text-white',
      secondary: 'text-gray-400',
      muted: 'text-gray-500',
    },
    accent: {
      primary: 'bg-blue-600 hover:bg-blue-700',
      success: 'bg-green-600 hover:bg-green-700',
      warning: 'bg-yellow-600 hover:bg-yellow-700',
      danger: 'bg-red-600 hover:bg-red-700',
    },
  },
} as const

export type Theme = typeof theme 