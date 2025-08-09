import { unKnownTrackImageUri } from "constants/images";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useLastActiveTrack } from "hooks/useLastActiveTrack";
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { defaultStyles } from "styles";
import { MovingText } from "./MovingText";
import { PlayPauseButton, SkipToNextButton } from "./PlayerControls";


export const FloatingPlayer = ({ style }: ViewProps) => {
    const router = useRouter()
    const activeTrack = useActiveTrack();
    const lastActiveTrack = useLastActiveTrack()
    const displayedTrack = activeTrack ?? lastActiveTrack
    const handlePress = () => {
        router.navigate('/player')
    }
    if (!displayedTrack) return null


    return <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]} onPress={handlePress}>
        <>
            <Image source={
                displayedTrack?.artwork || unKnownTrackImageUri}
                style={styles.trackArtworkImage} />
            <View style={styles.trackTitleContainer}>

                <MovingText style={styles.trackTitle} text={displayedTrack.title as string} animationThreshold={25} />
            </View>
            <View style={styles.trackControlsContainer}>
                <PlayPauseButton iconSize={24} />
                <SkipToNextButton iconSize={22} />
            </View>
        </>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#252525',
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10,
        flex: 1

    },
    trackArtworkImage: {
        width: 40,
        height: 40,
        borderRadius: 8
    },
    trackTitle: {
        ...defaultStyles.text,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: 10
    },
    trackTitleContainer: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: 10,
    },
    trackControlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16
    }
})