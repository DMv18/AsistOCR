import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeCustom } from '@/hooks/ThemeContext';

let Slider: any;

if (Platform.OS === 'web') {
  Slider = function WebSlider({ value, onValueChange, minimumValue, maximumValue, step, style }: any) {
    return (
      <input
        type="range"
        min={minimumValue}
        max={maximumValue}
        step={step}
        value={value}
        onChange={e => onValueChange(Number(e.target.value))}
        style={{ width: '100%', ...style }}
      />
    );
  };
  Slider.displayName = 'WebSlider';
} else {
  try {
    // Import dinámico para evitar error si no está instalado
    Slider = require('@react-native-community/slider').default;
  } catch (e) {
    // Fallback si no está instalado
    Slider = () => null;
  }
}

const themes = [
  { key: 'system', label: 'Por defecto del sistema' },
  { key: 'light', label: 'Claro' },
  { key: 'dark', label: 'Oscuro' },
  { key: 'protanopia', label: 'Protanopía' },
  { key: 'deuteranopia', label: 'Deuteranopía' },
  { key: 'tritanopia', label: 'Tritanopía' },
];

export default function ConfigScreen() {
  const { themeSetting, setTheme, fontScale, setFontScale } = useThemeCustom();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Configuración</ThemedText>
      <ThemedText type="subtitle">Tema</ThemedText>
      {themes.map((t) => (
        <ThemedText
          key={t.key}
          style={[
            styles.option,
            themeSetting === t.key && styles.selected,
          ]}
          onPress={() => setTheme(t.key as any)}
        >
          {t.label}
        </ThemedText>
      ))}
      <ThemedText type="subtitle" style={{ marginTop: 24 }}>Tamaño de letra</ThemedText>
      <View style={styles.sliderRow}>
        <ThemedText style={{ width: 40 }}>A-</ThemedText>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0.8}
          maximumValue={1.5}
          step={0.05}
          value={fontScale}
          onValueChange={setFontScale}
        />
        <ThemedText style={{ width: 40 }}>A+</ThemedText>
      </View>
      <ThemedText style={{ marginTop: 8 }}>Actual: {fontScale.toFixed(2)}x</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginVertical: 2,
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
  },
  selected: {
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
});
