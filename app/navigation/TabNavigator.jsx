import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CropRecommendationScreen from '../screens/CropRecommendationScreen';
import WeatherScreen from '../screens/WeatherScreen';
import MarketPriceScreen from '../screens/MarketPriceScreen';
import GovtSchemesScreen from '../screens/GovtSchemesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useLanguage } from '../context/LanguageContext';

const Tab = createBottomTabNavigator();

/**
 * Main Tab Navigator
 * Bottom tab navigation for the app
 */
export default function TabNavigator() {
    const { t } = useLanguage();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Crops') {
                        iconName = focused ? 'leaf' : 'leaf-outline';
                    } else if (route.name === 'Weather') {
                        iconName = focused ? 'cloud' : 'cloud-outline';
                    } else if (route.name === 'Market') {
                        iconName = focused ? 'trending-up' : 'trending-up-outline';
                    } else if (route.name === 'Schemes') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: t('home') }}
            />
            <Tab.Screen
                name="Crops"
                component={CropRecommendationScreen}
                options={{ title: t('crops') }}
            />
            <Tab.Screen
                name="Weather"
                component={WeatherScreen}
                options={{ title: t('weather') }}
            />
            <Tab.Screen
                name="Market"
                component={MarketPriceScreen}
                options={{ title: t('market') }}
            />
            <Tab.Screen
                name="Schemes"
                component={GovtSchemesScreen}
                options={{ title: t('schemes') }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: t('profile') }}
            />
        </Tab.Navigator>
    );
}
