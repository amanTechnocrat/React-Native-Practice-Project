import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { RootStackParamList } from '../App'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const Details = ({ route }: DetailsProps) => {

    const { productID } = route.params
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View style={classes.container}>
            <Text style={classes.smallTxt}>Details: {productID}</Text>
            <Button title='Go to Home'
                // onPress={() => navigate.navigate('Home')}
                onPress={() => navigate.goBack()}
            />

            <Button title='Go to first Screen'
                // onPress={() => navigate.pop(2)}
                onPress={() => navigate.popToTop()}
            />
        </View>
    )
}

export default Details

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