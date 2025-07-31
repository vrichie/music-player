import { useHeaderHeight } from "@react-navigation/elements"
import TracksList from "components/TracksList"
import { screenPadding } from "constants/tokens"
import { useNavigationSearch } from "hooks/useNavigationSearch"
import { ScrollView } from "react-native-gesture-handler"
import { defaultStyles } from "styles"

const SongsScreen = () => {
    const headerPadding = useHeaderHeight();
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in songs'
        }
    })
    return (
        // <View style={{  }}>
        <ScrollView nestedScrollEnabled={true} style={{ paddingHorizontal: screenPadding.horizontal, ...defaultStyles.container, paddingTop: headerPadding }} contentInsetAdjustmentBehavior="automatic">
            <TracksList />
        </ScrollView>
        // </View>
    )
}

export default SongsScreen