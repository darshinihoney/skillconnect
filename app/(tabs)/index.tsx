import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function TabsIndex() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

      if (isLoggedIn === 'true') {
        // ✅ User is logged in, go to Welcome
        router.replace('/welcome');
      } else {
        // ❌ User is NOT logged in, go to Login
        router.replace('/auth/login');
      }
    } catch (e) {
      console.warn('Auth check failed', e);
      router.replace('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});