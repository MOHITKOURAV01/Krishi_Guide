import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

/**
 * Generate weather alerts based on current conditions
 * @param {Object} weather - Weather data
 * @returns {Array} Array of alert objects
 */
const generateAlerts = (weather) => {
    const alerts = [];

    if (!weather) return alerts;

    // Temperature alerts
    if (weather.main.temp > 40) {
        alerts.push({
            type: 'extreme_heat',
            title: 'Extreme Heat Warning',
            message: 'Temperature above 40°C. Avoid outdoor farming activities during peak hours.',
            icon: 'warning',
            color: '#EF4444'
        });
    } else if (weather.main.temp < 5) {
        alerts.push({
            type: 'cold_wave',
            title: 'Cold Wave Alert',
            message: 'Temperature below 5°C. Protect crops from frost damage.',
            icon: 'snow',
            color: '#3B82F6'
        });
    }

    // Humidity alerts
    if (weather.main.humidity > 85) {
        alerts.push({
            type: 'high_humidity',
            title: 'High Humidity Alert',
            message: 'Humidity above 85%. Risk of fungal diseases in crops.',
            icon: 'water',
            color: '#F59E0B'
        });
    }

    // Wind alerts
    if (weather.wind.speed > 15) {
        alerts.push({
            type: 'strong_wind',
            title: 'Strong Wind Warning',
            message: `Wind speed ${weather.wind.speed} m/s. Secure loose items and protect crops.`,
            icon: 'flag',
            color: '#8B5CF6'
        });
    }

    // Visibility alerts
    if (weather.visibility < 1000) {
        alerts.push({
            type: 'low_visibility',
            title: 'Low Visibility Alert',
            message: 'Visibility below 1km. Exercise caution while operating machinery.',
            icon: 'eye-off',
            color: '#6B7280'
        });
    }

    // Weather condition alerts
    if (weather.weather && weather.weather[0] && weather.weather[0].main) {
        const weatherCondition = weather.weather[0].main.toLowerCase();
        if (weatherCondition.includes('rain') || weatherCondition.includes('storm')) {
            alerts.push({
                type: 'rain_alert',
                title: 'Rain/Storm Alert',
                message: 'Rainfall expected. Postpone spraying and harvesting activities.',
                icon: 'rainy',
                color: '#0EA5E9'
            });
        }
    }

    return alerts;
};

export default function WeatherAlerts({ weather }) {
    const alerts = generateAlerts(weather);

    if (alerts.length === 0) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>⚠️ Weather Alerts</Text>
            {alerts.map((alert, index) => (
                <View key={index} style={[styles.alertCard, { borderLeftColor: alert.color }]}>
                    <View style={styles.alertHeader}>
                        <Ionicons name={alert.icon} size={24} color={alert.color} />
                        <Text style={[styles.alertTitle, { color: alert.color }]}>
                            {alert.title}
                        </Text>
                    </View>
                    <Text style={styles.alertMessage}>{alert.message}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
    },
    alertCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 10,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    alertMessage: {
        fontSize: 14,
        color: COLORS.textLight,
        lineHeight: 20,
    },
});
