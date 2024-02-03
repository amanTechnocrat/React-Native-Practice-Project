import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { setupPlayer, addTrack } from '../musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  async function setup() {
    let isSetup = await setupPlayer()
    if (isSetup) {
      await addTrack()
    }
    setIsPlayerReady(isSetup)
  }

  useEffect(() => {
    setup()
  }, [])

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }


  return (
    <View style={classes.container}>
      <StatusBar barStyle={"light-content"} />
      <MusicPlayer />
    </View>
  )
}

export default App

const classes = StyleSheet.create({
  container: {
    flex: 1
  }
})