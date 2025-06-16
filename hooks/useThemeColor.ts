

import { Colors } from '@/constants/Colors';
import { useThemeCustom } from './ThemeContext';

type ColorKey =
  | keyof typeof Colors['normal']['light']
  | `${keyof typeof Colors['normal']['light']}.${string}`
  | 'headerBtnBg'
  | 'headerBtnText';

export function useThemeColor(
  props: Partial<Record<'light' | 'dark', string>>,
  colorName: ColorKey
) {
  const { theme, colorMode } = useThemeCustom();
  const colorFromProps = props[theme];

  // Permite acceder a claves anidadas tipo "ListaEventos.eventoCard"
  const colorObj: typeof Colors['normal']['light'] | typeof Colors['normal']['dark'] = Colors[colorMode][theme];
  let color: string | undefined = undefined;
  if (colorName.includes('.')) {
    const [comp, sub] = colorName.split('.') as [string, string];
    color = (colorObj as any)[comp]?.[sub];
  } else {
    color = (colorObj as any)[colorName];
  }

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return color ?? Colors.normal.light.text;
  }
}
