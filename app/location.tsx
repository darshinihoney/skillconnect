"use client"

import LocationScreen from "@/components/screens/location-screen"
import { useRouter } from "expo-router"

export default function LocationPage() {
  const router = useRouter()

  return (
    <LocationScreen
      onLocationSelected={() => router.replace("/(tabs)")}
      onManualEntry={() => router.push("/manual-location")}
      onSkip={() => router.replace("/(tabs)")}
    />
  )
}
