import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useState, useLayoutEffect, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { Ingredient, IngredientUsage } from "@/lib/types";
import { colors } from "@/theme";

export default function NewRecipeModal() {
  const router = useRouter();
  const navigation = useNavigation();
  const { addRecipe, selectedIngredients } = useRecipesStore();
  const { ingredients } = useIngredientsStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("1");
  const [price, setPrice] = useState("");
  const [localSelectedIngredients, setLocalSelectedIngredients] = useState<IngredientUsage[]>([]);

  // 材料選択モーダルから戻ってきたときに選択された材料を反映
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // selectedIngredientsをローカルのstateにコピー
      setLocalSelectedIngredients(selectedIngredients);
    });

    return unsubscribe;
  }, [navigation, selectedIngredients]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("エラー", "レシピ名を入力してください");
      return;
    }

    const servingsNumber = parseFloat(servings) || 1;
    if (servingsNumber <= 0) {
      Alert.alert("エラー", "標準量は正の数値を入力してください");
      return;
    }

    const priceNumber = price.trim() ? parseFloat(price) : undefined;
    if (priceNumber !== undefined && priceNumber <= 0) {
      Alert.alert("エラー", "販売価格は正の数値を入力してください");
      return;
    }

    try {
      addRecipe({
        name: name.trim(),
        description: description.trim(),
        ingredients: localSelectedIngredients,
        servings: servingsNumber,
        price: priceNumber,
      });
      router.back();
    } catch (error) {
      console.error("レシピ保存エラー:", error);
      Alert.alert("エラー", "レシピの保存に失敗しました。");
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
          label="レシピ名 *"
          placeholder="例: カレーライス"
          value={name}
          onChangeText={setName}
          showClearButton
        />

        <InputWithLabel
          label="メモ"
          placeholder="例: レシピのポイントやメモ"
          value={description}
          onChangeText={setDescription}
        />

        <InputWithLabel
          label="標準量"
          placeholder="例: 4"
          value={servings}
          onChangeText={setServings}
          keyboardType="numeric"
        />

        <InputWithLabel
          label="販売価格"
          placeholder="例: 400"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <View className="mb-4">
          <Label text="材料"/>
          <Button
            title="材料を選択"
            icon="add"
            outline
            className="bg-white border border-primary mb-2"
            onPress={() => router.push('/(modals)/ingredients/select')}
          />
          
          {localSelectedIngredients.map((usage, index) => {
            const ingredient = ingredients.find(ing => ing.id === usage.ingredientId);
            if (!ingredient) return null;
            return (
              <View key={index} className="border border-primary rounded-2xl p-3 bg-white mb-2">
                <View className="flex-row items-center justify-between">
                  <Text className="font-medium">{ingredient.name}</Text>
                  <Input
                    placeholder="例: 100"
                    value={usage.quantity.toString()}
                    onChangeText={(text) => {
                      const newQuantity = parseFloat(text) || 0;
                      setLocalSelectedIngredients(prev => 
                        prev.map((item, i) => 
                          i === index ? { ...item, quantity: newQuantity } : item
                        )
                      );
                    }}
                    keyboardType="numeric"
                  />
                  <Text className="text-textSub">{ingredient.unit}</Text>
                  <TouchableOpacity onPress={() => {
                    setLocalSelectedIngredients((prev: IngredientUsage[]) => prev.filter((_: IngredientUsage, i: number) => i !== index));
                  }}>
                    <Ionicons name="close-circle" size={24} color={colors.accentOrange} />
                  </TouchableOpacity>
                </View>
                
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
