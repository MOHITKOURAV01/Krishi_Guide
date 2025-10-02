import React from 'react';
import { Text, Pressable } from 'react-native';
import Animated, { FadeInUp, FadeOut } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function CropCard({ crop, index }) {
  const navigation = useNavigation();

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 60)}
      exiting={FadeOut}
      style={{
        backgroundColor: '#1f2937',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
      }}
    >
      <Pressable onPress={() => navigation.navigate("Crop Detail", { crop })}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{crop.name}</Text>
        <Text style={{ color: '#cbd5e1', marginTop: 6 }}>Soil: {crop.soil}</Text>
        <Text style={{ color: '#cbd5e1' }}>Climate: {crop.climate}</Text>
        <Text style={{ color: '#cbd5e1' }}>Water: {crop.water}</Text>
        <Text style={{ color: '#cbd5e1' }}>Duration: {crop.durationDays} days</Text>
      </Pressable>
    </Animated.View>
  );
}
