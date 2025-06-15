import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TomarFotoScreen() {
  const [foto, setFoto] = useState<string | null>(null);
  const router = useRouter();

  const handleTomarFoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFoto(result.assets[0].uri);
    }
  };

  return (
    <AppLayout description="Toma una foto para subir a la asistencia.">
      <View style={styles.container}>
        <TouchableOpacity style={styles.cameraBtn} onPress={handleTomarFoto}>
          <Ionicons name="camera" size={40} color="#222" />
          <ThemedText style={styles.cameraBtnText}>Tomar foto</ThemedText>
        </TouchableOpacity>
        {foto && (
          <View style={styles.previewBlock}>
            <Image source={{ uri: foto }} style={styles.previewImg} />
            <ThemedText style={styles.previewLabel}>Foto tomada</ThemedText>
          </View>
        )}
        <TouchableOpacity
          style={styles.regresarBtn}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.regresarBtnText}>Regresar</ThemedText>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 18,
    width: '100%',
    marginTop: 24,
  },
  cameraBtn: {
    backgroundColor: '#4be38a',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  cameraBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
  },
  previewBlock: {
    alignItems: 'center',
    marginTop: 18,
    gap: 8,
  },
  previewImg: {
    width: 180,
    height: 180,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#bbb',
  },
  previewLabel: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  regresarBtn: {
    backgroundColor: '#2196f3',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 18,
  },
  regresarBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
