import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from "formik"
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .max(16, 'Should be max of 16 characters')
    .min(4, 'Should be min of 4 characters')
    .required('Length is Required')
})

export default function App() {
  const [password, setpassword] = useState('')
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [numbers, setNumbers] = useState(false)

  const genratePasswordString = (passwordLength: number) => {
    let characterList = ''

    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbersLetters = '0123456789';
    const symbolsLetters = '!@#$%^&*()-_+=';

    if (uppercase) {
      characterList += uppercaseLetters
    }

    if (lowercase) {
      characterList += lowercaseLetters
    }

    if (numbers) {
      characterList += numbersLetters
    }

    if (symbols) {
      characterList += symbolsLetters
    }

    const passwordResult = createPassword(characterList, passwordLength)
    setpassword(passwordResult)
    setIsPasswordGenerated(true)

  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPassword = () => {
    setLowercase(true)
    setUppercase(false)
    setSymbols(false)
    setNumbers(false)
    setpassword('')
    setIsPasswordGenerated(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={classes.appContainer}>
        <View style={classes.formContainer}>
          <Text style={classes.title}>Password Generator</Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              genratePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              isValid,
              handleSubmit,
              handleReset
            }) => (
              <>
                <View style={classes.inputWrapper}>
                  <View style={classes.inputColumn}>
                    <Text style={classes.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={classes.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={classes.inputStyle}
                    onChangeText={handleChange('passwordLength')}
                    value={values.passwordLength}
                    keyboardType='numeric'
                    placeholder='Ex. 8'
                  />
                </View>

                <View style={classes.inputWrapper}>
                  <Text style={classes.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowercase}
                    fillColor='#29AB87'
                    onPress={() => setLowercase(!lowercase)}
                  />
                </View>

                <View style={classes.inputWrapper}>
                  <Text style={classes.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    fillColor='#29AB87'
                    onPress={() => setUppercase(!uppercase)}
                  />
                </View>

                <View style={classes.inputWrapper}>
                  <Text style={classes.heading}>Include Symbols</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    fillColor='#29AB87'
                    onPress={() => setSymbols(!symbols)}
                  />
                </View>

                <View style={classes.inputWrapper}>
                  <Text style={classes.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    fillColor='#29AB87'
                    onPress={() => setNumbers(!numbers)}
                  />
                </View>


                <View style={classes.formActions}>
                  <TouchableOpacity onPress={() => handleSubmit()} disabled={!isValid} style={classes.primaryBtn}>
                    <Text style={classes.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { handleReset(); resetPassword() }} style={classes.secondaryBtn}>
                    <Text style={classes.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>

                {isPasswordGenerated && (
                  <View style={[classes.card, classes.cardElevated]}>
                    <Text style={classes.subTitle}>Result:</Text>
                    <Text style={classes.description}>Long Press to Copy</Text>
                    <Text selectable style={classes.generatedPassword}>{password}</Text>
                  </View>
                )}

              </>
            )}
          </Formik>

        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const classes = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});