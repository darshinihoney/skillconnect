"use client"

import OtpVerificationScreen from "@/components/screens/otp-verification-screen"
import { useRouter, useLocalSearchParams } from "expo-router"

export default function OtpPage() {
  const router = useRouter()
  const { phone } = useLocalSearchParams<{ phone: string }>()

  return (
    <OtpVerificationScreen
      phone={phone || ""}
      onVerify={() => router.push("/location")}
      onBack={() => router.back()}
      onResend={() => {}}
    />
  )
}
