import { AppLayout } from '@/components/AppLayout';
import { ListaEventos } from '@/components/ListaEventos';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

const eventosIniciales = [
  { id: '1', nombre: 'Tendencias Tecnológicas', fecha: '10/05/2025', color: '#e1aaff' },
  { id: '2', nombre: 'Arquitectura de Maquinas III', fecha: '09/05/2025', color: '#aaffc3' },
  { id: '3', nombre: 'Ingeniería de Software II', fecha: '06/05/2025', color: '#ffd6a5' },
  { id: '4', nombre: 'Redes de Computadora', fecha: '09/05/2025', color: '#b5d0ff' },
];

export default function HistorialScreen() {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];

  const [eventos, setEventos] = useState(eventosIniciales);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoAEliminar, setEventoAEliminar] = useState<string | null>(null);

  const handleBorrar = (id: string) => {
    setEventoAEliminar(id);
    setModalVisible(true);
  };

  const confirmarEliminar = () => {
    if (eventoAEliminar) {
      setEventos(eventos => eventos.filter(e => e.id !== eventoAEliminar));
      setEventoAEliminar(null);
      setModalVisible(false);
    }
  };

  const cancelarEliminar = () => {
    setEventoAEliminar(null);
    setModalVisible(false);
  };

  return (
    <AppLayout
      description="Aquí puedes ver y gestionar tus archivos de asistencia."
    >
      <ListaEventos
        eventos={eventos}
        onEditar={id => alert('Editar evento: ' + id)}
        onBorrar={handleBorrar}
        onVer={id => alert('Ver evento: ' + id)}
      />
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
                style={[styles.modalBtn, { backgroundColor: c.btnDanger }]}
                onPress={confirmarEliminar}
              >
                <ThemedText style={[styles.btnEliminarText, { color: c.btnDangerText }]}>Eliminar</ThemedText>
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
  btnEliminar: {
 
  },
  btnEliminarText: {

    fontWeight: 'bold',
    fontSize: 16,
  },
  btnCancelar: {
  
  },
  btnCancelarText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

