import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { read, utils } from 'xlsx';

export default function VerAsistenciaScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const [loading, setLoading] = useState(true);
  const [excelData, setExcelData] = useState<string[][]>([]);
  const [fecha, setFecha] = useState('');
  const [nombreEvento, setNombreEvento] = useState('');
  const [colWidths, setColWidths] = useState<number[]>([]);
  const nombreArchivo = typeof params.nombre === 'string' ? params.nombre : '';

  useEffect(() => {
    if (!nombreArchivo) {
      setLoading(false);
      setNombreEvento('');
      setFecha('');
      setExcelData([]);
      return;
    }
    setLoading(true);
    fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(nombreArchivo)}`, {
      cache: 'no-store'
    })
      .then(async res => {
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const data = e.target.result;
            let workbook;
            if (typeof data === 'string') {
              workbook = read(data, { type: 'binary' });
            } else {
              const uint8Array = new Uint8Array(data);
              workbook = read(uint8Array, { type: 'array' });
            }
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = utils.sheet_to_json(worksheet, { header: 1 });
            setExcelData(json as string[][]);

            if (Array.isArray(json) && json.length > 0) {
              const colCount = Math.max(...json.map((row: any) => row.length));
              const widths: number[] = [];
              const jsonArray = json as any[][];
              for (let col = 0; col < colCount; col++) {
                let maxLen = 0;
                for (let row = 0; row < jsonArray.length; row++) {
                  const cell = jsonArray[row][col];
                  const len = (cell ? String(cell) : '').length;
                  if (len > maxLen) maxLen = len;
                }
                widths.push(Math.min(Math.max(maxLen * 8 + 24, 80), 260));
              }
              setColWidths(widths);
            } else {
              setColWidths([]);
            }

            setNombreEvento(nombreArchivo.replace('.xlsx', ''));
            setFecha(extraerFecha(nombreArchivo));
          } catch (err) {
            console.error('Error leyendo el archivo Excel:', err);
            setExcelData([]);
            setNombreEvento(nombreArchivo.replace('.xlsx', ''));
            setFecha(extraerFecha(nombreArchivo));
          }
          setLoading(false);
        };
        reader.onerror = (err) => {
          console.error('Error leyendo el archivo Excel:', err);
          setExcelData([]);
          setNombreEvento(nombreArchivo.replace('.xlsx', ''));
          setFecha(extraerFecha(nombreArchivo));
          setLoading(false);
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch((err) => {
        console.error('Error al obtener datos:', err);
        setExcelData([]);
        setNombreEvento(nombreArchivo.replace('.xlsx', ''));
        setFecha(extraerFecha(nombreArchivo));
        setLoading(false);
      });
  }, [nombreArchivo]);

  function extraerFecha(nombre: string): string {
    const match = nombre.match(/(\d{2}[-_.]\d{2}[-_.]\d{4})/);
    if (match) {
      return match[1].replace(/[-_.]/g, '/');
    }
    return '';
  }

  return (
    <AppLayout description={`Historial de "${nombreEvento}"`}>
      <View style={[styles.card, { backgroundColor: c.card }]}>
        <View style={[styles.headerBlock, { backgroundColor: c.appLayoutGreenBlock }]}>
          <View style={styles.headerInfo}>
            <View style={styles.headerCol}>
              <ThemedText style={[styles.headerLabel, { color: c.text }]}>Nombre del evento:</ThemedText>
              <ThemedText style={[styles.headerValue, { color: c.text }]}>
                {nombreEvento || 'Sin nombre'}
              </ThemedText>
            </View>

          </View>
        </View>
        <View style={{ width: '100%', flex: 1, minHeight: 200 }}>
          <ScrollView horizontal style={{ width: '100%' }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border,
                backgroundColor: c.ResultadoAsistencia?.tablaBg ?? '#fff',
                minWidth: 480,
                maxWidth: 900,
                alignSelf: 'center',
                flex: 1,
              }}
            >
              {loading ? (
                <View style={{ padding: 32, alignItems: 'center' }}>
                  <ActivityIndicator color={c.accent} />
                  <ThemedText style={{ color: c.text, marginTop: 12 }}>Cargando...</ThemedText>
                </View>
              ) : (
                <>
                  {excelData && Array.isArray(excelData) && excelData.length > 0 && Array.isArray(excelData[0]) && excelData[0].length > 0 ? (
                    <>
                      <View style={{ flexDirection: 'row' }}>
                        {excelData[0].map((col, idx) => (
                          <View
                            key={idx}
                            style={{
                              borderWidth: 1,
                              borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border,
                              backgroundColor: c.ResultadoAsistencia?.tablaHeaderText ? '#f3f6fa' : '#f3f6fa',
                              width: colWidths[idx] ?? (idx === 1 ? 260 : 80),
                              minHeight: 44,
                              justifyContent: 'center',
                              alignItems: idx === 1 ? 'flex-start' : 'center',
                              paddingHorizontal: 8,
                            }}
                          >
                            <ThemedText
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
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
                        {excelData.slice(1).map((fila, idx) => (
                          <View key={idx} style={{ flexDirection: 'row' }}>
                            {excelData[0].map((_, j) => (
                              <View
                                key={j}
                                style={{
                                  borderWidth: 1,
                                  borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border,
                                  backgroundColor: c.ResultadoAsistencia?.tablaBg ?? '#fff',
                                  width: colWidths[j] ?? (j === 1 ? 260 : 80),
                                  minHeight: 44,
                                  justifyContent: 'center',
                                  alignItems: j === 1 ? 'flex-start' : 'center',
                                  paddingHorizontal: 8,
                                }}
                              >
                                <ThemedText
                                  style={{
                                    fontSize: 14,
                                    color: c.ResultadoAsistencia?.tablaCellText ?? c.text,
                                    textAlign: j === 1 ? 'left' : 'center',
                                  }}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                >
                                  {fila[j] ?? ''}
                                </ThemedText>
                              </View>
                            ))}
                          </View>
                        ))}
                      </ScrollView>
                    </>
                  ) : (
                    <View style={{ padding: 32, alignItems: 'center' }}>
                      <ThemedText style={{ color: c.danger, textAlign: 'center', fontWeight: 'bold' }}>
                        No se detectó ninguna tabla válida en el archivo.
                      </ThemedText>
                      <ThemedText style={{ color: c.inputPlaceholder, textAlign: 'center', marginTop: 8 }}>
                        Verifica que el archivo tenga al menos una fila de encabezado y datos.
                      </ThemedText>
                    </View>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.btnEditar }]}
            onPress={() => router.push({ pathname: '/editar-evento', params: { id: nombreArchivo } })}
            accessibilityLabel="Editar"
          >
            <Ionicons name="pencil" size={20} color={c.btnText} />
            <ThemedText style={[styles.btnText, { color: c.btnText }]}>Editar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  headerBlock: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    width: '100%',
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 24,
    width: '100%',
    justifyContent: 'space-between',
  },
  headerCol: {
    flex: 1,
    minWidth: 120,
  },
  headerLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  headerValue: {
    fontSize: 15,
    marginBottom: 2,
  },
  tabla: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 8,
    minWidth: 480,
    marginTop: 8,
    marginBottom: 8,
  },
  tablaHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 4,
  },
  tablaHeaderCell: {
    flex: 0,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    minWidth: 80,
    maxWidth: 260,
    paddingHorizontal: 4,
  },
  tablaRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    minHeight: 28,
    alignItems: 'center',
  },
  tablaCell: {
    flex: 0,
    fontSize: 14,
    minWidth: 80,
    maxWidth: 260,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 18,
    width: '100%',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
   