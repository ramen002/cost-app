import { Stack } from "expo-router";
import { View, Text, ScrollView, Pressable } from 'react-native';
import { BackButton } from "@/components/BackButton";
import { colors } from "@/theme";

export default function NoTabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerLeft: () => <BackButton />,
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
