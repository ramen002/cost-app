import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/lib/utils/cn';

type ButtonProps = React.ComponentProps<typeof Pressable> & {
  title: string;
  pressableClassName?: string;
};

const Button = React.forwardRef<View, ButtonProps>(({ className, pressableClassName, title, ...props }, ref) => {
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
          'flex items-center justify-center rounded-xl bg-primary h-10 px-4 py-2',
          className
        )}>
        <Text className="text-sm font-medium text-primary-foreground">
          {title}
        </Text>
      </View>
    </Pressable>
  );
});

export { Button };
