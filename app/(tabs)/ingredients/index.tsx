import { View, Text } from "react-native";
import { Button } from "@/~/components/ui/button";
import { useRouter } from "expo-router";

export default function Ingredients() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-10">ingredients</Text>
        <Button
          onPress={() => router.push('/ingredients/new')}
        >
          <Text className="text-white">食材を追加</Text>
        </Button>
    </View>
  );
}
