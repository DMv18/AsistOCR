import React from 'react';
import { Linking, TouchableOpacity, ViewProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { ThemedText } from './ThemedText';

type Props = ViewProps & {
  href: string;
  children: React.ReactNode;
};

export function ExternalLink({ href, children, style, ...props }: Props) {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const linkColor = c.externalLink?.color ?? c.inputLinkText ?? c.accent;

  return (
    <TouchableOpacity
      {...props}
      style={style}
      onPress={() => Linking.openURL(href)}
      accessibilityRole="link"
    >
      <ThemedText style={{ color: linkColor }}>{children}</ThemedText>
    </TouchableOpacity>
  );
}
