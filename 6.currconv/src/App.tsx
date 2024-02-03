import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { currencyByRupee } from './constants'
import CurrencyBtn from './Components/CurrencyBtn'
import Snackbar from 'react-native-snackbar'

const App = () => {
  const [inputValue, setinputValue] = useState('')
  const [resultValue, setresultValue] = useState('')
  const [targetCurr, settargetCurr] = useState('')

  const BtnPressed = (targetCurrency: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: "Enter a Value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }
    const InputAmount = parseFloat(inputValue)
    if (isNaN(InputAmount)) {
      return Snackbar.show({
        text: "Not a valid number to convert",
        backgroundColor: "#F4BE2C",
        textColor: "#000000"
      })
    }
    const convertedValue = InputAmount * targetCurrency.value
    const result = `${targetCurrency.symbol} ${convertedValue.toFixed(2)}`
    setresultValue(result)
    settargetCurr(targetCurrency.name)
  }

  return (
    <>
      <StatusBar />
      <View style={classes.container}>
        <View style={classes.topContainer}>
          <View style={classes.rupeesContainer}>
            <Text style={classes.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode='always' //works only in IOS like Reset input when button clicked
              onChangeText={setinputValue}
              keyboardType='number-pad'
              placeholder='Enter amount in Rupee'
            />
          </View>
          {resultValue && (
            <Text style={classes.resultTxt}>
              {resultValue}
            </Text>
          )}
        </View>

        <View style={classes.bottomContainer}>
          <FlatList
            numColumns={2}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={[classes.button, targetCurr == item.name && classes.selected]}
                onPress={() => BtnPressed(item)}
              >
                <CurrencyBtn {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  )
}

export default App

const classes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,

    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});