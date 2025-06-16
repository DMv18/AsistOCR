import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function EditarEventoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventoId = params.id as string | undefined;
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme].EditarEvento;

  const opciones = [
    {
      icon: 'person-add-outline',
      texto: 'Agregar una nueva persona a la lista',
      bg: c.opcion1Bg,
      iconBg: c.icon1Bg,
      onPress: () => {},
    },
    {
      icon: 'grid-outline',
      texto: 'Realizar cambios a la tabla',
      bg: c.opcion2Bg,
      iconBg: c.icon2Bg,
      onPress: () => {},
    },
    {
      icon: 'document-attach-outline',
      texto: 'Agregar una nueva lista del día para su registro',
      bg: c.opcion3Bg,
      iconBg: c.icon3Bg,
      onPress: () => {},
    },
  ];

  const nombre = eventoId ? `Evento ${eventoId}` : 'Evento';
  const fecha = '10/05/2025';

  return (
    <AppLayout description="Escoja una de las opciones para modificar.">
      <ThemedText type="title" style={{ marginBottom: 8, textAlign: 'center' }}>
        {nombre}
      </ThemedText>
      <ThemedText style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
        Fecha: {fecha}
      </ThemedText>
      <View style={[styles.greenBlock, { backgroundColor: c.greenBlock }]}>
        {opciones.map((op, idx) => (
          <TouchableOpacity
            key={op.texto}
            style={[styles.opcionBtn, { backgroundColor: op.bg }]}
            onPress={op.onPress}
            activeOpacity={0.85}
          >
            <View style={[styles.iconCircle, { backgroundColor: op.iconBg }]}>
              <Ionicons name={op.icon as any} size={32} color={c.regresarBtnText} />
            </View>
            <ThemedText style={[styles.opcionTexto, { color: c.opcionText }]}>{op.texto}</ThemedText>
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
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  opcionTexto: {
    fontWeight: 'bold',
    fontSize: 16,
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

