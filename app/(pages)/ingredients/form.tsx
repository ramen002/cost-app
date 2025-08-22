import { View, Text, ScrollView, Alert } from "react-native";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Button } from "@/components/ui/button";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useState, useEffect, useLayoutEffect } from "react";
import { UnitToggle } from "@/components/ui/unitToggle";

export default function IngredientForm() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { addIngredient, updateIngredient, getIngredientById } = useIngredientsStore();
  const [name, setName] = useState("");
  const [unit, setUnit] = useState<"g" | "ml" | "個" | "袋">("g");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");

  // 編集モードの場合、既存の材料データをロード
  useEffect(() => {
    if (id) {
      const ingredient = getIngredientById(id as string);
      if (ingredient) {
        setName(ingredient.name);
        setUnit(ingredient.unit);
        setCost(ingredient.cost.toString());
        setQuantity(ingredient.quantity?.toString() || "");
      }
    }
  }, [id]);

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

    const quantityNumber = parseFloat(quantity) || 0;

    try {
      if (id) {
        // 編集モード
        updateIngredient(id as string, {
          name: name.trim(),
          unit: unit,
          cost: costNumber,
          quantity: quantityNumber,
        });
      } else {
        // 新規作成モード
        addIngredient({
          name: name.trim(),
          unit: unit,
          cost: costNumber,
          quantity: quantityNumber,
        });
      }
      router.back();
    } catch (error) {
      console.error("材料保存エラー:", error);
      Alert.alert("エラー", "材料の保存に失敗しました。");
    }
  };

  // ヘッダーの右側にボタンを設定
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          icon="checkmark"
          title="保存"
          pressableClassName="pr-2"
          onPress={handleSave}
        />
      ),
    });
  }, [navigation]);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6">
        <InputWithLabel
          label="材料名 *"
          placeholder="例: じゃがいも"
          value={name}
          onChangeText={setName}
          showClearButton
        />
        <View className="flex-row items-center justify-between">
          <InputWithLabel
            containerClassName="w-36"
            label="内容量 *"
            placeholder="例: 10"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <UnitToggle value={unit} onValueChange={setUnit} presetUnits={["g", "ml", "個", "袋"]} />
        </View>

        <InputWithLabel
          label="価格 *"
          placeholder="例: 100"
          value={cost}
          onChangeText={setCost}
          keyboardType="numeric"
        />

      </ScrollView>
    </View>
  );
}
