import { View, Text } from "react-native";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { Fab } from "@/components/ui/fab";

export default function Ingredients() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-background">
      {/* todo: 一覧表示 */}

      <Fab
        title="材料追加"
        icon="add"
        position="bottom-right"
        onPress={() => router.push('/ingredients/form')}
      />
    </View>
  );
}
