import { Text, View, StyleSheet } from 'react-native';
import {Slot, Stack} from'expo-router';
import {useFonts} from 'expo-font'
import { useEffect } from 'react';


function RootLayout () {
const  {fontsLoaded, error} = useFonts ({
  "Poppins-Black": require("../Front-end/assets/fonts/Poppins-Black.ttf"),
  "Poppins-Bold": require("../Front-end/assets/fonts/Poppins-Bold.ttf"),
  "Poppins-ExtraBold": require("../Front-end/assets/fonts/Poppins-ExtraBold.ttf"),
  "Poppins-ExtraLight": require("../Front-end/assets/fonts/Poppins-ExtraLight.ttf"),
  "Poppins-Light": require("../Front-end/assets/fonts/Poppins-Light.ttf"),
  "Poppins-Medium": require("../Front-end/assets/fonts/Poppins-Medium.ttf"),
  "Poppins-Regular": require("../Front-end/assets/fonts/Poppins-Regular.ttf"),
  "Poppins-SemiBold": require("../Front-end/assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Thin": require("../Front-end/assets/fonts/Poppins-Thin.ttf"),
});

useEffect(() => {
  if (error) throw error;

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded, error]);

if (!fontsLoaded) {
  return null;
}

if (!fontsLoaded && !error) {
  return (
    <div>RootLayout</div>
  )
}
};
export default RootLayout