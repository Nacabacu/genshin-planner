module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        box: 'height, width',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
};
