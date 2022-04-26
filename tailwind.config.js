module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xsm: '400px',
      vsm: '560px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      transitionProperty: {
        box: 'height, width',
      },
      translate: {
        6.5: '1.625rem',
      },
      maxWidth: {
        '9xl': '96rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
