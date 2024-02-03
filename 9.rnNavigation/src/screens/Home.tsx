import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { RootStackParamList } from '../App'

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    return (
        <View style={classes.container}>
            <Text style={classes.smallTxt}>Home Screen</Text>
            <Button title='Go to Details'
                // onPress={() => navigation.navigate("Details", { productID: "55" })}
                // onPress={() => navigation.navigate("Details")}
                onPress={() => navigation.push("Details", { productID: "55" })}
                // onPress={() => navigation.replace("Details", { productID: "55" })}

            />
        </View>
    )
}

export default Home

const classes = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallTxt: {
        color: '#000000'
    }
})