import { View, Text } from "react-native";
import { Button } from "../../../components/ui/Button";
import { useRouter } from "expo-router";

export default function Ingredients() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-10">ingredients</Text>
        <Button onPress={() => router.push('/ingredients/new')} >食材を追加</Button>
    </View>
  );
}
