import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0b0f14',
          soft: '#11161d',
          hover: '#16202b'
        },
        text: {
          DEFAULT: '#e6edf3',
          muted: '#9da7b1',
          subtle: '#6b7682'
        },
        primary: {
          DEFAULT: '#4dd0e1',
          600: '#35bace',
          700: '#2da3b6'
        },
        danger: {
          DEFAULT: '#ef4444'
        },
        success: {
          DEFAULT: '#22c55e'
        },
        border: '#202b36'
      }
    }
  },
  plugins: []
}
export default config
