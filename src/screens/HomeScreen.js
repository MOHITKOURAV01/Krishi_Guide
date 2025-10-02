import { View, Text, useColorScheme, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const bg = isDark ? '#0b1220' : 'white';
  const text = isDark ? 'white' : '#111827';
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bg, padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: text }}>KrishiGuide</Text>
      <Text style={{ color: text, opacity: 0.8, marginTop: 8 }}>AI-powered farming assistance</Text>
      
      <Pressable
        onPress={() => navigation.navigate("Crop Guide")}
        style={{
          marginTop: 20,
          backgroundColor: '#2563eb',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>View Crop Guide</Text>
      </Pressable>
    </View>
  );
}
