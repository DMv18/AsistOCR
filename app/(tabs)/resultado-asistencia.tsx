import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function ResultadoAsistenciaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const raColors = c.ResultadoAsistencia;

  // Obtener los nombres detectados desde los parámetros (respuestas)
  const nombresDetectados: string[] = (() => {
    if (typeof params.respuestas === 'string') {
      try {
        return JSON.parse(params.respuestas);
      } catch {
        return [];
      }
    }
    return [];
  })();

  type ResultadoFila = {
    nombre: string;
    presente: boolean;
  };

  // Todos los nombres detectados se marcan como presentes por defecto
  const resultado: ResultadoFila[] = nombresDetectados.map(nombre => ({
    nombre,
    presente: true,
  }));

  const [nombreEvento, setNombreEvento] = useState(
    typeof params.nombreEvento === 'string'
      ? params.nombreEvento
      : 'Evento_' + new Date().toISOString().slice(0, 10)
  );
  const [fechaEvento, setFechaEvento] = useState(new Date().toISOString().slice(0, 10));

  const handleFinalizar = async () => {
    if (!nombreEvento || !nombreEvento.trim()) {
      Alert.alert('Nombre requerido', 'Debes ingresar un nombre para la asistencia.');
      return;
    }
    const nombreExcel = nombreEvento.trim().replace(/[^a-zA-Z0-9_\-]/g, '_') + '.xlsx';
    // Usa la lista de nombres detectados
    const nombres = resultado.map(f => f.nombre);
    try {
      const res = await fetch(`${SERVER_URL}/crear-asistencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreExcel,
          nombres,
          fecha: fechaEvento
        }),
      });
      if (res.status === 409) {
        Alert.alert('Nombre ya existe', 'Ya existe una asistencia con ese nombre. Elige otro.');
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        Alert.alert('Error', data.error || 'No se pudo crear la asistencia.');
        return;
      }
      router.replace('/historial');
    } catch {
      Alert.alert('Error', 'No se pudo crear la asistencia.');
    }
  };

  const handleCancelar = () => {
    router.replace('/historial');
  };

  return (
    <AppLayout description="Historial de asistencia procesado">
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText
          type="title"
          style={{
            marginBottom: 8,
            textAlign: 'center',
            color: c.text, // blanco en dark
          }}
        >
          Historial de &quot;{nombreEvento}&quot;
        </ThemedText>
        <View style={styles.infoBlock}>
          <View style={styles.infoCol}>
            <ThemedText style={[styles.infoLabel, { color: c.text }]}>Nombre del evento:</ThemedText>
            <TextInput
              style={[
                styles.infoInput,
                {
                  backgroundColor: raColors.infoInputBg,
                  borderColor: raColors.infoInputBorder,
                  color: c.text, // blanco en dark
                },
              ]}
              value={nombreEvento}
              onChangeText={setNombreEvento}
            />
          </View>
          <View style={styles.infoCol}>
            <ThemedText style={[styles.infoLabel, { color: c.text }]}>Creacion del evento:</ThemedText>
            <TextInput
              style={[
                styles.infoInput,
                {
                  backgroundColor: raColors.infoInputBg,
                  borderColor: raColors.infoInputBorder,
                  color: c.text, // blanco en dark
                },
              ]}
              value={fechaEvento}
              onChangeText={setFechaEvento}
            />
          </View>
        </View>
        <View
          style={[
            styles.excelContainer,
            {
              maxWidth: Math.min(width * 0.78, 370),
              minHeight: Math.min(height * 0.5, 400),
              alignSelf: 'center',
              width: '100%',
              borderColor: raColors.excelContainerBorder,
              backgroundColor: raColors.excelContainerBg,
            },
          ]}
        >
          <ThemedText style={[styles.previewTitle, { color: c.text }]}>Lista de nombres obtenidos:</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={{ width: '100%', maxWidth: '100%' }}
            contentContainerStyle={{ minWidth: 480 }}
          >
            <View
              style={[
                styles.tabla,
                {
                  minWidth: 480,
                  maxWidth: 900,
                  alignSelf: 'center',
                  backgroundColor: raColors.tablaBg,
                  borderColor: raColors.tablaBorder,
                },
              ]}
            >
              <View style={[styles.tablaHeader, { borderColor: raColors.tablaBorder }]}>
                <ThemedText style={[styles.tablaHeaderCell, { flex: 0.15, minWidth: 40, color: c.text }]}>N°</ThemedText>
                <ThemedText style={[styles.tablaHeaderCell, { flex: 0.7, minWidth: 260, color: c.text }]}>Nombre</ThemedText>
                <ThemedText style={[styles.tablaHeaderCell, { flex: 0.3, minWidth: 100, color: c.text }]}>{fechaEvento}</ThemedText>
              </View>
              <ScrollView
                style={{ height: 220 }}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={true}
              >
                {resultado.length === 0 ? (
                  <View style={{ padding: 16 }}>
                    <ThemedText style={{ color: c.text, textAlign: 'center' }}>
                      No se detectaron nombres.
                    </ThemedText>
                  </View>
                ) : (
                  resultado.map((fila, idx) => (
                    <View key={fila.nombre + idx} style={[styles.tablaRow, { justifyContent: 'flex-start', borderColor: raColors.tablaRowBorder }]}>
                      <ThemedText
                        style={[
                          styles.tablaCell,
                          { flex: 0.3, textAlign: 'center', color: c.text }
                        ]}
                      >
                        {idx + 1}
                      </ThemedText>
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={true}
                          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
                        >
                          <ThemedText
                            style={[styles.tablaCell, { minWidth: 180, textAlign: 'left', color: c.text }]
                            }
                            numberOfLines={1}
                            ellipsizeMode="clip"
                          >
                            {fila.nombre}
                          </ThemedText>
                        </ScrollView>
                      </View>
                      <View style={[styles.tablaCell, {
                        flex: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }]}>
                        <Ionicons name="checkmark" size={22} color={raColors.checkIcon} />
                      </View>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity style={[styles.regresarBtn, { backgroundColor: raColors.btnCancelarBg }]} onPress={handleCancelar}>
            <ThemedText style={[styles.regresarBtnText, { color: raColors.btnCancelarText }]}>Cancelar</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.importarBtn, { backgroundColor: raColors.btnContinuarBg }]} onPress={handleFinalizar}>
            <ThemedText style={[styles.importarBtnText, { color: raColors.btnContinuarText }]}>Continuar</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
    paddingBottom: 24,
  },
  infoBlock: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
    width: '100%',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    alignItems: 'flex-start',
    minWidth: 120,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
    // color se pasa inline usando raColors.infoInputText si se requiere
  },
  infoInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    fontSize: 15,
    minWidth: 120,
    marginBottom: 6,
    // backgroundColor, borderColor, color se pasan inline
  },
  previewBlock: {
    width: '100%',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    // backgroundColor se pasa inline
  },
  previewTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    // color se pasa inline
  },
  nombresList: {
    width: '100%',
    gap: 2,
  },
  nombreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  nombreIndex: {
    fontWeight: 'bold',
    marginRight: 6,
    fontSize: 15,
    // color se pasa inline
  },
  nombreText: {
    fontSize: 15,
    // color se pasa inline
  },
  excelContainer: {
    borderWidth: 3,
    borderRadius: 18,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
    maxWidth: 420,
    alignSelf: 'center',
    minHeight: 320,
    width: '100%',
    // borderColor, backgroundColor se pasan inline
  },
  tabla: {
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
    maxWidth: 340,
    marginTop: 0,
    padding: 8,
    // borderColor, backgroundColor se pasan inline
  },
  tablaHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 4,
    // borderColor se pasa inline
  },
  tablaHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    // color se pasa inline
  },
  tablaRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    minHeight: 28,
    alignItems: 'center',
    // borderColor se pasa inline
  },
  tablaCell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 2,
    // color se pasa inline
  },
  btnRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 18,
    width: '100%',
    justifyContent: 'center',
  },
  regresarBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    // backgroundColor se pasa inline
  },
  regresarBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    // color se pasa inline
  },
  importarBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    // backgroundColor se pasa inline
  },
  importarBtnText: {
    fontWeight: 'bold',
    fontSize: 16,
    // color se pasa inline
  },
});
