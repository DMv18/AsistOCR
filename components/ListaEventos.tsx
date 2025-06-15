import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

type Evento = {
  id: string;
  nombre: string;
  fecha: string;
  color?: string;
};

type Props = {
  eventos: Evento[];
  onEditar: (id: string) => void;
  onBorrar: (id: string) => void;
  onVer: (id: string) => void;
};

export function ListaEventos({ eventos, onEditar, onBorrar, onVer }: Props) {
  const [busqueda, setBusqueda] = useState('');
  const eventosFiltrados = eventos.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  const { width } = useWindowDimensions();
  const isSmall = width < 500;
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode]?.[theme]?.ListaEventos || {
    searchBar: '#FFFFFF',
    eventoCard: '#FFFFFF',
    iconTendencias: '#FFA500',
    iconArquitectura: '#000000',
    iconSoftware: '#0000FF',
    iconRedes: '#008000',
    eventoNombre: '#000000',
    eventoFecha: '#000000',
    btnEditar: '#008000',
    btnBorrar: '#FF0000',
    btnVer: '#0000FF',
    btnIcon: '#FFFFFF',
  };
  const router = useRouter();

  function getIconColor(nombre: string) {
    if (nombre.includes('Tendencias')) return c.iconTendencias;
    if (nombre.includes('Arquitectura')) return c.iconArquitectura;
    if (nombre.includes('Software')) return c.iconSoftware;
    if (nombre.includes('Redes')) return c.iconRedes;
    return c.iconTendencias;
  }

  return (
    <View style={styles.root}>
      <View style={[styles.searchRow, { backgroundColor: c.searchBar }]}>
        <Ionicons name="search" size={22} color={c.btnIcon} />
        <TextInput
          style={[styles.input, { color: c.eventoNombre }]}
          placeholder="Buscar evento..."
          placeholderTextColor={c.eventoFecha}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {eventosFiltrados.map((evento) => (
          <View
            key={evento.id}
            style={[
              styles.evento,
              { backgroundColor: c.eventoCard, maxWidth: 600, width: isSmall ? '98%' : 500 },
              isSmall && { flexDirection: 'column', alignItems: 'flex-start', gap: 4, padding: 10 }
            ]}
          >
            <View style={[styles.iconCol, { backgroundColor: getIconColor(evento.nombre), borderRadius: 16 }]}>
              <Ionicons name="document-text-outline" size={22} color={c.btnIcon} style={{ marginRight: 8 }} />
            </View>
            <View style={[styles.infoCol, isSmall && { marginBottom: 6 }]}>
              <ThemedText style={[styles.eventoNombre, { color: c.eventoNombre }, isSmall && { fontSize: 14 }]}>
                {evento.nombre}
              </ThemedText>
              <ThemedText style={[styles.eventoFecha, { color: c.eventoFecha }, isSmall && { fontSize: 12 }]}>
                {evento.fecha}
              </ThemedText>
            </View>
            <View style={[styles.btnsCol, isSmall && { flexDirection: 'row', flexWrap: 'wrap', width: '100%', gap: 4, marginTop: 4 }]}>
              <TouchableOpacity
                style={[globalStyles.btnSecondary, styles.btn, isSmall && styles.btnSmall, { backgroundColor: c.btnEditar }]}
                onPress={() => router.push({ pathname: '/editar-evento', params: { id: evento.id } })}
                accessibilityLabel="Editar"
              >
                <Ionicons name="pencil" size={18} color={c.btnIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.btnDanger, styles.btn, isSmall && styles.btnSmall, { backgroundColor: c.btnBorrar }]}
                onPress={() => onBorrar(evento.id)}
                accessibilityLabel="Borrar"
              >
                <Ionicons name="trash" size={18} color={c.btnIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.btnPrimary, styles.btn, isSmall && styles.btnSmall, { backgroundColor: c.btnVer }]}
                onPress={() => onVer(evento.id)}
                accessibilityLabel="Ver"
              >
                <Ionicons name="eye" size={18} color={c.btnIcon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
    maxWidth: 500,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    marginLeft: 8,
    color: '#222',
  },
  scrollContent: {
    gap: 12,
    alignItems: 'center',
    width: '100%',
    paddingBottom: 16,
  },
  evento: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 12,
    width: 500,
    minWidth: 220,
    gap: 8,
    flexWrap: 'nowrap',
    marginBottom: 2,
    minHeight: 60,
  },
  iconCol: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  btnsCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 8,
    flexWrap: 'nowrap',
    minWidth: 0,
    flexShrink: 1,
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 36,
    minHeight: 36,
  },
  btnSmall: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    minWidth: 32,
    minHeight: 32,
  },
  eventoNombre: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  eventoFecha: {
    fontSize: 13,
    color: '#222',
  },
});
  
