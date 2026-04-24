import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50: '#eef7fd',
          100: '#dceefb',
          200: '#b4d6f5',
          300: '#7bb3e8',
          400: '#4a8fd4',
          500: '#2d6db5',
          600: '#1e4d8c',
          700: '#163366',
          800: '#0f2240',
          900: '#0a1628',
        },
        mammoth: {
          black: '#0b0e14',
          bone: '#f0ece4',
        },
        vegas: {
          gold: '#b4975a',
          steel: '#333f48',
        },
        surface: {
          0: '#0b0e14',
          1: '#121720',
          2: '#1a202d',
          3: '#232b3b',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.9', letterSpacing: '0.02em' }],
        'display-lg': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '0.95', letterSpacing: '0.02em' }],
      },
      backgroundImage: {
        'edge-utah': 'linear-gradient(135deg, #2d6db5, #4a8fd4)',
        'edge-vegas': 'linear-gradient(135deg, #b4975a, #d4b96a)',
        'hero-gradient': 'linear-gradient(180deg, rgba(11,14,20,0) 0%, rgba(11,14,20,0.8) 50%, #0b0e14 100%)',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'frost-float': {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-100px) translateX(20px)', opacity: '0' },
        },
      },
      animation: {
        'pulse-live': 'pulse-live 2s ease-in-out infinite',
        'frost-float': 'frost-float 4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
