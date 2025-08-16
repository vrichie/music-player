import { AntDesign } from "@expo/vector-icons"
import { unKnownTrackImageUri } from "constants/images"
import { colors } from "constants/tokens"
import { Image } from "expo-image"
import { Playlist } from "helpers/types"
import { StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from "react-native"
import { defaultStyles } from "styles"


type PlaylistListItemProps = {
    playlist: Playlist
} & TouchableHighlightProps

export const PlaylistListItem = ({ playlist, ...props }: PlaylistListItemProps) => {


    return <TouchableHighlight activeOpacity={0.8} {...props}>
        <View style={styles.playlistItemContainer}>
            <View>
                <Image source={playlist.artworkPreview || unKnownTrackImageUri} priority={"normal"} style={styles.playlistArtworkImage} />

            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <Text numberOfLines={1} style={styles.playlistNameText}>{playlist.name}</Text>
                <AntDesign name="right" size={16} color={colors.icon} style={{ opacity: 0.5 }} />
            </View>

        </View>
    </TouchableHighlight>

}


const styles = StyleSheet.create({
    playlistItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 90,
    },
    playlistArtworkImage: {
        borderRadius: 8,
        width: 70,
        height: 70,
    },
    playlistNameText: {
        ...defaultStyles.text,
        fontSize: 17,
        fontWeight: '600',
        maxWidth: '80%'
    }
})