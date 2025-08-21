import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import { useHistoryStore } from '../../lib/store/historyStore';
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function Home() {
  const history = useHistoryStore((s) => s.history);
  const [modalVisible, setModalVisible] = useState<'ingredient' | 'recipe' | null>(null);
    const router = useRouter();

  return (
    <View className="flex-1 bg-background items-center justify-center">
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

      <Button title="材料追加" onPress={() => setModalVisible('ingredient')} />
      <Button title="レシピ追加" onPress={() => setModalVisible('recipe')} />
      <Button title="back" onPress={() => router.back()} />
      <Button title="設定sss" onPress={() => router.push("/settings")} />

      <Modal visible={modalVisible === 'ingredient'} type="center" title="材料追加" onClose={() => setModalVisible(null)}>
        <Text>ここに材料追加フォーム</Text>
      </Modal>

      <Modal visible={modalVisible === 'recipe'} type="bottom" title="レシピ追加" onClose={() => setModalVisible(null)}>
        <Text>ここにレシピ追加フォーム</Text>
      </Modal>
{/* full */}
    </View>
  );
}
