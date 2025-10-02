import React from "react";
import { View, Text, FlatList, useColorScheme } from "react-native";

const prices = [
  { id: "1", crop: "Wheat", price: "₹2200 / quintal" },
  { id: "2", crop: "Rice", price: "₹1800 / quintal" },
  { id: "3", crop: "Maize", price: "₹1500 / quintal" },
];

export default function MarketScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0b1220" : "#fff";
  const text = isDark ? "#fff" : "#111";

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: text }}>📊 Market Prices</Text>
      <FlatList
        data={prices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginVertical: 6, color: text }}>
            {item.crop}: {item.price}
          </Text>
        )}
      />
    </View>
  );
}
