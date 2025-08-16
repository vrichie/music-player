import { unKnownTrackImageUri } from 'constants/images'
import { fontSize } from 'constants/tokens'
import { Image } from 'expo-image'
import { trackTitleFilter } from 'helpers/filter'
import { generateTrackListId } from 'helpers/miscellaneous'
import { Playlist } from 'helpers/types'
import { useNavigationSearch } from 'hooks/useNavigationSearch'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from 'styles'
import QueueControls from './QueueControls'
import TracksList from './TracksList'

export default function PlaylistTracksList({ playlist }: { playlist: Playlist }) {
    const search = useNavigationSearch({
        searchBarOptions: {
            hideWhenScrolling: true,
            placeholder: 'Find in playlist'
        }
    })
    const filteredPlaylistTracks = useMemo(() => {
        return playlist.tracks.filter(trackTitleFilter(search))
    }, [search, playlist.tracks])
    return (
        <TracksList
            id={generateTrackListId(playlist.name, search)}
            scrollEnabled={false}
            hideQueueControls={true}
            ListHeaderComponentStyle={styles.playlistHeaderContainer}
            ListHeaderComponent={
                <View>
                    <View style={styles.artworkImageContainer}>
                        <Image source={playlist.artworkPreview ?? unKnownTrackImageUri} style={styles.artworkImage} />
                    </View>
                    <Text numberOfLines={1} style={styles.playlistNameText}>{playlist.name}</Text>
                    {
                        search.length === 0 && (
                            <QueueControls tracks={playlist.tracks} style={{ paddingTop: 24 }} />
                        )
                    }
                </View>
            }
            tracks={filteredPlaylistTracks} />
    )
}

const styles = StyleSheet.create({
    playlistHeaderContainer: {
        flex: 1,
        marginBottom: 32,

    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300
    },
    artworkImage: {
        width: '85%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12
    },
    playlistNameText: {
        ...defaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: '800'
    }
})