/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        // Editorial light base (Sport-News inspired)
        paper: '#FFFFFF',
        panel: '#F3F4F6', // light gray section background
        line: '#E4E6EA', // hairline borders
        ink: {
          DEFAULT: '#111114', // primary text / near-black
          700: '#2A2C31',
          500: '#6B7280', // secondary text
          300: '#9CA3AF',
        },
        // Dark full-bleed sections (MotoGP-style hero / video / footer)
        night: {
          DEFAULT: '#0B0B0C',
          800: '#121214',
          700: '#1A1B1E',
          600: '#26282D',
        },
        // SARGA brand — orange→red flame, with a solid race-red for CTAs
        flame: {
          400: '#FF8A3D',
          500: '#FF6B1A',
          600: '#F2451E',
          700: '#E01F26',
        },
        race: '#E11D2A', // primary CTA red (MotoGP-like)
      },
      fontFamily: {
        // Condensed display for MotoGP-style headings
        display: ['"Saira Condensed"', '"Oswald"', 'system-ui', 'sans-serif'],
        // Ultra-bold compressed for hero mega type
        mega: ['"Anton"', '"Saira Condensed"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'flame-gradient': 'linear-gradient(100deg, #FF8A3D 0%, #FF6B1A 35%, #F2451E 70%, #E01F26 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
