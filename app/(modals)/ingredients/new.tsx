import { View, Text, ScrollView, Alert } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useState, useLayoutEffect } from "react";

export default function NewIngredientModal() {
  const router = useRouter();
  const navigation = useNavigation();
  const { addIngredient } = useIngredientsStore();
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [cost, setCost] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("エラー", "材料名を入力してください");
      return;
    }

    if (!unit.trim()) {
      Alert.alert("エラー", "単位を入力してください");
      return;
    }

    const costNumber = parseFloat(cost) || 0;
    if (costNumber <= 0) {
      Alert.alert("エラー", "単価は正の数値を入力してください");
      return;
    }

    try {
      addIngredient({
        name: name.trim(),
        unit: unit.trim(),
        cost: costNumber,
      });
      router.back();
    } catch (error) {
      console.error("材料保存エラー:", error);
      Alert.alert("エラー", "材料の保存に失敗しました。");
    }
  };

  // ヘッダーの右側に保存ボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          className="bg-accentBlue"
          title="保存"
          icon="checkmark"
          onPress={handleSave}
          pressableClassName="px-3"
        />
      ),
    });
  }, [navigation, handleSave]);

  return (
    <View className="flex-1 bg-background p-4">
      <ScrollView className="flex-1 p-4">
        <InputWithLabel
          label="材料名 *"
          placeholder="例: じゃがいも"
          value={name}
          onChangeText={setName}
          showClearButton
        />

        <InputWithLabel
          label="単位 *"
          placeholder="例: g, ml, 個"
          value={unit}
          onChangeText={setUnit}
          showClearButton
        />

        <InputWithLabel
          label="単価 (円/単位) *"
          placeholder="例: 100"
          value={cost}
          onChangeText={setCost}
          keyboardType="numeric"
        />
      </ScrollView>
    </View>
  );
}
