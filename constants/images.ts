import unKnownArtistImage from '@/assets/images/unknown_artist.png'
import unKnownTrackImage from '@/assets/images/unknown_track.png'
import { Image } from 'react-native'

export const unKnownTrackImageUri = Image.resolveAssetSource(unKnownTrackImage).uri
export const unKnownArtistImageUri = Image.resolveAssetSource(unKnownArtistImage).uri
