import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/theme";

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: true,   // ヘッダー表示の有無
          tabBarActiveTintColor: colors.accentBlue,   // アクティブ時の色
          tabBarInactiveTintColor: colors.textSub,      // 非アクティブ時の色
          tabBarStyle: { backgroundColor: colors.background }
        }}
      >
        {/* ホームタブ */}
        <Tabs.Screen
          name="(home)/index"
          options={{
            title: "ホーム",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        {/* 食材タブ */}
        <Tabs.Screen
          name="ingredients/index"
          options={{
            title: "食材",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="leaf" color={color} size={size} />
            ),
          }}
        />

        {/* レシピタブ */}
        <Tabs.Screen
          name="recipes/index"
          options={{
            title: "レシピ",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" color={color} size={size} />
            ),
          }}
        />

        {/* 計算タブ */}
        <Tabs.Screen
          name="calculator/index"
          options={{
            title: "計算",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
