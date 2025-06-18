import { Ionicons } from '@expo/vector-icons';
import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const col = c.collapsible ?? {};

  return (
    <View style={[styles.root, { backgroundColor: col.background ?? c.card }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsOpen((value) => !value)}
        accessibilityLabel={isOpen ? 'Cerrar sección' : 'Abrir sección'}>
        <ThemedText style={[styles.title, { color: col.headerText ?? c.text, fontSize: 16 * fontScale }]}>{title}</ThemedText>
        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={22} color={col.icon ?? c.text} />
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 14,
    marginVertical: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16, // Se sobreescribe inline con fontScale
  },
  content: {
    padding: 12,
    paddingTop: 0,
  },
});
