import { FontAwesome } from "@expo/vector-icons"
import { MovingText } from "components/MovingText"
import { PlayerControls } from "components/PlayerControls"
import { PlayerProgressbar } from "components/PlayerProgessbar"
import { PlayerRepeatToggle } from "components/PlayerRepeatToggle"
import PlayerVolumeBar from "components/PlayerVolumeBar"
import { unKnownTrackImageUri } from "constants/images"
import { colors, fontSize, screenPadding } from "constants/tokens"
import { Image } from "expo-image"

import { LinearGradient } from 'expo-linear-gradient'
import { usePlayerBackground } from "hooks/usePlayerBackground"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useActiveTrack } from "react-native-track-player"
import { defaultStyles } from "styles"

const PlayerScreen = () => {
    const activeTrack = useActiveTrack()
    const { top, bottom } = useSafeAreaInsets();
    const { imageColors } = usePlayerBackground(activeTrack?.artwork ?? unKnownTrackImageUri);
    let isFav = false;
    const toggleFav = () => {
        isFav = !isFav
    }
    if (!activeTrack) {
        return <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
            <ActivityIndicator color={colors.icon} />
        </View>
    }
    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={imageColors ? [imageColors.background, imageColors.primary] : [colors.background, colors.background]}>
            <View style={styles.overlayContainer}>
                <DismissPlayerSymbol />

                <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
                    <View style={styles.artworkImageContainer}>
                        <Image source={activeTrack.artwork ?? unKnownTrackImageUri} priority={"high"} contentFit="cover" style={styles.artworkImage} />
                    </View>


                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 'auto' }}>
                            <View style={{ height: 60 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {/* title */}
                                    <View style={styles.trackTitleContainer}>
                                        <MovingText text={activeTrack?.title ?? ''} animationThreshold={30} style={styles.trackTitleText} />
                                    </View>

                                    {/* fav icon */}
                                    <FontAwesome name={isFav ? 'heart' : 'heart-o'} size={20} color={isFav ? colors.primary : colors.icon} style={{ marginHorizontal: 14 }} onPress={toggleFav} />

                                </View>
                                {activeTrack.artist && (
                                    <Text numberOfLines={1} style={[styles.trackArtistText, { marginTop: 6 }]}>
                                        {activeTrack.artist}
                                    </Text>
                                )}
                            </View>
                            <PlayerProgressbar style={{ marginTop: 32 }} />
                            <PlayerControls style={{ marginTop: 40 }} />

                        </View>
                        <PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />
                        <View style={styles.centeredRow}>
                            <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
                        </View>
                    </View>
                </View>



            </View></LinearGradient>
    )

}


const DismissPlayerSymbol = () => {
    const { top } = useSafeAreaInsets();

    return <View style={{ position: 'absolute', top: top + 8, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <View accessible={false} style={{ width: 50, height: 8, borderRadius: 8, backgroundColor: '#fff', opacity: 0.7 }}>

        </View>
    </View>
        ;
}

const styles = StyleSheet.create({
    overlayContainer: {
        ...defaultStyles.container,
        paddingHorizontal: screenPadding.horizontal,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    centeredRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: 22,
        fontWeight: '700',
    },
    artworkImageContainer: {
        shadowOffset: {
            width: 0,
            height: 8,

        },
        shadowOpacity: 0.44,
        shadowRadius: 11,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '45%',

    },
    artworkImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12,
    },
    trackArtistText: {
        ...defaultStyles.text,
        fontSize: fontSize.base,
        opacity: 0.8,
        maxWidth: '90%'
    }
})


export default PlayerScreen