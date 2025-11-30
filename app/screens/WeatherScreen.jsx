
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS } from '../utils/constants';
import { getWeatherByCity } from '../services/weatherService';
import { useLanguage } from '../context/LanguageContext';

/**
 * Weather Screen - Detailed weather information
 */
export default function WeatherScreen() {
    const { t } = useLanguage();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [cityName, setCityName] = useState('Delhi');

    useEffect(() => {
        loadWeather();
    }, []);

    const loadWeather = async () => {
        try {
            // Try to get user's location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let currentLocation = await Location.getCurrentPositionAsync({});
                let address = await Location.reverseGeocodeAsync({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                });
                const city = address[0]?.city || address[0]?.district || address[0]?.subregion || 'Delhi';
                setCityName(city);
                const data = await getWeatherByCity(city);
                setWeather(data);
            } else {
                // Use default city if permission denied
                const data = await getWeatherByCity('Delhi');
                setWeather(data);
            }
        } catch (error) {
            console.error('Failed to load weather:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadWeather();
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!weather) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>{t('unableToLoadWeather')}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {/* Main Weather Card */}
            <View style={styles.mainCard}>
                <Text style={styles.cityName}>{weather.name}</Text>
                <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
                <Text style={styles.description}>{weather.weather[0].description}</Text>
                <Text style={styles.feelsLike}>{t('feelsLike', { temp: Math.round(weather.main.feels_like) })}°C</Text>
            </View>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
                <View style={styles.detailCard}>
                    <Ionicons name="water" color={COLORS.primary} size={24} />
                    <Text style={styles.detailLabel}>{t('humidity')}</Text>
                    <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="flag" color={COLORS.primary} size={24} />
                    <Text style={styles.detailLabel}>{t('windSpeed')}</Text>
                    <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="cloud" color={COLORS.primary} size={24} />
                    <Text style={styles.detailLabel}>{t('pressure')}</Text>
                    <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
                </View>

                <View style={styles.detailCard}>
                    <Ionicons name="eye" color={COLORS.primary} size={24} />
                    <Text style={styles.detailLabel}>Visibility</Text>
                    <Text style={styles.detailValue}>{(weather.visibility / 1000).toFixed(1)} km</Text>
                </View>
            </View>

            {/* Sun Times */}
            <View style={styles.sunCard}>
                <View style={styles.sunItem}>
                    <Ionicons name="sunny" color={COLORS.warning} size={32} />
                    <Text style={styles.sunLabel}>Sunrise</Text>
                    <Text style={styles.sunTime}>{formatTime(weather.sys.sunrise)}</Text>
                </View>
                <View style={styles.sunItem}>
                    <Ionicons name="moon" color={COLORS.warning} size={32} />
                    <Text style={styles.sunLabel}>Sunset</Text>
                    <Text style={styles.sunTime}>{formatTime(weather.sys.sunset)}</Text>
                </View>
            </View>

            {/* Farming Advice */}
            <View style={styles.adviceCard}>
                <Text style={styles.adviceTitle}>🌾 Farming Advice</Text>
                <Text style={styles.adviceText}>
                    {weather.main.temp > 30
                        ? 'High temperature detected. Ensure adequate irrigation for crops.'
                        : weather.main.temp < 15
                            ? 'Cool weather. Good time for winter crops like wheat and mustard.'
                            : 'Moderate temperature. Suitable for most crop activities.'}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    errorText: {
        fontSize: 16,
        color: COLORS.error,
    },
    mainCard: {
        backgroundColor: COLORS.primary,
        margin: 16,
        padding: 32,
        borderRadius: 16,
        alignItems: 'center',
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    temperature: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 20,
        color: '#fff',
        textTransform: 'capitalize',
        marginTop: 8,
    },
    feelsLike: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        marginTop: 4,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        gap: 12,
    },
    detailCard: {
        width: '47%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailLabel: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 8,
    },
    detailValue: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 4,
    },
    sunCard: {
        flexDirection: 'row',
        margin: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sunItem: {
        alignItems: 'center',
    },
    sunLabel: {
        fontSize: 14,
        color: COLORS.textLight,
        marginTop: 8,
    },
    sunTime: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 4,
    },
    adviceCard: {
        margin: 16,
        padding: 16,
        backgroundColor: '#DBEAFE',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.secondary,
    },
    adviceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
    },
    adviceText: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 20,
    },
});
