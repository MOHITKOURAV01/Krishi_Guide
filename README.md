# KrishiGuide - React Native Mobile App

A comprehensive farming companion app built with React Native and Expo for the Mobile Application Development (MAD) end-semester project.

## 🌾 Overview

KrishiGuide is a mobile application designed to assist farmers with:
- **Crop Recommendations**: Get personalized crop suggestions based on soil and climate data
- **Weather Updates**: Real-time weather information and forecasts
- **Market Prices**: Latest commodity prices from various markets
- **Government Schemes**: Information about agricultural schemes and benefits
- **Profile Management**: User settings and preferences

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Native Stack)
- **Icons**: Lucide React Native
- **API**: OpenWeatherMap for weather data

## 📁 Project Structure

```
app/
├── screens/           # All screen components
│   ├── HomeScreen.tsx
│   ├── CropRecommendationScreen.tsx
│   ├── WeatherScreen.tsx
│   ├── MarketPriceScreen.tsx
│   ├── GovtSchemesScreen.tsx
│   └── ProfileScreen.tsx
├── components/        # Reusable UI components
│   ├── CommonButton.tsx
│   └── InputField.tsx
├── navigation/        # Navigation configuration
│   └── TabNavigator.tsx
├── services/          # Business logic and API calls
│   ├── weatherService.ts
│   ├── cropService.ts
│   └── marketService.ts
└── utils/            # Constants and types
    ├── constants.ts
    └── types.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MOHITKOURAV01/Krishi_Guide.git
cd Krishi_Guide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your device:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📱 Features

### Home Screen
- Weather summary for current location
- Quick access cards to all major features
- Daily farming tips

### Crop Recommendation
- Input form for soil parameters (pH, NPK values)
- Climate data (temperature, rainfall)
- AI-powered crop suggestions with reasoning
- Visual crop cards with emojis

### Weather
- Current weather conditions
- Temperature, humidity, wind speed
- Sunrise/sunset times
- Farming advice based on weather

### Market Prices
- Real-time commodity prices
- Search and filter functionality
- Price change indicators
- Market location information

### Government Schemes
- List of available schemes
- Detailed information modal
- Tags for easy categorization
- Links to official websites

### Profile
- User information
- App settings
- Language preferences
- About section

## 🎓 Academic Context

This project is developed as part of the Mobile Application Development (MAD) course end-semester project. The app demonstrates:

- React Native component architecture
- TypeScript type safety
- Navigation patterns
- API integration
- State management
- UI/UX best practices

## 🔑 API Keys

The app uses OpenWeatherMap API for weather data. The current API key is for demonstration purposes only. For production use, obtain your own key from [OpenWeatherMap](https://openweathermap.org/api).

## 🚧 Limitations & Future Work

### Current Limitations:
- Weather data uses a demo API key with limited requests
- Market prices are mock data (not real-time)
- Government schemes are hardcoded
- No user authentication
- Location is hardcoded (Delhi as default)

### Future Enhancements:
- User authentication and personalized profiles
- Real-time market price integration
- Geolocation for automatic weather detection
- Multi-language support (Hindi, Punjabi, etc.)
- Push notifications for weather alerts
- Offline mode with local data caching
- Integration with government APIs for schemes
- Community forum for farmers
- Crop disease detection using ML

## 📄 License

This project is created for educational purposes as part of an academic assignment.

## 👨‍💻 Developer

**Mohit Kourav**
- GitHub: [@MOHITKOURAV01](https://github.com/MOHITKOURAV01)

## 🙏 Acknowledgments

- Original web project: [krishiguide](https://github.com/MOHITKOURAV01/krishiguide)
- OpenWeatherMap for weather API
- React Native and Expo communities
- Course instructors and peers

---

**Note**: This is an academic project developed for learning purposes. For production deployment, additional security measures, proper API key management, and real data sources should be implemented.
