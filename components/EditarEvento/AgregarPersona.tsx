import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { read, utils, write } from 'xlsx';

type Props = {
  eventoId: string;
  onSalir: () => void;
};

export function AgregarPersona({ eventoId, onSalir }: Props) {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const [excelData, setExcelData] = useState<string[][]>([]);
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoNombreError, setNuevoNombreError] = useState<string | null>(null);
  const [asistio, setAsistio] = useState(true);
  const [confirmarModal, setConfirmarModal] = useState(false);

  useEffect(() => {
    cargarExcel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventoId]);

  useEffect(() => {
    const trimmed = nuevoNombre.replace(/\s+$/, '');
    if (!trimmed) setNuevoNombreError('El nombre no puede estar vacío.');
    else if (nuevoNombre !== trimmed) setNuevoNombreError('El nombre no puede terminar con espacios.');
    else {
      // Validar que no exista ya el nombre (ignorando mayúsculas/minúsculas y espacios)
      const colNombre = excelData[0]?.findIndex(h => h && h.toLowerCase().includes('nombre'));
      if (colNombre !== undefined && colNombre >= 0) {
        const existe = excelData.slice(1).some(fila => (fila[colNombre] || '').trim().toLowerCase() === trimmed.toLowerCase());
        if (existe) {
          setNuevoNombreError('Ese nombre ya existe en la lista.');
          return;
        }
      }
      setNuevoNombreError(null);
    }
  }, [nuevoNombre, excelData]);

  const cargarExcel = async () => {
    setLoadingExcel(true);
    try {
      const res = await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId)}`, { cache: 'no-store' });
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

  const handleConfirmarAgregar = async () => {
    setConfirmarModal(false);
    setLoadingExcel(true);
    try {
      const nombreFinal = nuevoNombre.replace(/\s+$/, '');
      let nuevaTabla = [...excelData];
      let filaInsertada = false;
      if (excelData.length > 0) {
        const colNombre = excelData[0].findIndex(h => h && h.toLowerCase().includes('nombre'));
        // Buscar la primera fila vacía en la columna de nombre
        for (let i = 1; i < nuevaTabla.length; i++) {
          if (!nuevaTabla[i][colNombre] || nuevaTabla[i][colNombre].trim() === '') {
            for (let j = 0; j < nuevaTabla[0].length; j++) {
              const header = nuevaTabla[0][j]?.toLowerCase();
              if (header.includes('nombre')) {
                nuevaTabla[i][j] = nombreFinal;
              } else if (header.match(/n[°º]/i)) {
                nuevaTabla[i][j] = i.toString();
              } else if (j === nuevaTabla[0].length - 1) {
                nuevaTabla[i][j] = asistio ? '✓' : 'x';
              } else {
                nuevaTabla[i][j] = 'x';
              }
            }
            filaInsertada = true;
            break;
          }
        }
        // Si no hay fila vacía, agrega una nueva
        if (!filaInsertada) {
          const nuevaFila = [];
          for (let i = 0; i < nuevaTabla[0].length; i++) {
            const header = nuevaTabla[0][i]?.toLowerCase();
            if (header.includes('nombre')) {
              nuevaFila.push(nombreFinal);
            } else if (header.match(/n[°º]/i)) {
              nuevaFila.push((nuevaTabla.length).toString());
            } else if (i === nuevaTabla[0].length - 1) {
              nuevaFila.push(asistio ? '✓' : 'x');
            } else {
              nuevaFila.push('x');
            }
          }
          nuevaTabla = [...nuevaTabla, nuevaFila];
        }
      }
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

      await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId)}`, {
        method: 'PUT',
        body: formData,
      });

      setLoadingExcel(false);
      onSalir();
    } catch (err) {
      setLoadingExcel(false);
      alert('No se pudo agregar el nombre al archivo');
    }
  };

  return (
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
        {nuevoNombreError && (
          <ThemedText style={{ color: c.danger, fontSize: 13, marginBottom: 4 }}>{nuevoNombreError}</ThemedText>
        )}
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
          disabled={!nuevoNombre.trim() || !!nuevoNombreError}
        >
          <ThemedText style={{ color: c.btnText, fontWeight: 'bold' }}>Continuar</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: c.EditarEvento.regresarBtn,
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
          }}
          onPress={onSalir}
        >
          <ThemedText style={{ color: c.EditarEvento.regresarBtnText }}>Cancelar</ThemedText>
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
                  backgroundColor: c.EditarEvento.regresarBtn
                }}
                onPress={() => setConfirmarModal(false)}
              >
                <ThemedText style={{ color: c.EditarEvento.regresarBtnText, fontWeight: 'bold', fontSize: 16 }}>Cancelar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
