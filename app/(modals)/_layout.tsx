import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ModalLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: true,           // 必要に応じてヘッダー表示
          presentation: "modal",       // モーダル表示
        }}
      >
        {/* ここに (modals) 配下の各画面が入る */}
        {/* 例: ingredients/new.tsx */}
        <Stack.Screen name="ingredients/new" options={{ title: "新規食材" }} />

        {/* 例: recipes/edit/[id].tsx */}
        <Stack.Screen name="recipes/edit/[id]" options={{ title: "レシピ編集" }} />

        {/* 追加モーダル画面もここに Stack.Screen で追加 */}
      </Stack>
    </SafeAreaProvider>
  );
}
