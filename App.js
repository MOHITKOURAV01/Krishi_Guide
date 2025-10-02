import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen.js';
import CropGuideScreen from './src/screens/CropGuideScreen.js';
import SoilTestScreen from './src/screens/SoilTestScreen.js';
import MarketScreen from './src/screens/MarketScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';
import CropDetailScreen from './src/screens/CropDetailScreen.js';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon = 'home';
          if (route.name === 'Home') icon = 'home';
          if (route.name === 'Crop Guide') icon = 'leaf';
          if (route.name === 'Soil Test') icon = 'flask';
          if (route.name === 'Market') icon = 'bar-chart';
          if (route.name === 'Profile') icon = 'person';
          return <Ionicons name={icon} size={size} color={color} /> }, headerShown: false,})}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Crop Guide" component={CropGuideScreen} />
      <Tabs.Screen name="Soil Test" component={SoilTestScreen} />
      <Tabs.Screen name="Market" component={MarketScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Crop Detail" component={CropDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
