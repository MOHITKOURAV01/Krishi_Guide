import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';
import { getMarketPrices } from '../services/marketService';
import { useLanguage } from '../context/LanguageContext';

export default function MarketPriceScreen() {
    const { t } = useLanguage();
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadPrices();
    }, []);

    const loadPrices = async () => {
        try {
            const data = await getMarketPrices();
            setPrices(data);
        } catch (error) {
            console.error('Failed to load prices:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPrices = prices.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.marketLocation && item.marketLocation.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderPriceItem = ({ item }) => (
        <View style={styles.priceCard}>
            <View style={styles.priceHeader}>
                <Text style={styles.commodityName}>{item.name}</Text>
                <Text style={styles.price}>₹{item.currentPrice}/{item.unit}</Text>
            </View>
            <View style={styles.priceDetails}>
                <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={16} color={COLORS.textLight} />
                    <Text style={styles.marketName}>{item.marketLocation}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="trending-up-outline" size={16} color={item.currentPrice >= item.previousPrice ? '#10B981' : '#EF4444'} />
                    <Text style={[styles.trend, { color: item.currentPrice >= item.previousPrice ? '#10B981' : '#EF4444' }]}>
                        {item.currentPrice >= item.previousPrice ? `+₹${item.currentPrice - item.previousPrice}` : `-₹${item.previousPrice - item.currentPrice}`}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('marketPrices')}</Text>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={t('searchMarket')}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <FlatList
                    data={filteredPrices}
                    renderItem={renderPriceItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.centerContainer}>
                            <Text style={styles.emptyText}>{t('noDataFound')}</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: 20,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },
    listContainer: {
        padding: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    priceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    commodityName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    priceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    marketName: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    trend: {
        fontSize: 14,
        fontWeight: '500',
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.textLight,
    },
});
