import { View, Text } from "react-native";
import { Button } from "../../components/ui/Button";
import { Link } from "../../components/ui/Link";

export default function Ingredients() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">ingredients</Text>
      <Link href="/ingredients/new">
        <Button>食材を追加</Button>
      </Link>
    </View>
  );
}
