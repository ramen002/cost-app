import { View, Text } from "react-native";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function Ingredients() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-background">

      {/* todo: 一覧表示 */}
      <Button
        title="新しい材料を追加"
        icon="add"
        outline
        className="bg-white border border-primary mt-4"
        onPress={() => router.push('/ingredients/form')}
      />
    </View>
  );
}
