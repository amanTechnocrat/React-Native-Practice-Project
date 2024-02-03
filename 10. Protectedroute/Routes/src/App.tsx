import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react'
import { Router } from './Routes/Router'
import { AuthContextProvider } from './Contexts/AuthContextService'
const App = () => {
  return (
    <AuthContextProvider>
      <StatusBar translucent backgroundColor='transparent' />
      <SafeAreaView style={classes.container}>
        <Router />
      </SafeAreaView>
    </AuthContextProvider>
  )
}

export default App

const classes = StyleSheet.create({
  container: {
    flex: 1
  }
})