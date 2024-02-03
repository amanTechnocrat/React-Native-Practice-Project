import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Components/Login'

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}




