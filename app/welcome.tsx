import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Welcome() {
    const [userIdentifier, setUserIdentifier] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            // Retrieve data saved during login
            const email = await AsyncStorage.getItem('userEmail');
            setUserIdentifier(email || 'Guest');
        })();
    }, []);

    async function signOut() {
        // 🗑 Clear session
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('userEmail');

        // 🔀 Go back to Login
        router.replace('/auth/login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello, {userIdentifier}!</Text>
            <Text style={styles.subtitle}>You have successfully logged in.</Text>

            <View style={styles.buttonContainer}>
                <Button title="Log Out" color="red" onPress={signOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 200,
    }
});