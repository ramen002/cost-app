import { Stack } from "expo-router";
import { View, Text, ScrollView, Pressable } from 'react-native';
import { IconButton } from "@/components/ui/IconButton";
import { colors } from "@/theme";

export default function NoTabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => <IconButton />,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
      }}
    >
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
