module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
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
