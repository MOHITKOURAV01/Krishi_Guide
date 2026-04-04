# KrishiGuide 🌾
### A farming companion app built with React Native + Expo
 
> Built as my MAD (Mobile Application Development) end-semester project — but honestly, I wanted to make something that actually solves a real problem for farmers who don't have easy access to agronomic advice, weather data, or government scheme information in one place.
 
**[▶ Watch Demo Video](https://drive.google.com/file/d/1_YktUFf91kjLU2BodZJYp2_nq5OoahC4/view?usp=sharing)** · [GitHub Repo](https://github.com/MOHITKOURAV01/Krishi_Guide)
 
---
 
## What is this?
 
KrishiGuide is a bilingual (English + हिंदी) mobile app for farmers. You enter your soil's NPK values, pH, temperature, and rainfall — and it tells you which crops will actually grow well. It also pulls real-time weather, shows mandi prices, and lists government schemes with direct application links.
 
The whole thing runs on React Native + Expo, so it works on Android and iOS from a single codebase. No backend — everything is either a live API call or smart local logic.
 
---
 
## App Flow
 
```mermaid
flowchart TD
    A([Open App]) --> B{Splash Screen\n3 seconds}
    B --> C{User logged in?}
    C -- No --> D[Login Screen]
    C -- Yes --> E[Tab Navigator]
    D -- Login / Signup --> E
 
    E --> F[🏠 Home]
    E --> G[🌾 Crop]
    E --> H[🌤 Weather]
    E --> I[💰 Market]
    E --> J[📋 Schemes]
 
    F --> K[Weather summary\n+ Quick actions]
    G --> L[Input soil & climate\nparams]
    L --> M[getCropRecommendations\ncropService.js]
    M --> N[Rule-based engine\n12 crops matched]
    N --> O[Show crop cards\nwith reasons]
 
    H --> P{Location\npermission?}
    P -- Granted --> Q[GPS coords\nexpo-location]
    P -- Denied --> R[Manual city input]
    Q --> S[OpenWeatherMap API]
    R --> S
    S -- Success --> T[Weather + Forecast\n+ Alerts]
    S -- Fail/Rate limit --> U[Mock fallback data]
 
    I --> V[marketService.js\nMock data with 500ms delay]
    V --> W[Search + Filter\nby category]
 
    J --> X[schemeService.js\n9 government schemes]
    X --> Y[Apply Now\nOfficial site link]
```
 
---
 
## Architecture
 
The folder structure follows a strict separation of concerns — screens are kept thin, all business logic lives in services.
 
```mermaid
graph LR
    subgraph Entry
        APP[App.js]
    end
 
    subgraph Providers
        AUTH[AuthContext.js]
        LANG[LanguageContext.js]
    end
 
    subgraph Navigation
        TAB[TabNavigator.jsx]
    end
 
    subgraph Screens
        HOME[HomeScreen]
        LOGIN[LoginScreen]
        CROP[CropRecommendation]
        WEATHER[WeatherScreen]
        MARKET[MarketPrice]
        GOVT[GovtSchemes]
        PROFILE[ProfileScreen]
    end
 
    subgraph Services
        CS[cropService.js]
        WS[weatherService.js]
        MS[marketService.js]
        SS[schemeService.js]
    end
 
    subgraph Components
        BTN[CommonButton]
        INPUT[InputField]
        WCARD[WeatherCard]
        WALERT[WeatherAlerts]
        WFORECAST[WeatherForecast]
    end
 
    subgraph Utils
        CONST[constants.js]
        TRANS[translations.js]
    end
 
    APP --> AUTH
    APP --> LANG
    APP --> TAB
    TAB --> Screens
    Screens --> Services
    Screens --> Components
    Components --> Utils
    LANG --> TRANS
```
 
---
 
## State Management
 
Two React Context providers handle all global state. No Redux — kept it simple on purpose.
 
```mermaid
flowchart LR
    subgraph AuthContext
        U[user state\nnull or object]
        LOGIN_FN[login]
        SIGNUP_FN[signup]
        LOGOUT_FN[logout]
        UPDATE_FN[updateUser]
    end
 
    subgraph LanguageContext
        LANG_STATE[language\nen or hi]
        T_FN[t key fn]
        TOGGLE[toggleLanguage]
        TRANS_FILE[translations.js\nen + hi dictionary]
    end
 
    ANY_SCREEN[Any Screen] -- useAuth --> AuthContext
    ANY_SCREEN -- useLanguage --> LanguageContext
    T_FN --> TRANS_FILE
```
 
---
 
## Crop Recommendation Logic
 
The engine in `cropService.js` is rule-based — it checks your soil and climate data against known agronomic ranges for 12 crops, then falls back to pH-based suggestions if fewer than 2 crops match.
 
```mermaid
flowchart TD
    INPUT[Inputs: N P K pH Temp Rainfall]
 
    INPUT --> R1{Rice\nrainfall greater than 80\ntemp greater than 20\npH 5 to 8}
    INPUT --> R2{Wheat\nrainfall 30 to 120\ntemp 10 to 30\npH 5.5 to 7.5}
    INPUT --> R3{Maize\nN greater than 40\ntemp 18 to 35}
    INPUT --> R4{Soybean\ntemp 20 to 35\nrainfall greater than 50}
    INPUT --> R5{Potato\nK greater than 60\ntemp 10 to 25}
    INPUT --> R6[7 more crops\nMustard Groundnut\nTomato Cotton etc]
 
    R1 -- match --> OUT[Results Array]
    R2 -- match --> OUT
    R3 -- match --> OUT
    R4 -- match --> OUT
    R5 -- match --> OUT
    R6 -- match --> OUT
 
    OUT --> CHECK{Fewer than\n2 results?}
    CHECK -- Yes --> FALLBACK{pH range}
    FALLBACK -- acidic pH less than 5.5 --> F1[Blueberries\nSweet Potato]
    FALLBACK -- alkaline pH greater than 7.5 --> F2[Cabbage\nCauliflower\nSpinach]
    FALLBACK -- neutral --> F3[Beans\nCarrots\nPeas]
    CHECK -- No --> SHOW[Show crop cards\nwith reasons]
    F1 --> SHOW
    F2 --> SHOW
    F3 --> SHOW
```
 
---
 
## Weather Service Flow
 
```mermaid
sequenceDiagram
    participant User
    participant WeatherScreen
    participant expo-location
    participant weatherService
    participant OpenWeatherMap
 
    User->>WeatherScreen: Opens Weather tab
    WeatherScreen->>expo-location: Request GPS permission
    alt Permission granted
        expo-location-->>WeatherScreen: lat, lon
        WeatherScreen->>weatherService: getWeatherByCoordinates(lat, lon)
    else Permission denied
        WeatherScreen->>weatherService: getWeatherByCity(cityName)
    end
    weatherService->>OpenWeatherMap: GET /weather
    weatherService->>OpenWeatherMap: GET /forecast 5-day
    weatherService->>OpenWeatherMap: GET /onecall alerts
    alt API success
        OpenWeatherMap-->>weatherService: JSON response
        weatherService-->>WeatherScreen: Parsed weather data
    else Rate limited or error
        weatherService-->>WeatherScreen: getMockWeatherData fallback
    end
    WeatherScreen->>User: Render weather + farming advice
```
 
---
 
## Screens at a Glance
 
| Screen | Key Feature | Data Source |
|--------|-------------|-------------|
| Login | Email/password auth, name extracted from email | AuthContext (mock) |
| Home | Location weather summary, quick nav cards | weatherService + AuthContext |
| Crop Recommendation | NPK + climate inputs → crop suggestions | cropService.js (rule engine) |
| Weather | GPS weather, 5-day forecast, farming tips | OpenWeatherMap API |
| Market Prices | Search + category filter, price trend arrows | marketService.js (mock) |
| Govt Schemes | 9 schemes, benefits, Apply Now links | schemeService.js (static) |
| Profile | Edit profile, photo upload, language toggle | AuthContext + expo-image-picker |
 
---
 
## Tech Stack
 
| Layer | Technology |
|-------|-----------|
| Framework | React Native 0.81 + Expo SDK 54 |
| Language | JavaScript (JSX) |
| Navigation | React Navigation — Bottom Tabs |
| State | React Context API |
| Location | expo-location |
| Images | expo-image-picker |
| Gradients | expo-linear-gradient |
| Icons | Expo Vector Icons (Ionicons) |
| Weather API | OpenWeatherMap (free tier) |
 
---
 
## Getting Started
 
```bash
# 1. Clone
git clone https://github.com/MOHITKOURAV01/Krishi_Guide.git
cd Krishi_Guide
 
# 2. Install deps
npm install
 
# 3. Install Expo packages
npx expo install expo-location expo-image-picker expo-linear-gradient
 
# 4. Start dev server
npx expo start
```
 
Scan the QR code with **Expo Go** on your phone. Press `a` for Android emulator or `i` for iOS simulator.
 
> **API Key**: Add your OpenWeatherMap key in `app/services/weatherService.js` under `API_KEYS.OPENWEATHER`. Free tier works fine for development.
 
---
 
## Honest Limitations
 
This is a student project, so some things are deliberately simplified:
 
- **Auth is mocked** — `setTimeout` simulates a real API. No JWT, no backend. Production version would use Node.js + bcrypt + expo-secure-store.
- **Market prices are static** — hardcoded mock data. Real version would hit the Agmarknet / eNAM government API.
- **Crop engine is rule-based** — works well for known ranges, but a Random Forest trained on the Kaggle Crop Recommendation dataset would be more accurate.
- **No offline support** — AsyncStorage caching is on the roadmap.
- **API key is in source** — production would use a Node.js proxy so the key never ships in the client bundle.
 
---
 
## What I'd Build Next
 
- [ ] Real backend (Node.js + Express + MongoDB)
- [ ] ML crop prediction via Flask API + scikit-learn Random Forest
- [ ] Live mandi prices from Agmarknet / eNAM API
- [ ] Push notifications for weather alerts and scheme deadlines
- [ ] Offline mode with AsyncStorage caching
- [ ] More languages — Marathi, Punjabi, Telugu
- [ ] Crop disease detection via camera (React Native Vision Camera)
- [ ] Fertilizer and irrigation calculators
 
---
 
## Academic Context
 
Built for the **Mobile Application Development (MAD)** end-semester project at Newton School of Technology, ADYPU, Pune.
 
Demonstrates: React Native component architecture · Context API · Tab navigation · Live API integration with graceful fallback · GPS location services · Bilingual i18n system · Form handling and validation · expo-image-picker
 
---
 
**Mohit Kourav** · [@MOHITKOURAV01](https://github.com/MOHITKOURAV01)
 
*Made for farmers. Built to learn.*
 
