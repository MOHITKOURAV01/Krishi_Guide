import React from 'react';
import { View, Text, Image, ScrollView, useColorScheme } from 'react-native';

export default function CropDetailScreen({ route }) {
  const { crop } = route.params; // crop data passed from CropCard
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const bg = isDark ? '#0b1220' : 'white';
  const text = isDark ? 'white' : '#111827';

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: text }}>{crop.name}</Text>
      <Image source={{ uri: crop.image || 'https://via.placeholder.com/300x200' }} style={{ width: '100%', height: 200, borderRadius: 12, marginVertical: 16 }} />
      <Text style={{ color: text, marginBottom: 8 }}>🌱 Soil: {crop.soil}</Text>
      <Text style={{ color: text, marginBottom: 8 }}>🌦 Climate: {crop.climate}</Text>
      <Text style={{ color: text, marginBottom: 8 }}>💧 Water: {crop.water}</Text>
      <Text style={{ color: text, marginBottom: 8 }}>⏳ Duration: {crop.durationDays} days</Text>
      <Text style={{ color: text, marginTop: 12, fontWeight: '600' }}>📌 Tips:</Text>
      <Text style={{ color: text, marginTop: 4, lineHeight: 20 }}>
        {crop.tips || "Maintain proper irrigation and monitor for pests regularly."}
      </Text>
    </ScrollView>
  );
}
