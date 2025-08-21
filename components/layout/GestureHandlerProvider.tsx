import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import React from 'react';
import { ViewProps, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SwipeableListItemProps extends ViewProps {
  children: React.ReactNode;
  onDuplicate?: () => void;
  onDelete?: () => void;
  rightThreshold?: number;
}

export const SwipeableListItem: React.FC<SwipeableListItemProps> = ({ 
  children,
  onDuplicate,
  onDelete,
  rightThreshold = 40,
  className,
  ...props
}) => {
  const renderRightActions = (progress: any, dragX: any) => {
    return (
      <View className="flex-row">
        {onDuplicate && (
          <View 
            className="bg-accentBlue justify-center items-center w-20"
            onTouchEnd={(e) => {
              e.preventDefault();
              onDuplicate();
            }}
          >
            <Ionicons name="copy-outline" size={24} color="white" />
          </View>
        )}
        {onDelete && (
          <View 
            className="bg-red justify-center items-center w-20 rounded-tr-lg rounded-br-lg"
            onTouchEnd={(e) => {
              e.preventDefault();
              onDelete();
            }}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="bg-white mb-5 shadow-sm rounded-lg">
    <Swipeable
      renderRightActions={renderRightActions}
      rightThreshold={rightThreshold}
    >
      <View className={className} {...props}>
        <View className=''>
        {children}
        </View>
      </View>
    </Swipeable>
    </View>
  );
};

interface GestureHandlerProviderProps extends ViewProps {
  children: React.ReactNode;
}

export const GestureHandlerProvider: React.FC<GestureHandlerProviderProps> = ({ 
  children,
  className,
  ...props
}) => {
  return (
    <GestureHandlerRootView className={className} {...props}>
      {children}
    </GestureHandlerRootView>
  );
};
