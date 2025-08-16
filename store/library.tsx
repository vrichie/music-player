import library from '@/assets/data/library.json';
import { unKnownArtistImageUri } from 'constants/images';
import { Artist, Playlist, TrackWithPlaylist } from "helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";

interface LibraryState {
    tracks: TrackWithPlaylist[]
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playlistName: string) => void
    getFavorites: () => TrackWithPlaylist[]
    getArtists: () => Artist[]
    getPlaylists: () => any
}

type ArtistWithArtwork = Artist & { artworkPreview: string };

export const useLibraryStore = create<LibraryState>()((set, get) => ({
    tracks: library,
    toggleTrackFavorite: (track) => set((state) => ({
        tracks: state.tracks.map((currentTrack) => {
            if (currentTrack.url === track.url) {
                return {
                    ...currentTrack,
                    rating: currentTrack.rating === 1 ? 0 : 1
                }
            }
            return currentTrack
        })
    })),
    addToPlaylist: (track, playlistName) => set((state) => ({
        tracks: state.tracks.map((currentTrack) => {
            if (currentTrack.url === track.url) {
                return {
                    ...currentTrack,
                    playlist: [...(currentTrack.playlist ?? []), playlistName]
                }
            }
            return currentTrack
        })
    })),
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

    }, []),

    getPlaylists: () => get().tracks.reduce((acc: ArtistWithArtwork[], track: Track) => {
        track.playlist?.forEach((playlistName: string) => {
            const existingPlaylist = acc.find((playlist: Artist) => playlist.name === playlistName)
            if (existingPlaylist) {
                existingPlaylist.tracks.push(track)
            } else {
                acc.push({
                    name: playlistName,
                    tracks: [track],
                    artworkPreview: track.artwork ?? unKnownArtistImageUri,
                })
            }
        })
        return acc
    }, [] as Playlist[])
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

export const usePlaylists = () => {
    const getPlaylists = useLibraryStore((state) => state.getPlaylists);
    const playlists = getPlaylists();
    const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)
    return { playlists, addToPlaylist };
}