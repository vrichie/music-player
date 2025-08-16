import { StackScreenWithSearchBar } from "constants/layout"
import { colors } from "constants/tokens"
import { Stack } from "expo-router"
import { View } from "react-native"
import { defaultStyles } from "styles"

const PlaylistsScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen name="index" options={{ ...StackScreenWithSearchBar, headerTitle: 'Playlists' }} />
                <Stack.Screen name="[name]" options={{ headerBackVisible: true, headerStyle: { backgroundColor: colors.background, }, headerTintColor: colors.primary, headerTitle: '' }} />

            </Stack>
        </View>
    )
}

export default PlaylistsScreenLayout