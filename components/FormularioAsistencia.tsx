import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { useLimpiarFilasBackend } from '@/hooks/useLimpiarFilasBackend';
import { useGlobalColors, useGlobalStyles } from '@/styles/globalStyles';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CopilotStep, walkthroughable } from 'react-native-copilot';

type Foto = {
  uri: string;
  status: 'success' | 'error' | 'pending';
};

type Props = {
  fotoCamara?: string;
  onProcesar?: (uri: string) => void;
  modoAgregarListaDia?: boolean;
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
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      return uri;
    }
  } catch {
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
    return uri;
  }
}

const WalkthroughableTouchableOpacity = walkthroughable(TouchableOpacity);
const WalkthroughableView = walkthroughable(View);

export function FormularioAsistencia({ fotoCamara, onProcesar, modoAgregarListaDia }: Props) {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const colors = useGlobalColors();
  const globalStyles = useGlobalStyles();
  const router = useRouter();
  const limpiarFilasBackend = useLimpiarFilasBackend();

  React.useEffect(() => {
    if (fotoCamara && !fotos.some(f => f.uri === fotoCamara)) {
      setFotos([{ uri: fotoCamara, status: 'pending' }]);
      (async () => {
        try {
          const nuevaUri = await copyImageToApp(fotoCamara);
          setFotos([{ uri: nuevaUri, status: 'success' }]);
        } catch {
          setFotos([{ uri: fotoCamara, status: 'error' }]);
        }
      })();
    }
  }, [fotoCamara]);

  const handleProcesar = async () => {
    if (fotos.length === 0 || fotos[0].status !== 'success') {
      Alert.alert('Debe subir una imagen válida', 'Por favor, suba una imagen antes de procesar.');
      return;
    }
    setIsProcessing(true);

    await limpiarFilasBackend();

    if (onProcesar) {
      onProcesar(fotos[0].uri);
    } else {
      router.push({
        pathname: '/procesando-asistencia',
        params: { uri: fotos[0].uri }
      });
    }
    setIsProcessing(false);
  };

  const handleAgregarFoto = () => {
    setModalVisible(true);
  };

  const handleCamara = () => {
    setModalVisible(false);
    router.push('/tomar-foto');
  };

  const handleGaleria = async () => {
    setModalVisible(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se requiere permiso para acceder a la galería.');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setFotos([{ uri, status: 'pending' }]);
      try {
        const nuevaUri = await copyImageToApp(uri);
        setFotos([{ uri: nuevaUri, status: 'success' }]);
      } catch {
        setFotos([{ uri, status: 'error' }]);
      }
    }
  };

  const handleQuitarFoto = (uri: string) => {
    setFotos([]);
  };

  return (
    <View style={styles.root}>
      <ThemedText type="title" style={{ marginBottom: 12, fontSize: 22 * fontScale }}>
        Subir imagen para procesar
      </ThemedText>
      <View style={[styles.fotosBlock, { backgroundColor: c.formFotosBlock }]}>
        {fotos.length === 0 ? (
          <CopilotStep
            text="Aquí verás si la imagen se subió correctamente o si hubo un error. Si no hay imagen cargada, verás este mensaje."
            order={3}
            name="feedbackImagen"
          >
            <WalkthroughableView>
              <ThemedText style={{ color: c.inputPlaceholder, textAlign: 'center', marginVertical: 16, fontSize: 16 * fontScale }}>
                No hay imagen cargada aún
              </ThemedText>
            </WalkthroughableView>
          </CopilotStep>
        ) : (
          fotos.map((foto) => (
            <CopilotStep
              key={foto.uri}
              text="Aquí verás si la imagen se subió correctamente o si hubo un error. Si hay un error, intenta subir otra imagen."
              order={3}
              name="feedbackImagen"
            >
              <WalkthroughableView>
                <View
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
                      <ThemedText style={{ color: c.formBtnSecondary, fontWeight: 'bold', fontSize: 16 * fontScale }}>
                        <Ionicons name="checkmark-circle" size={18} color={c.formBtnSecondary} /> Imagen lista para procesar
                      </ThemedText>
                    )}
                    {foto.status === 'error' && (
                      <>
                        <ThemedText style={{ color: c.formBtnDanger, fontWeight: 'bold', fontSize: 16 * fontScale }}>
                          <Ionicons name="close-circle" size={18} color={c.formBtnDanger} /> Error al subir la imagen
                        </ThemedText>
                      </>
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
                      style={[globalStyles.btnDanger, { backgroundColor: colors.btnDangerBg, marginTop: 8 }]} 
                      onPress={() => handleQuitarFoto(foto.uri)}
                    >
                      <MaterialIcons name="delete" size={18} color={colors.btnDangerText} />
                      <ThemedText style={[globalStyles.btnDangerText, { color: colors.btnDangerText }]}>
                        Eliminar
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              </WalkthroughableView>
            </CopilotStep>
          ))
        )}
        <CopilotStep
          text="Pulsa aquí para subir una imagen de la lista de asistencia. Se abrirá un menú para elegir entre cámara o galería."
          order={1}
          name="subirImagenBtn"
        >
          <WalkthroughableTouchableOpacity
            style={[styles.addBtn, { backgroundColor: c.formAddBtn }]}
            onPress={handleAgregarFoto}
          >
            <Ionicons name="add-circle-outline" size={24} color={c.formAddBtnText} />
            <ThemedText style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 16 * fontScale, color: c.formAddBtnText }}>
              Subir imagen
            </ThemedText>
          </WalkthroughableTouchableOpacity>
        </CopilotStep>
        <CopilotStep
          text="Cuando la imagen esté lista, este botón se activará. Pulsa 'Procesar' para que el sistema interprete la lista de asistencia."
          order={4}
          name="procesarBtn"
        >
          <WalkthroughableTouchableOpacity
            style={[globalStyles.btnPrimary, { backgroundColor: colors.btnPrimaryBg, marginTop: 16 }]}
            onPress={handleProcesar}
            disabled={isProcessing || fotos.length === 0 || fotos[0].status !== 'success'}
          >
            {isProcessing ? (
              <ActivityIndicator color={colors.btnPrimaryText} />
            ) : (
              <ThemedText style={[globalStyles.btnPrimaryText, { color: colors.btnPrimaryText }]}>
                Procesar
              </ThemedText>
            )}
          </WalkthroughableTouchableOpacity>
        </CopilotStep>
      </View>
      <CopilotStep
        text="Elige si deseas tomar una foto con la cámara o seleccionar una imagen desde la galería."
        order={2}
        name="modalOrigenImagen"
      >
        <WalkthroughableView>
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
                  Elija cómo desea agregar la imagen
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
                    <ThemedText style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>Cámara</ThemedText>
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
                    onPress={handleGaleria}
                  >
                    <Ionicons name="folder-outline" size={28} color={c.btnText} />
                    <ThemedText style={{ color: c.btnText, fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>Galería</ThemedText>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 18 }}
                  onPress={() => setModalVisible(false)}
                >
                  <ThemedText style={{ color: c.btnPrimary, fontWeight: 'bold', fontSize: 16 }}>Cancelar</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </WalkthroughableView>
      </CopilotStep>
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