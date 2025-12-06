// import React, { useEffect, useState } from 'react';
// import { View, Button, StyleSheet, Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';

// export default function Welcome() {
//     const [userIdentifier, setUserIdentifier] = useState<string | null>(null);
//     const router = useRouter();

//     useEffect(() => {
//         (async () => {
//             // Retrieve data saved during login
//             const email = await AsyncStorage.getItem('userEmail');
//             setUserIdentifier(email || 'Guest');
//         })();
//     }, []);

//     async function signOut() {
//         // 🗑 Clear session
//         await AsyncStorage.removeItem('isLoggedIn');
//         await AsyncStorage.removeItem('userEmail');

//         // 🔀 Go back to Login
//         router.replace('/auth/login');
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Hello, {userIdentifier}!</Text>
//             <Text style={styles.subtitle}>You have successfully logged in.</Text>

//             <View style={styles.buttonContainer}>
//                 <Button title="Log Out" color="red" onPress={signOut} />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#666',
//         marginBottom: 40,
//     },
//     buttonContainer: {
//         width: '100%',
//         maxWidth: 200,
//     }
// });



"use client"

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import Colors from "@/constants/Colors"

export default function WelcomeScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="construct" size={50} color={Colors.primary} />
          </View>
          <Text style={styles.appName}>ServiceHub</Text>
          <Text style={styles.tagline}>Your trusted home services partner</Text>
        </View>

        <Image
          source={{ uri: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop" }}
          style={styles.heroImage}
        />

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Ionicons name="shield-checkmark" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Verified Professionals</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="time" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>On-time Service</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="wallet" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Best Prices</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/auth/phone")}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={() => router.replace("/(tabs)")}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 40,
  },
  features: {
    width: "100%",
    gap: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  bottom: {
    padding: 24,
    paddingBottom: 40,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
})
