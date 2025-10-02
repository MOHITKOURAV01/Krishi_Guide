import React from "react";
import { View, Text, useColorScheme, Button } from "react-native";

export default function ProfileScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0b1220" : "#fff";
  const text = isDark ? "#fff" : "#111";

  return (
    <View style={{ flex: 1, backgroundColor: bg, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: text }}>👤 Profile</Text>
      <Text style={{ marginTop: 10, fontSize: 16, color: text }}>Farmer: Mohit</Text>
      <Button title="Logout" onPress={() => alert("Logged out")} />
    </View>
  );
}
