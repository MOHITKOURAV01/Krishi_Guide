import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS } from '../utils/constants';
import { useLanguage } from '../context/LanguageContext';

export default function WeatherCard() {
    const { t } = useLanguage();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        getLocationAndWeather();
    }, []);

    const getLocationAndWeather = async () => {
        try {
            // Request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // Use default location if permission denied
                setWeather({
                    temp: 28,
                    condition: 'Sunny',
                    location: 'Indore, MP',
                    humidity: 65,
                    wind: 12
                });
                setLoading(false);
                return;
            }

            // Get current location
            let currentLocation = await Location.getCurrentPositionAsync({});

            // Reverse geocode to get city name
            let address = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            });

            const cityName = address[0]?.city || address[0]?.district || address[0]?.subregion || 'Unknown';
            const stateName = address[0]?.region || '';

            // Mock weather data with actual location
            setWeather({
                temp: 28,
                condition: 'Sunny',
                location: `${cityName}${stateName ? ', ' + stateName : ''}`,
                humidity: 65,
                wind: 12
            });
            setLoading(false);
        } catch (error) {
            console.error('Location error:', error);
            // Fallback to default
            setWeather({
                temp: 28,
                condition: 'Sunny',
                location: 'Indore, MP',
                humidity: 65,
                wind: 12
            });
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.card, styles.loadingCard]}>
                <ActivityIndicator color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.location}>
                        <Ionicons name="location" size={14} color={COLORS.textLight} /> {weather.location}
                    </Text>
                    <Text style={styles.date}>{new Date().toDateString()}</Text>
                </View>
                <Ionicons name="sunny" size={40} color="#FDB813" />
            </View>

            <View style={styles.body}>
                <Text style={styles.temp}>{weather.temp}°C</Text>
                <Text style={styles.condition}>{weather.condition}</Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.stat}>
                    <Ionicons name="water-outline" size={16} color={COLORS.textLight} />
                    <Text style={styles.statText}>{weather.humidity}% {t('humidity') || 'Humidity'}</Text>
                </View>
                <View style={styles.stat}>
                    <Ionicons name="speedometer-outline" size={16} color={COLORS.textLight} />
                    <Text style={styles.statText}>{weather.wind} km/h {t('wind') || 'Wind'}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    loadingCard: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    location: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    body: {
        marginBottom: 16,
    },
    temp: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    condition: {
        fontSize: 18,
        color: COLORS.textLight,
        marginTop: -4,
    },
    footer: {
        flexDirection: 'row',
        gap: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 16,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 14,
        color: COLORS.textLight,
    },
});
