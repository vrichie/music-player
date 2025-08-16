
import TracksList from "components/TracksList"
import { screenPadding } from "constants/tokens"
import { trackTitleFilter } from 'helpers/filter'
import { generateTrackListId } from 'helpers/miscellaneous'
import { useNavigationSearch } from "hooks/useNavigationSearch"
import { useMemo } from "react"
import { ScrollView, View } from "react-native"
import { useFavorites } from 'store/library'
import { defaultStyles } from "styles"

const FavoritesScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: "Find in songs"
        }
    })
    const favoriteTracks = useFavorites().favorites
    const filtered = useMemo(() => {
        if (!search) return favoriteTracks
        return favoriteTracks.filter(trackTitleFilter(search))
    }, [favoriteTracks, search])
    return (
        <View style={defaultStyles.container}>
            <ScrollView style={{ paddingHorizontal: screenPadding.horizontal }} contentInsetAdjustmentBehavior="automatic">
                <TracksList tracks={filtered} id={generateTrackListId('favorites', search)} />
            </ScrollView>
        </View>
    )
}

export default FavoritesScreen