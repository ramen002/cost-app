import { Stack } from "expo-router";
import { IconButton } from "@/components/ui/iconButton";
import { colors } from "@/theme";
import { View, Text } from "react-native";
import { ReactNode } from "react";

// 共通ヘッダー
function Header({ title }: { title: string }) {
  return (
    <View
      style={{
        height: 100,
        backgroundColor: colors.background,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <IconButton />
      <Text
        style={{
          fontWeight: "bold",
          color: colors.accentBlue,
          fontSize: 20,
          marginLeft: 8,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

type ModalLayoutProps = {
  children: ReactNode;
};

export function AppHeader({ children }: ModalLayoutProps) {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => <Header title={options.title as string} />,
      }}
    >
      {children}
    </Stack>
  );
}
