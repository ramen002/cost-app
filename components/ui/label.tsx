import * as React from 'react';
import { Text } from 'react-native';
import { cn } from '@/lib/utils/cn';
import { colors } from "@/theme";

type LabelProps = React.ComponentProps<typeof Text> & {
  text: string;
};

export const Label = React.forwardRef<Text, LabelProps>(({ className, text, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={cn(
        'font-bold text-accentBlue mb-1',
        className
      )}
      {...props}
    >
      {text}
    </Text>
  );
});
