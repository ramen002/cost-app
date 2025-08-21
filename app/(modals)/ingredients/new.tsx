import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";

export default function NewIngredientModal() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold">食材を追加</Text>
      {/* 入力フォームをここに */}
      <Button title="閉じる" />
    </View>
  );
}
