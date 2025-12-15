import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// IMPORT STORE
import { useAppStore } from '@/lib/store';

// --- Color Palette ---
const colors = {
    background: '#F0F4F8', // Very pale blue-gray
    cardBg: '#FFFFFF',     // Pure white
    primaryBlue: '#0066CC', // Vibrant action blue
    darkText: '#1A2A3A',   // Deep navy blue (for titles)
    mutedText: '#6E7A8A',  // Gray-blue (for placeholders)
    inputBorder: '#DCE6F1', // Light blue border
};

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const { setAuthenticated, setUser } = useAppStore();

    async function handleLogin() {
        // 🛠 Mock Validation
        if (!email.trim() || !password.trim()) {
            Alert.alert("Required", "Please enter your email and password.");
            return;
        }

        // ✅ Save Session
        setAuthenticated(true);
        setUser({
            name: "Test User",
            email: email,
            phone: ""
        });

        // 🔀 Redirect
        router.replace('/welcome');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Decorative top graphic (optional, adds character) */}
            <View style={styles.topDecorationCircle} />

            <View style={styles.contentContainer}>
                {/* Header Section */}
                <View style={styles.header}>
                    {/* A simple blue logo icon */}
                    <View style={styles.logoContainer}>
                        <Ionicons name="water" size={40} color={colors.primaryBlue} />
                    </View>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </View>

                {/* The White Card holding the form */}
                <View style={styles.card}>

                    {/* Email Input Field */}
                    <Text style={styles.inputLabel}>Email</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color={colors.primaryBlue} style={styles.inputIcon} />
                        <TextInput
                            placeholder="name@example.com"
                            placeholderTextColor={colors.mutedText}
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Password Input Field */}
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color={colors.primaryBlue} style={styles.inputIcon} />
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor={colors.mutedText}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry={!showPassword} // Toggle based on state
                        />
                        {/* Eye icon to toggle password visibility */}
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={22}
                                color={colors.mutedText}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot Password Link */}
                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Custom Primary Button */}
                    <TouchableOpacity style={styles.primaryButton} onPress={handleLogin} activeOpacity={0.8}>
                        <Text style={styles.primaryButtonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Section */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                        <Text style={styles.signupText}> Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    // Adds a subtle blue curve at the top left
    topDecorationCircle: {
        position: 'absolute',
        top: -100,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.inputBorder,
        opacity: 0.5,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoContainer: {
        backgroundColor: '#E1F0FF', // Very light blue circle for logo
        padding: 15,
        borderRadius: 50,
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.darkText,
    },
    subtitle: {
        fontSize: 16,
        color: colors.mutedText,
        marginTop: 5,
    },
    // The main white box
    card: {
        backgroundColor: colors.cardBg,
        borderRadius: 20,
        padding: 25,
        // Soft blue shadow for depth
        shadowColor: colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, // Android shadow
    },
    inputLabel: {
        color: colors.darkText,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 5,
    },
    // Container for icon + input
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC', // Slightly off-white inside input
        borderWidth: 1.5,
        borderColor: colors.inputBorder,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 55,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.darkText,
        height: '100%',
    },
    eyeIcon: {
        padding: 5,
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginBottom: 25,
        marginTop: -10,
    },
    forgotText: {
        color: colors.primaryBlue,
        fontWeight: '600',
    },
    // Custom Blue Button style
    primaryButton: {
        backgroundColor: colors.primaryBlue,
        borderRadius: 12,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        color: colors.mutedText,
        fontSize: 15,
    },
    signupText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        fontSize: 15,
    }
});