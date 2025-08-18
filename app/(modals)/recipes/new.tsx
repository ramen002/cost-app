import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function NewRecipeModal() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold">レシピを追加</Text>
      {/* 入力フォームをここに */}
      <Button title="閉じる" onPress={() => router.back()} />
    </View>
  );
}
