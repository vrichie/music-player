import { useHeaderHeight } from "@react-navigation/elements"
import PlaylistList from "components/PlaylistList"
import { screenPadding } from "constants/tokens"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Playlist } from "helpers/types"
import { SafeAreaView, StyleSheet } from "react-native"
import TrackPlayer, { Track } from "react-native-track-player"
import { usePlaylists, useTracks } from "store/library"
import { useQueue } from "store/queue"
import { defaultStyles } from "styles"



const AddToPlaylistModal = () => {
    const { playlists, addToPlaylist } = usePlaylists()
    const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>()
    const tracks = useTracks()
    const router = useRouter();
    const headerHeight = useHeaderHeight();
    const { activeQueueId } = useQueue();

    const track = tracks.find((curentTrack) => curentTrack.url === trackUrl)

    if (!track) {
        return null
    }

    const availablePlaylists = playlists.filter((playlist: Playlist) =>
        !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
    )
    const handlePlaylists = async (playlist: Playlist) => {
        addToPlaylist(track, playlist.name)

        router.dismiss()

        if (activeQueueId?.startsWith(playlist.name)) {
            await TrackPlayer.add(track)
        }
    }

    return (
        <SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
            <PlaylistList playlists={availablePlaylists} onPlaylistPress={handlePlaylists} />
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    modalContainer: {
        ...defaultStyles.container,
        paddingHorizontal: screenPadding.horizontal
    }
})
export default AddToPlaylistModal