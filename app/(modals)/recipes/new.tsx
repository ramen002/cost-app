import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Button, ButtonText } from "../../../components/ui/button";

export default function NewRecipeModal() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold">レシピを追加</Text>
      {/* 入力フォームをここに */}
      <Button onPress={() => router.back()} action="primary"><ButtonText>閉じる</ButtonText></Button>
    </View>
  );
}
