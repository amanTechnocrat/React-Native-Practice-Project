import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Track } from 'react-native-track-player';


type SongInfoProps = PropsWithChildren<{
    track: Track | null | undefined
}>


const SongInfo = ({ track }: SongInfoProps) => {
    return (
        <View style={classes.container}>
            <View>
                <Text style={classes.name}>
                    {track?.title}
                </Text>
                <Text style={classes.artist}>
                    {track?.artist}  .  {track?.album}
                </Text>
            </View>

        </View>
    )
}

export default SongInfo

const classes = StyleSheet.create({
    container: {
        width: '90%',
        marginTop: 18,

        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
    },
    name: {
        marginBottom: 8,
        textAlign: 'center',

        color: '#fff',
        fontSize: 24,
        fontWeight: '800',
    },
    artist: {
        color: '#d9d9d9',
        textAlign: 'center',
    },
});