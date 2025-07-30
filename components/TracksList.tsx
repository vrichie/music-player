import library from "@/assets/data/library.json"
import React from 'react'
import { FlatList, View } from 'react-native'
import { utilsStyles } from "styles"
import TrackListItem from "./TrackListItem"

const itemDivider = () => (
    <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

const TracksList = () => {
    return (
        <FlatList data={library as [any]} ItemSeparatorComponent={itemDivider} scrollEnabled={false} renderItem={({ item: track }) => <TrackListItem track={{ ...track, image: track.artwork }} />} />
    )
}

export default TracksList