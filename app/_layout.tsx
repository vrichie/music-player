import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useLogTrackPlayerState } from 'hooks/useLogTrackPlayerState';
import { useSetupTrackPlayer } from 'hooks/useSetupTrackPlayer';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const handleTrackPlayerLoaded = useCallback(() => {
		SplashScreen.hideAsync()
	}, [])
	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded
	})
	useLogTrackPlayerState();
	return (
		<GestureHandlerRootView>
			<SafeAreaProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
				<StatusBar style="light" />
			</SafeAreaProvider>
		</GestureHandlerRootView>

	)
}
