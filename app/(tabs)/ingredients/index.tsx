import { View, Text } from "react-native";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function Ingredients() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-xl font-bold mb-10">ingredients</Text>
        <Button title="食材を追加"
          onPress={() => router.push('/ingredients/new')}
        />
    </View>
  );
}
