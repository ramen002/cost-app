import { View, Text, TouchableOpacity } from "react-native";
import { cn } from "@/lib/utils/cn";

interface UnitToggleProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  presetUnits: T[];
}

export function UnitToggle<T extends string>({
  value,
  onValueChange,
  presetUnits,
}: UnitToggleProps<T>) {
  const handlePresetSelect = (unit: T) => {
    onValueChange(unit);
  };

  return (
    <View className="flex-row flex-wrap">
      <View className="flex-row">
        {presetUnits.map((unit) => (
          <TouchableOpacity
            key={unit}
            className={cn(
              "w-12 py-2.5 mt-2 rounded-2xl mr-1 items-center",
              value === unit
                ? "bg-accentBlue border-accentBlue"
                : "border border-accentBlue"
            )}
            onPress={() => handlePresetSelect(unit)}
          >
            <Text
              className={cn(
                "text-accentBlue font-bold",
                value === unit ? "text-white" : ''
              )}
            >
              {unit}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
