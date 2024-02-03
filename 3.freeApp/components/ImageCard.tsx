import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function ImageCard() {
    return (
        <View>
            <Text style={styles.title}>ImageCard</Text>
            <View style={styles.card}>
                <Image
                    source={{ uri: 'https://source.unsplash.com/random/?city,night' }}
                    style={styles.imageRage}
                />
                <View style={styles.cardBody}>
                    <Text>Lorem ipsum</Text>
                    <Text>Lorem ipsum</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quae inventore ullam eveniet tempore facere harum ipsum molestiae magnam. Magnam error accusamus nulla quam, aliquid quaerat quidem obcaecati hic assumenda.</Text>
                    <Text>Lorem ipsum</Text>
                </View>
            </View>
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
    imageRage: {
        height: 180
    },
    card: {},
    cardBody: {}
})