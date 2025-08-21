import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/lib/utils/cn';

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  title: string;
  outline?: boolean;
  pressableClassName?: string;
};

const Button = React.forwardRef<View, ButtonProps>(({ className, outline = false, pressableClassName, title, ...props }, ref) => {
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
          `flex items-center justify-center rounded-xl h-10 px-4 py-2 ${outline ? 'bg-white border border-primary' : 'bg-primary'}`,
          className
        )}>
        <Text className={`text-sm font-bold ${!outline && 'text-white'}`}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
});

export { Button };
