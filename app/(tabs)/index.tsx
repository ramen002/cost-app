import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useHistoryStore } from "@/lib/store/historyStore";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useRecipesStore } from "@/lib/store/recipesStore";

export default function HomeScreen() {
  const history = useHistoryStore((s) => s.history);
  const ingredients = useIngredientsStore((s) => s.ingredients);
  const recipes = useRecipesStore((s) => s.recipes);

  return (
    <View className="flex-1 bg-background items-center px-8 pt-20">
      {/* タイトル */}
      <Text className="text-2xl font-bold text-accentBlue mb-12">
        - 原価計算 -
      </Text>

      {/* サマリーカード */}
      <View className="flex-row mb-6">
        {/* 材料 */}
        <View className="flex-1 rounded-3xl p-4 bg-primary/40 h-32 border border-primary">
          <View className="flex-row items-center justify-center">
            <Ionicons name="cube-outline" size={20} />
            <Text className="font-semibold ml-1">材料</Text>
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="font-bold text-accentBlue text-2xl">{ingredients.length}</Text>
            <Text className="text-xs mt-1">登録済み</Text>
          </View>
        </View>
        <View className="m-2" />

        {/* レシピ */}
        <View className="flex-1 rounded-3xl p-4 bg-primary/40 h-32 border border-primary">
          <View className="flex-row items-center justify-center">
            <Ionicons name="book-outline" size={20} />
            <Text className="font-semibold ml-1">レシピ</Text>
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="font-bold text-accentBlue text-2xl">{recipes.length}</Text>
            <Text className="text-xs mt-1">登録済み</Text>
          </View>
        </View>
      </View>

      {/* 最近の計算履歴 */}
      <View className="bg-white w-full rounded-2xl p-4 border border-primary"
        style={{ height: 300}}>
        <Text className="text-lg text-accentBlue font-bold mb-4">最近の計算</Text>
        <ScrollView>
          <Text>あああ</Text>
          {history.slice(0, 10).map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center py-2 border-b border-primary"
            >
              <Text>{item.recipe.name} （¥{item.recipe.price}）</Text>
              <Text className="text-primary text-sm">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 広告スペース */}
      <View className="h-20 w-full mt-6 bg-white rounded-2xl border border-primary items-center justify-center">
        <Text className="text-gray-400">広告バナー（課金で非表示可）</Text>
      </View>
    </View>
  );
}
