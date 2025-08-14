
import library from '@/assets/data/library.json'
import TracksList from "components/TracksList"
import { screenPadding } from "constants/tokens"
import { useNavigationSearch } from "hooks/useNavigationSearch"
import { useMemo } from "react"
import { ScrollView, View } from "react-native"
import { defaultStyles } from "styles"

const FavoritesScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: "Find in songs"
        }
    })
    const favoriteTracks = useMemo(() => {
        return library.filter(track => track.rating === 1)
    }, [])
    return (
        <View style={defaultStyles.container}>
            <ScrollView style={{ paddingHorizontal: screenPadding.horizontal }} contentInsetAdjustmentBehavior="automatic">
                <TracksList tracks={favoriteTracks} />
            </ScrollView>
        </View>
    )
}

export default FavoritesScreen