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

            // Calcular el ancho de cada columna según el dato más largo
            if (Array.isArray(json) && json.length > 0) {
              const colCount = Math.max(...json.map((row: any) => row.length));
              const widths: number[] = [];
              // Asegura que json es tratado como any[][] para evitar errores de tipo
              const jsonArray = json as any[][];
              for (let col = 0; col < colCount; col++) {
                let maxLen = 0;
                for (let row = 0; row < jsonArray.length; row++) {
                  const cell = jsonArray[row][col];
                  const len = (cell ? String(cell) : '').length;
                  if (len > maxLen) maxLen = len;
                }
                // Ajusta el ancho mínimo y máximo en px (aprox. 8px por caracter)
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
        // Usa readAsArrayBuffer para máxima compatibilidad
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
        {/* Elimina el botón para seleccionar archivo Excel local */}
        {/* Encabezado con nombre y fecha */}
        <View style={[styles.headerBlock, { backgroundColor: c.appLayoutGreenBlock }]}>
          <View style={styles.headerInfo}>
            <View style={styles.headerCol}>
              <ThemedText style={[styles.headerLabel, { color: c.text }]}>Nombre del evento:</ThemedText>
              <ThemedText style={[styles.headerValue, { color: c.text }]}>
                {nombreEvento || 'Sin nombre'}
              </ThemedText>
            </View>
            <View style={styles.headerCol}>
              <ThemedText style={[styles.headerLabel, { color: c.text }]}>Creación del evento:</ThemedText>
              <ThemedText style={[styles.headerValue, { color: c.text }]}>
                {fecha || 'Sin fecha'}
              </ThemedText>
            </View>
          </View>
        </View>
        {/* Tabla con el contenido del Excel */}
        <ScrollView horizontal style={{ width: '100%' }}>
          <View style={[styles.tabla, { borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border, backgroundColor: c.ResultadoAsistencia?.tablaBg ?? c.card }]}>
            {loading ? (
              <View style={{ padding: 32, alignItems: 'center' }}>
                <ActivityIndicator color={c.accent} />
                <ThemedText style={{ color: c.text, marginTop: 12 }}>Cargando...</ThemedText>
              </View>
            ) : (
              <>
                {excelData.length > 0 && Array.isArray(excelData[0]) ? (
                  <>
                    <View style={[styles.tablaHeader, { borderColor: c.ResultadoAsistencia?.tablaBorder ?? c.border }]}>
                      {excelData[0].map((col, idx) => (
                        <ThemedText
                          key={idx}
                          style={[
                            styles.tablaHeaderCell,
                            { color: c.ResultadoAsistencia?.tablaHeaderText ?? c.text, width: colWidths[idx] ?? 120 }
                          ]}
                        >
                          {col}
                        </ThemedText>
                      ))}
                    </View>
                    <ScrollView style={{ maxHeight: 260 }}>
                      {excelData.slice(1).map((fila, idx) => (
                        <View key={idx} style={[styles.tablaRow, { borderColor: c.ResultadoAsistencia?.tablaRowBorder ?? c.border }]}>
                          {Array.isArray(fila) ? fila.map((celda, j) => (
                            <ThemedText
                              key={j}
                              style={[
                                styles.tablaCell,
                                {
                                  color: c.ResultadoAsistencia?.tablaCellText ?? c.text,
                                  width: colWidths[j] ?? 120,
                                  textAlign:
                                    excelData[0][j]?.toString().toLowerCase().includes('nombre')
                                      ? 'left'
                                      : 'center'
                                }
                              ]}
                            >
                              {celda}
                            </ThemedText>
                          )) : null}
                        </View>
                      ))}
                    </ScrollView>
                  </>
                ) : (
                  <View style={{ padding: 24, alignItems: 'center' }}>
                    <ThemedText style={{ color: c.text, textAlign: 'center' }}>
                      No se pudo leer el contenido del archivo o está vacío.
                    </ThemedText>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
        {/* Botones de acción */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.btnEditar }]}
            onPress={() => router.push({ pathname: '/editar-evento', params: { id: nombreArchivo } })}
            accessibilityLabel="Editar"
          >
            <Ionicons name="pencil" size={20} color={c.btnText} />
            <ThemedText style={[styles.btnText, { color: c.btnText }]}>Editar</ThemedText>
          </TouchableOpacity>
          {/* Botón de regresar eliminado */}
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
    // textAlign se ajusta dinámicamente en el render
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

