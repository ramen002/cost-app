import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/lib/utils/cn';
import { colors } from '@/theme';

type FabProps = React.ComponentProps<typeof Pressable> & {
  title?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  iconSize?: number;
  iconColor?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
};

export const Fab = React.forwardRef<View, FabProps>(
  ({ 
    className, 
    title, 
    icon, 
    iconSize = 20, 
    iconColor = 'white',
    position = 'bottom-right',
    ...props 
  }, ref) => {
    const positionClasses = {
      'bottom-right': 'absolute bottom-6 right-6',
      'bottom-left': 'absolute bottom-6 left-6',
      'top-right': 'absolute top-6 right-6',
      'top-left': 'absolute top-6 left-6',
    };

    return (
      <Pressable
        className={cn(
          'flex items-center justify-center rounded-full bg-accentOrange shadow-sm h-14 pl-3 pr-5',
          positionClasses[position],
          props.disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <View ref={ref} className="flex flex-row items-center justify-center">
          {icon && (
            <Ionicons 
              name={icon} 
              size={iconSize} 
              color={iconColor} 
            />
          )}
          {title && (
            <Text className="ml-1 text-white font-bold">
              {title}
            </Text>
          )}
        </View>
      </Pressable>
    );
  }
);
