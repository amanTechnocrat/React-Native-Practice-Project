import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const App = () => {
  const [randomBgCoolor, setRandomBgCoolor] = useState("#ffffff")

  const GenRandomColor = () => {
    let hexRange = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)]
    }
    setRandomBgCoolor(color)
  }

  useEffect(() => {
    GenRandomColor()
  }, [])

  function reverseString(s: any) {
    const elements = s.split("");
    const firstElement = elements.shift(); // Remove and store the first element
    const reversedElements = elements.reverse().join("");
    return firstElement + reversedElements;
  }


  return (
    <>
      <StatusBar backgroundColor={reverseString(randomBgCoolor)} />
      <View style={[classes.container, { backgroundColor: randomBgCoolor }]}>
        <TouchableOpacity onPress={GenRandomColor}>
          <View style={classes.actionBtn}>
            <Text style={classes.actionBtnText}>Press Me</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default App

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionBtn: {
    borderRadius: 20,
    backgroundColor: "#6A1B4D",
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  actionBtnText: {
    fontSize: 24,
    color: "#FFFFFF",
    textTransform: "uppercase"
  }
})