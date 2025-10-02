# KrishiGuideRN (React Native, JavaScript)

A React Native (Expo) reimplementation of KrishiGuide without TypeScript, mirroring core features:

- Season selection: Kharif, Rabi, Zaid
- Crop recommendations per season with key details
- Dark/light theme via system color scheme
- Animated crop cards
- Bottom tabs navigation (Home, Crop Guide)

## Getting Started

Prerequisites: Node.js, Expo CLI (optional), Xcode/Android Studio for simulators.

Install and run:

```bash
cd KrishiGuideRN
npm start
```

- Press `i` for iOS Simulator, `a` for Android, or scan the QR in Expo Go.

## Structure

- `App.js`: Navigation container, stack, and tabs; theme hookup
- `src/screens/HomeScreen.js`: Landing screen
- `src/screens/CropGuideScreen.js`: Season tabs + list of crops
- `src/components/CropCard.js`: Animated card
- `src/data/crops.js`: Season and crop data
- `babel.config.js`: Reanimated plugin

## Notes

- Built with Expo SDK 54 (React Native 0.81) and React Navigation v7
- Animations use `react-native-reanimated` 4 with Babel plugin

## Mapping to Web App (Reference)

- Season tabs and crop list replicate the web app’s Crop Guide
- Dark mode follows system preference similar to Tailwind dark theme

## License

MIT
