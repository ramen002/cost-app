import * as React from 'react';
import { TextInput, View } from 'react-native';
import { cn } from '@/lib/utils/cn';
import { colors } from "@/theme";
import { IconButton } from './iconButton';

type InputProps = React.ComponentProps<typeof TextInput> & {
  containerClassName?: string;
  showClearButton?: boolean;
  multiline?: boolean;
};

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, containerClassName, value, onChangeText, showClearButton = false, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || '');
    
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);
    
    const handleChangeText = (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);
    };
    
    const clearText = () => {
      handleChangeText('');
    };
    
    const clearButton = showClearButton && internalValue !== '';
    const isMultiline = props.multiline;

    return (
      <View
        className={cn(
          'flex-row items-center rounded-xl border border-primary bg-white pl-4',
          isMultiline ? 'min-h-32' : 'h-12',
          containerClassName
        )}
      >
        <TextInput
          ref={ref}
          className={cn('flex-1', className)}
          placeholderTextColor={colors.placeholder}
          value={value !== undefined ? value : internalValue}
          onChangeText={handleChangeText}
          multiline={isMultiline}
          {...props}
        />
        {clearButton && (
          <IconButton
            name="close-circle"
            size={20}
            color={colors.accentOrange}
            onPress={clearText}
          />
        )}
      </View>
    );
  }
);
