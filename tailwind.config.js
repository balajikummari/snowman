module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        technovert: {
          primary: '#228ae5',
          secondary: '#28b4e8',
          dark: '#000000',
          light: '#ffffff',
          grey: '#b8b8b8',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          'base-200': '#f5f5f5',
        },
      },
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
    ],
    darkTheme: 'technovert',
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
      'light-grey': '#D3D3D3',
    },
    extend: {
      backgroundImage: {
        'calculate-bg':
          'url(https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
        'hero-bg':
          'url(https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
        'security-bg':
          'url(https://images.unsplash.com/photo-1625193308802-590eafb2ea00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
      },
      container: {
        center: true,
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
        },
      },
      boxShadow: {
        inner: '0 0 0 2px rgba(255, 255, 255, 1)',
      },
      fontFamily: {
        sans: ['Montserrat'],
      },
      fontSize: {
        xl: '1.5rem',
        lg: '1.25rem',
        md: '1.125rem',
        base: '1rem',
        sm: '0.875rem',
        xs: '0.75rem',
        xxs: '0.625rem',
      },
    },
  },
}
