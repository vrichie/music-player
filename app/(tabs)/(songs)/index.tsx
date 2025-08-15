
import { useTracks } from "app/store/library"
import TracksList from "components/TracksList"
import { screenPadding } from "constants/tokens"
import { trackTitleFilter } from "helpers/filter"
import { generateTrackListId } from "helpers/miscellaneous"
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


    const tracks = useTracks()
    const filtered = useMemo(() => {
        if (!search) return tracks
        return tracks.filter(trackTitleFilter(search))
    }, [tracks, search])


    return (
        <ScrollView nestedScrollEnabled={true} style={{ paddingHorizontal: screenPadding.horizontal, ...defaultStyles.container }} contentInsetAdjustmentBehavior="automatic">
            <TracksList tracks={filtered} id={generateTrackListId('songs', search)} />
        </ScrollView>
    )
}

export default SongsScreen