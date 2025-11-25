import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignup() {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Error", "Please fill in all mock details.");
            return;
        }

        // ℹ️ In a real app, you would send this to a backend here.
        // For now, we simulate success.

        Alert.alert(
            "Success",
            "Account created successfully! Please log in.",
            [
                {
                    text: "Go to Login",
                    onPress: () => router.replace('/auth/login') // 🔀 Redirects to Login
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Full Name"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Email Address"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <Button title="Sign Up" onPress={handleSignup} />
            </View>

            <View style={styles.footer}>
                <Button
                    title="Back to Login"
                    onPress={() => router.back()}
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
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
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
        marginTop: 20,
        alignItems: 'center',
    }
});