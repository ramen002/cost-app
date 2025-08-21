import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ionicons } from "@expo/vector-icons";
import { IngredientUsage, Ingredient } from "@/lib/types";
import { colors } from "@/theme";
import { useIngredientsStore } from "@/lib/store/ingredientsStore";

interface IngredientSelectorProps {
  selectedIngredients: IngredientUsage[];
  onIngredientsChange: (ingredients: IngredientUsage[]) => void;
  onAddIngredients: () => void;
}

export function IngredientSelector({
  selectedIngredients,
  onIngredientsChange,
  onAddIngredients,
}: IngredientSelectorProps) {
  const { ingredients } = useIngredientsStore();

  const handleQuantityChange = (index: number, text: string) => {
    const newQuantity = parseFloat(text) || 0;
    onIngredientsChange(
      selectedIngredients.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveIngredient = (index: number) => {
    onIngredientsChange(selectedIngredients.filter((_, i) => i !== index));
  };

  return (
    <View className="mb-4">
      <Label text="材料"/>
      <Button
        title="材料を選択"
        icon="add"
        outline
        className="bg-white border border-primary mb-2"
        onPress={onAddIngredients}
      />
      
      {selectedIngredients.map((usage, index) => {
        const ingredient = ingredients.find(ing => ing.id === usage.ingredientId);
        if (!ingredient) return null;
        return (
          <View key={index} className="border border-primary rounded-2xl p-3 bg-white mb-2">
            <View className="flex-row items-center">
              <Text className="font-medium w-44">{ingredient.name}</Text>
              <View className="flex-1 flex-row items-center">
                <Input
                  placeholder="例: 100"
                  containerClassName="w-24"
                  value={usage.quantity.toString()}
                  onChangeText={(text) => handleQuantityChange(index, text)}
                  keyboardType="numeric"
                />
                <Text className="text-textSub ml-1">{ingredient.unit}</Text>
              </View>
                <TouchableOpacity onPress={() => handleRemoveIngredient(index)}>
                  <Ionicons name="close-circle" size={24} color={colors.accentOrange} />
                </TouchableOpacity>
              </View>
          </View>
        );
      })}
    </View>
  );
}
