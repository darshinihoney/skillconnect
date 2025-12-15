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
    StatusBar,
    ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- Color Palette (Must match Login) ---
const colors = {
    background: '#F0F4F8',
    cardBg: '#FFFFFF',
    primaryBlue: '#0066CC',
    darkText: '#1A2A3A',
    mutedText: '#6E7A8A',
    inputBorder: '#DCE6F1',
    lightBlue: '#E1F0FF', // Used for role selection/accents
};

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client'); // 🆕 Added State: 'client' or 'worker'
    const [showPassword, setShowPassword] = useState(false);

    async function handleSignup() {
        // 🛠 Mock Validation
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert("Missing Info", "Please fill in all details.");
            return;
        }

        // ℹ️ Simulated Success
        Alert.alert(
            "Account Created",
            `You signed up as a ${role.toUpperCase()}. Please log in.`,
            [
                {
                    text: "Go to Login",
                    onPress: () => router.replace('/auth/login')
                }
            ]
        );
    }
    interface RoleButtonProps {
        selectedRole: string;
        roleName: string;
        // This type ensures the icon name is a valid string from Ionicons
        icon: keyof typeof Ionicons.glyphMap;
        onPress: () => void;
    }

    // Helper component for the Role Selector button style
    const RoleButton: React.FC<RoleButtonProps>= ({ selectedRole, roleName, icon, onPress }) => (
        <TouchableOpacity
            style={[
                styles.roleButton,
                selectedRole === roleName && styles.roleButtonSelected
            ]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Ionicons usage remains the same */}
            <Ionicons
                name={icon}
                size={22}
                color={selectedRole === roleName ? colors.cardBg : colors.primaryBlue}
            />
            <Text
                style={[
                    styles.roleButtonText,
                    selectedRole === roleName && styles.roleButtonTextSelected
                ]}
            >
                {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
            </Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            <View style={styles.contentContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header Section */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="person-add-outline" size={40} color={colors.primaryBlue} />
                        </View>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Join us and find your fit</Text>
                    </View>

                    {/* The White Card holding the form */}
                    <View style={styles.card}>

                        {/* 🆕 ROLE SELECTION 🆕 */}
                        <Text style={styles.inputLabel}>I am signing up as a...</Text>
                        <View style={styles.roleSelectorContainer}>
                            <RoleButton
                                selectedRole={role}
                                roleName="client"
                                icon="briefcase-outline"
                                onPress={() => setRole('client')}
                            />
                            <RoleButton
                                selectedRole={role}
                                roleName="worker"
                                icon="hammer-outline"
                                onPress={() => setRole('worker')}
                            />
                        </View>

                        {/* Name Input Field */}
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color={colors.primaryBlue} style={styles.inputIcon} />
                            <TextInput
                                placeholder="John Doe"
                                placeholderTextColor={colors.mutedText}
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                        </View>

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
                                placeholder="Create a password"
                                placeholderTextColor={colors.mutedText}
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={22}
                                    color={colors.mutedText}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Custom Primary Button */}
                        <TouchableOpacity style={styles.primaryButton} onPress={handleSignup} activeOpacity={0.8}>
                            <Text style={styles.primaryButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer Section */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.loginText}> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 25,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoContainer: {
        backgroundColor: colors.lightBlue,
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
    card: {
        backgroundColor: colors.cardBg,
        borderRadius: 20,
        padding: 25,
        shadowColor: colors.primaryBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    inputLabel: {
        color: colors.darkText,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
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

    // --- Role Selector Styles ---
    roleSelectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        gap: 10,
    },
    roleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: colors.inputBorder,
        backgroundColor: colors.cardBg,
    },
    roleButtonSelected: {
        backgroundColor: colors.primaryBlue,
        borderColor: colors.primaryBlue,
    },
    roleButtonText: {
        marginLeft: 8,
        color: colors.primaryBlue,
        fontWeight: '600',
        fontSize: 15,
    },
    roleButtonTextSelected: {
        color: colors.cardBg,
    },
    // --- End Role Selector Styles ---

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
    loginText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        fontSize: 15,
    }
});