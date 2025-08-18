import { View, Text, Pressable, Modal as RNModal } from "react-native";
import { cn } from "../../lib/utils/cn";

type ModalProps = {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({ visible, title, children, onClose }: ModalProps) {
  return (
    <RNModal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white w-full rounded-xl p-6 shadow">
          {title && <Text className="text-lg font-bold mb-4">{title}</Text>}
          {children}
          <Pressable
            onPress={onClose}
            className="mt-4 py-2 px-4 bg-gray-200 rounded-xl items-center"
          >
            <Text>閉じる</Text>
          </Pressable>
        </View>
      </View>
    </RNModal>
  );
}
