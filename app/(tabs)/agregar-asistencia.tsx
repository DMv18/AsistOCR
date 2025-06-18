import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { segmentarFilas } from '@/IA/segmentarFilas';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, TextInput, TouchableOpacity, View } from 'react-native';
import { read, utils, write } from 'xlsx';

export default function AgregarAsistenciaScreen() {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const router = useRouter();
  const params = useLocalSearchParams();
  const eventoId = typeof params.eventoId === 'string' ? params.eventoId : '';
  const uri = typeof params.uri === 'string' ? params.uri : '';

  const [fecha, setFecha] = useState(() => {
    const hoy = new Date();
    return hoy.toISOString().slice(0, 10);
  });
  const [procesando, setProcesando] = useState(true);
  const [barra, setBarra] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;
  const [inputVisible, setInputVisible] = useState(false);

  // Guardar los datos procesados para usarlos después
  const [procesado, setProcesado] = useState<{
    nuevosNombres: string[];
    tabla: string[][];
    colNombre: number;
  } | null>(null);

  useEffect(() => {
    if (!eventoId || !uri) return;
    setProcesando(true);
    setInputVisible(false);
    setBarra(0);
    anim.setValue(0);

    let percent = 0;
    let terminado = false;
    const interval = setInterval(() => {
      if (terminado) return;
      percent += Math.floor(Math.random() * 15) + 5;
      if (percent >= 95) percent = 95;
      setBarra(percent);
      Animated.timing(anim, {
        toValue: percent,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 700);

    (async () => {
      try {
        // 1. Procesar la imagen para obtener los nombres detectados
        const resultado = await segmentarFilas(uri);
        const nuevosNombres: string[] = resultado.nombresDetectados || [];

        // 2. Descargar el Excel actual
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
            const tabla = utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

            // Encuentra el índice de la columna "Nombre"
            const colNombre = tabla[0].findIndex(h => h.toLowerCase().includes('nombre'));

            // Guarda los datos para usarlos después
            setProcesado({ nuevosNombres, tabla, colNombre });

            // Termina la barra y muestra el input
            terminado = true;
            setProcesando(false);
            setInputVisible(true);
            setBarra(100);
            anim.setValue(100);
          } catch (err) {
            Alert.alert('Error', 'No se pudo actualizar la asistencia: ' + (err instanceof Error ? err.message : 'Error desconocido'));
            router.back();
          }
        };
        reader.readAsArrayBuffer(blob);
      } catch (err) {
        Alert.alert('Error', 'No se pudo procesar la imagen: ' + (err instanceof Error ? err.message : 'Error desconocido'));
        router.back();
      }
    })();

    return () => {
      clearInterval(interval);
    };
  }, [eventoId, uri, anim, router]);

  const barWidth = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleGuardar = async () => {
    if (!procesado) return;
    try {
      const { nuevosNombres, tabla, colNombre } = procesado;

      // Siempre agrega la nueva columna, aunque el encabezado ya exista
      tabla[0].push(fecha);

      // Para cada nombre detectado
      nuevosNombres.forEach(nombreDetectado => {
        // Busca si ya existe el nombre
        const idx = tabla.findIndex((fila, i) => i > 0 && fila[colNombre]?.trim().toLowerCase() === nombreDetectado.trim().toLowerCase());
        if (idx === -1) {
          // No existe, agrega nueva fila
          const nuevaFila = [];
          for (let i = 0; i < tabla[0].length; i++) {
            if (i === 0) {
              nuevaFila.push((tabla.length).toString()); // N°
            } else if (i === colNombre) {
              nuevaFila.push(nombreDetectado);
            } else if (i === tabla[0].length - 1) {
              nuevaFila.push('✓'); // check en la nueva columna
            } else {
              // Para columnas anteriores, pon 'x'
              nuevaFila.push('x');
            }
          }
          tabla.push(nuevaFila);
        } else {
          // Ya existe, pon check en la nueva columna
          while (tabla[idx].length < tabla[0].length) {
            tabla[idx].push('');
          }
          tabla[idx][tabla[0].length - 1] = '✓';
        }
      });

      // Para los que no están en nuevosNombres, pon 'x' en la nueva columna
      for (let i = 1; i < tabla.length; i++) {
        while (tabla[i].length < tabla[0].length) {
          tabla[i].push('');
        }
        if (!nuevosNombres.some(n => n.trim().toLowerCase() === (tabla[i][colNombre] || '').trim().toLowerCase())) {
          tabla[i][tabla[0].length - 1] = 'x';
        }
      }

      // Sube el nuevo Excel al backend (sobrescribe)
      const ws = utils.aoa_to_sheet(tabla);
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
        method: 'PUT', // <--- Cambia POST por PUT
        body: formData,
        // No pongas headers: Content-Type
      });

      // Redirige a ver-asistencia
      router.replace({ pathname: '/ver-asistencia', params: { nombre: eventoId } });
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar la asistencia: ' + (err instanceof Error ? err.message : 'Error desconocido'));
      router.back();
    }
  };

  return (
    <AppLayout description="Agregando lista del día">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {procesando ? (
          <>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 18, color: c.text, marginBottom: 18 }}>
              Procesando nueva lista del día...
            </ThemedText>
            <View style={{ width: 220, marginBottom: 18 }}>
              <Animated.View
                style={{
                  height: 18,
                  borderRadius: 10,
                  backgroundColor: c.success,
                  width: barWidth,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 18,
                  width: '100%',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: c.border,
                }}
              />
            </View>
            <ThemedText style={{ color: c.inputPlaceholder, marginBottom: 12 }}>
              {barra < 100 ? `Procesando... ${barra}%` : '¡Completado!'}
            </ThemedText>
          </>
        ) : inputVisible && procesado ? (
          <>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 18, color: c.success, marginBottom: 18 }}>
              Imagen se procesó correctamente
            </ThemedText>
            <ThemedText style={{ color: c.text, fontWeight: 'bold', marginBottom: 6 }}>
              Ingrese el encabezado de la columna
            </ThemedText>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: c.border,
                borderRadius: 8,
                padding: 8,
                color: c.text,
                backgroundColor: c.inputBg,
                minWidth: 180,
                marginBottom: 18,
                textAlign: 'center'
              }}
              value={fecha}
              onChangeText={setFecha}
              placeholder="Fecha (YYYY-MM-DD)"
              placeholderTextColor={c.inputPlaceholder}
            />
            <TouchableOpacity
              style={{
                backgroundColor: c.btnPrimary,
                borderRadius: 10,
                paddingVertical: 12,
                paddingHorizontal: 32,
                alignItems: 'center',
                marginBottom: 8,
              }}
              onPress={handleGuardar}
            >
              <ThemedText style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16 }}>Guardar</ThemedText>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </AppLayout>
  );
}
