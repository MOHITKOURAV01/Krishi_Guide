import React from "react";
import { View, Text, useColorScheme } from "react-native";

export default function WeatherScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0b1220" : "#fff";
  const text = isDark ? "#fff" : "#111";

  return (
    <View style={{ flex: 1, backgroundColor: bg, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: text }}>🌦 Weather Updates</Text>
      <Text style={{ marginTop: 10, fontSize: 16, color: text }}>Temperature: 29°C</Text>
      <Text style={{ fontSize: 16, color: text }}>Humidity: 72%</Text>
      <Text style={{ fontSize: 16, color: text }}>Rainfall: Moderate</Text>
    </View>
  );
}
