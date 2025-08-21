import { Stack } from "expo-router";
import { View, Text, ScrollView, Pressable } from 'react-native';
import { IconButton } from "@/components/ui/iconButton";
import { colors } from "@/theme";

export default function PagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => <IconButton />,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: "bold", 
          color: colors.accentBlue
        },
      }}
    >

      <Stack.Screen
        name="ingredients/form"
        options={({ route }: any) => {
          const { id } = route.params || {};
          return {
            title: id ? "食材編集" : "食材登録",
          };
        }}
      />

      <Stack.Screen
        name="recipes/form"
        options={({ route }: any) => {
          const { id } = route.params || {};
          return {
            title: id ? "レシピ編集" : "レシピ作成",
          };
        }}
      />

      <Stack.Screen
        name="recipes/[id]"
        options={{ title: "レシピ詳細" }}
      />

      <Stack.Screen
        name="ingredients/select"
        options={{ title: "食材選択" }}
      />



      <Stack.Screen
        name="webview"
        options={{ title: "webview" }}
      />

      <Stack.Screen
        name="settings"
        options={{ title: "設定" }}
      />

      {/* 追加画面もここに Stack.Screen で追加 */}

    </Stack>
  );
}
