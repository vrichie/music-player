import { Entypo, Ionicons } from '@expo/vector-icons';
import { unKnownTrackImageUri } from 'constants/images';
import { colors, fontSize } from 'constants/tokens';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';
import { defaultStyles } from 'styles';
import { TrackShortcutsMenu } from './TrackShortcutsMenu';
import { StopPropagation } from './utils/StopPropagation';

export type TrackListItemProps = {
    track: Track,
    onTrackSelect: (track: Track) => void
}

const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) => {
    const isActiveTrack = useActiveTrack()?.url === track.url;
    const { playing } = useIsPlaying();
    return (
        <TouchableHighlight onPress={() => handleTrackSelect(track)}>
            <View style={styles.trackItemContainer}>
                <View>
                    <Image source={
                        track?.artwork || unKnownTrackImageUri}
                        style={{ ...styles.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }} />
                    {
                        isActiveTrack && (playing ?
                            <LoaderKit name="LineScaleParty" color={colors.icon} style={styles.trackPlayingIconIndicator} />
                            :
                            <Ionicons name='play' size={24} color={colors.icon} style={styles.trackPauseIconIndicator} />)

                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <View style={{ width: '100%' }}>
                        <Text numberOfLines={1} style={{ ...styles.trackTitleText, color: isActiveTrack ? colors.primary : colors.text }}>
                            {track?.title}
                        </Text>
                        {
                            track?.artist && (
                                <Text numberOfLines={1} style={styles.trackArtistText}>
                                    {track?.artist}
                                </Text>
                            )
                        }
                    </View>
                    <StopPropagation>
                        <TrackShortcutsMenu track={track}>
                            <Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
                        </TrackShortcutsMenu>
                    </StopPropagation>

                </View>
            </View>

        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    trackItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 20
    },
    trackPlayingIconIndicator: {
        position: 'absolute',
        top: 18,
        left: 16,
        width: 16,
        height: 16,
    },
    trackPauseIconIndicator: {
        position: 'absolute',
        top: 14,
        left: 14,
    },
    trackArtworkImage: {
        borderRadius: 8,
        width: 50,
        height: 50
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: fontSize.sm,
        maxWidth: '90%'

    },
    trackArtistText: {
        ...defaultStyles.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4,
    }
})
export default TrackListItem