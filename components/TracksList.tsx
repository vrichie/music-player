import library from "@/assets/data/library.json"
import React from 'react'
import { FlatList } from 'react-native'
import TrackListItem from "./TrackListItem"

const TracksList = () => {
    return (
        <FlatList data={library as [any]} scrollEnabled={false} renderItem={({ item: track }) => <TrackListItem track={{ ...track, image: track.artwork }} />} />
    )
}

export default TracksList