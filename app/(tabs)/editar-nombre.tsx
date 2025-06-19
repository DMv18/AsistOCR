import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { read, utils, write } from 'xlsx';

export default function EditarNombreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventoId = typeof params.eventoId === 'string' ? params.eventoId : '';
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = Colors[colorMode][theme];

  const [nombres, setNombres] = useState<string[]>([]);
  const [nombreSeleccionado, setNombreSeleccionado] = useState<string | null>(null);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar nombres del Excel
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
            // Usar sheet_to_json para obtener objetos con encabezados
            const tabla = utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
            const colNombre = tabla[0].findIndex(h => h && h.toLowerCase().includes('nombre'));
            if (colNombre === -1) {
              setNombres([]);
              setLoading(false);
              return;
            }
            const nombresLista = tabla.slice(1).map(fila => fila[colNombre]).filter(Boolean);
            setNombres(nombresLista);
          } catch {
            setNombres([]);
          }
          setLoading(false);
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch(() => {
        setNombres([]);
        setLoading(false);
      });
  }, [eventoId]);

  const handleReemplazar = async () => {
    if (!nombreSeleccionado || !nuevoNombre.trim()) {
      Alert.alert('Error', 'Selecciona un nombre y escribe el nuevo nombre.');
      return;
    }
    if (nombres.some(n => n.trim().toLowerCase() === nuevoNombre.trim().toLowerCase())) {
      Alert.alert('Error', 'El nuevo nombre ya existe en la lista.');
      return;
    }
    setLoading(true);
    try {
      // Descargar y modificar el Excel
      const res = await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId)}`);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = async (e: any) => {
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
          // Trabaja como array de arrays para mantener encabezados y filas
          const tabla = utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
          const colNombre = tabla[0].findIndex(h => h && h.toLowerCase().includes('nombre'));
          if (colNombre === -1) throw new Error('No se encontró la columna de nombres');

          // Debug: imprime antes
          console.log('ANTES:', tabla.map(fila => fila[colNombre]));

          // Reemplaza el nombre solo en la columna correcta
          let reemplazado = false;
          for (let i = 1; i < tabla.length; i++) {
            if (
              typeof tabla[i][colNombre] === 'string' &&
              tabla[i][colNombre].trim() === nombreSeleccionado
            ) {
              tabla[i][colNombre] = nuevoNombre.trim();
              reemplazado = true;
            }
          }

          // Debug: imprime después
          console.log('DESPUÉS:', tabla.map(fila => fila[colNombre]));

          if (!reemplazado) {
            Alert.alert('Error', 'No se encontró el nombre a reemplazar en el archivo.');
            setLoading(false);
            return;
          }

          // Reconstruye la hoja y el libro
          const ws = utils.aoa_to_sheet(tabla);
          const wb = utils.book_new();
          utils.book_append_sheet(wb, ws, sheetName);
          const wbout = write(wb, { type: 'base64', bookType: 'xlsx' });
          const formData = new FormData();
          formData.append('file', {
            uri: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${wbout}`,
            name: eventoId,
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          } as any);

          // Debug: imprime nombre de archivo y tamaño
          console.log('Subiendo archivo:', eventoId, 'Tamaño base64:', wbout.length);

          const putRes = await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoId)}`, {
            method: 'PUT',
            body: formData,
          });

          if (!putRes.ok) {
            Alert.alert('Error', 'No se pudo guardar el archivo en el servidor.');
            setLoading(false);
            return;
          }

          Alert.alert('Éxito', 'Nombre reemplazado correctamente.');
          router.back();
        } catch (err) {
          Alert.alert('Error', 'No se pudo reemplazar el nombre.');
        }
        setLoading(false);
      };
      reader.readAsArrayBuffer(blob);
    } catch {
      setLoading(false);
      Alert.alert('Error', 'No se pudo reemplazar el nombre.');
    }
  };

  return (
    <AppLayout description="Editar nombre de la lista">
      <View style={{ width: '100%', alignItems: 'center', padding: 12 }}>
        <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Selecciona el nombre a editar</ThemedText>
        <View style={{
          width: '100%',
          maxWidth: 400,
          borderWidth: 1,
          borderColor: c.border,
          borderRadius: 12,
          marginBottom: 18,
          backgroundColor: c.card,
        }}>
          <ScrollView style={{ maxHeight: 180 }}>
            {nombres.map((nombre, idx) => (
              <TouchableOpacity
                key={nombre + idx}
                style={{
                  padding: 12,
                  borderBottomWidth: idx < nombres.length - 1 ? 1 : 0,
                  borderColor: c.border,
                  backgroundColor: nombreSeleccionado === nombre ? c.btnPrimary : 'transparent',
                }}
                onPress={() => setNombreSeleccionado(nombre)}
              >
                <ThemedText style={{
                  color: nombreSeleccionado === nombre ? c.btnText : c.text,
                  fontWeight: nombreSeleccionado === nombre ? 'bold' : 'normal',
                  fontSize: 16 * fontScale,
                }}>
                  {nombre}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <ThemedText style={{ fontWeight: 'bold', marginBottom: 4, color: c.text }}>Nuevo nombre:</ThemedText>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: c.border,
            borderRadius: 8,
            padding: 8,
            marginBottom: 12,
            color: c.text,
            backgroundColor: c.inputBg,
            width: '100%',
            maxWidth: 350,
            fontSize: 16 * fontScale,
          }}
          value={nuevoNombre}
          onChangeText={setNuevoNombre}
          placeholder="Ingrese el nuevo nombre"
          placeholderTextColor={c.inputPlaceholder}
        />
        <TouchableOpacity
          style={{
            backgroundColor: c.btnPrimary,
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
            marginBottom: 8,
            width: '100%',
            maxWidth: 350,
          }}
          onPress={handleReemplazar}
          disabled={!nombreSeleccionado || !nuevoNombre.trim() || loading}
        >
          <ThemedText style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16 }}>Reemplazar</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: c.EditarEvento?.regresarBtn ?? c.btnSecondary,
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
            width: '100%',
            maxWidth: 350,
          }}
          onPress={() => router.back()}
        >
          <ThemedText style={{ color: c.EditarEvento?.regresarBtnText ?? c.btnText }}>Cancelar</ThemedText>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

