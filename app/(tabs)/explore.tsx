import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { globalStyles } from '@/styles/globalStyles';
import { router } from 'expo-router';

type Evento = {
  id: string;
  nombre: string;
  fecha: string;
  color?: string;
};


export default function TabTwoScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [busqueda, setBusqueda] = useState('');

  const eventosFiltrados = eventos.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleBorrar = (id: string) => {
    setEventos(eventos => eventos.filter(e => e.id !== id));
  };

  const handleEditar = (id: string) => {
  
    alert('Editar evento: ' + id);
  };

  const handleVer = (id: string) => {
  
    alert('Ver evento: ' + id);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <ThemedText style={globalStyles.headerTitle}>AsistOCR</ThemedText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={globalStyles.headerBtn} accessibilityLabel="Usuario">
              <Ionicons name="person-circle-outline" size={20} />
              <ThemedText style={globalStyles.headerBtnText}>Usuario</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.headerBtn}
              accessibilityLabel="Ajustes"
              onPress={() => router.push('/config')}
            >
              <Ionicons name="settings" size={20} />
              <ThemedText style={globalStyles.headerBtnText}>Ajustes</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          borderRadius: 20,
          padding: 16,
          marginTop: 16,
          width: '100%',
          alignSelf: 'center',
          alignItems: 'stretch',
          flex: 1,
          minHeight: 500,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 20, flex: 1 }}>
              Lista de eventos
            </ThemedText>
            <TouchableOpacity style={globalStyles.helpBtn}>
              <ThemedText style={globalStyles.helpBtnText}>?</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={{
            borderRadius: 18,
            padding: 12,
            marginBottom: 18,
          }}>
            <View style={{
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              paddingHorizontal: 8,
            }}>
              <Ionicons name="search" size={22} />
              <TextInput
                style={{
                  flex: 1,
                  padding: 10,
                  fontSize: 16,
                  backgroundColor: 'transparent',
                  borderRadius: 8,
                  marginLeft: 8,
                }}
                placeholder="Buscar evento..."
                value={busqueda}
                onChangeText={setBusqueda}
              />
            </View>
            <ScrollView style={{ maxHeight: 350 }}>
              {eventosFiltrados.map((evento) => (
                <View
                  key={evento.id}
                  style={{
                    borderRadius: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 14,
                    padding: 10,
                    gap: 10,
                  }}
                >
                  <View style={{
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                  }}>
                    <Ionicons name="document-text-outline" size={22} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemedText style={{ fontWeight: 'bold', fontSize: 15 }}>
                      {evento.nombre}
                    </ThemedText>
                  </View>
                  <View style={{
                    minWidth: 80,
                    alignItems: 'flex-end',
                    marginRight: 8,
                  }}>
                    <ThemedText style={{ fontWeight: 'bold', fontSize: 13 }}>
                      {evento.fecha}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    style={{
                      borderRadius: 8,
                      padding: 6,
                      marginHorizontal: 2,
                    }}
                    onPress={() => handleEditar(evento.id)}
                    accessibilityLabel="Editar"
                  >
                    <Ionicons name="pencil" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 8,
                      padding: 6,
                      marginHorizontal: 2,
                    }}
                    onPress={() => handleBorrar(evento.id)}
                    accessibilityLabel="Borrar"
                  >
                    <Ionicons name="trash" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderRadius: 8,
                      padding: 6,
                      marginHorizontal: 2,
                    }}
                    onPress={() => handleVer(evento.id)}
                    accessibilityLabel="Ver"
                  >
                    <Ionicons name="eye" size={22} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: 'center',
              marginTop: 16,
            }}
            onPress={() => router.back()}
            accessibilityLabel="Regresar"
          >
            <ThemedText style={{ fontWeight: 'bold', fontSize: 20 }}>Regresar</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

