import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Foto = {
  uri: string;
  status: 'success' | 'error' | 'pending';
};

type Props = {
  fotoCamara?: string;
};


const IMAGENES_DIR = FileSystem.documentDirectory + 'Imagenes/';

async function ensureImagenesDir() {
  try {
    const dirInfo = await FileSystem.getInfoAsync(IMAGENES_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(IMAGENES_DIR, { intermediates: true });
    }
  } catch (e) {
    console.error('No se pudo crear la carpeta Imagenes:', e);
    throw e;
  }
}

function getExtension(uri: string): string {
  const match = uri.match(/\.(\w+)(\?|$)/);
  return match ? match[1] : 'jpg';
}

async function copyImageToApp(uri: string): Promise<string> {
  await ensureImagenesDir();
  if (uri.startsWith(IMAGENES_DIR)) {
    return uri;
  }
  const ext = getExtension(uri);
  const filename = `img_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
  const dest = IMAGENES_DIR + filename;
  try {
    await FileSystem.copyAsync({ from: uri, to: dest });
    const fileInfo = await FileSystem.getInfoAsync(dest);
    if (!fileInfo.exists) {
      throw new Error('La imagen no se copió correctamente');
    }
    return dest;
  } catch (e) {
    console.error('Error al copiar la imagen:', e, 'Origen:', uri, 'Destino:', dest);
    throw e;
  }
}

export function FormularioAsistencia({ fotoCamara }: Props) {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const router = useRouter();

  
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
      for (const uri of uris) {
        setFotos(prev => [...prev, { uri, status: 'pending' }]);
      }
    }
  };

  
  React.useEffect(() => {
    if (fotoCamara && !fotos.some(f => f.uri === fotoCamara)) {
      setFotos(prev => [...prev, { uri: fotoCamara, status: 'pending' }]);
    }
   
  }, [fotoCamara]);


  const handleGuardar = async () => {
    if (fotos.length === 0) {
      Alert.alert('Debe subir al menos una imagen', 'Por favor, suba una imagen antes de guardar la asistencia.');
      return;
    }
    setIsSaving(true);
    try {
      let errores = false;
      const nuevasFotos: Foto[] = [];
      for (const foto of fotos) {
        if (foto.uri.startsWith(IMAGENES_DIR)) {
          nuevasFotos.push({ ...foto, status: 'success' });
        } else {
          try {
            const nuevaUri = await copyImageToApp(foto.uri);
            nuevasFotos.push({ uri: nuevaUri, status: 'success' });
          } catch (e) {
            nuevasFotos.push({ ...foto, status: 'error' });
            errores = true;
          }
        }
      }
      setFotos(nuevasFotos);

      if (errores) {
        Alert.alert('Error', 'Algunas imágenes no se guardaron correctamente');
        setIsSaving(false);
        return;
      }

     
      router.push('/procesando-asistencia');
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'No se pudo guardar la asistencia');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAgregarFoto = () => {
    setModalVisible(true);
  };

  const handleCamara = () => {
    setModalVisible(false);
    router.push('/tomar-foto');
  };

  return (
    <View style={styles.root}>
      <ThemedText type="title" style={{ marginBottom: 12 }}>
        Subir fotos de una asistencia
      </ThemedText>
      
      <View style={[styles.fotosBlock, { backgroundColor: c.formFotosBlock }]}>
        {fotos.length === 0 && (
          <ThemedText style={{ color: c.inputPlaceholder, textAlign: 'center', marginVertical: 16 }}>
            No hay fotos agregadas aún
          </ThemedText>
        )}
        
        {fotos.map((foto) => (
          <View
            key={foto.uri}
            style={[
              styles.fotoRow,
              { borderColor: c.formFotoRowBorder, backgroundColor: c.formFotoRow }
            ]}
          >
            <Image
              source={{ uri: foto.uri }}
              style={[styles.fotoImg, { borderColor: c.formFotoRowBorder }]}
            />
            <View style={{ flex: 1 }}>
              {foto.status === 'success' && (
                <ThemedText style={{ color: c.formBtnSecondary, fontWeight: 'bold' }}>
                  <Ionicons name="checkmark-circle" size={18} color={c.formBtnSecondary} /> Foto subida exitosamente
                </ThemedText>
              )}
              
              {foto.status === 'error' && (
                <ThemedText style={{ color: c.formBtnDanger, fontWeight: 'bold' }}>
                  <Ionicons name="close-circle" size={18} color={c.formBtnDanger} /> No se pudo subir la imagen
                </ThemedText>
              )}
              
              {foto.status === 'pending' && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator size="small" color={c.formAddBtnText} />
                  <ThemedText style={{ color: c.formAddBtnText, fontWeight: 'bold', marginLeft: 6 }}>
                    Subiendo...
                  </ThemedText>
                </View>
              )}
              
              <TouchableOpacity
                style={[globalStyles.btnDanger, { backgroundColor: c.btnDanger, marginTop: 8 }]} 
                onPress={() => handleQuitarFoto(foto.uri)}
              >
                <MaterialIcons name="delete" size={18} color={c.btnDangerText ?? c.btnText} />
                <ThemedText style={[globalStyles.btnDangerText, { color: c.btnDangerText ?? c.btnText }]}>
                  Eliminar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.formAddBtn }]}
          onPress={handleAgregarFoto}
        >
          <Ionicons name="add-circle-outline" size={24} color={c.formAddBtnText} />
          <ThemedText style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 16, color: c.formAddBtnText }}>
            Agregar foto
          </ThemedText>
        </TouchableOpacity>
        
        {fotos.length > 0 && (
          <TouchableOpacity
            style={[globalStyles.btnPrimary, { backgroundColor: c.formBtnPrimary, marginTop: 16 }]}
            onPress={handleGuardar}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color={c.formBtnPrimaryText} />
            ) : (
              <ThemedText style={[globalStyles.btnPrimaryText, { color: c.formBtnPrimaryText }]}>
                Guardar asistencia
              </ThemedText>
            )}
          </TouchableOpacity>
        )}
      </View>
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: c.card,
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
            minWidth: 260,
            elevation: 8,
          }}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8, textAlign: 'center', color: c.text }}>
              Seleccionar origen de la imagen
            </ThemedText>
            <ThemedText style={{ color: c.inputPlaceholder, fontSize: 15, marginBottom: 18, textAlign: 'center' }}>
              Elija cómo desea agregar la foto
            </ThemedText>
            
            <View style={{ flexDirection: 'row', gap: 18 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: c.btnPrimary,
                  borderRadius: 12,
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  minWidth: 90,
                }}
                onPress={handleCamara}
              >
                <Ionicons name="camera-outline" size={28} color={c.btnText} />
                <Text style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>Cámara</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{
                  backgroundColor: c.btnPrimary,
                  borderRadius: 12,
                  paddingVertical: 14,
                  paddingHorizontal: 24,
                  alignItems: 'center',
                  minWidth: 90,
                }}
                onPress={handleArchivos}
              >
                <Ionicons name="folder-outline" size={28} color={c.btnText} />
                <Text style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>Galería</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={{ marginTop: 18 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: c.btnPrimary, fontWeight: 'bold', fontSize: 16 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  fotosBlock: {
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  fotoRow: {
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    gap: 12,
  },
  fotoImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
});