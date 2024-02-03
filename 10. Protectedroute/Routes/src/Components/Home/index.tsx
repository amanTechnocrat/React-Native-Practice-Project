import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'
import HomeController from './HomeController'

const Home = () => {
    const { handleLogout } = HomeController()

    return (
        <View style={classes.container}>
            <TouchableOpacity onPress={handleLogout} style={classes.logoutBtn}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home

const classes = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logoutBtn: {
        height: 50,
        backgroundColor: "gold",
        width: "40%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50
    }
})
