"use client"

import ManualLocationScreen from "@/components/screens/manual-location-screen"
import { useRouter } from "expo-router"

export default function ManualLocationPage() {
  const router = useRouter()

  return 
  <ManualLocationScreen
  onBack={() => router.back()}
  onLocationSaved={() => router.replace("/(tabs)")}
/>

}
