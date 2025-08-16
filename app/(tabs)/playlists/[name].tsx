import PlaylistTracksList from "components/PlaylistTracksList";
import { screenPadding } from "constants/tokens";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Playlist } from "helpers/types";
import { ScrollView, View } from "react-native";
import { usePlaylists } from "store/library";
import { defaultStyles } from "styles";


const PlaylistScreen = () => {
    const { name: playlistName } = useLocalSearchParams<{ name: string }>()

    const { playlists } = usePlaylists()

    const playlist = playlists.find((playlist: Playlist) => playlist.name === playlistName)

    if (!playlist) {
        console.warn(`Playlist ${playlistName} was not found!`)

        return <Redirect href={'/(tabs)/playlists'} />
    }

    return (
        <View style={defaultStyles.container}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: screenPadding.horizontal }}>
                <PlaylistTracksList playlist={playlist} />
            </ScrollView>
        </View>)

}

export default PlaylistScreen;