import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export function BackButton({ color = "black", size = 24 }) {
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 8 }}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
}
