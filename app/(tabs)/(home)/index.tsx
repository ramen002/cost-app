import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { useHistoryStore } from '../../../lib/store/historyStore';

export default function HomeScreen() {
  const history = useHistoryStore((s) => s.history);
  const [modalVisible, setModalVisible] = useState<'ingredient' | 'recipe' | null>(null);

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-xl font-bold mb-4">最近の計算履歴</Text>

      <ScrollView>
        {history.slice(0, 10).map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center py-2 border-b border-border"
          >
            <Text>{item.recipe.name}</Text>
            <Text className="text-textSub text-sm">
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-around mt-4">
        <Pressable
          className="bg-primary px-4 py-2 rounded"
          onPress={() => setModalVisible('ingredient')}
        >
          <Text className="text-white">材料追加</Text>
        </Pressable>

        <Pressable
          className="bg-primary px-4 py-2 rounded"
          onPress={() => setModalVisible('recipe')}
        >
          <Text className="text-white">レシピ追加</Text>
        </Pressable>
      </View>

      {/* {modalVisible && (
        <BottomSheet
          visible={!!modalVisible}
          onClose={() => setModalVisible(null)}
        >
          <Text className="text-textSub">ここにフォームコンポーネントを配置</Text>
        </BottomSheet>
      )} */}
    </View>
  );
}
