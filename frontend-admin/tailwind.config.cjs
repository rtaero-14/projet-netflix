module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,html,ejs}'
  ],
  safelist: [
    'bg-gray-900', 'text-white', 'text-5xl', 'font-bold', 'mb-4',
    'text-gray-400', 'flex', 'items-center', 'justify-center', 'min-h-screen', 'text-center'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
