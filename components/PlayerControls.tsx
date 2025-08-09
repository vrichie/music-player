import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "constants/tokens";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

type PlayerControlsProps = {
    style?: ViewStyle
}

type PlayerButtonProps = {
    style?: ViewStyle,
    iconSize?: number
}


export const PlayPauseButton = ({ style, iconSize = 30 }: PlayerButtonProps) => {
    const { playing } = useIsPlaying();

    return <View style={[{ height: iconSize }, style]}>
        <TouchableOpacity activeOpacity={0.85} onPress={playing ? TrackPlayer.pause : TrackPlayer?.play}>
            <FontAwesome6 color={colors.text} name={playing ? 'pause' : 'play'} size={iconSize} />
        </TouchableOpacity>
    </View>
}


export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {


    return <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
        <FontAwesome6 color={colors.text} name={"forward"} size={iconSize} />
    </TouchableOpacity>
}
export const SkipToPrevButton = ({ iconSize = 30 }: PlayerButtonProps) => {


    return <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
        <FontAwesome6 color={colors.text} name={"backward"} size={iconSize} />
    </TouchableOpacity>
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.row}>

                <SkipToPrevButton />
                <PlayPauseButton />
                <SkipToNextButton />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})