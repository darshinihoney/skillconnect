import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Platform,
} from "react-native";
import { ArrowLeft, Search, Star, Clock, X } from "lucide-react-native";

// Assuming these are compatible with RN (arrays of objects)
import { services, categories } from "@/lib/services-data";
import { serviceImages } from "@/components/screens/home-screen";

interface SearchScreenProps {
    onBack: () => void;
    onServiceSelect: (serviceId: string) => void;
}

const recentSearches = ["AC Repair", "Cleaning", "Plumber", "Electrician"];

// specialized colors to match shadcn/ui look
const COLORS = {
    background: "#FFFFFF",
    primary: "#000000", // Adjust to your brand color
    muted: "#F4F4F5",
    border: "#E4E4E7",
    text: "#09090B",
    textMuted: "#71717A",
    yellow: "#FACC15",
};

export function SearchScreen({ onBack, onServiceSelect }: SearchScreenProps) {
    const [query, setQuery] = useState("");

    const filteredServices = useMemo(() => {
        if (!query.trim()) return [];

        const searchTerm = query.toLowerCase();
        return services.filter(
            (service) =>
                service.name.toLowerCase().includes(searchTerm) ||
                service.description.toLowerCase().includes(searchTerm) ||
                service.category.toLowerCase().includes(searchTerm)
        );
    }, [query]);

    // Helper to handle category background opacity
    const getCategoryBgColor = (hex: string) => {
        // Simple way to add opacity to hex in RN without complex conversion
        // For production, you might want a hexToRgba helper
        return hex;
    };

    const renderServiceItem = ({ item }: { item: typeof services[0] }) => (
        <TouchableOpacity
            style={styles.resultCard}
            onPress={() => onServiceSelect(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={
                        serviceImages[item.id]
                            ? { uri: serviceImages[item.id] } // It's a URL from your new list, so wrap in { uri: ... }
                            : typeof item.image === "string"
                                ? { uri: item.image }             // Fallback is a URL string
                                : item.image                      // Fallback is a local require (number)
                    }
                    style={styles.serviceImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.serviceName} numberOfLines={1}>
                    {item.name}
                </Text>

                <View style={styles.metaRow}>
                    <View style={styles.ratingBadge}>
                        <Star size={12} color={COLORS.yellow} fill={COLORS.yellow} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <View style={styles.durationBadge}>
                        <Clock size={12} color={COLORS.textMuted} />
                        <Text style={styles.durationText}>{item.duration}</Text>
                    </View>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{item.price}</Text>
                    {item.originalPrice && (
                        <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ArrowLeft size={24} color={COLORS.text} />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <Search size={20} color={COLORS.textMuted} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search services..."
                        placeholderTextColor={COLORS.textMuted}
                        value={query}
                        onChangeText={setQuery}
                        style={styles.input}
                        autoFocus={true}
                        returnKeyType="search"
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")} style={styles.clearButton}>
                            <X size={20} color={COLORS.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {!query.trim() ? (
                <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
                    {/* Recent Searches */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>RECENT SEARCHES</Text>
                        <View style={styles.tagsContainer}>
                            {recentSearches.map((search, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.tag}
                                    onPress={() => setQuery(search)}
                                >
                                    <Text style={styles.tagText}>{search}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Popular Categories */}
                    <View style={[styles.section, styles.borderTop]}>
                        <Text style={styles.sectionTitle}>POPULAR CATEGORIES</Text>
                        <View style={styles.categoriesList}>
                            {categories.slice(0, 5).map((category) => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={styles.categoryItem}
                                    onPress={() => setQuery(category.name)}
                                >
                                    <View
                                        style={[
                                            styles.categoryIcon,
                                            { backgroundColor: category.color, opacity: 0.15 }, // Background opacity approach
                                        ]}
                                    >
                                        {/* We render a duplicate absolute view for the bg color, 
                         or simpler: just use a View wrapper */}
                                    </View>
                                    {/* Icon needs to sit on top without opacity affecting it */}
                                    <View style={[styles.categoryIconOverlay]}>
                                        <Search size={20} color={category.color} />
                                    </View>

                                    <Text style={styles.categoryName}>{category.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            ) : (
                /* Search Results */
                <View style={styles.content}>
                    {filteredServices.length > 0 ? (
                        <View style={{ flex: 1 }}>
                            <Text style={styles.resultsCount}>
                                {filteredServices.length} results found
                            </Text>
                            <FlatList
                                data={filteredServices}
                                renderItem={renderServiceItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listContainer}
                                keyboardShouldPersistTaps="handled"
                            />
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <Search size={64} color={COLORS.textMuted} style={styles.emptyIcon} />
                            <Text style={styles.emptyTitle}>No results found</Text>
                            <Text style={styles.emptyText}>Try searching with different keywords</Text>
                        </View>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        height: 44,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
        height: "100%",
    },
    clearButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    section: {
        padding: 16,
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: COLORS.textMuted,
        marginBottom: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    tag: {
        backgroundColor: COLORS.muted,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    tagText: {
        fontSize: 14,
        color: COLORS.text,
    },
    categoriesList: {
        gap: 12,
    },
    categoryItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        // Hover effect is difficult in RN, handled by TouchableOpacity opacity
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        left: 12,
    },
    categoryIconOverlay: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
    },
    resultsCount: {
        fontSize: 14,
        color: COLORS.textMuted,
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    listContainer: {
        padding: 16,
        gap: 12,
    },
    resultCard: {
        flexDirection: "row",
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 12,
        gap: 16,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: COLORS.muted,
        overflow: "hidden",
    },
    serviceImage: {
        width: "100%",
        height: "100%",
    },
    cardContent: {
        flex: 1,
        justifyContent: "space-between",
    },
    serviceName: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    durationBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    durationText: {
        fontSize: 12,
        color: COLORS.textMuted,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.primary, // Using primary color (black) or brand color
    },
    originalPrice: {
        fontSize: 12,
        color: COLORS.textMuted,
        textDecorationLine: "line-through",
    },
    emptyState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        marginTop: 80,
    },
    emptyIcon: {
        marginBottom: 16,
        opacity: 0.5,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 8,
    },
    emptyText: {
        color: COLORS.textMuted,
        textAlign: "center",
    },
});