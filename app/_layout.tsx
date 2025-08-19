import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* メインのタブナビ */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* モーダル画面 */}
      <Stack.Screen
        name="(modals)"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}