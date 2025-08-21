import { View, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { IngredientSelector } from "@/components/IngredientSelector";
import { IngredientUsage } from "@/lib/types";

export default function RecipeForm() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { addRecipe, getRecipeById, updateRecipe, deleteRecipe, selectedIngredients, resetSelectedIngredients, setSelectedIngredients } = useRecipesStore();
  const { ingredients } = useIngredientsStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("1");
  const [price, setPrice] = useState("");
  const [localSelectedIngredients, setLocalSelectedIngredients] = useState<IngredientUsage[]>([]);

  // 編集モードの場合、既存のレシピデータをロード
  useEffect(() => {
    if (id) {
      const recipe = getRecipeById(id as string);
      if (recipe) {
        setName(recipe.name);
        setDescription(recipe.description || "");
        setServings(recipe.servings.toString());
        setPrice(recipe.price?.toString() || "");
        setLocalSelectedIngredients(recipe.ingredients || []);
        // 編集モードでレシピデータをロードする際に、selectedIngredientsも設定する
        setSelectedIngredients(recipe.ingredients || []);
      }
    } else {
      // 新規作成モードの場合、selectedIngredientsをリセット
      resetSelectedIngredients();
    }
  }, [id, getRecipeById, setSelectedIngredients, resetSelectedIngredients]);

  // 材料選択モーダルから戻ってきたときに選択された材料を反映
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (id) {
        // 編集モードの場合、selectedIngredientsが空でない場合、localSelectedIngredientsを更新
        if (selectedIngredients.length > 0) {
          setLocalSelectedIngredients(selectedIngredients);
        }
      } else {
        // 新規作成モードの場合、selectedIngredientsをリセット
        resetSelectedIngredients();
        setLocalSelectedIngredients([]);
      }
    });

    return unsubscribe;
  }, [navigation, selectedIngredients, id, resetSelectedIngredients]);

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
      if (id) {
        // 編集モード
        updateRecipe(id as string, {
          name: name.trim(),
          description: description.trim(),
          servings: servingsNumber,
          price: priceNumber,
          ingredients: localSelectedIngredients
        });
      } else {
        // 新規作成モード
        addRecipe({
          name: name.trim(),
          description: description.trim(),
          ingredients: localSelectedIngredients,
          servings: servingsNumber,
          price: priceNumber,
        });
      }
      resetSelectedIngredients();
      router.back();
    } catch (error) {
      console.error("レシピ保存エラー:", error);
      Alert.alert("エラー", "レシピの保存に失敗しました。");
    }
  };

  const handleDelete = () => {
    if (!id) return;
    
    Alert.alert(
      "レシピを削除",
      "このレシピを削除してもよろしいですか？",
      [
        { text: "キャンセル", style: "cancel" },
        { 
          text: "削除", 
          style: "destructive", 
          onPress: () => {
            deleteRecipe(id as string);
            router.back();
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-background pt-2">
      <ScrollView className="p-6">

        <InputWithLabel
          label="レシピ名 *"
          placeholder="例: カレーライス"
          value={name}
          onChangeText={setName}
          showClearButton
        />

        <IngredientSelector
          selectedIngredients={localSelectedIngredients}
          onIngredientsChange={setLocalSelectedIngredients}
          onAddIngredients={() => router.push('/ingredients/select')}
        />

        <InputWithLabel
          label="提供数（◯個 / ◯人前）"
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

        <InputWithLabel
          label="メモ"
          multiline
          placeholder="例: レシピのポイントやメモ"
          value={description}
          onChangeText={setDescription}
        />

        <View className="mt-6 mb-20">
          <Button
            className="bg-accentBlue w-full h-12"
            title="保存"
            icon="checkmark"
            onPress={handleSave}
          />
        </View>

      </ScrollView>
    </View>
  );
}
