"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAppStore } from "@/lib/store"
import {Colors} from "@/constants/Colors"

export default function BookingsScreen() {
    const { bookings } = useAppStore()

    const mockBookings = [
        {
            id: "1",
            serviceName: "Home Deep Cleaning",
            providerName: "John Smith",
            date: "Dec 5, 2024",
            time: "10:00 AM",
            status: "upcoming",
            price: 149,
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop",
        },
        {
            id: "2",
            serviceName: "AC Repair & Service",
            providerName: "Mike Johnson",
            date: "Nov 28, 2024",
            time: "02:00 PM",
            status: "completed",
            price: 89,
            image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&h=100&fit=crop",
        },
        {
            id: "3",
            serviceName: "Plumbing Repair",
            providerName: "David Wilson",
            date: "Nov 20, 2024",
            time: "11:00 AM",
            status: "completed",
            price: 75,
            image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=100&h=100&fit=crop",
        },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "upcoming":
                return Colors.primary
            case "completed":
                return Colors.success
            case "cancelled":
                return Colors.error
            default:
                return Colors.textSecondary
        }
    }

    const getStatusBg = (status: string) => {
        switch (status) {
            case "upcoming":
                return Colors.primaryLight
            case "completed":
                return "#E8F5E9"
            case "cancelled":
                return "#FFEBEE"
            default:
                return Colors.background
        }
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, styles.tabActive]}>
                    <Text style={[styles.tabText, styles.tabTextActive]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Upcoming</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Completed</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {mockBookings.map((booking) => (
                    <View key={booking.id} style={styles.bookingCard}>
                        <View style={styles.bookingHeader}>
                            <Image source={{ uri: booking.image }} style={styles.bookingImage} />
                            <View style={styles.bookingInfo}>
                                <Text style={styles.bookingService}>{booking.serviceName}</Text>
                                <Text style={styles.bookingProvider}>by {booking.providerName}</Text>
                                <View style={[styles.statusBadge, { backgroundColor: getStatusBg(booking.status) }]}>
                                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.bookingPrice}>${booking.price}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.bookingDetails}>
                            <View style={styles.detailItem}>
                                <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
                                <Text style={styles.detailText}>{booking.date}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
                                <Text style={styles.detailText}>{booking.time}</Text>
                            </View>
                        </View>

                        {booking.status === "upcoming" && (
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.rescheduleButton}>
                                    <Text style={styles.rescheduleText}>Reschedule</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {booking.status === "completed" && (
                            <TouchableOpacity style={styles.reviewButton}>
                                <Ionicons name="star-outline" size={16} color={Colors.primary} />
                                <Text style={styles.reviewText}>Leave a Review</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: Colors.white,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.text,
    },
    tabContainer: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        gap: 8,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Colors.background,
    },
    tabActive: {
        backgroundColor: Colors.primary,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.textSecondary,
    },
    tabTextActive: {
        color: Colors.white,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    bookingCard: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    bookingHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    bookingImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 12,
    },
    bookingInfo: {
        flex: 1,
    },
    bookingService: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text,
        marginBottom: 4,
    },
    bookingProvider: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginBottom: 8,
    },
    statusBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "500",
    },
    bookingPrice: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 12,
    },
    bookingDetails: {
        flexDirection: "row",
        gap: 20,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    detailText: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    actionButtons: {
        flexDirection: "row",
        gap: 12,
        marginTop: 12,
    },
    rescheduleButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: "center",
    },
    rescheduleText: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.primary,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.error,
        alignItems: "center",
    },
    cancelText: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.error,
    },
    reviewButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 12,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    reviewText: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.primary,
    },
})
