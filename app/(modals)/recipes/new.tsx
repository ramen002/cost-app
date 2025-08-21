import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { useState } from "react";

export default function NewRecipeModal() {
  const router = useRouter();
  const { addRecipe } = useRecipesStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [servings, setServings] = useState("1");

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

    try {
      addRecipe({
        name: name.trim(),
        description: description.trim(),
        ingredients: [],
        servings: servingsNumber
      });
      router.back();
    } catch (error) {
      console.error("レシピ保存エラー:", error);
      Alert.alert("エラー", "レシピの保存に失敗しました。");
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-6">レシピを追加</Text>
        
        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">レシピ名 *</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-white"
            value={name}
            onChangeText={setName}
            placeholder="例: カレーライス"
          />
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold mb-2">メモ</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-white"
            value={description}
            onChangeText={setDescription}
            placeholder="レシピのポイントやメモ"
            multiline
            numberOfLines={3}
          />
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">標準量</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 bg-white"
            value={servings}
            onChangeText={setServings}
            placeholder="例: 4"
            keyboardType="numeric"
          />
          <Text className="text-gray-500 mt-1">何人分または何個分かを入力</Text>
        </View>
      </ScrollView>

      <View className="flex-row justify-between p-4 bg-white">
        <Button 
          title="キャンセル" 
          onPress={() => router.back()} 
          className="bg-transparent border border-primary"
        />
        <Button 
          title="保存" 
          onPress={handleSave} 
        />
      </View>
    </View>
  );
}
