import React, { useState } from "react";
import { View, Text, TextInput, Button, useColorScheme } from "react-native";

export default function SoilTestScreen() {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [ph, setPh] = useState("");

  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0b1220" : "#fff";
  const text = isDark ? "#fff" : "#111";

  const handleSubmit = () => {
    alert(`N: ${n}, P: ${p}, K: ${k}, pH: ${ph}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: bg, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", color: text }}>🧪 Soil Test</Text>
      <TextInput placeholder="Nitrogen (N)" value={n} onChangeText={setN} style={styles.input} />
      <TextInput placeholder="Phosphorus (P)" value={p} onChangeText={setP} style={styles.input} />
      <TextInput placeholder="Potassium (K)" value={k} onChangeText={setK} style={styles.input} />
      <TextInput placeholder="pH Level" value={ph} onChangeText={setPh} style={styles.input} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#888",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
};
