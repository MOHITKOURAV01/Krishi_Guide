import React from 'react';
import { useState } from 'react';
import { View, Text, Pressable, FlatList, useColorScheme } from 'react-native';
import { seasons, cropsBySeason } from '../data/crops';
import CropCard from '../components/CropCard';

export default function CropGuideScreen() {
  const [activeSeason, setActiveSeason] = useState('Kharif');
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const bg = isDark ? '#0b1220' : '#f9fafb';
  const chipBg = isDark ? '#111827' : '#e5e7eb';
  const activeBg = isDark ? '#2563eb' : '#3b82f6';
  const text = isDark ? 'white' : '#111827';

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', color: text }}>Crop Guide</Text>

      <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
        {seasons.map((s) => {
          const active = s === activeSeason;
          return (
            <Pressable key={s} onPress={() => setActiveSeason(s)} style={{ backgroundColor: active ? activeBg : chipBg,  paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999}}>
              <Text style={{ color: active ? 'white' : text, fontWeight: '600' }}>{s}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        style={{ marginTop: 12 }}
        data={cropsBySeason[activeSeason]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <CropCard crop={item} index={index} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}


