import React from 'react';
import { View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';

export type ThemedViewProps = ViewProps & {
  style?: any;
};

export function ThemedView({ style, ...props }: ThemedViewProps) {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];

  return (
    <View
      {...props}
      style={[
        { backgroundColor: c.themedView ?? c.background },
        style,
      ]}
    />
  );
}


