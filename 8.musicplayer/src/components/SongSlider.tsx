import Slider from '@react-native-community/slider';
import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { useProgress } from 'react-native-track-player'

const SongSlider = () => {
    const { position, duration } = useProgress()

    return (
        <View>
            <Slider
                value={position}
                minimumValue={0}
                maximumValue={duration}
                thumbTintColor='#FFF'
                maximumTrackTintColor='#FFF'
                style={classes.sliderContainer}
            />
            <View style={classes.timeContainer}>
                <Text style={classes.time}>
                    {new Date(position * 1000).toISOString().substring(15, 19)}
                </Text>
                <Text style={classes.time}>
                    {new Date((duration - position) * 1000).toISOString().substring(15, 19)}
                </Text>
            </View>
        </View>
    )
}

const classes = StyleSheet.create({
    sliderContainer: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row',
    },
    timeContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    time: {
        color: '#fff',
    },
});

export default SongSlider