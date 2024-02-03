import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'

type CurrencyBtnProps = PropsWithChildren<{
  name: string;
  flag: string;
}>

const CurrencyBtn = (props: CurrencyBtnProps): JSX.Element => {
  return (
    <View style={classes.btnContainer}>
      <Text style={classes.flag}>{props.flag}</Text>
      <Text style={classes.countryName}>{props.name}</Text>
    </View>
  )
}

export default CurrencyBtn

const classes = StyleSheet.create({
  btnContainer: {
    alignItems: "center"
  },
  flag: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4
  },
  countryName: {
    fontSize: 14,
    color: '#2D3436'
  }
})