import { useCallback } from "react"
import TrackPlayer, { useActiveTrack } from "react-native-track-player"
import { useFavorites } from "store/library"




export const useTrackPlayerFavorite = () => {
    const activeTrack = useActiveTrack()

    const { favorites, toggleTrackFavorite } = useFavorites()

    const isFavorite = favorites.find((track) => track.url === activeTrack?.url)?.rating === 1

    const toggleFavorite = useCallback(async () => {
        const id = await TrackPlayer.getActiveTrackIndex()

        if (id == null) return

        await TrackPlayer.updateMetadataForTrack(id, {
            rating: isFavorite ? 0 : 1
        })

        if (activeTrack) {
            toggleTrackFavorite(activeTrack)
        }
    }, [activeTrack, isFavorite, toggleTrackFavorite])

    return { isFavorite, toggleFavorite }
}