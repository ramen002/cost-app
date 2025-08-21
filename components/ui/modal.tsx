import { View, Text, Pressable, Modal as RNModal } from "react-native";
import { cn } from "@/lib/utils/cn";

type ModalType = "center" | "bottom" | "full";

type ModalProps = {
  visible: boolean;
  type?: ModalType;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ 
  visible,
  type = "center",
  title,
  children,
  onClose
}) => {

  // パターンごとのスタイル
  const containerStyle = {
    center: "flex-1 bg-black/50 justify-center items-center p-4",
    bottom: "flex-1 justify-end bg-black/50",
    full: "flex-1 bg-background p-4",
  }[type];

  const contentStyle = {
    center: "bg-white w-full rounded-2xl p-6 shadow",
    bottom: "bg-white w-full rounded-t-2xl p-6 shadow",
    full: "flex-1",
  }[type];

  return (
    <RNModal visible={visible} animationType={type === "center" ? "fade" : "slide"} transparent={type !== "full"} onRequestClose={onClose}>
      <View className={cn(containerStyle)}>
        <View className={cn(contentStyle)}>
          {type !== "full" && title && <Text className="text-lg font-bold mb-4">{title}</Text>}
          {children}
          <Pressable
            onPress={onClose}
            className={cn(
              type === "full" ? "mt-4 py-2 px-4 bg-gray-200 rounded-2xl items-center" : "mt-4 py-2 px-4 bg-gray-200 rounded-2xl items-center"
            )}
          >
            <Text className="text-center">閉じる</Text>
          </Pressable>
        </View>
      </View>
    </RNModal>
  );
}
