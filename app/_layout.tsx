import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/theme";
import '@/global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 開き方の設定のみ */}
        <Stack.Screen
          name="(noTabs)"
          options={{
            presentation: "card",
          }}
        />

        {/* モーダル画面 */}
        <Stack.Screen
          name="(modals)"
          options={{
            presentation: "card",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
