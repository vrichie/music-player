import { StackScreenWithSearchBar } from "constants/layout"
import { Stack } from "expo-router"
import { View } from "react-native"
import { defaultStyles } from "styles"

const PlaylistsScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen name="index" options={{ ...StackScreenWithSearchBar, headerTitle: 'Playlists' }} />

            </Stack>
        </View>
    )
}

export default PlaylistsScreenLayout