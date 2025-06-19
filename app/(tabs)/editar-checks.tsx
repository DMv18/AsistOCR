import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { read, utils, write } from 'xlsx';

export default function EditarChecksScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventoId = typeof params.eventoId === 'string' ? params.eventoId : '';
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = Colors[colorMode][theme];

  const [tabla, setTabla] = useState<string[][]>([]);
  const [colNombre, setColNombre] = useState<number>(-1);
  const [loading, setLoading] = useState(true);
  const [nombres, setNombres] = useState<string[]>([]);
  const [nombreSeleccionado, setNombreSeleccionado] = useState<string | null>(null);
  const [asistencias, setAsistencias] = useState<boolean[]>([]);
  const [colAsistencias, setColAsistencias] = useState<number[]>([]);

  // Cargar Excel
  useEffect(() => {
    if (!eventoId) return;
    setLoading(true);
    fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId)}`)
      .then(res => res.blob())
      .then(blob => {
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
            const tablaArr = utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
            setTabla(tablaArr);
            const idxNombre = tablaArr[0].findIndex(h => h && h.toLowerCase().includes('nombre'));
            setColNombre(idxNombre);
            // Encuentra columnas de asistencia (✓/x)
            const colsAsist = tablaArr[0]
              .map((_, idx) =>
                idx !== idxNombre && tablaArr.slice(1).some(fila => ['✓', 'x', '', undefined].includes((fila[idx] ?? '').toString().trim()))
                  ? idx
                  : null
              )
              .filter(idx => idx !== null) as number[];
            setColAsistencias(colsAsist);
            // Lista de nombres
            if (idxNombre !== -1) {
              setNombres(tablaArr.slice(1).map(fila => String(fila[idxNombre] ?? '')));
            } else {
              setNombres([]);
            }
          } catch {
            setTabla([]);
            setColNombre(-1);
            setColAsistencias([]);
            setNombres([]);
          }
          setLoading(false);
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch(() => {
        setTabla([]);
        setColNombre(-1);
        setColAsistencias([]);
        setNombres([]);
        setLoading(false);
      });
  }, [eventoId]);

  // Cuando selecciona un nombre, carga su fila de asistencias
  useEffect(() => {
    if (!nombreSeleccionado || !tabla.length || colNombre === -1 || !colAsistencias.length) return;
    const filaIdx = tabla.findIndex((fila, i) => i > 0 && String(fila[colNombre] ?? '') === nombreSeleccionado);
    if (filaIdx === -1) return;
    const fila = tabla[filaIdx];
    setAsistencias(
      colAsistencias.map(idx => String(fila[idx] ?? '').trim() === '✓')
    );
  }, [nombreSeleccionado, tabla, colNombre, colAsistencias]);

  // Guardar cambios
  const handleGuardar = async () => {
    if (!nombreSeleccionado || !tabla.length || colNombre === -1 || !colAsistencias.length) return;
    const filaIdx = tabla.findIndex((fila, i) => i > 0 && String(fila[colNombre] ?? '') === nombreSeleccionado);
    if (filaIdx === -1) return;
    const nuevaTabla = tabla.map(fila => [...fila]);
    colAsistencias.forEach((colIdx, i) => {
      nuevaTabla[filaIdx][colIdx] = asistencias[i] ? '✓' : 'x';
    });

    try {
      const ws = utils.aoa_to_sheet(nuevaTabla);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = write(wb, { type: 'base64', bookType: 'xlsx' });
      const formData = new FormData();
      formData.append('file', {
        uri: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${wbout}`,
        name: eventoId,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      } as any);

      await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId)}`, {
        method: 'PUT',
        body: formData,
      });

      Alert.alert('Éxito', 'Asistencia actualizada correctamente.');
      setNombreSeleccionado(null);
      // Recarga la tabla para reflejar cambios
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch {
      Alert.alert('Error', 'No se pudo guardar la asistencia.');
    }
  };

  if (loading) {
    return (
      <AppLayout description="Editando asistencia...">
        <ThemedText style={{ textAlign: 'center', marginTop: 32 }}>Cargando...</ThemedText>
      </AppLayout>
    );
  }

  if (!tabla.length || colNombre === -1) {
    return (
      <AppLayout description="Editando asistencia...">
        <ThemedText style={{ textAlign: 'center', marginTop: 32, color: c.danger }}>
          No se pudo cargar la tabla de asistencia.
        </ThemedText>
      </AppLayout>
    );
  }

  return (
    <AppLayout description="Selecciona un nombre para editar su asistencia.">
      <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
        {!nombreSeleccionado ? (
          <ScrollView style={{ width: '100%', maxHeight: 300 }}>
            {nombres.map((nombre, idx) => (
              <TouchableOpacity
                key={nombre + idx}
                style={{
                  padding: 14,
                  borderBottomWidth: idx < nombres.length - 1 ? 1 : 0,
                  borderColor: c.border,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                }}
                onPress={() => setNombreSeleccionado(nombre)}
              >
                <ThemedText style={{
                  color: c.text,
                  fontWeight: 'bold',
                  fontSize: 16 * fontScale,
                }}>
                  {nombre}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 16 * fontScale, marginBottom: 8 }}>
              Editando asistencia de: {nombreSeleccionado}
            </ThemedText>
            {/* Tabla de encabezado y checkboxes */}
            <ScrollView horizontal style={{ width: '100%' }}>
              <View>
                {/* Encabezado */}
                <View style={{ flexDirection: 'row', backgroundColor: c.card }}>
                  {colAsistencias.map((colIdx, idx) => (
                    <View
                      key={colIdx}
                      style={{
                        borderWidth: 1,
                        borderColor: c.border,
                        backgroundColor: '#f3f6fa',
                        width: 100,
                        minHeight: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 8,
                      }}
                    >
                      <ThemedText style={{
                        fontWeight: 'bold',
                        fontSize: 15 * fontScale,
                        color: c.text,
                        textAlign: 'center',
                      }}>
                        {tabla[0][colIdx]}
                      </ThemedText>
                    </View>
                  ))}
                </View>
                {/* Fila de checkboxes */}
                <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
                  {colAsistencias.map((colIdx, idx) => (
                    <TouchableOpacity
                      key={colIdx}
                      style={{
                        borderWidth: 1,
                        borderColor: c.border,
                        width: 100,
                        minHeight: 44,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                      }}
                      onPress={() => {
                        setAsistencias(asist =>
                          asist.map((val, i) => i === idx ? !val : val)
                        );
                      }}
                    >
                      <Ionicons
                        name={asistencias[idx] ? 'checkmark-circle' : 'close-circle'}
                        size={28}
                        color={asistencias[idx] ? c.success : c.danger}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            {/* Botones */}
            <View style={{ flexDirection: 'row', gap: 18, marginTop: 18 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: c.btnPrimary,
                  borderRadius: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  alignItems: 'center',
                }}
                onPress={handleGuardar}
              >
                <ThemedText style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16 }}>Guardar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: c.btnDanger,
                  borderRadius: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  alignItems: 'center',
                }}
                onPress={() => setNombreSeleccionado(null)}
              >
                <ThemedText style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16 }}>Cancelar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </AppLayout>
  );
}
