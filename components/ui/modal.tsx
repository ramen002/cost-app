import * as React from "react";
import {
  View,
  ScrollView,
  Pressable,
  Modal as RNModal,
  Text,
  StyleProp,
  ViewStyle,
  ModalProps as RNModalProps,
} from "react-native";
import { IconButton } from "@/components/ui/iconButton";
import { cn } from "@/lib/utils/cn";
import { colors } from "@/theme";

type ModalProps = RNModalProps & {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  onClose,
  containerStyle,
  ...props
}) => {
  return (
    <RNModal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent={true}
      {...props}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className={cn(
            "bg-background rounded-2xl shadow px-4 py-6 w-80 max-w-md"
          )}
          style={[{ width: "90%" }, containerStyle]}
        >
          {/* ヘッダー */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold flex-1 text-center">
              {title}
            </Text>
            <IconButton
              name="close"
              size={24}
              color={colors.textSub}
              onPress={onClose}
            />
          </View>

          {/* コンテンツ */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            style={{ maxHeight: 400 }}
          >
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};
