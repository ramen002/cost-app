import { Stack } from "expo-router";
import { IconButton } from "@/components/ui/IconButton";
import { colors } from "@/theme";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => <IconButton name="close" />,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
      }}
    >

      <Stack.Screen
        name="ingredients/new"
        options={{ title: "食材登録" }}
      />

      <Stack.Screen
        name="ingredients/edit/[id]"
        options={{ title: "食材編集" }}
      />

      <Stack.Screen
        name="recipes/new"
        options={{ title: "レシピ作成" }}
      />

      <Stack.Screen
        name="recipes/edit/[id]"
        options={{ title: "レシピ編集" }}
      />



      {/* 追加モーダル画面もここに Stack.Screen で追加 */}
    </Stack>
  );
}
