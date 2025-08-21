import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

type BackButtonProps = {
  name?: React.ComponentProps<typeof Ionicons>['name'];
  color?: string;
  size?: number;
  
};

export function IconButton({ color = "black", size = 24, name = "arrow-back" }: BackButtonProps) {
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ paddingHorizontal: 8 }}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
