import PlaylistList from "components/PlaylistList"
import { screenPadding } from "constants/tokens"
import { useRouter } from "expo-router"
import { playlistNameFilter } from "helpers/filter"
import { Playlist } from "helpers/types"
import { useNavigationSearch } from "hooks/useNavigationSearch"
import { useMemo } from "react"
import { ScrollView, View } from "react-native"
import { usePlaylists } from "store/library"
import { defaultStyles } from "styles"

const PlaylistsScreen = () => {
    const router = useRouter()
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in playlists'
        }
    })
    const { playlists } = usePlaylists();

    const filteredPlaylist = useMemo(() => {
        return playlists.filter(playlistNameFilter(search))
    }, [search, playlists])
    const handlePlaylistPress = (playlist: Playlist) => {
        router.push(`/(tabs)/playlists/${playlist.name}`)
    }
    return (
        <View style={defaultStyles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: screenPadding.horizontal }} >
                <PlaylistList scrollEnabled={false} playlists={filteredPlaylist} onPlaylistPress={handlePlaylistPress} />
            </ScrollView>
        </View>
    )
}

export default PlaylistsScreen