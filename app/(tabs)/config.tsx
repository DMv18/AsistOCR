import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Switch, TextInput, TouchableOpacity, View } from 'react-native';

import { ColorMode, Colors } from '@/constants/Colors';

// Opciones de accesibilidad visual
const colorOptions: { key: ColorMode; label: string; description: string }[] = [
  {
    key: 'normal',
    label: 'Normal',
    description: 'Colores estándar',
  },
  {
    key: 'highContrast',
    label: 'Alto contraste',
    description: 'Mejora la legibilidad para todos',
  },
  {
    key: 'protanopia',
    label: 'Protanopía',
    description: 'Optimizado para protanopía (rojo-verde)',
  },
  {
    key: 'deuteranopia',
    label: 'Deuteranopía',
    description: 'Optimizado para deuteranopía (verde-rojo)',
  },
  {
    key: 'tritanopia',
    label: 'Tritanopía',
    description: 'Optimizado para tritanopía (azul-amarillo)',
  },
];

export default function ConfigScreen() {
  const { themeSetting, setTheme, fontScale, setFontScale, colorMode, setColorMode, theme } = useThemeCustom();
  const [darkMode, setDarkMode] = React.useState(themeSetting === 'dark');

  React.useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);

  
  const handleDarkMode = (value: boolean) => {
    setDarkMode(value);
    setTheme(value ? 'dark' : 'light');
  };

  const c = Colors[colorMode][theme].Config;

  return (
    <AppLayout description="Preferencias de accesibilidad y visualización.">
      <View style={styles.fontRow}>
        <ThemedText style={styles.fontLabel}>Tamaño fuente</ThemedText>
        <View style={[
          styles.fontControls,
          { backgroundColor: c.colorOptionBg, borderColor: c.colorRadio }
        ]}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setFontScale(Math.min(fontScale + 0.05, 1.5))}
            accessibilityLabel="Aumentar fuente"
          >
            <Ionicons name="add-circle-outline" size={28} color={c.labelText} />
          </TouchableOpacity>
          <TextInput
            style={[
              styles.fontInput,
              { backgroundColor: c.sectionBg, borderColor: c.colorRadio, color: c.labelText }
            ]}
            value={String(Math.round(fontScale * 16))}
            editable={false}
          />
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setFontScale(Math.max(fontScale - 0.05, 0.8))}
            accessibilityLabel="Disminuir fuente"
          >
            <Ionicons name="remove-circle-outline" size={28} color={c.labelText} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.switchRow}>
        <ThemedText style={styles.switchLabel}>Modo oscuro</ThemedText>
        <Switch
          value={darkMode}
          onValueChange={handleDarkMode}
          thumbColor={darkMode ? c.colorRadioSelected : c.sectionBg}
          trackColor={{ false: c.colorRadio, true: c.colorOptionSelected }}
          accessibilityLabel="Modo oscuro"
        />
        <Ionicons name="moon" size={28} color={c.labelText} style={{ marginLeft: 8 }} />
      </View>
      <View style={[styles.section, { backgroundColor: c.sectionBg }]}>
        <ThemedText style={styles.fontLabel}>Opciones de color para accesibilidad</ThemedText>
        {colorOptions.map(opt => (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.colorOption,
              { backgroundColor: c.colorOptionBg, borderColor: c.colorRadio },
              colorMode === opt.key && { borderColor: c.colorOptionSelected, backgroundColor: c.colorOptionSelected }
            ]}
            onPress={() => setColorMode(opt.key)}
            accessibilityLabel={opt.label}
          >
            <View style={[
              styles.colorRadio,
              { backgroundColor: c.colorRadio, borderColor: c.colorRadio },
              colorMode === opt.key && { backgroundColor: c.colorRadioSelected, borderColor: c.colorRadioSelected }
            ]}>
              {colorMode === opt.key && (
                <Ionicons name="checkmark" size={18} color={c.fontBtnText} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText style={[styles.colorOptionLabel, { color: c.labelText }]}>{opt.label}</ThemedText>
              <ThemedText style={[styles.colorOptionDesc, { color: c.labelText }]}>{opt.description}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
    width: '100%',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  helpBtn: {
    backgroundColor: '#eee',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
  },
  helpBtnText: {
    fontSize: 22,
    color: '#444',
    fontWeight: 'bold',
  },
  fontRow: {
    marginBottom: 18,
    width: '100%',
  },
  fontLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  fontControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
    borderWidth: 2,
    justifyContent: 'center',
  },
  iconBtn: {
    padding: 4,
  },
  fontInput: {
    width: 48,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 8,
    width: '100%',
  },
  switchLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  section: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    width: '100%',
    gap: 8,
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 6,
    borderWidth: 1,
    gap: 12,
  },
  colorOptionSelected: {},
  colorRadio: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  colorRadioSelected: {},
  colorOptionLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  colorOptionDesc: {
    fontSize: 13,
  },
  switchYes: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

