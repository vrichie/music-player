import library from '@/assets/data/library.json';
import { Artist, TrackWithPlaylist } from "helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";

interface LibraryState {
    tracks: TrackWithPlaylist[]
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playlistName: string) => void
    getFavorites: () => TrackWithPlaylist[]
    getArtists: () => Artist[]
}



export const useLibraryStore = create<LibraryState>()((set, get) => ({
    tracks: library,
    toggleTrackFavorite: () => { },
    addToPlaylist: () => { },
    getFavorites: () => get().tracks.filter((track) => track.rating === 1),
    getArtists: () => get().tracks.reduce((acc: Artist[], track) => {
        const existingArtist = acc.find((artist) => artist.name === track.artist)
        if (existingArtist) {
            existingArtist.tracks.push(track)
        } else {
            acc.push({
                name: track.artist ?? 'unknown',
                tracks: [track]
            })
        }
        return acc

    }, [])
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
    const getFavorites = useLibraryStore((state) => state.getFavorites)
    const toggleTrackFavorite = useLibraryStore(state => state.toggleTrackFavorite)

    return { favorites: getFavorites(), toggleTrackFavorite }
}


export const useArtists = () => {
    const getArtists = useLibraryStore((state) => state.getArtists);
    return getArtists();
}