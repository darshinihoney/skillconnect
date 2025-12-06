"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import  Colors  from "@/constants/Colors"
import { Button } from "@/components/ui/Button"
import { useAppStore } from "@/lib/store"

interface LocationScreenProps {
  onLocationSelected: () => void
  onManualEntry: () => void
  onSkip?: () => void
}

export default function LocationScreen({ onLocationSelected, onManualEntry }: LocationScreenProps) {
  const [isDetecting, setIsDetecting] = useState(false)
  const [pulseAnim] = useState(new Animated.Value(1))
  const { savedAddresses, setCurrentLocation } = useAppStore()

  useEffect(() => {
    if (isDetecting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]),
      ).start()
    }
  }, [isDetecting, pulseAnim])

  const handleDetectLocation = () => {
    setIsDetecting(true)
    // Simulate location detection
    setTimeout(() => {
      setIsDetecting(false)
      setCurrentLocation({
        address: "HSR Layout, Sector 2, Bangalore, Karnataka 560102",
        coordinates: { lat: 12.9141, lng: 77.6411 },
      })
      onLocationSelected()
    }, 2000)
  }

  const handleSavedAddressSelect = (address: string) => {
    setCurrentLocation({ address })
    onLocationSelected()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Set your location</Text>
          <Text style={styles.headerSubtitle}>To find services available in your area</Text>
        </View>

        {/* Location Detection */}
        <TouchableOpacity
          style={styles.detectContainer}
          onPress={handleDetectLocation}
          disabled={isDetecting}
          activeOpacity={0.8}
        >
          <View style={styles.detectIconWrapper}>
            <Animated.View
              style={[styles.pulseRing, { transform: [{ scale: pulseAnim }], opacity: isDetecting ? 0.3 : 0 }]}
            />
            <View style={styles.detectIcon}>
              <Ionicons name="locate" size={28} color={Colors.primary} />
            </View>
          </View>
          <View style={styles.detectTextContainer}>
            <Text style={styles.detectTitle}>
              {isDetecting ? "Detecting your location..." : "Use current location"}
            </Text>
            <Text style={styles.detectSubtitle}>Using GPS to find your location</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Manual Entry Button */}
        <Button
          title="Enter location manually"
          onPress={onManualEntry}
          variant="outline"
          fullWidth
          style={styles.manualButton}
        />

        {/* Saved Addresses */}
        {savedAddresses.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={styles.savedTitle}>Saved Addresses</Text>
            {savedAddresses.map((addr) => (
              <TouchableOpacity
                key={addr.id}
                style={styles.savedAddress}
                onPress={() => handleSavedAddressSelect(addr.fullAddress)}
              >
                <View style={styles.savedAddressIcon}>
                  <Ionicons
                    name={addr.type === "home" ? "home" : addr.type === "work" ? "briefcase" : "location"}
                    size={20}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.savedAddressContent}>
                  <Text style={styles.savedAddressType}>{addr.type.charAt(0).toUpperCase() + addr.type.slice(1)}</Text>
                  <Text style={styles.savedAddressText} numberOfLines={1}>
                    {addr.fullAddress}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray[400]} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Recent Searches */}
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Recent Locations</Text>
          {["Koramangala, Bangalore", "Indiranagar, Bangalore"].map((location, index) => (
            <TouchableOpacity key={index} style={styles.recentItem} onPress={() => handleSavedAddressSelect(location)}>
              <Ionicons name="time-outline" size={20} color={Colors.gray[400]} />
              <Text style={styles.recentText}>{location}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.gray[900],
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.gray[500],
  },
  detectContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray[50],
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  detectIconWrapper: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
  },
  detectIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detectTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  detectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray[900],
    marginBottom: 2,
  },
  detectSubtitle: {
    fontSize: 14,
    color: Colors.gray[500],
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gray[200],
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: Colors.gray[400],
    fontWeight: "500",
  },
  manualButton: {
    marginBottom: 32,
  },
  savedSection: {
    marginBottom: 24,
  },
  savedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray[900],
    marginBottom: 12,
  },
  savedAddress: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  savedAddressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[50],
    alignItems: "center",
    justifyContent: "center",
  },
  savedAddressContent: {
    flex: 1,
    marginLeft: 12,
  },
  savedAddressType: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.gray[900],
  },
  savedAddressText: {
    fontSize: 13,
    color: Colors.gray[500],
    marginTop: 2,
  },
  recentSection: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray[900],
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  recentText: {
    fontSize: 15,
    color: Colors.gray[600],
  },
})
