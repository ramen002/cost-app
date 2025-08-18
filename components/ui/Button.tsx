import { Pressable, Text } from "react-native";
import { cn } from "../../lib/utils/cn";

type ButtonProps = {
  variant?: "default" | "outline" | "destructive";
  children: React.ReactNode;
} & React.ComponentProps<typeof Pressable>;

export function Button({ variant = "default", children, className, ...props }: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "px-4 py-2 rounded-xl items-center justify-center",
        variant === "default" && "bg-black",
        variant === "outline" && "border border-gray-400",
        variant === "destructive" && "bg-red-600",
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          "text-base font-medium",
          variant === "default" && "text-white",
          variant === "outline" && "text-black",
          variant === "destructive" && "text-white"
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}
