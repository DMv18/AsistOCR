import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function TomarFotoScreen() {
  const router = useRouter();
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme].TomarFoto;

  const handleTomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted' || mediaStatus !== 'granted') {
      alert('Se requiere permiso de cámara y galería');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      try {
        const asset = await MediaLibrary.createAssetAsync(uri);
        router.replace({ pathname: '/crear-asistencia', params: { foto: asset.uri } });
      } catch {
        router.replace({ pathname: '/crear-asistencia', params: { foto: uri } });
      }
    }
  };

  return (
    <AppLayout description="Toma una foto para subir a la asistencia.">
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.cameraBtn,
            { backgroundColor: c.cameraBtnBg, alignSelf: 'center', justifyContent: 'center' }
          ]}
          onPress={handleTomarFoto}
        >
          <Ionicons name="camera" size={40} color={c.cameraBtnText} />
          <ThemedText style={[styles.cameraBtnText, { color: c.cameraBtnText }]}>Tomar foto</ThemedText>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center', // centra verticalmente
    flex: 1, // ocupa todo el alto disponible
    width: '100%',
    marginTop: 0,
  },
  cameraBtn: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cameraBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});