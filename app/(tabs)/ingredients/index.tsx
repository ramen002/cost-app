import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { GestureHandlerProvider, SwipeableListItem } from '@/components/layout/GestureHandlerProvider';
import { useIngredientsStore } from "@/lib/store/ingredientsStore";
import { useRouter, useNavigation } from "expo-router";
import { useState, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { colors } from '@/theme';
import { Fab } from "@/components/ui/fab";
import { SearchBar } from "@/components/ui/SearchBar";

export default function Ingredients() {
  const router = useRouter();
  const navigation = useNavigation();
  const { ingredients, deleteIngredient, duplicateIngredient } = useIngredientsStore();
  const [searchText, setSearchText] = useState<string>('');

  // 検索テキストに基づいて材料リストをフィルタリング
  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background">
      <GestureHandlerProvider>
        <View className="px-6 py-3">
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="材料を検索..."
          />
          <Button
            pressableClassName="mt-3"
            icon="add"
            title="材料を追加する"
            onPress={() => router.push('/ingredients/form')}
          />
        </View>

        <ScrollView className="p-6">
          {filteredIngredients.map((ingredient) => (
            <SwipeableListItem
              className="bg-white rounded-2xl"
              key={ingredient.id}
              onDuplicate={() => duplicateIngredient(ingredient.id)}
              onDelete={() => deleteIngredient(ingredient.id)}
            >
              <TouchableOpacity 
                className="rounded-2xl p-4"
                onPress={() => router.push(`/ingredients/form?id=${ingredient.id}`)}
              >
                <View>
                  <Text className="text-xl font-bold text-accentBlue">
                    {ingredient.name}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text>
                    {ingredient.cost ? `¥${ingredient.cost}` : '-'} / {ingredient.quantity}{ingredient.unit}
                  </Text>
                  <Text className="text-primary">
                    1{ingredient.unit}あたり¥{ingredient.cost}
                  </Text>
                </View>
              </TouchableOpacity >
            </SwipeableListItem>
          ))}
        </ScrollView>
      </GestureHandlerProvider>

      {/* <Fab title="材料追加" icon="add" onPress={() => router.push('/ingredients/form')} /> */}
    </View>
  );
}
