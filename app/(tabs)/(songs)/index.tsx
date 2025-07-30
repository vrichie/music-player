import TracksList from "components/TracksList"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { defaultStyles } from "styles"

const SongsScreen = () => {
    return (
        <View style={defaultStyles.container}>
            <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
                <TracksList />
            </ScrollView>
        </View>
    )
}

export default SongsScreen