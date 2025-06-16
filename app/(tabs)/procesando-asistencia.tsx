import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';


const getImagenesSubidas = (): string[] => {
  return [
  ];
};

export default function ProcesandoAsistenciaScreen() {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const router = useRouter();


  const [imagenes, setImagenes] = useState<string[]>(getImagenesSubidas());

  const [progreso, setProgreso] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setProgreso(0);
    anim.setValue(0);

    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 15) + 5;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
      }
      setProgreso(percent);
      Animated.timing(anim, {
        toValue: percent,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 700);
    return () => clearInterval(interval);
  }, [imagenes]);


  const barWidth = anim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <AppLayout description="Creando asistencia...">
      <View style={styles.root}>
        <ThemedText style={styles.title}>Espere unos segundos...</ThemedText>
        <View style={[styles.card, { backgroundColor: c.formFotosBlock }]}>
          <View style={styles.imagenesRow}>
            {imagenes.length === 0 ? (
              <ThemedText style={{ color: c.inputPlaceholder }}>No hay imágenes para procesar</ThemedText>
            ) : (
              imagenes.map((uri, idx) => (
                <View key={uri} style={styles.imgBlock}>
                  <Image
                    source={{ uri }}
                    style={styles.img}
                  />
                  {progreso >= 100 ? (
                    <Ionicons name="checkmark" size={24} color={c.success} style={styles.imgCheck} />
                  ) : (
                    <Ionicons name="cloud-upload-outline" size={24} color={c.formAddBtnText} style={styles.imgCheck} />
                  )}
                </View>
              ))
            )}
          </View>
          <ThemedText style={styles.subtitle}>Ya casi terminamos...</ThemedText>
          <TouchableOpacity
            style={[styles.cancelBtn, { backgroundColor: c.formBtnDanger }]}
            onPress={() => router.back()}
          >
            <ThemedText style={{ color: c.formBtnDangerText, fontWeight: 'bold', fontSize: 16 }}>Cancelar creación</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBlock}>
          <ThemedText style={{ color: c.inputPlaceholder, marginBottom: 6 }}>Guardando...</ThemedText>
          <View style={[styles.progressBarBg, { backgroundColor: '#e0e0e0' }]}>
            <Animated.View style={[
              styles.progressBar,
              { backgroundColor: c.success, width: barWidth }
            ]} />
          </View>
          <ThemedText style={{ color: c.text, marginTop: 4, fontWeight: 'bold' }}>{progreso}%</ThemedText>
        </View>
      </View>
    </AppLayout>
  );
}

import { Ionicons } from '@expo/vector-icons';

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
});
