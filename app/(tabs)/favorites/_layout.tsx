import { StackScreenWithSearchBar } from "constants/layout"
import { Stack } from "expo-router"
import { View } from "react-native"
import { defaultStyles } from "styles"

const FavoriteScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen name="index" options={{ ...StackScreenWithSearchBar, headerTitle: 'Favorite' }} />

            </Stack>
        </View>
    )
}

export default FavoriteScreenLayout