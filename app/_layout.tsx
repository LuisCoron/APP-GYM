import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { WorkoutProvider } from '@/context/WorkoutContext';
import { TimerProvider } from '@/context/TimerContext';
import { ProgressProvider } from '@/context/ProgressContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <WorkoutProvider>
      <TimerProvider>
        <ProgressProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              <Stack.Screen name="progress" options={{ presentation: 'modal', title: 'Progreso', headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </ProgressProvider>
      </TimerProvider>
    </WorkoutProvider>
  );
}
