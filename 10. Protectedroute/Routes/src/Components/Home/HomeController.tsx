import React, { useContext } from 'react';
import AuthContextService from '../../Contexts/AuthContextService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeController = () => {
  const { setIsLoggedIn } = useContext(AuthContextService)

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken')
    setIsLoggedIn(false)
  }

  return {
    handleLogout
  };
};

export default HomeController;