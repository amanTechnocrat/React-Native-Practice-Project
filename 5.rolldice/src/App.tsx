import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { PropsWithChildren, useState } from 'react'
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import DiceOne from '../assets/One.png'
import DiceTwo from '../assets/Two.png'
import DiceThree from '../assets/Three.png'
import DiceFour from '../assets/Four.png'
import DiceFive from '../assets/Five.png'
import DiceSix from '../assets/Six.png'

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType
}>

const Dice = ({ imageUrl }: DiceProps): JSX.Element => {
  return (
    <View style={classes.diceContainer}>
      <Image style={classes.diceImage} source={imageUrl} />
    </View>
  )
}

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};


export default function App() {
  const [diceImg, setdiceImg] = useState<ImageSourcePropType>(DiceOne)

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    switch (randomNumber) {
      case 1:
        setdiceImg(DiceOne)
        break;
      case 2:
        setdiceImg(DiceTwo)
        break;
      case 3:
        setdiceImg(DiceThree)
        break;
      case 4:
        setdiceImg(DiceFour)
        break;
      case 5:
        setdiceImg(DiceFive)
        break;
      case 6:
        setdiceImg(DiceSix)
        break;

      default:
        setdiceImg(DiceOne)
        break;
    }
    ReactNativeHapticFeedback.trigger("impactHeavy", options);
  }

  return (
    <View style={classes.container}>
      <Dice imageUrl={diceImg} />
      <TouchableOpacity onPress={rollDiceOnTap}>
        <Text style={classes.rollDiceBtnText}>Roll the Dice</Text>
      </TouchableOpacity>
    </View>
  )
}

const classes = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF2F2"
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#E5E0FF",
    fontSize: 16,
    color: "#8EA7E9",
    fontWeight: "700",
    textTransform: "uppercase"
  }
})