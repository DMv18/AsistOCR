import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Importa los nuevos componentes
import { AgregarListaDia } from '@/components/EditarEvento/AgregarListaDia';
import { AgregarPersona } from '@/components/EditarEvento/AgregarPersona';
import { CambiarAsistencia } from '@/components/EditarEvento/CambiarAsistencia';

export default function EditarEventoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventoId = params.id as string | undefined;
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const cEditar = c.EditarEvento;

  const [nombreEvento, setNombreEvento] = useState<string>('');
  const [fechaEvento, setFechaEvento] = useState<string>('');
  const [modo, setModo] = useState<'menu' | 'agregarPersona' | 'agregarListaDia' | 'cambiarAsistencia'>('menu');

  useEffect(() => {
    if (!eventoId) return;
    fetch(`${process.env.SERVER_URL || ''}/asistencias/${encodeURIComponent(eventoId)}`, { method: 'HEAD' })
      .then(() => {
        const nombreSinExtension = eventoId.replace('.xlsx', '');
        setNombreEvento(nombreSinExtension.replace(/(\d{2}[-_.]\d{2}[-_.]\d{4})/, '').replace(/[-_.]+$/, '').trim() || nombreSinExtension);
        const match = eventoId.match(/(\d{2}[-_.]\d{2}[-_.]\d{4})/);
        setFechaEvento(match ? match[1].replace(/[-_.]/g, '/') : '');
      });
  }, [eventoId]);

  const opciones = [
    {
      icon: 'person-add-outline',
      texto: 'Agregar una nueva persona a la lista',
      bg: cEditar.opcion1Bg,
      iconBg: cEditar.icon1Bg,
      onPress: () => setModo('agregarPersona'),
    },
    {
      icon: 'grid-outline',
      texto: 'Realizar cambios a la tabla',
      bg: cEditar.opcion2Bg,
      iconBg: cEditar.icon2Bg,
      onPress: () => setModo('cambiarAsistencia'),
    },
    {
      icon: 'document-attach-outline',
      texto: 'Agregar una nueva lista del día para su registro',
      bg: cEditar.opcion3Bg,
      iconBg: cEditar.icon3Bg,
      onPress: () => setModo('agregarListaDia'),
    },
  ];

  return (
    <AppLayout description="Escoja una de las opciones para modificar.">
      <ThemedText type="title" style={{ marginBottom: 8, textAlign: 'center' }}>
        {nombreEvento || 'Evento'}
      </ThemedText>
      <ThemedText style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
        Fecha: {fechaEvento || 'Sin fecha'}
      </ThemedText>
      {modo === 'menu' ? (
        <>
          <View style={[styles.greenBlock, { backgroundColor: cEditar.greenBlock }]}>
            {opciones.map((op) => (
              <TouchableOpacity
                key={op.texto}
                style={[styles.opcionBtn, { backgroundColor: op.bg }]}
                onPress={op.onPress}
                activeOpacity={0.85}
              >
                <View style={[styles.iconCircle, { backgroundColor: op.iconBg }]}>
                  <Ionicons name={op.icon as any} size={32} color={cEditar.regresarBtnText} />
                </View>
                <ThemedText style={[styles.opcionTexto, { color: cEditar.opcionText }]}>{op.texto}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.regresarBtn, { backgroundColor: cEditar.regresarBtn }]}
            onPress={() => router.back()}
            accessibilityLabel="Regresar"
          >
            <ThemedText style={[styles.regresarBtnText, { color: cEditar.regresarBtnText }]}>Salir de este evento</ThemedText>
          </TouchableOpacity>
        </>
      ) : !eventoId ? (
        <View style={{ alignItems: 'center', marginTop: 32 }}>
          <ThemedText style={{ color: c.danger, fontWeight: 'bold', fontSize: 18 }}>
            Error: No se encontró el identificador del evento.
          </ThemedText>
          <TouchableOpacity
            style={[styles.regresarBtn, { backgroundColor: cEditar.regresarBtn, marginTop: 18 }]}
            onPress={() => setModo('menu')}
          >
            <ThemedText style={[styles.regresarBtnText, { color: cEditar.regresarBtnText }]}>Volver al menú</ThemedText>
          </TouchableOpacity>
        </View>
      ) : modo === 'agregarPersona' ? (
        <AgregarPersona eventoId={eventoId} onSalir={() => setModo('menu')} />
      ) : modo === 'agregarListaDia' ? (
        <AgregarListaDia eventoId={eventoId} onSalir={() => setModo('menu')} />
      ) : modo === 'cambiarAsistencia' ? (
        <CambiarAsistencia eventoId={eventoId} onSalir={() => setModo('menu')} />
      ) : null}
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
