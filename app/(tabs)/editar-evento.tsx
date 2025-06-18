import { AppLayout } from '@/components/AppLayout';
import { FormularioAsistencia } from '@/components/FormularioAsistencia';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { read, utils, write } from 'xlsx';

export default function EditarEventoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventoId = params.id as string | undefined;
  const { theme, colorMode } = useThemeCustom();
  // Hereda todos los colores desde Colors
  const c = Colors[colorMode][theme];
  const cEditar = c.EditarEvento;

  const [nombreEvento, setNombreEvento] = useState<string>('');
  const [fechaEvento, setFechaEvento] = useState<string>('');
  const [agregarPersona, setAgregarPersona] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [asistio, setAsistio] = useState(true);
  const [excelData, setExcelData] = useState<string[][]>([]);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [confirmarModal, setConfirmarModal] = useState(false);
  const [agregarListaDia, setAgregarListaDia] = useState(false);
  const [fotoListaDia, setFotoListaDia] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!eventoId) return;
    // Obtener datos del archivo Excel (nombre y fecha)
    fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId)}`, { method: 'HEAD' })
      .then(() => {
        // Extraer nombre y fecha del nombre del archivo
        const nombreSinExtension = eventoId.replace('.xlsx', '');
        setNombreEvento(nombreSinExtension.replace(/(\d{2}[-_.]\d{2}[-_.]\d{4})/, '').replace(/[-_.]+$/, '').trim() || nombreSinExtension);
        const match = eventoId.match(/(\d{2}[-_.]\d{2}[-_.]\d{4})/);
        setFechaEvento(match ? match[1].replace(/[-_.]/g, '/') : '');
      });
  }, [eventoId]);

  // Cargar datos del Excel actual
  const cargarExcel = async () => {
    setLoadingExcel(true);
    try {
      const res = await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId!)}`, { cache: 'no-store' });
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
        } catch {
          setExcelData([]);
        }
        setLoadingExcel(false);
      };
      reader.onerror = () => {
        setExcelData([]);
        setLoadingExcel(false);
      };
      reader.readAsArrayBuffer(blob);
    } catch {
      setExcelData([]);
      setLoadingExcel(false);
    }
  };

  // Al presionar el botón de agregar persona
  const handleAgregarPersona = () => {
    setAgregarPersona(true);
    setNuevoNombre('');
    setAsistio(true);
    cargarExcel();
  };

  // Al confirmar agregar
  const handleConfirmarAgregar = async () => {
    setConfirmarModal(false);
    setLoadingExcel(true);
    try {
      // Construir nueva tabla
      const nuevaFila = [];
      if (excelData.length > 0) {
        for (let i = 0; i < excelData[0].length; i++) {
          const header = excelData[0][i]?.toLowerCase();
          if (header.includes('nombre')) {
            nuevaFila.push(nuevoNombre);
          } else if (header.match(/n[°º]/i)) {
            nuevaFila.push((excelData.length).toString());
          } else {
            nuevaFila.push(asistio ? '✓' : '');
          }
        }
      }
      const nuevaTabla = [...excelData, nuevaFila];

      // Enviar al backend para sobrescribir el archivo
      const formData = new FormData();
      const ws = utils.aoa_to_sheet(nuevaTabla);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = write(wb, { type: 'base64', bookType: 'xlsx' });
      formData.append('file', {
        uri: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${wbout}`,
        name: eventoId,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      } as any);

      // Usa PUT y no pongas Content-Type manualmente
      const res = await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId!)}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('No se pudo guardar el archivo en el servidor');
      }

      setAgregarPersona(false);
      setLoadingExcel(false);
      router.back();
    } catch (err) {
      setLoadingExcel(false);
      Alert.alert('Error', 'No se pudo agregar el nombre al archivo: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  };

  // Nuevo flujo para agregar lista del día
  const handleAgregarListaDia = () => {
    setAgregarListaDia(true);
    setFotoListaDia(undefined);
  };

  // Cuando se sube y procesa la imagen, navega a agregar-asistencia
  const handleProcesarListaDia = (uri: string) => {
    router.push({
      pathname: '/agregar-asistencia',
      params: { eventoId, uri }
    });
  };

  const opciones = [
    {
      icon: 'person-add-outline',
      texto: 'Agregar una nueva persona a la lista',
      bg: cEditar.opcion1Bg,
      iconBg: cEditar.icon1Bg,
      onPress: handleAgregarPersona,
    },
    {
      icon: 'grid-outline',
      texto: 'Realizar cambios a la tabla',
      bg: cEditar.opcion2Bg,
      iconBg: cEditar.icon2Bg,
      onPress: () => {},
    },
    {
      icon: 'document-attach-outline',
      texto: 'Agregar una nueva lista del día para su registro',
      bg: cEditar.opcion3Bg,
      iconBg: cEditar.icon3Bg,
      onPress: handleAgregarListaDia,
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
      {!agregarPersona && !agregarListaDia ? (
        <>
          <View style={[styles.greenBlock, { backgroundColor: cEditar.greenBlock }]}>
            {opciones.map((op, idx) => (
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
      ) : agregarPersona ? (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Lista actual</ThemedText>
          {loadingExcel ? (
            <ActivityIndicator color={c.text} />
          ) : (
            <View style={{ width: '100%', flex: 1, minHeight: 200 }}>
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
                      {/* Header */}
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
                      {/* Filas */}
                      <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={true}
                      >
                        {excelData.slice(1).map((fila, idx) => {
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
                            );
                          }
                          return (
                            <View key={idx} style={{ flexDirection: 'row' }}>
                              {celdas}
                            </View>
                          );
                        })}
                      </ScrollView>
                    </>
                  )}
                </View>
              </ScrollView>
            </View>
          )}
          <View style={{ width: '100%', marginBottom: 12 }}>
            <ThemedText style={{ fontWeight: 'bold', marginBottom: 4, color: c.text }}>Nuevo nombre:</ThemedText>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: c.border,
                borderRadius: 8,
                padding: 8,
                marginBottom: 8,
                color: c.text,
                backgroundColor: c.inputBg,
              }}
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              placeholder="Ingrese el nombre"
              placeholderTextColor={c.inputPlaceholder}
            />
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
              onPress={() => setAsistio(a => !a)}
            >
              <Ionicons
                name={asistio ? 'checkbox-outline' : 'square-outline'}
                size={22}
                color={c.text}
                style={{ marginRight: 8 }}
              />
              <ThemedText style={{ color: c.text }}>Asistió?</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: c.btnPrimary,
                borderRadius: 10,
                paddingVertical: 12,
                alignItems: 'center',
                marginBottom: 8,
              }}
              onPress={() => setConfirmarModal(true)}
              disabled={!nuevoNombre.trim()}
            >
              <ThemedText style={{ color: c.btnText, fontWeight: 'bold' }}>Continuar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: cEditar.regresarBtn,
                borderRadius: 10,
                paddingVertical: 12,
                alignItems: 'center',
              }}
              onPress={() => setAgregarPersona(false)}
            >
              <ThemedText style={{ color: cEditar.regresarBtnText }}>Cancelar</ThemedText>
            </TouchableOpacity>
          </View>
          {/* Modal de confirmación */}
          <Modal
            visible={confirmarModal}
            transparent
            animationType="fade"
            onRequestClose={() => setConfirmarModal(false)}
          >
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.15)',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                backgroundColor: c.card,
                borderRadius: 14,
                padding: 24,
                alignItems: 'center',
                minWidth: 260,
                elevation: 8,
              }}>
                <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: c.text }}>
                  ¿Está seguro de agregar este nuevo nombre?
                </ThemedText>
                <ThemedText style={{ fontSize: 15, marginBottom: 18, color: c.inputPlaceholder }}>
                  Se agregará &quot;{nuevoNombre}&quot; a la lista.
                </ThemedText>
                <View style={{ flexDirection: 'row', gap: 18 }}>
                  <TouchableOpacity
                    style={{
                      minWidth: 90,
                      borderRadius: 8,
                      paddingVertical: 10,
                      alignItems: 'center',
                      marginHorizontal: 6,
                      backgroundColor: c.btnPrimary
                    }}
                    onPress={handleConfirmarAgregar}
                  >
                    <ThemedText style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16 }}>Sí, agregar</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      minWidth: 90,
                      borderRadius: 8,
                      paddingVertical: 10,
                      alignItems: 'center',
                      marginHorizontal: 6,
                      backgroundColor: cEditar.regresarBtn
                    }}
                    onPress={() => setConfirmarModal(false)}
                  >
                    <ThemedText style={{ color: cEditar.regresarBtnText, fontWeight: 'bold', fontSize: 16 }}>Cancelar</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        // Flujo para agregar lista del día (subir imagen y procesar)
        <FormularioAsistencia
          fotoCamara={fotoListaDia}
          onProcesar={(uri: string) => handleProcesarListaDia(uri)}
          modoAgregarListaDia
        />
      )}
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
 
