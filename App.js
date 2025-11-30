import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar as RNStatusBar, StyleSheet, View, Image, Dimensions } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { LanguageProvider } from './app/context/LanguageContext';
import TabNavigator from './app/navigation/TabNavigator';
import LoginScreen from './app/screens/LoginScreen';

enableScreens(false);

const { width, height } = Dimensions.get('window');

function AppContent() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isShowSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="light" />
        <Image
          source={require('./assets/splash_logo.png')}
          style={styles.splashImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        {user ? <TabNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});
