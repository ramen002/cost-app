import { TextInput, TextInputProps } from "react-native";
import { cn } from "../../lib/utils/cn";

type InputProps = TextInputProps & {
  className?: string;
};

export function Input({ className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        "border border-gray-300 rounded-xl px-4 py-2 mb-2 text-black",
        className
      )}
      {...props}
    />
  );
}
