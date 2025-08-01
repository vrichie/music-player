
import library from "@/assets/data/library.json"
import TracksList from "components/TracksList"
import { screenPadding } from "constants/tokens"
import { trackTitleFilter } from "helpers/filter"
import { useNavigationSearch } from "hooks/useNavigationSearch"
import { useMemo } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { defaultStyles } from "styles"

const SongsScreen = () => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in songs'
        }
    })

    const filteredTracks = useMemo(() => {
        if (!search) return library
        return library.filter(trackTitleFilter(search))
    }, [search])
    console.log(search)
    return (
        <ScrollView nestedScrollEnabled={true} style={{ paddingHorizontal: screenPadding.horizontal, ...defaultStyles.container }} contentInsetAdjustmentBehavior="automatic">
            <TracksList tracks={filteredTracks} />
        </ScrollView>
    )
}

export default SongsScreen