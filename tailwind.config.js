/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = ['module:metro-react-native-babel-preset'];
export const theme = {
  extend: {},
};
export const plugins = ['nativewind/babel'];