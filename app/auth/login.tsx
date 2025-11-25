import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        // 🛠 Mock Validation
        if (!email.trim() || !password.trim()) {
            Alert.alert("Error", "Please enter a mock email and password.");
            return;
        }

        // ✅ Save Session
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userEmail', email);

        // 🔀 Redirect to Welcome
        router.replace('/welcome');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>

            <TextInput
                placeholder="Enter Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <Button title="Sign In" onPress={handleLogin} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Button
                    title="Sign Up Here"
                    onPress={() => router.push('/auth/signup')}
                    color="#666"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Light background for visibility
    },
    title: {
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    input: {
        backgroundColor: '#fff', // White background for inputs
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#000',
    },
    buttonContainer: {
        marginTop: 10,
    },
    footer: {
        marginTop: 30,
        alignItems: 'center',
    },
    footerText: {
        marginBottom: 10,
        color: '#666',
    }
});