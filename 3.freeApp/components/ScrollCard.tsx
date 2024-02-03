import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

export default function ScrollCard() {
    return (
        <View>
            <Text style={styles.title}>ScrollCard</Text>
            <ScrollView horizontal style={styles.container}>

                {[1, 2, , 3, 4, 5, 6].map((val, index) => (
                    <View key={index} style={[styles.card, styles.elevation]} >
                        <Text>Hi</Text>
                    </View>
                ))}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 24,
        color: "black",
        paddingHorizontal: 8,
        marginBottom: 8
    },
    container: {
        padding: 10,
        backgroundColor: "blue"
    },
    card: {
        margin: 6,
        width: 100,
        height: 100,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    elevation: {
        backgroundColor: "gold",
        elevation: 4
    }
})