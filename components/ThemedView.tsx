import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  protanopiaColor?: string;
  deuteranopiaColor?: string;
  tritanopiaColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, protanopiaColor, deuteranopiaColor, tritanopiaColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor, protanopia: protanopiaColor, deuteranopia: deuteranopiaColor, tritanopia: tritanopiaColor },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
