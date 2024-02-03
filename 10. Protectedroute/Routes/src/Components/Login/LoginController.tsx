import { useState, useContext } from 'react';
import ApiService from '../../Services/ApiService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import AuthContextService from '../../Contexts/AuthContextService';

const LoginController = () => {
    const { setIsLoggedIn } = useContext(AuthContextService);
    const [visiablePassword, setVisiablePassword] = useState(false)

    const handleVisiblePassword = () => {
        setVisiablePassword(!visiablePassword)
    }

    const handleLogin = async ({ email, password }: any, handleReset: Function) => {
        const response = await ApiService.makeAPICall({
            methodName: ApiService.methods.POST,
            apiPath: ApiService.endpoints.login,
            body: { email, password }
        })
        if (response?.data.status == 'error') {
            handleReset()
            return Alert.alert('Info', 'Invalid Credentials')
        }
        if (response?.data.status == 'success') {
            handleReset()
            await AsyncStorage.setItem('authToken', response?.data.accesstoken)
            await AsyncStorage.setItem('refreshtoken', response?.data.refreshtoken)
            return setIsLoggedIn(true)
        }
        console.warn('Something went wrong')
    }

    return {
        handleVisiblePassword,
        handleLogin,
        visiablePassword
    };
};

export default LoginController;