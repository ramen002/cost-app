import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { colors } from "@/theme";

type IconButtonProps = {
  name?: React.ComponentProps<typeof Ionicons>['name'];
  color?: string;
  size?: number;
  onPress?: () => void;
};

export function IconButton({ 
  color = colors.textSub, 
  size = 24, 
  name = "arrow-back",
  onPress
}: IconButtonProps) {
  // デフォルト: 戻る処理
  const handlePress = onPress || (() => router.back());
  
  return (
    <TouchableOpacity onPress={handlePress} style={{ paddingHorizontal: 8 }}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}
