/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useThemeCustom } from './ThemeContext';

export function useThemeColor(
  props: Partial<Record<keyof typeof Colors, string>>,
  colorName: keyof typeof Colors.light
) {
  const { theme } = useThemeCustom();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme]?.[colorName] ?? Colors.light[colorName];
  }
}
