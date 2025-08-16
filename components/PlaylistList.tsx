import { unKnownTrackImageUri } from 'constants/images'
import { Image } from 'expo-image'
import { playlistNameFilter } from 'helpers/filter'
import { Playlist } from 'helpers/types'
import { useNavigationSearch } from 'hooks/useNavigationSearch'
import React, { useMemo } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import { utilsStyles } from 'styles'
import { PlaylistListItem } from './PlaylistListItem'

type PlaylistsListProps = {
    playlists: Playlist[],
    onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
    <View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

export default function PlaylistList({
    playlists, onPlaylistPress: handlePlaylistPress, ...flatListProps
}: PlaylistsListProps) {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in Playlist'
        }
    })

    const filteredPlaylist = useMemo(() => {
        return playlists.filter(playlistNameFilter(search))
    }, [playlists, search])
    return (
        <FlatList
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            ListEmptyComponent={
                <View>
                    <Text style={utilsStyles.emptyContentText}>No playlist found.</Text>
                    <Image source={
                        unKnownTrackImageUri}
                        style={utilsStyles?.emptyContentImage} />
                </View>
            }
            data={filteredPlaylist}
            renderItem={({ item: playlist }) => (
                <PlaylistListItem
                    playlist={playlist}
                    onPress={() => handlePlaylistPress(playlist)}
                />
            )}
            {...flatListProps}
        />
    )
}