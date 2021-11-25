const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  important: true,
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1792px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
      },
    },
    fontSize: {
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '18': '18px',
      '20': '20px',
      '22': '22px',
      '24': '24px',
      '26': '26px',
      '30': '30px',
      '36': '36px',
      '44': '44px',
      '62': '62px',
      '86': '86px',
      '106': '106px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      mint: '#B4F8C8',
      blue_green: '#75E6DA',
      tiffany: '#A0E7E5',
      fancy_pink: '#F9F1F0',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      green: colors.green,
      red: colors.red,
      yellow: colors.yellow,
    },
    maxHeight: {
      '500': '500px',
    },
    height: {
      '4': '1rem',
      '6': '1.5rem',
      '10': '2.5rem',
      '36': '9rem',
      '60': '15rem',
      '80': '20rem',
      'full': '100%',
      'messenger': 'calc(100vh - 60px)',
      'chat': 'calc(100vh - 134px)',
    },
    boxShadow: {
      DEFAULT: '0px 0px 16px -8px rgb(0, 0, 0, 0.68)',
    },
    zIndex: {
      'header': '999'
    },
    extend: {
      gridTemplateColumns: {
        'layout-desktop': '1fr 2fr 1fr',
        'layout-profile': '1fr 3fr',
        'profile-content': '2fr 1fr',
      },
      gridTemplateRows: {
        'content': '60px 1fr',
      },
      animation: {
        'ping-slow': 'ping 3s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    boxSizing: false,
    float: false,
    clear: false,
    fontFamily: false,
    // inset: false,
    filter: false,
    brightness: false,
    contrast: false,
    dropShadow: false,
    grayscale: false,
    hueRotate: false,
    invert: false,
    saturate: false,
    sepia: false,
    backdropFilter: false,
    backdropBlur: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
  },
}