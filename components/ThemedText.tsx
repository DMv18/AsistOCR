import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];

  let color = c.themedText?.default ?? c.text;
  let fontWeight: any = undefined;
  let fontSize: number | undefined = undefined;

  if (type === 'title') {
    color = c.themedText?.title ?? c.headerText ?? c.text;
    fontWeight = 'bold';
    fontSize = 22;
  } else if (type === 'link') {
    color = c.themedText?.link ?? c.inputLinkText ?? c.accent;
    fontWeight = 'bold';
  } else if (type === 'subtitle') {
    color = c.themedText?.subtitle ?? c.text;
    fontWeight = 'bold';
    fontSize = 20;
  } else if (type === 'defaultSemiBold') {
    color = c.themedText?.defaultSemiBold ?? c.text;
    fontWeight = '600';
  }

  return (
    <Text
      accessible
      accessibilityRole="text"
      style={[
        { color, fontWeight, fontSize },
        styles.base,
        style,
        (() => {
          let baseFontSize: number | undefined;
          let flatStyle: any = Array.isArray(style)
            ? Object.assign({}, ...style)
            : style || {};
          if (flatStyle && typeof flatStyle.fontSize === 'number') {
            baseFontSize = flatStyle.fontSize;
          } else if (type && styles[type]?.fontSize) {
            baseFontSize = styles[type].fontSize;
          } else {
            baseFontSize = styles.default.fontSize;
          }
          return { fontSize: baseFontSize ? baseFontSize : undefined };
        })(),
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
// Donde uses colors.themedText, ahora funcionará porque existe en Colors
