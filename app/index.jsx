import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar' 
import React from 'react'

export default function App ()  {
  return (
    <View style = {styles.container}>
      <Text >BusinessGrowth</Text>
      <StatusBar style= "auto"/>
    </View>
  )
}

