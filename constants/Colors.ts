/**
 * Definición centralizada de temas de color, incluyendo variantes para daltonismo.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const tintColorProtanopia = '#e07b39';
const tintColorDeuteranopia = '#2e8b57';
const tintColorTritanopia = '#0072b2';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  protanopia: {
    text: '#222',
    background: '#fff',
    tint: tintColorProtanopia,
    icon: '#b5651d',
    tabIconDefault: '#b5651d',
    tabIconSelected: tintColorProtanopia,
  },
  deuteranopia: {
    text: '#222',
    background: '#fff',
    tint: tintColorDeuteranopia,
    icon: '#20603d',
    tabIconDefault: '#20603d',
    tabIconSelected: tintColorDeuteranopia,
  },
  tritanopia: {
    text: '#222',
    background: '#fff',
    tint: tintColorTritanopia,
    icon: '#005377',
    tabIconDefault: '#005377',
    tabIconSelected: tintColorTritanopia,
  },
};

export type ThemeName = keyof typeof Colors;
