import colorsDeuteranopia from './colors.deuteranopia';
import colorsHighContrast from './colors.highContrast';
import colorsNormal from './colors.normal';
import colorsProtanopia from './colors.protanopia';
import colorsTritanopia from './colors.tritanopia';

export type ThemeName = 'light' | 'dark';
export type ColorMode = 'normal' | 'highContrast' | 'protanopia' | 'deuteranopia' | 'tritanopia';

export const Colors = {
  normal: colorsNormal,
  highContrast: colorsHighContrast,
  protanopia: colorsProtanopia,
  deuteranopia: colorsDeuteranopia,
  tritanopia: colorsTritanopia,
};