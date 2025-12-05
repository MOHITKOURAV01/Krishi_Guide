# KrishiGuide - React Native Mobile App 🌾

A comprehensive farming companion app built with React Native and Expo for the Mobile Application Development (MAD) end-semester project.

## Demo_Video_Link
https://drive.google.com/file/d/1_YktUFf91kjLU2BodZJYp2_nq5OoahC4/view?usp=sharing

## 📱 Overview

KrishiGuide is a bilingual (English/Hindi) mobile application designed to assist farmers with:
- **Crop Recommendations**: AI-powered crop suggestions based on soil NPK values, pH, temperature, and rainfall
- **Weather Updates**: Real-time weather information with location detection and farming advice
- **Market Prices**: Latest commodity prices with search and filter functionality
- **Government Schemes**: Information about agricultural schemes with direct application links
- **Profile Management**: User authentication, profile editing, and language preferences

## ✨ Key Features

### 🔐 Authentication
- User login with email/password
- Profile creation and management
- Secure session handling

### 🏠 Home Screen
- Location-based weather summary
- Quick access cards to all features
- Personalized greeting with user name
- Beautiful UI with custom splash screen

### 🌱 Crop Recommendation
- Beautiful banner image
- Input form for soil parameters (N, P, K, pH)
- Climate data (temperature, rainfall)
- Multiple crop suggestions with detailed reasoning
- Visual crop cards with emojis and explanations

### 🌤️ Weather
- Current location detection using GPS
- Real-time weather conditions
- Temperature, humidity, wind speed, visibility
- Sunrise/sunset times
- Weather-based farming advice
- Fallback to mock data when API rate-limited

### 💰 Market Prices
- Real-time commodity prices
- Search functionality
- Filter by crop category
- Price trend indicators (up/down)
- Market location information

### 🏛️ Government Schemes
- Comprehensive list of schemes
- Detailed benefits for each scheme
- "Apply Now" buttons with direct links
- Beautiful banner image
- Scrollable content

### 👤 Profile
- User information display
- Profile picture upload
- Edit profile functionality
- Language toggle (English/Hindi)
- Settings and preferences
- Logout functionality

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: JavaScript (JSX)
- **Navigation**: React Navigation (Bottom Tabs)
- **Icons**: Expo Vector Icons (Ionicons)
- **Location**: expo-location
- **Image Handling**: expo-image-picker
- **Styling**: React Native StyleSheet
- **State Management**: React Context API
- **APIs**: 
  - OpenWeatherMap for weather data
  - Custom services for crop, market, and scheme data

## 📁 Project Structure

```
KrishiGuide/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── CommonButton.jsx
│   │   ├── InputField.jsx
│   │   └── WeatherCard.jsx
│   ├── context/            # Context providers
│   │   ├── AuthContext.js
│   │   └── LanguageContext.js
│   ├── navigation/         # Navigation setup
│   │   └── TabNavigator.jsx
│   ├── screens/            # All screen components
│   │   ├── HomeScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── CropRecommendationScreen.jsx
│   │   ├── WeatherScreen.jsx
│   │   ├── MarketPriceScreen.jsx
│   │   ├── GovtSchemesScreen.jsx
│   │   └── ProfileScreen.jsx
│   ├── services/           # Business logic and API calls
│   │   ├── cropService.js
│   │   ├── weatherService.js
│   │   ├── marketService.js
│   │   └── schemeService.js
│   └── utils/              # Constants and utilities
│       ├── constants.js
│       └── translations.js
├── assets/                 # Images and static files
│   ├── crop_banner.png
│   ├── govt_banner.png
│   ├── splash_logo.png
│   ├── login_image.jpg
│   └── profile_bg.jpg
├── App.js                  # Main app entry point
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device

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

3. Install additional required packages:
```bash
npx expo install expo-location expo-image-picker expo-linear-gradient
```

4. Start the development server:
```bash
npx expo start
```

5. Run on your device:
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📦 Dependencies

```json
{
  "expo": "~54.0.0",
  "react": "18.3.1",
  "react-native": "0.76.5",
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/bottom-tabs": "^6.6.1",
  "expo-location": "~18.0.4",
  "expo-image-picker": "~16.0.3",
  "expo-linear-gradient": "~14.0.1",
  "expo-vector-icons": "^14.0.4",
  "react-native-screens": "^4.4.0",
  "react-native-safe-area-context": "^4.14.0"
}
```

## 🎨 UI/UX Features

- **Bilingual Support**: Complete English and Hindi translations
- **Custom Splash Screen**: Beautiful branded splash screen
- **Banner Images**: Eye-catching banners for Crop and Scheme screens
- **Responsive Design**: Optimized for various screen sizes
- **SafeAreaView**: Proper handling of status bar and notches
- **Smooth Scrolling**: Banner images scroll with content
- **Color Theme**: Consistent green agricultural theme
- **Icons**: Intuitive Ionicons throughout the app

## 🔑 API Configuration

The app uses OpenWeatherMap API for weather data. The API key is configured in:
```javascript
// app/services/weatherService.js
const API_KEYS = {
    OPENWEATHER: 'your_api_key_here'
};
```

**Note**: The current API key is rate-limited. For production use, obtain your own key from [OpenWeatherMap](https://openweathermap.org/api).

## 🌍 Localization

The app supports two languages:
- **English** (default)
- **Hindi** (हिंदी)

Language can be toggled from the Profile screen. All screens and components are fully translated.

## 📱 Screens Overview

### 1. Login Screen
- Email/password authentication
- Beautiful login image
- User-friendly form validation

### 2. Home Screen
- Personalized greeting
- Current location display
- Weather summary card
- Quick action buttons
- Clean, modern design

### 3. Crop Recommendation
- Banner image at top
- Soil parameter inputs (N, P, K, pH)
- Climate inputs (temperature, rainfall)
- Multiple crop suggestions
- Detailed reasoning for each crop
- Scrollable results

### 4. Weather Screen
- Location-based weather
- Current conditions
- Temperature, humidity, wind
- Sunrise/sunset times
- Farming advice based on weather
- Mock data fallback

### 5. Market Prices
- Commodity price list
- Search functionality
- Category filters
- Price trends
- Market locations

### 6. Government Schemes
- Banner image at top
- Scheme cards with details
- Benefits list with checkmarks
- "Apply Now" buttons
- Direct links to official sites

### 7. Profile Screen
- User information
- Profile picture
- Edit profile modal
- Language toggle
- Settings options
- Logout button

## 🚧 Known Limitations

- Weather API has rate limits (mock data used as fallback)
- Market prices are simulated data
- Government schemes are hardcoded
- Crop recommendation uses rule-based logic (not ML)
- No backend server (all data is local/mock)

## 🔮 Future Enhancements

- [ ] Backend integration with real APIs
- [ ] Machine Learning for crop prediction
- [ ] Real-time market price feeds
- [ ] Push notifications for weather alerts
- [ ] Offline mode with data caching
- [ ] More languages (Punjabi, Marathi, etc.)
- [ ] Community forum
- [ ] Crop disease detection using camera
- [ ] Fertilizer calculator
- [ ] Irrigation scheduler

## 🎓 Academic Context

This project is developed as part of the **Mobile Application Development (MAD)** course end-semester project. The app demonstrates:

- ✅ React Native component architecture
- ✅ Context API for state management
- ✅ Navigation patterns (Tab + Stack)
- ✅ API integration
- ✅ Location services
- ✅ Image handling
- ✅ Internationalization (i18n)
- ✅ Form handling and validation
- ✅ UI/UX best practices
- ✅ Git version control

## 📄 License

This project is created for educational purposes as part of an academic assignment.

## 👨‍💻 Developer

**Mohit Kourav**
- GitHub: [@MOHITKOURAV01](https://github.com/MOHITKOURAV01)
- Project Repository: [KrishiGuide](https://github.com/MOHITKOURAV01/Krishi_Guide)

## 🙏 Acknowledgments

- Original web project: [krishiguide](https://github.com/MOHITKOURAV01/krishiguide)
- OpenWeatherMap for weather API
- React Native and Expo communities
- Course instructors and peers
- All open-source contributors

## 📸 Screenshots

*(Add screenshots of your app here)*

---

**Note**: This is an academic project developed for learning purposes. For production deployment, implement proper security measures, API key management, real data sources, and backend infrastructure.

**Made with ❤️ for farmers**
