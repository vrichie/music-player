import { StackScreenWithSearchBar } from "constants/layout"
import { colors } from "constants/tokens"
import { Stack } from "expo-router"
import { View } from "react-native"
import { defaultStyles } from "styles"

const ArtistsScreenLayout = () => {
    return (
        <View style={defaultStyles.container}>
            <Stack>
                <Stack.Screen name="index" options={{ ...StackScreenWithSearchBar, headerTitle: 'Artists' }} />
                <Stack.Screen name="[name]" options={{
                    headerTitle: '', headerBackVisible: true, headerStyle: {
                        backgroundColor: colors.background,
                    }, headerTintColor: colors.primary
                }} />


            </Stack>
        </View>
    )
}

export default ArtistsScreenLayout