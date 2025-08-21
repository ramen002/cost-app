import { Stack } from "expo-router";
import { CloseButton } from "@/components/CloseButton";
import { colors } from "@/theme";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => <CloseButton />,
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
