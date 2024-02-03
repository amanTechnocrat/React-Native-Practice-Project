import React, { useState, useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthContextService from '../Contexts/AuthContextService';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../Components/Loading';
//Routes
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';


export const Router = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContextService)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const knowLoginStatus = async () => {
    setIsLoading(true)
    let token = await AsyncStorage.getItem('authToken')
    if (token) {
      setIsLoggedIn(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    knowLoginStatus()
  }, [setIsLoggedIn])



  if (isLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

