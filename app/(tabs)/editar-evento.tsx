import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const opciones = [
  {
    icon: 'person-add-outline',
    texto: 'Agregar una nueva persona a la lista',
    color: '#d1a3ff',
    onPress: () => {},
  },
  {
    icon: 'grid-outline',
    texto: 'Realizar cambios a la tabla',
    color: '#d1a3ff',
    onPress: () => {},
  },
  {
    icon: 'document-attach-outline',
    texto: 'Agregar una nueva lista del día para su registro',
    color: '#d1a3ff',
    onPress: () => {},
  },
];

export default function EditarEventoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventoId = params.id as string | undefined;
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode]?.[theme]?.EditarEvento || { greenBlock: '#FFFFFF', regresarBtn: '#2196F3', regresarBtnText: '#FFFFFF' };

  const nombre = eventoId ? `Evento ${eventoId}` : 'Evento';
  const fecha = '10/05/2025';

  return (
    <AppLayout description="Escoja una de las opciones para modificar.">
      <ThemedText type="title" style={{ marginBottom: 8, textAlign: 'center' }}>
        {nombre}
      </ThemedText>
      <ThemedText style={{ fontSize: 16, color: '#555', marginBottom: 16, textAlign: 'center' }}>
        Fecha: {fecha}
      </ThemedText>
      <View style={[styles.greenBlock, { backgroundColor: c.greenBlock }]}>
        {opciones.map((op, idx) => (
          <TouchableOpacity
            key={op.texto}
            style={[styles.opcionBtn, { backgroundColor: idx === 2 ? '#7fffd4' : op.color }]}
            onPress={op.onPress}
            activeOpacity={0.85}
          >
            <View style={[styles.iconCircle, { backgroundColor: op.color }]}>
              <Ionicons name={op.icon as any} size={32} color="#222" />
            </View>
            <ThemedText style={styles.opcionTexto}>{op.texto}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.regresarBtn, { backgroundColor: c.regresarBtn }]}
        onPress={() => router.back()}
        accessibilityLabel="Regresar"
      >
        <ThemedText style={[styles.regresarBtnText, { color: c.regresarBtnText }]}>Salir de este evento</ThemedText>
      </TouchableOpacity>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  greenBlock: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    width: '100%',
    alignItems: 'center',
    gap: 18,
  },
  opcionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '100%',
    gap: 18,
    backgroundColor: '#d1a3ff',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#d1a3ff',
  },
  opcionTexto: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    flex: 1,
    flexWrap: 'wrap',
  },
  regresarBtn: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
    alignSelf: 'center',
  },
  regresarBtnText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
