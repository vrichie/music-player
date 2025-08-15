import { unKnownArtistImageUri } from 'constants/images'
import { fontSize } from 'constants/tokens'
import { Image } from 'expo-image'
import { trackTitleFilter } from 'helpers/filter'
import { generateTrackListId } from 'helpers/miscellaneous'
import { Artist } from 'helpers/types'
import { useNavigationSearch } from 'hooks/useNavigationSearch'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from 'styles'
import QueueControls from './QueueControls'
import TracksList from './TracksList'

export default function ArtistTracksList({ artist }: { artist: Artist }) {

    const search = useNavigationSearch({
        searchBarOptions: {
            hideWhenScrolling: true,
            placeholder: 'Find in songs'
        }
    })

    const filteredArtistTracks = useMemo(() => {
        return artist.tracks.filter(trackTitleFilter(search))
    }, [artist, search])
    return (
        <TracksList
            id={generateTrackListId(artist.name, search)}

            hideQueueControls={true}
            ListHeaderComponentStyle={styles.artistHeaderContainer}
            ListHeaderComponent={
                <View >
                    <View style={styles.artworkImageContainer}>
                        <Image source={unKnownArtistImageUri} style={styles.artistImage} priority={"high"} />
                    </View>
                    <Text numberOfLines={1} style={styles.artistNameText}>{artist.name}</Text>
                    {search.length === 0 && (
                        <QueueControls tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />

                    )}
                </View>
            }
            tracks={filteredArtistTracks}
        />
    )
}

const styles = StyleSheet.create({
    artistHeaderContainer: {
        flex: 1,
        marginBottom: 32,
    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 200,
    },
    artistImage: {
        width: '60%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 128
    },
    artistNameText: {
        ...defaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: '800'
    }
})