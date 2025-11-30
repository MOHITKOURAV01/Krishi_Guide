import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS } from '../utils/constants';
import WeatherCard from '../components/WeatherCard';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function HomeScreen({ navigation }) {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [location, setLocation] = useState('');

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let currentLocation = await Location.getCurrentPositionAsync({});
                let address = await Location.reverseGeocodeAsync({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                });
                const city = address[0]?.city || address[0]?.district || address[0]?.subregion || '';
                const state = address[0]?.region || '';
                setLocation(`${city}${state ? ', ' + state : ''}`);
            }
        } catch (error) {
            console.error('Location error:', error);
        }
    };

    const quickActions = [
        { id: 1, title: t('cropRec'), icon: 'leaf', screen: 'Crops', color: '#10B981' },
        { id: 2, title: t('marketPrice'), icon: 'trending-up', screen: 'Market', color: '#F59E0B' },
        { id: 3, title: t('govtSchemes'), icon: 'book', screen: 'Schemes', color: '#3B82F6' },
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>{t('greeting')},</Text>
                    <Text style={styles.userName}>{user?.name || 'Farmer'}</Text>
                    {location ? (
                        <View style={styles.locationContainer}>
                            <Ionicons name="location" size={14} color={COLORS.textLight} />
                            <Text style={styles.locationText}>{location}</Text>
                        </View>
                    ) : null}
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image
                        source={user?.profileImage ? { uri: user.profileImage } : { uri: 'https://via.placeholder.com/50' }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>

            {/* Weather Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('weatherUpdate')}</Text>
                <WeatherCard />
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
                <View style={styles.actionsGrid}>
                    {quickActions.map((action) => (
                        <TouchableOpacity
                            key={action.id}
                            style={[styles.actionCard, { backgroundColor: action.color + '15' }]}
                            onPress={() => navigation.navigate(action.screen)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                                <Ionicons name={action.icon} size={24} color="#fff" />
                            </View>
                            <Text style={[styles.actionTitle, { color: action.color }]}>
                                {action.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Farming Tip */}
            <View style={styles.tipCard}>
                <Text style={styles.tipTitle}>🌱 Farming Tip of the Day</Text>
                <Text style={styles.tipText}>
                    Regular soil testing helps maintain optimal nutrient levels and improves crop yield.
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    greeting: {
        fontSize: 16,
        color: COLORS.textLight,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    locationText: {
        fontSize: 13,
        color: COLORS.textLight,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginHorizontal: 20,
        marginBottom: 15,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        gap: 12,
    },
    actionCard: {
        width: '30%',
        flexGrow: 1,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        gap: 8,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    tipCard: {
        margin: 20,
        padding: 20,
        backgroundColor: '#ECFDF5',
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.secondary,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginBottom: 8,
    },
    tipText: {
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 22,
    },
});
