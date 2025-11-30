import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

/**
 * Get farming recommendation based on weather forecast
 */
const getFarmingRecommendation = (forecast) => {
    const recommendations = [];

    forecast.forEach((day, index) => {
        if (index === 0) return; // Skip today

        const dayName = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        // Rain recommendations
        if (day.rain > 5) {
            recommendations.push({
                day: dayName,
                activity: '🌧️ Heavy Rain Expected',
                advice: 'Avoid spraying pesticides and fertilizers. Postpone harvesting.',
                priority: 'high'
            });
        } else if (day.rain > 0) {
            recommendations.push({
                day: dayName,
                activity: '🌦️ Light Rain Possible',
                advice: 'Good for irrigation-free days. Monitor soil moisture.',
                priority: 'medium'
            });
        }

        // Temperature recommendations
        if (day.tempMax > 38) {
            recommendations.push({
                day: dayName,
                activity: '🔥 Extreme Heat',
                advice: 'Increase irrigation frequency. Avoid mid-day field work.',
                priority: 'high'
            });
        } else if (day.tempMin < 10) {
            recommendations.push({
                day: dayName,
                activity: '❄️ Cold Weather',
                advice: 'Protect sensitive crops. Good for winter crop sowing.',
                priority: 'medium'
            });
        }

        // Ideal conditions
        if (day.rain === 0 && day.tempMax < 35 && day.tempMin > 15) {
            recommendations.push({
                day: dayName,
                activity: '✅ Ideal Conditions',
                advice: 'Perfect for spraying, harvesting, and field operations.',
                priority: 'low'
            });
        }
    });

    return recommendations.slice(0, 5); // Return top 5 recommendations
};

export default function WeatherForecast({ forecast }) {
    if (!forecast || forecast.length === 0) {
        return null;
    }

    const recommendations = getFarmingRecommendation(forecast);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>📅 10-Day Weather Forecast</Text>

            {/* Forecast Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.forecastScroll}
            >
                {forecast.map((day, index) => (
                    <View key={index} style={styles.forecastCard}>
                        <Text style={styles.dayText}>
                            {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </Text>
                        <Text style={styles.dateText}>
                            {new Date(day.date).getDate()}
                        </Text>
                        <Ionicons
                            name={getWeatherIcon(day.description)}
                            size={32}
                            color={COLORS.primary}
                        />
                        <Text style={styles.tempText}>{day.temp}°C</Text>
                        <Text style={styles.tempRangeText}>
                            {day.tempMin}° - {day.tempMax}°
                        </Text>
                        {day.rain > 0 && (
                            <View style={styles.rainBadge}>
                                <Ionicons name="rainy" size={12} color="#0EA5E9" />
                                <Text style={styles.rainText}>{Math.round(day.rain)}mm</Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Farming Recommendations */}
            {recommendations.length > 0 && (
                <View style={styles.recommendationsSection}>
                    <Text style={styles.recommendationsTitle}>🌾 Farming Recommendations</Text>
                    {recommendations.map((rec, index) => (
                        <View
                            key={index}
                            style={[
                                styles.recommendationCard,
                                rec.priority === 'high' && styles.highPriority,
                                rec.priority === 'medium' && styles.mediumPriority
                            ]}
                        >
                            <View style={styles.recHeader}>
                                <Text style={styles.recDay}>{rec.day}</Text>
                                <Text style={styles.recActivity}>{rec.activity}</Text>
                            </View>
                            <Text style={styles.recAdvice}>{rec.advice}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

// Helper function to get appropriate weather icon
const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain') || desc.includes('drizzle')) return 'rainy';
    if (desc.includes('cloud')) return 'cloudy';
    if (desc.includes('clear')) return 'sunny';
    if (desc.includes('storm') || desc.includes('thunder')) return 'thunderstorm';
    if (desc.includes('snow')) return 'snow';
    if (desc.includes('mist') || desc.includes('fog')) return 'cloud';
    return 'partly-sunny';
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginHorizontal: 20,
        marginBottom: 12,
    },
    forecastScroll: {
        paddingLeft: 20,
    },
    forecastCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
        alignItems: 'center',
        minWidth: 100,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    dayText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 8,
    },
    tempText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 8,
    },
    tempRangeText: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 4,
    },
    rainBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0F2FE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
        gap: 4,
    },
    rainText: {
        fontSize: 10,
        color: '#0EA5E9',
        fontWeight: '600',
    },
    recommendationsSection: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    recommendationsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
    },
    recommendationCard: {
        backgroundColor: '#F0FDF4',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#10B981',
    },
    highPriority: {
        backgroundColor: '#FEF2F2',
        borderLeftColor: '#EF4444',
    },
    mediumPriority: {
        backgroundColor: '#FEF3C7',
        borderLeftColor: '#F59E0B',
    },
    recHeader: {
        marginBottom: 6,
    },
    recDay: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 2,
    },
    recActivity: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    recAdvice: {
        fontSize: 13,
        color: COLORS.textLight,
        lineHeight: 18,
    },
});
