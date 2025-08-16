
import { unKnownTrackImageUri } from 'constants/images'
import { Image } from 'expo-image'
import React, { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { useQueue } from 'store/queue'
import { utilsStyles } from "styles"
import QueueControls from './QueueControls'
import TrackListItem from "./TrackListItem"

export type TracksListProps = Partial<FlatListProps<Track> & {
    tracks: Track[]
    id: string,
    hideQueueControls?: boolean
}>

const itemDivider = () => (
    <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = ({ id, tracks = [], hideQueueControls = false, ...flatlistProps }: TracksListProps) => {
    const queueOffset = useRef(0)
    const { activeQueueId, setActiveQueueId } = useQueue()
    const handleTrackSelect = async (selectedTrack: Track) => {
        const trackIndex = tracks?.findIndex((track) => track.url === selectedTrack.url) || 0

        if (trackIndex === -1) return

        const isChangingQueue = id !== activeQueueId

        if (isChangingQueue) {
            const beforeTracks = tracks?.slice(0, trackIndex)
            const afterTracks = tracks?.slice(trackIndex + 1)
            await TrackPlayer.reset()
            await TrackPlayer.add(selectedTrack)
            if (afterTracks) {
                await TrackPlayer.add(afterTracks)

            }
            if (beforeTracks) {
                await TrackPlayer.add(beforeTracks)

            }

            await TrackPlayer.play()
            queueOffset.current = trackIndex
            setActiveQueueId(id || '')

        } else {

            const nextTrackIndex = trackIndex - queueOffset.current < 0
                ? tracks.length + trackIndex - queueOffset.current
                : trackIndex - queueOffset.current

            await TrackPlayer.skip(nextTrackIndex)
            await TrackPlayer.play()

        }

        // await TrackPlayer.load(track);
        // await TrackPlayer.play()
    }
    return (
        <FlatList data={tracks}
            ListHeaderComponent={
                !hideQueueControls ? (
                    <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />)
                    :
                    undefined
            }
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
            ItemSeparatorComponent={itemDivider} scrollEnabled={false} renderItem={({ item: track }) => <TrackListItem track={track} onTrackSelect={handleTrackSelect} />} {...flatlistProps} />
    )
}

export default TracksList