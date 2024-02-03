import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FlatCard = () => {
  return (
    <View>
      <Text style={styles.title}>Flat-Cards</Text>
      <View style={styles.container}>

        <View style={[styles.card, styles.color1]}>
          <Text>ojas</Text>
        </View>
        <View style={[styles.card, styles.color2]}>
          <Text>Card</Text>
        </View>
        <View style={[styles.card, styles.color3]}>
          <Text>Card</Text>
        </View>
        <View style={[styles.card, styles.color2]}>
          <Text>Card</Text>
        </View>
        <View style={[styles.card, styles.color2]}>
          <Text>Card</Text>
        </View>
      </View>
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
    paddingHorizontal: 8,
    marginBottom: 8
  },
  container: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    gap: 10
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 8
  },
  color1: {
    backgroundColor: 'gold',
  },
  color2: {
    backgroundColor: 'blue',
  },
  color3: {
    backgroundColor: 'yellow',
  },
})
