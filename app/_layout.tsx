import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(tabs)">
        {/* 🔐 Auth Screens */}
        <Stack.Screen
          name="auth/login"
          options={{ headerShown: false, title: 'Login' }}
        />
        <Stack.Screen
          name="auth/signup"
          options={{ headerShown: false, title: 'Sign Up' }}
        />

        {/* 🎉 Welcome Screen (Protected) */}
        <Stack.Screen
          name="welcome"
          options={{ headerShown: false, gestureEnabled: false }}
        />

        {/* 🏠 Main Entry Point */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}