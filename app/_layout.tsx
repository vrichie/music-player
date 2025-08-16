import { playbackService } from 'constants/playbackService';
import { colors } from 'constants/tokens';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLogTrackPlayerState } from 'hooks/useLogTrackPlayerState';
import { useSetupTrackPlayer } from 'hooks/useSetupTrackPlayer';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
SplashScreen.preventAutoHideAsync()
TrackPlayer.registerPlaybackService(() => playbackService)
export default function RootLayout() {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])
	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded
	})
	useLogTrackPlayerState();
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="player" options={{ headerShown: false, presentation: 'card', gestureEnabled: true, gestureDirection: 'vertical', animationDuration: 400 }} />
					<Stack.Screen name='(modals)/addToPlaylist' options={{
						presentation: 'modal',
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTitle: 'Add to playlist',
						headerTitleStyle: {
							color: colors.text
						}
					}}
					/>
				</Stack>
				<StatusBar style="light" />
			</GestureHandlerRootView>
		</SafeAreaProvider>

	)
}
