import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ value, onChangeText, placeholder = "検索...", className }: SearchBarProps) => {
  return (
    <View className={`flex-row items-center border border-primary rounded-2xl bg-white ${className}`}>
      <Ionicons name="search" size={20} color={colors.textSub} style={{ marginLeft: 16 }} />
      <TextInput
        className="flex-1 p-4"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
