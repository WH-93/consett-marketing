import type { Config } from 'tailwindcss';
import { siteConfig } from './src/config/site';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: siteConfig.colors.navy,
          900: siteConfig.colors.navy,
          800: siteConfig.colors.navy800,
          700: siteConfig.colors.navy700,
        },
        gold: {
          DEFAULT: siteConfig.colors.gold,
          400: siteConfig.colors.gold,
          500: siteConfig.colors.gold500,
          600: siteConfig.colors.gold600,
        },
        teal: {
          DEFAULT: siteConfig.colors.teal,
          500: siteConfig.colors.teal500,
        },
        'warm-white': siteConfig.colors.warmWhite,
        'light-grey': siteConfig.colors.lightGrey,
      },
      fontFamily: {
        heading: [siteConfig.fonts.heading],
        sans: [siteConfig.fonts.body],
      },
      borderRadius: {
        DEFAULT: '4px',
        card: '8px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.08)',
        'card-lg': '0 8px 30px rgba(0,0,0,0.12)',
      },
      letterSpacing: {
        wide: '0.05em',
        wider: '0.1em',
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
