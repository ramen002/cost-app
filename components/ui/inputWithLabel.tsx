import * as React from 'react';
import { View } from 'react-native';
import { Label } from './label';
import { Input } from './input';
import { cn } from '@/lib/utils/cn';

type InputWithLabelProps = React.ComponentProps<typeof Input> & {
  label: string;
  className?: string;
  containerClassName?: string;
  showClearButton?: boolean; 
};

export const InputWithLabel = React.forwardRef<React.ComponentRef<typeof Input>, InputWithLabelProps>(
  ({ label, className, containerClassName, showClearButton = false, ...props }, ref) => {
    return (
      <View className={cn('mb-4', containerClassName)}>
        <Label text={label} className="mb-1" />
        <Input
          ref={ref}
          className={className}
          showClearButton
          {...props}
        />
      </View>
    );
  }
);

