import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Foto = {
  uri: string;
  status: 'success' | 'error' | 'pending';
};

export function FormularioAsistencia() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode]?.[theme]?.FormularioAsistencia || {
    fotosBlock: '#FFFFFF',
    fotoRow: '#FFFFFF',
    fotoRowBorder: '#BEE3F8',
    addBtn: '#EBF8FF',
    addBtnText: '#2D3748',
    btnDanger: '#E53E3E',
    btnDangerText: '#FFFFFF',
    btnPrimary: '#38A169',
    btnPrimaryText: '#FFFFFF',
  };
  const router = useRouter();

  const subirFoto = async (uri: string): Promise<'success' | 'error'> => {
    await new Promise((r) => setTimeout(r, 700));
    return Math.random() > 0.2 ? 'success' : 'error';
  };

  const handleAgregarFoto = () => {
    setModalVisible(true);
  };

  const handleArchivos = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    }) as ImagePicker.ImagePickerResult & {
      assets?: { uri: string }[];
    };

    if (!result.canceled) {
      const uris = result.assets ? result.assets.map(a => a.uri) : [];
      uris.forEach(async (uri) => {
        setFotos((prev) => [...prev, { uri, status: 'pending' }]);
        const status = await subirFoto(uri);
        setFotos((prev) =>
          prev.map((f) => (f.uri === uri ? { ...f, status } : f))
        );
      });
    }
  };

  const handleCamara = () => {
    setModalVisible(false);
    router.push('/tomar-foto');
  };

  const handleQuitarFoto = (uri: string) => {
    setFotos((prev) => prev.filter((f) => f.uri !== uri));
  };

  return (
    <View style={styles.root}>
      <ThemedText type="title" style={{ marginBottom: 12 }}>
        Subir fotos de una asistencia
      </ThemedText>
      <View style={[styles.fotosBlock, { backgroundColor: c.fotosBlock }]}>
        {fotos.map((foto) => (
          <View
            key={foto.uri}
            style={[styles.fotoRow, { borderColor: c.fotoRowBorder, backgroundColor: c.fotoRow }]}
          >
            <Image
              source={{ uri: foto.uri }}
              style={styles.fotoImg}
            />
            <View style={{ flex: 1 }}>
              {foto.status === 'success' && (
                <ThemedText style={{ color: c.btnSecondary, fontWeight: 'bold' }}>
                  <Ionicons name="checkmark-circle" size={18} color={c.btnSecondary} /> foto subida exitosamente
                </ThemedText>
              )}
              {foto.status === 'error' && (
                <ThemedText style={{ color: c.btnDanger, fontWeight: 'bold' }}>
                  <Ionicons name="close-circle" size={18} color={c.btnDanger} /> Fallo al subir la foto
                </ThemedText>
              )}
              {foto.status === 'pending' && (
                <ThemedText style={{ color: c.addBtnText, fontWeight: 'bold' }}>
                  <Ionicons name="cloud-upload-outline" size={18} color={c.addBtnText} /> Subiendo...
                </ThemedText>
              )}
              <TouchableOpacity
                style={[globalStyles.btnDanger, { backgroundColor: c.btnDanger }]} 
                onPress={() => handleQuitarFoto(foto.uri)}
              >
                <MaterialIcons name="delete" size={18} color={c.btnDangerText} />
                <ThemedText style={[globalStyles.btnDangerText, { color: c.btnDangerText }]}>
                  quitar foto
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.addBtn }]}
          onPress={handleAgregarFoto}
        >
          <Ionicons name="add-circle-outline" size={24} color={c.addBtnText} />
          <ThemedText style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 16, color: c.addBtnText }}>
            Agregar nueva foto
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.btnPrimary, { backgroundColor: c.btnPrimary }]}
          accessibilityLabel="Guardar"
        >
          <ThemedText style={[globalStyles.btnPrimaryText, { color: c.btnPrimaryText }]}>
            Guardar
          </ThemedText>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.10)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
            minWidth: 260,
            elevation: 8,
          }}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center' }}>
              Para ingresar las imagenes de la asistencia
            </ThemedText>
            <ThemedText style={{ color: '#888', fontSize: 15, marginBottom: 18, textAlign: 'center' }}>
              escoja donde quiere subir la imagen
            </ThemedText>
            <View style={{ flexDirection: 'row', gap: 18 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4be38a',
                  borderRadius: 12,
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  marginHorizontal: 8,
                  minWidth: 90,
                }}
                onPress={handleCamara}
              >
                <Ionicons name="camera-outline" size={28} color="#222" />
                <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>Cámara</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4be38a',
                  borderRadius: 12,
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  marginHorizontal: 8,
                  minWidth: 90,
                }}
                onPress={handleArchivos}
              >
                <Ionicons name="folder-outline" size={28} color="#222" />
                <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>Archivos</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ marginTop: 18 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#2196f3', fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  fotosBlock: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    gap: 12,
    width: '100%',
    alignItems: 'center',
  },
  fotoRow: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    width: '100%',
    gap: 8,
  },
  fotoImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#bbb',
    marginTop: 4,
    alignSelf: 'center',
  },
  saveBlock: {
    backgroundColor: '#f5cccc',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    width: '100%',
  },
});
