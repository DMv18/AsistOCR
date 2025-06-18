import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { SERVER_URL } from '@/constants/server';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

type Evento = {
  nombre: string;
  url: string;
};

export default function HistorialScreen() {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  const router = useRouter();

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoAEliminar, setEventoAEliminar] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${SERVER_URL}/eventos`)
      .then(res => res.json())
      .then(data => setEventos(data.eventos || []))
      .catch(() => setEventos([]));
  }, []);

  const handleBorrar = (nombre: string) => {
    setEventoAEliminar(nombre);
    setModalVisible(true);
  };

  const confirmarEliminar = async () => {
    if (eventoAEliminar) {
      try {
        const res = await fetch(`${SERVER_URL}/asistencias/${encodeURIComponent(eventoAEliminar)}`, {
          method: 'DELETE'
        });
        const data = await res.json();
        if (data.ok) {
          setEventos(eventos => eventos.filter(e => e.nombre !== eventoAEliminar));
        } else {
          Alert.alert('Error', data.error || 'No se pudo eliminar el archivo.');
        }
      } catch {
        Alert.alert('Error', 'No se pudo conectar con el servidor para eliminar el archivo.');
      }
      setEventoAEliminar(null);
      setModalVisible(false);
    }
  };

  const cancelarEliminar = () => {
    setEventoAEliminar(null);
    setModalVisible(false);
  };

  const handleEditar = (nombre: string) => {
    // Redirige a la pantalla de editar evento, pasando el nombre como parámetro
    router.push({ pathname: '/editar-evento', params: { id: nombre } });
  };

  const handleVer = (nombre: string) => {
    // Navega a la página de visualización pasando el nombre del archivo
    router.push({ pathname: '/ver-asistencia', params: { nombre } });
  };

  function extraerFecha(nombre: string): string {
    const match = nombre.match(/(\d{2}[-_.]\d{2}[-_.]\d{4})/);
    if (match) {
      return match[1].replace(/[-_.]/g, '/');
    }
    return 'Sin fecha';
  }

  return (
    <AppLayout description="Aquí puedes ver y gestionar tus archivos de asistencia.">
      <View style={{ width: '100%', padding: 0, alignItems: 'center' }}>
        <ThemedText type="title" style={{ marginBottom: 12, alignSelf: 'flex-start', marginLeft: 18 }}>Lista de eventos</ThemedText>
        <View style={{ width: '100%', alignItems: 'center' }}>
          {eventos.length === 0 && (
            <ThemedText style={{ color: c.inputPlaceholder, textAlign: 'center', marginVertical: 16 }}>
              No hay eventos registrados.
            </ThemedText>
          )}
          {eventos.map((evento, idx) => (
            <View
              key={evento.nombre}
              style={{
                borderRadius: 18,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
                padding: 12,
                gap: 10,
                backgroundColor: c.eventoCard,
                width: '92%',
                alignSelf: 'center',
                minHeight: 70,
              }}
            >
              {/* Icono archivo */}
              <View style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
                backgroundColor: c.historialArchivoIconBg,
              }}>
                <Ionicons name="document-text-outline" size={22} color={c.historialArchivoIconColor} />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={{ fontWeight: 'bold', fontSize: 15, color: c.eventoNombre }}>
                  {evento.nombre.replace('.xlsx', '')}
                </ThemedText>
                <ThemedText style={{ fontSize: 13, color: c.eventoFecha }}>
                  {extraerFecha(evento.nombre)}
                </ThemedText>
              </View>
              {/* Icono editar */}
              <View style={{
                borderRadius: 8,
                padding: 6,
                marginHorizontal: 2,
                backgroundColor: c.historialEditarIconBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity
                  onPress={() => handleEditar(evento.nombre)}
                  accessibilityLabel="Editar"
                >
                  <Ionicons name="pencil" size={20} color={c.historialEditarIconColor} />
                </TouchableOpacity>
              </View>
              {/* Icono borrar */}
              <View style={{
                borderRadius: 8,
                padding: 6,
                marginHorizontal: 2,
                backgroundColor: c.historialBorrarIconBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity
                  onPress={() => handleBorrar(evento.nombre)}
                  accessibilityLabel="Borrar"
                >
                  <Ionicons name="trash" size={20} color={c.historialBorrarIconColor} />
                </TouchableOpacity>
              </View>
              {/* Icono observar */}
              <View style={{
                borderRadius: 8,
                padding: 6,
                marginHorizontal: 2,
                backgroundColor: c.historialObservarIconBg,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity
                  onPress={() => handleVer(evento.nombre)}
                  accessibilityLabel="Ver"
                >
                  <Ionicons name="eye" size={20} color={c.historialObservarIconColor} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelarEliminar}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: c.card }]}>
            <ThemedText style={[styles.modalTitle, { color: c.text }]}>
              ¿Estas seguro que desea eliminar este historial de asistencia?
            </ThemedText>
            <ThemedText style={[styles.modalSubtitle, { color: c.inputPlaceholder }]}>
              no lo podra recuperar despues.
            </ThemedText>
            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: c.formBtnDanger }]}
                onPress={confirmarEliminar}
              >
                <ThemedText style={[styles.btnEliminarText, { color: c.formBtnDangerText }]}>Eliminar</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: c.btnPrimary }]}
                onPress={cancelarEliminar}
              >
                <ThemedText style={[styles.btnCancelarText, { color: c.btnText }]}>Cancelar</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    minWidth: 260,
    elevation: 8,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 18,
    textAlign: 'center',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginTop: 8,
  },
  modalBtn: {
    minWidth: 90,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  btnEliminarText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnCancelarText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
