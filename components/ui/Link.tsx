import { Pressable, Text } from "react-native";
import { router } from "expo-router";
import { cn } from "../../lib/utils/cn";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function Link({ href, children, className }: LinkProps) {
  return (
    <Pressable onPress={() => router.push(href)} className={cn("px-2 py-1", className)}>
      <Text className="text-blue-600">{children}</Text>
    </Pressable>
  );
}
