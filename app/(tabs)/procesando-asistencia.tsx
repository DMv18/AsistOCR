import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { segmentarFilas } from '@/IA/segmentarFilas';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';



export default function ProcesandoAsistenciaScreen() {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const router = useRouter();
  const params = useLocalSearchParams();
  const uri = typeof params.uri === 'string' ? params.uri : undefined;

  const [filas, setFilas] = useState<string[]>([]);
  const [excelUrl, setExcelUrl] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<string[]>([]); // Para cachear los nombres detectados

  const [progreso, setProgreso] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;
  const [procesandoInfo, setProcesandoInfo] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const imagenes: string[] = uri ? [uri] : [];

  useEffect(() => {
    setProgreso(0);
    anim.setValue(0);

    let percent = 0;
    let backendRespondio = false;
    const interval = setInterval(() => {
      if (backendRespondio) return;
      percent += Math.floor(Math.random() * 15) + 5;
      if (percent >= 95) { // No llegues a 100% hasta que el backend termine
        percent = 95;
      }
      setProgreso(percent);
      Animated.timing(anim, {
        toValue: percent,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 700);

    if (uri) {
      (async () => {
        try {
          // Elimina el replace de la IP, solo pasa uri directamente
          const resultado = await segmentarFilas(uri);
          backendRespondio = true;
          setFilas(resultado.filas);
          setExcelUrl(resultado.excel);
          setRespuestas(resultado.nombresDetectados || []);
          setProcesandoInfo(true);
          setProgreso(100);
          anim.setValue(100);
        } catch {
          backendRespondio = true;
          setProcesandoInfo(false);
          setBackendError('Ocurrió un error al procesar la imagen. Intenta de nuevo.');
          setProgreso(0);
          anim.setValue(0);
        }
      })();
    }

    return () => {
      clearInterval(interval);
    };
  }, [uri, anim]); // Agrega anim a las dependencias


  const barWidth = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const handleCancelar = async () => {
    try {
      await fetch(`${SERVER_URL}/cancelar-procesamiento`, { method: 'POST' });
    } catch {
      // Ignora errores de red
    }
    router.back();
  };

  return (
    <AppLayout description="Creando asistencia...">
      <View style={styles.root}>
        {backendError ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
            <ThemedText style={{ color: 'red', fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
              {backendError}
            </ThemedText>
            <TouchableOpacity
              style={[styles.cancelBtn, { backgroundColor: c.formBtnDanger, marginTop: 32 }]}
              onPress={() => router.back()}
            >
              <ThemedText style={{ color: c.formBtnDangerText, fontWeight: 'bold', fontSize: 16 }}>Regresar</ThemedText>
            </TouchableOpacity>
          </View>
        ) : !procesandoInfo || progreso < 100 ? (
          // Pantalla de carga real
          <>
            <ThemedText style={styles.title}>Procesando imagen...</ThemedText>
            <View style={{ alignItems: 'center', marginVertical: 24 }}>
              {imagenes.length > 0 && (
                <Image
                  source={{ uri: imagenes[0] }}
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: c.success,
                    marginBottom: 12,
                  }}
                  resizeMode="contain"
                />
              )}
            </View>
            <ThemedText style={{ color: c.inputPlaceholder, marginBottom: 12 }}>
              Esto puede tardar varios segundos dependiendo de la imagen.
            </ThemedText>
            <View style={styles.progressBlock}>
              <ThemedText style={{ color: c.inputPlaceholder, marginBottom: 6 }}>
                {progreso < 100 ? 'Procesando...' : '¡Completado!'}
              </ThemedText>
              <View style={[styles.progressBarBg, { backgroundColor: '#e0e0e0' }]}>
                <Animated.View style={[
                  styles.progressBar,
                  { backgroundColor: c.success, width: barWidth }
                ]} />
              </View>
              <ThemedText style={{ color: c.text, marginTop: 4, fontWeight: 'bold' }}>{progreso}%</ThemedText>
            </View>
          </>
        ) : (
          // Pantalla de "Continuar"
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
            <ActivityIndicator size="large" color={c.success} />
            <ThemedText style={{ color: c.inputPlaceholder, marginTop: 24, fontWeight: 'bold', fontSize: 18 }}>
              Procesando la información...
            </ThemedText>
            {excelUrl && (
              <TouchableOpacity
                style={[styles.cancelBtn, { backgroundColor: c.formBtnPrimary, marginTop: 32 }]}
                onPress={() => {
                  router.replace({
                    pathname: '/resultado-asistencia',
                    params: {
                      excelUrl,
                      respuestas: JSON.stringify(respuestas),
                    }
                  });
                }}
              >
                <ThemedText style={{ color: c.formBtnPrimaryText, fontWeight: 'bold', fontSize: 16 }}>Continuar</ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.cancelBtn, { backgroundColor: c.formBtnDanger, marginTop: 32 }]}
              onPress={handleCancelar}
            >
              <ThemedText style={{ color: c.formBtnDangerText, fontWeight: 'bold', fontSize: 16 }}>Cancelar creación</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    width: '100%',
    gap: 18,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginBottom: 18,
    gap: 12,
    elevation: 2,
  },
  imagenesRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBlock: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imgCheck: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    elevation: 2,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  cancelBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
  },
  progressBlock: {
    marginTop: 18,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 18,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  progressBar: {
    height: 18,
    borderRadius: 10,
  },
  segmentedRows: {
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
  },
  rowBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
    backgroundColor: '#fff',
  },
  rowImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  rowText: {
    flex: 1,
    fontWeight: '500',
    color: '#333',
  },
});
