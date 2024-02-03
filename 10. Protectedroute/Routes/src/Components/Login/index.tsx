import { StyleSheet, Text, View, TextInput, ImageBackground, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Yup from 'yup'
import { Formik } from "formik"
import { TouchableOpacity } from 'react-native'
import LoginController from './LoginController'
import BgImg from '../../assets/images/bgImg.jpg'

const Login = () => {
    const { handleLogin, handleVisiblePassword, visiablePassword } = LoginController()

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ImageBackground source={BgImg} style={classes.container} imageStyle={classes.imgRage} >

                <View>
                    <Text style={classes.loginTxt}>Login</Text>
                </View>

                <Formik
                    validateOnChange
                    validateOnMount
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .required("Please enter an email")
                            .email("Please enter valid email address"),
                        password: Yup.string()
                            .required("Please enter an password")
                    })}
                    onSubmit={(values, { resetForm }) => {
                        handleLogin(values, resetForm)
                    }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        isValid,
                        handleSubmit
                    }) => (
                        <>
                            <View style={classes.inputContainer}>
                                <View style={classes.inputWrapper}>
                                    <MaterialCommunityIcons name='account' size={28} color={'black'} />
                                    <TextInput
                                        style={classes.inputRage}
                                        value={values.email}
                                        clearButtonMode='always' //works only in IOS like Reset input when button clicked
                                        onChangeText={handleChange('email')}
                                        keyboardType='email-address'
                                        placeholder='Please enter Email'
                                    />
                                    <AntDesign name='checkcircle' size={28} color={errors.email ? '#70785E' : '#6ED788'} />
                                </View>

                                <View style={classes.inputWrapper}>
                                    <MaterialCommunityIcons name='lock-outline' size={28} color={'black'} />
                                    <TextInput
                                        secureTextEntry={visiablePassword ? false : true}
                                        style={classes.inputRage}
                                        value={values.password}
                                        clearButtonMode='always' //works only in IOS like Reset input when button clicked
                                        onChangeText={handleChange('password')}
                                        placeholder='Please enter Password'
                                    />
                                    <MaterialCommunityIcons onPress={handleVisiblePassword} name={visiablePassword ? 'eye' : 'eye-off'} size={28} color={'black'} />
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity disabled={!isValid} onPress={() => handleSubmit()} style={[classes.lgnBtn, !isValid && classes.lgnBtnDisabled]}>
                                    <Text style={classes.lgnTxt}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>

                <View>
                    <Text style={classes.fpTxt}>Forget your password?</Text>
                </View>

                <View style={classes.connectWithContainer}>
                    <View style={classes.dividerLine} />
                    <Text style={classes.txtConnectWith}>or connect with</Text>
                    <View style={classes.dividerLine} />
                </View>

                <View style={classes.socialMediaBtnContainer}>
                    <TouchableOpacity style={classes.fbBtn}>
                        <AntDesign name='facebook-square' size={22} color={'#fff'} />
                        <Text style={classes.socialMediaTxt}>Facebook</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={classes.twBtn}>
                        <AntDesign name='twitter' size={22} color={'#fff'} />
                        <Text style={classes.socialMediaTxt}>Twitter</Text>
                    </TouchableOpacity>
                </View>

                <View style={classes.signupMsg}>
                    <Text style={classes.msgTxt}>Don't have account?</Text>
                    <Text style={classes.signupTxt}>Sign Up</Text>
                </View>

            </ImageBackground>
        </ScrollView>
    )
}

export default Login

const classes = StyleSheet.create({
    signupMsg: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginTop: 30
    },
    imgRage: {
        opacity: 0.3
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: '#CFC5FC',
        paddingVertical: 25
    },
    loginTxt: {
        fontSize: 28,
        fontWeight: "700",
        color: "#ffffff"
    },
    inputContainer: {
        marginTop: 30,
        gap: 20
    },
    inputRage: {
        backgroundColor: "#fff",
        width: 200,
        paddingHorizontal: 10
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 15
    },
    lgnBtn: {
        marginTop: 30,
        backgroundColor: "#6B76D0",
        width: 200,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    },
    lgnBtnDisabled: {
        backgroundColor: "#70785E"
    },
    lgnTxt: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff"
    },
    fpTxt: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff",
        marginTop: 10
    },
    signupTxt: {
        fontSize: 12,
        fontWeight: "500",
        color: "blue",
    },
    msgTxt: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff"
    },
    txtConnectWith: {
        fontSize: 12,
        fontWeight: "500",
        color: "#fff"
    },
    socialMediaTxt: {
        fontSize: 12,
        fontWeight: "700",
        color: "#fff",
    },
    connectWithContainer: {
        gap: 5,
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20
    },
    dividerLine: {
        backgroundColor: "gold",
        height: 1,
        width: 100
    },
    socialMediaBtnContainer: {
        gap: 10,
        flexDirection: 'row',
        marginTop: 25
    },
    fbBtn: {
        gap: 10,
        flexDirection: 'row',
        paddingLeft: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#37A8F0',
        width: "40%",
        height: 40,
        borderRadius: 50
    },
    twBtn: {
        gap: 10,
        flexDirection: 'row',
        paddingLeft: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#5273B6',
        width: "40%",
        height: 40,
        borderRadius: 50
    }
})