import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { cn } from '@/lib/utils/cn';
import { colors } from "@/theme";

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  title: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  outline?: boolean;
  pressableClassName?: string;
};

const Button = React.forwardRef<View, ButtonProps>(({
  className,
  icon = undefined,
  outline = false,
  pressableClassName,
  title,
  ...props
}, ref) => {
  return (
    <Pressable
      className={cn(
        'flex items-center justify-center',
        props.disabled && 'opacity-50',
        pressableClassName
      )}
      {...props}
    >
      <View
        ref={ref}
        className={cn(
          `flex-row items-center justify-center rounded-xl h-10 px-4 py-2 ${outline ? 'bg-white border border-primary' : 'bg-primary'}`,
          className
        )}>
        {icon && <Ionicons name={icon} size={18} color={outline ? colors.primary : colors.white } style={{ marginRight: 6 }} />}
        <Text className={`text-sm font-bold ${!outline && 'text-white'}`}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
});

export { Button };
