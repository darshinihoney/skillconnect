"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors  from "@/constants/Colors"
import { useAppStore } from "@/lib/store"
import { categories, getFeaturedServices, getPopularServices } from "../../lib/services-data"

const { width } = Dimensions.get("window")

interface HomeScreenProps {
  onCategoryPress: (categoryId: string) => void
  onServicePress: (serviceId: string) => void
  onSearchPress: () => void
  onLocationPress: () => void
}

export function HomeScreen({ onCategoryPress, onServicePress, onSearchPress, onLocationPress }: HomeScreenProps) {
  const { currentLocation, getCartCount, addToCart } = useAppStore()
  const featuredServices = getFeaturedServices()
  const popularServices = getPopularServices()
  const cartCount = getCartCount()

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer} onPress={onLocationPress}>
          <Ionicons name="location" size={20} color={Colors.primary} />
          <View style={styles.locationText}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationAddress} numberOfLines={1}>
              {currentLocation?.address || "Set your location"}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={18} color={Colors.gray[500]} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={onSearchPress}>
        <Ionicons name="search" size={20} color={Colors.gray[400]} />
        <Text style={styles.searchPlaceholder}>Search for services...</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Get 20% Off</Text>
            <Text style={styles.bannerSubtitle}>On your first service booking</Text>
            <View style={styles.bannerCode}>
              <Text style={styles.bannerCodeText}>Use code: FIRST20</Text>
            </View>
          </View>
          <View style={styles.bannerImage}>
            <Ionicons name="gift" size={64} color={Colors.white} />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => onCategoryPress(category.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + "15" }]}>
                  <Ionicons name={category.icon as any} size={28} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Offers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Offers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {featuredServices.map((service) => (
              <TouchableOpacity key={service.id} style={styles.featuredCard} onPress={() => onServicePress(service.id)}>
                <Image source={{ uri: service.image }} style={styles.featuredImage} />
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(((service.originalPrice! - service.price) / service.originalPrice!) * 100)}% OFF
                  </Text>
                </View>
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredName} numberOfLines={1}>
                    {service.name}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>Rs. {service.price}</Text>
                    <Text style={styles.originalPrice}>Rs. {service.originalPrice}</Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text style={styles.rating}>{service.rating}</Text>
                    <Text style={styles.reviews}>({service.reviews})</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {popularServices.slice(0, 4).map((service) => (
            <TouchableOpacity key={service.id} style={styles.popularCard} onPress={() => onServicePress(service.id)}>
              <Image source={{ uri: service.image }} style={styles.popularImage} />
              <View style={styles.popularContent}>
                <Text style={styles.popularName}>{service.name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFB800" />
                  <Text style={styles.rating}>{service.rating}</Text>
                  <Text style={styles.reviews}>({service.reviews} reviews)</Text>
                </View>
                <View style={styles.durationRow}>
                  <Ionicons name="time-outline" size={14} color={Colors.gray[500]} />
                  <Text style={styles.duration}>{service.duration}</Text>
                </View>
                <Text style={styles.popularPrice}>Rs. {service.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={(e) => {
                  e.stopPropagation()
                  addToCart(service)
                }}
              >
                <Ionicons name="add" size={20} color={Colors.white} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray[900],
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray[50],
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
    marginBottom: 16,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: Colors.gray[400],
  },
  scrollContent: {
    paddingBottom: 20,
  },
  banner: {
    marginHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  bannerCode: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  bannerCodeText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
  },
  bannerImage: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.gray[900],
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },
  categoryItem: {
    width: (width - 24) / 4,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: Colors.gray[700],
    textAlign: "center",
  },
  horizontalScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  featuredCard: {
    width: 180,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginRight: 12,
  },
  featuredImage: {
    width: "100%",
    height: 120,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: Colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.white,
  },
  featuredContent: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray[900],
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.gray[400],
    textDecorationLine: "line-through",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.gray[800],
  },
  reviews: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  popularCard: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  popularImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  popularContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  popularName: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.gray[900],
    marginBottom: 4,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  duration: {
    fontSize: 12,
    color: Colors.gray[500],
  },
  popularPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 4,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
})
