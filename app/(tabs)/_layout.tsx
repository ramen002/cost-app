import { Tabs } from "expo-router";
import { View, Text, ScrollView, Pressable } from 'react-native';
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
          tabBarInactiveTintColor: colors.textSub,    // 非アクティブ時の色
          headerShadowVisible: false,                 // 影（ボーダー）を消す
          headerStyle: { backgroundColor: colors.background },
          tabBarStyle: { backgroundColor: colors.background, borderColor: colors.background },
          headerTitleStyle: {
            fontWeight: "bold", 
            color: colors.accentBlue
          },
        }}
      >
          {/* ホームタブ */}
          <Tabs.Screen
            name="index"
            options={{
              title: "ホーム",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />

          {/* 食材タブ */}
          <Tabs.Screen
            name="ingredients/index"
            options={{
              title: "食材一覧",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="leaf" color={color} size={size} />
              ),
            }}
          />

          {/* レシピタブ */}
          <Tabs.Screen
            name="recipes/index"
            options={{
              title: "レシピ一覧",
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

          {/* 設定タブ */}
          <Tabs.Screen
            name="settings/index"
            options={{
              title: "設定",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}
          />
      </Tabs>
    </SafeAreaProvider>
  );
}
