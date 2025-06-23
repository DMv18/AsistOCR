import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { CopilotProvider } from 'react-native-copilot';

function ResultadoAsistenciaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = Colors[colorMode][theme];

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

  const resultado: ResultadoFila[] = nombresDetectados.map(nombre => ({
    nombre,
    presente: true,
  }));

  const [nombreEvento, setNombreEvento] = useState(
    typeof params.nombreEvento === 'string'
      ? params.nombreEvento
      : 'Evento_' + new Date().toISOString().slice(0, 10)
  );
  const [fechaEvento] = useState(new Date().toISOString().slice(0, 10));
  const [nombreColumna, setNombreColumna] = useState('');

  const handleFinalizar = async () => {
    const nombreEventoTrim = nombreEvento.replace(/\s+$/, '');
    const nombreColumnaTrim = nombreColumna.replace(/\s+$/, '');
    if (!nombreEventoTrim) {
      Alert.alert('Nombre requerido', 'Debes ingresar un nombre para la asistencia.');
      return;
    }
    if (nombreEventoTrim.length < 2) {
      Alert.alert('Nombre inválido', 'El nombre del evento debe tener al menos 2 caracteres.');
      return;
    }

    const columnaFinal = nombreColumnaTrim ? nombreColumnaTrim : fechaEvento;
    const nombreExcel = nombreEventoTrim.replace(/[^a-zA-Z0-9_\-]/g, '_') + '.xlsx';
    const nombres = resultado.map(f => f.nombre);
    try {
      const res = await fetch(`${SERVER_URL}/crear-asistencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreExcel,
          nombres,
          fecha: columnaFinal, 
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

  const columnaPreview = nombreColumna.replace(/\s+$/, '') ? nombreColumna.replace(/\s+$/, '') : fechaEvento;
  const excelData: string[][] = [
    ['N°', 'Nombre', columnaPreview], 
    ...resultado.map((fila, idx) => [
      (idx + 1).toString(),
      fila.nombre,
      '✓'
    ])
  ];

  return (
    <AppLayout description="Historial de asistencia procesado">
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{
          borderRadius: 14,
          padding: 12,
          marginBottom: 8,
          width: '100%',
          backgroundColor: c.ResultadoAsistencia?.tablaBg ?? c.background,
          alignItems: 'center',
        }}>
          <ThemedText type="title" style={{ color: c.ResultadoAsistencia?.previewTitle, marginBottom: 4, fontSize: 20 * fontScale, alignContent: 'center' }}>
            {"Nombre del evento: '"+nombreEvento+"'"}
          </ThemedText>
          <View style={{ width: '100%', maxWidth: 420, alignItems: 'center' }}>
            <ThemedText style={{ color: c.text, fontWeight: 'bold', marginBottom: 2, fontSize: 15 * fontScale }}>
              Nombre del evento
            </ThemedText>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: c.ResultadoAsistencia?.infoInputBorder,
                backgroundColor: c.ResultadoAsistencia?.infoInputBg,
                color: c.ResultadoAsistencia?.infoInputText,
                borderRadius: 24,
                paddingVertical: 10,
                paddingHorizontal: 18,
                fontSize: 16 * fontScale,
                marginBottom: 8,
                width: '100%',
                maxWidth: 350,
                textAlign: 'center',
              }}
              value={nombreEvento}
              onChangeText={setNombreEvento}
              placeholder="Nombre del evento"
              placeholderTextColor={c.ResultadoAsistencia?.infoInputText}
            />
            <ThemedText style={{ color: c.text, fontWeight: 'bold', marginBottom: 2, fontSize: 15 * fontScale }}>
              Nombre de la columna
            </ThemedText>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: c.ResultadoAsistencia?.infoInputBorder,
                backgroundColor: c.ResultadoAsistencia?.infoInputBg,
                color: c.ResultadoAsistencia?.infoInputText,
                borderRadius: 24,
                paddingVertical: 10,
                paddingHorizontal: 18,
                fontSize: 16 * fontScale,
                marginBottom: 4,
                width: '100%',
                maxWidth: 350,
                textAlign: 'center',
              }}
              value={nombreColumna}
              onChangeText={setNombreColumna}
              placeholder={`Nombre de la columna (por defecto: ${fechaEvento})`}
              placeholderTextColor={c.ResultadoAsistencia?.infoInputText}
            />
          </View>
        </View>
        <View style={{ width: '100%', flex: 1, minHeight: 200 }}>
          <ThemedText style={{ 
            fontWeight: 'bold', 
            fontSize: 16 * fontScale, 
            marginBottom: 8 * fontScale,
            color: c.text
          }}>
            Lista de nombres obtenidos:
          </ThemedText>
          <ScrollView horizontal style={{ width: '100%' }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border,
                backgroundColor: '#fff',
                minWidth: 480,
                maxWidth: 900,
                alignSelf: 'center',
                flex: 1,
              }}
            >
              {excelData.length > 0 && (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    {excelData[0].map((col, idx) => (
                      <View
                        key={idx}
                        style={{
                          borderWidth: 1,
                          borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border,
                          backgroundColor: '#f3f6fa',
                          width: idx === 1 ? 260 : 80,
                          minHeight: 44,
                          justifyContent: 'center',
                          paddingHorizontal: 8,
                        }}
                      >
                        <ThemedText
                          style={{
                            fontWeight: 'bold',
                            fontSize: 15 * fontScale,
                            color: c.ResultadoAsistencia?.tablaHeaderText ?? c.text,
                            textAlign: idx === 1 ? 'left' : 'center',
                          }}
                        >
                          {col}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                  <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={true}
                  >
                    {excelData.slice(1).length === 0 ? (
                      <View style={{ padding: 16 }}>
                        <ThemedText style={{ 
                          color: c.ResultadoAsistencia?.tablaCellText ?? c.text, 
                          textAlign: 'center', 
                          fontSize: 14 * fontScale 
                        }}>
                          No se detectaron nombres.
                        </ThemedText>
                      </View>
                    ) : (
                      excelData.slice(1).map((fila, idx) => {
                        const celdas = [];
                        for (let j = 0; j < excelData[0].length; j++) {
                          celdas.push(
                            <View
                              key={j}
                              style={{
                                borderWidth: 1,
                                borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border,
                                backgroundColor: '#fff',
                                width: j === 1 ? 260 : 80,
                                minHeight: 44,
                                justifyContent: 'center',
                                paddingHorizontal: 8,
                              }}
                            >
                              {j === 2 ? (
                                <Ionicons 
                                  name="checkmark" 
                                  size={22 * fontScale} 
                                  color={c.ResultadoAsistencia?.checkIcon ?? c.success} 
                                  style={{ alignSelf: 'center' }}
                                />
                              ) : (
                                <ThemedText
                                  style={{
                                    fontSize: 14 * fontScale,
                                    color: c.ResultadoAsistencia?.tablaCellText ?? c.text,
                                    textAlign: j === 1 ? 'left' : 'center',
                                  }}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                >
                                  {fila[j] ?? ''}
                                </ThemedText>
                              )}
                            </View>
                          );
                        }
                        return (
                          <View key={idx} style={{ flexDirection: 'row' }}>
                            {celdas}
                          </View>
                        );
                      })
                    )}
                  </ScrollView>
                </>
              )}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 18 * fontScale,
            marginTop: 18 * fontScale,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          <TouchableOpacity
            style={{
              flexGrow: 1,
              minWidth: 160,
              borderRadius: 12,
              paddingVertical: 12 * fontScale,
              paddingHorizontal: 24 * fontScale,
              alignItems: 'center',
              backgroundColor: c.ResultadoAsistencia?.btnCancelarBg,
              marginBottom: 0,
            }}
            onPress={handleCancelar}
          >
            <ThemedText style={{
              color: c.ResultadoAsistencia?.btnCancelarText,
              fontWeight: 'bold',
              fontSize: 16 * fontScale
            }}>
              Cancelar
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexGrow: 1,
              minWidth: 160,
              borderRadius: 12,
              paddingVertical: 12 * fontScale,
              paddingHorizontal: 24 * fontScale,
              alignItems: 'center',
              backgroundColor: c.ResultadoAsistencia?.btnContinuarBg,
              marginBottom: 0,
            }}
            onPress={handleFinalizar}
          >
            <ThemedText style={{
              color: c.ResultadoAsistencia?.btnContinuarText,
              fontWeight: 'bold',
              fontSize: 16 * fontScale
            }}>
              Continuar
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}

function ResultadoAsistenciaScreenWrapper() {
  return (
    <CopilotProvider
      overlay="svg"
      animated
      tooltipStyle={{ borderRadius: 12, padding: 12 }}
      labels={{
        finish: 'Listo',
        next: 'Siguiente',
        previous: 'Anterior',
        skip: 'Saltar',
      }}
      stepNumberComponent={() => null}
    >
      <ResultadoAsistenciaScreen />
    </CopilotProvider>
  );
}

export default ResultadoAsistenciaScreenWrapper;