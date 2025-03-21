/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: ['module:metro-react-native-babel-preset'],
  theme: {
    extend: {},
  },
  plugins: ['nativewind/babel'],
}
