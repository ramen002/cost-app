import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../../components/ui/Button";

export default function NewRecipeModal() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold">レシピを追加</Text>
      {/* 入力フォームをここに */}
      <Button onPress={() => router.back()}>閉じる</Button>
    </View>
  );
}
