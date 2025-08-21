import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/theme";
import '@/global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* 開き方の設定のみ */}
        <Stack.Screen
          name="(pages)"
          options={{
            presentation: "card",
          }}
        />

      </Stack>
    </SafeAreaProvider>
  );
}
