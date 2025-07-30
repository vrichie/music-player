import { useHeaderHeight } from "@react-navigation/elements"
import TracksList from "components/TracksList"
import { screenPadding } from "constants/tokens"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { defaultStyles } from "styles"

const SongsScreen = () => {
    const headerPadding = useHeaderHeight();
    return (
        <View style={{ ...defaultStyles.container, paddingTop: headerPadding }}>
            <ScrollView nestedScrollEnabled={true} style={{ flex: 1, paddingHorizontal: screenPadding.horizontal }} contentInsetAdjustmentBehavior="automatic">
                <TracksList />
            </ScrollView>
        </View>
    )
}

export default SongsScreen