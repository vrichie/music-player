import { Ionicons } from '@expo/vector-icons'
import { colors } from 'constants/tokens'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { defaultStyles } from 'styles'

type QueueControlsProps = {
    tracks: Track[]

} & ViewProps

export default function QueueControls({ tracks, style, ...viewProps }: QueueControlsProps) {

    const handlePlay = async () => {
        await TrackPlayer.setQueue(tracks)
        await TrackPlayer.play()
    }
    const handleShuffle = async () => {
        const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)

        await TrackPlayer.setQueue(shuffledTracks)
        await TrackPlayer.play()
    }
    return (
        <View style={[{ flexDirection: 'row', columnGap: 16 }, style]} {...viewProps}>
            {/* play button */}
            <View style={{ flex: 1 }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handlePlay}>
                    <Text>
                        <Ionicons name='play' size={22} color={colors.primary} />

                    </Text>
                    <Text style={styles.buttonText}>
                        Play
                    </Text>

                </TouchableOpacity>
            </View>

            {/* shuffle button */}

            <View style={{ flex: 1 }}>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleShuffle}>
                    <Text>
                        <Ionicons name='shuffle-sharp' size={22} color={colors.primary} />
                    </Text>   <Text style={styles.buttonText}>
                        Shuffle
                    </Text>


                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: 'rgba(47,47,47,0.5)',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 8,
    },
    buttonText: {
        ...defaultStyles.text,
        color: colors.primary,
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center'
    }
})