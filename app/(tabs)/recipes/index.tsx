import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRecipesStore } from "@/lib/store/recipesStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Recipes() {
  const router = useRouter();
  const { recipes, deleteRecipe, addRecipe } = useRecipesStore();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "レシピを削除",
      `「${name}」を削除してもよろしいですか？`,
      [
        { text: "キャンセル", style: "cancel" },
        { text: "削除", style: "destructive", onPress: () => deleteRecipe(id) }
      ]
    );
  };

  const handleDuplicate = (recipe: any) => {
    const newRecipe = {
      name: `${recipe.name} (コピー)`,
      description: recipe.description,
      ingredients: recipe.ingredients,
      servings: recipe.servings
    };
    addRecipe(newRecipe);
  };

  return (
    <View className="flex-1 bg-background">
      <View className="bg-primary p-4">
        <Text className="text-2xl font-bold text-white">レシピ一覧</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        {recipes.map((recipe) => (
          <View key={recipe.id} className="bg-white rounded-lg p-4 mb-3 shadow">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-semibold">{recipe.name}</Text>
              <View className="flex-row">
                <TouchableOpacity 
                  className="p-2"
                  onPress={() => router.push(`/(modals)/recipes/edit/${recipe.id}`)}
                >
                  <Ionicons name="create-outline" size={20} color="#2F4D6C" />
                </TouchableOpacity>
                <TouchableOpacity 
                  className="p-2"
                  onPress={() => handleDuplicate(recipe)}
                >
                  <Ionicons name="copy-outline" size={20} color="#2F4D6C" />
                </TouchableOpacity>
                <TouchableOpacity 
                  className="p-2"
                  onPress={() => handleDelete(recipe.id, recipe.name)}
                >
                  <Ionicons name="trash-outline" size={20} color="#E68A2E" />
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-gray-600">標準量: {recipe.servings}人分</Text>
            <Text className="text-gray-600">材料数: {recipe.ingredients.length}種類</Text>
          </View>
        ))}
      </ScrollView>
      <View className="p-4">
        <Button 
          title="レシピを追加" 
          onPress={() => router.push('/(modals)/recipes/new')} 
        />
      </View>
    </View>
  );
}
