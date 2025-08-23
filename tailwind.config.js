/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.{html,md}',
    './content/**/*.{html,md}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["night", "lofi"],
    darkTheme: "night",
  },
}