import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player'
import { playListData } from '../constants'
import SongInfo from '../components/SongInfo'
import SongSlider from '../components/SongSlider'
import ControlCenter from '../components/ControlCenter'


const { width, height } = Dimensions.get('window')


const MusicPlayer = () => {
    const [track, setTrack] = useState<Track | null>()

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        switch (event.type) {
            case Event.PlaybackTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(event.nextTrack)
                setTrack(playingTrack)
                break;
        }
    })


    const renderArtWork = () => {
        return (
            <View style={classes.listArtWrapper}>
                <View style={classes.albumContainer}>
                    {track?.artwork && (
                        <Image
                            style={classes.albumArtImg}
                            source={{ uri: track?.artwork?.toString() }}
                        />
                    )}
                </View>

            </View>
        )
    }

    return (
        <View style={classes.container}>
            <FlatList
                horizontal
                data={playListData}
                renderItem={renderArtWork}
                keyExtractor={song => song.id.toString()}
            />
            <SongInfo track={track} />
            <SongSlider />
            <ControlCenter />
        </View>
    )
}

export default MusicPlayer

const classes = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
    },
    listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumContainer: {
        width: 300,
        height: 300,
    },
    albumArtImg: {
        height: '100%',
        borderRadius: 4,
    },
});