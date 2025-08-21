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
        options={{ title: "新規食材" }}
      />

      <Stack.Screen
        name="recipes/edit/[id]"
        options={{ title: "レシピ編集" }}
      />

      {/* 追加モーダル画面もここに Stack.Screen で追加 */}
    </Stack>
  );
}
