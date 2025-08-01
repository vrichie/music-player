
import { unKnownTrackImageUri } from 'constants/images'
import { Image } from 'expo-image'
import React from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { utilsStyles } from "styles"
import TrackListItem from "./TrackListItem"

export type TracksListProps = Partial<FlatListProps<Track> & {
    tracks: Track[]
}>

const itemDivider = () => (
    <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ tracks }: TracksListProps) => {
    const handleTrackSelect = async (track: Track) => {
        await TrackPlayer.load(track);
        await TrackPlayer.play()
        console.log(TrackPlayer)
    }
    return (
        <FlatList data={tracks}
            ListFooterComponent={itemDivider}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
            ListEmptyComponent={
                <View>
                    <Text style={utilsStyles.emptyContentText}>No songs found.</Text>
                    <Image source={
                        unKnownTrackImageUri}
                        style={utilsStyles?.emptyContentImage} />
                </View>
            }
            ItemSeparatorComponent={itemDivider} scrollEnabled={false} renderItem={({ item: track }) => <TrackListItem track={track} onTrackSelect={handleTrackSelect} />} />
    )
}

export default TracksList