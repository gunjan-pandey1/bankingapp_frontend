/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#646cff',
          dark: '#535bf2'
        },
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #646cff 0%, #535bf2 100%)',
        'gradient-light': 'linear-gradient(135deg, #f0f2ff 0%, #e6e9ff 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1b2e 0%, #2a2d4a 100%)'
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#646cff',
          secondary: '#535bf2',
          accent: '#22c55e',
          neutral: '#213547',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#646cff',
          secondary: '#535bf2',
          accent: '#22c55e',
        },
      },
    ],
  },
}