import { ThemedText } from '@/components/ThemedText';
import { useGlobalColors, useGlobalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export function LoginForm() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const colors = useGlobalColors();
  const globalStyles = useGlobalStyles();

  return (
    <View style={styles.root}>
      <View style={[styles.iconCircle, { backgroundColor: colors.formIconCircle ?? colors.inputIconCircle }]}>
        <Ionicons name="person-circle-outline" size={64} color={colors.loginIconColor} />
      </View>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.inputText,
          },
        ]}
        placeholder="Correo"
        placeholderTextColor={colors.inputPlaceholder}
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.inputBorder,
            color: colors.inputText,
          },
        ]}
        placeholder="Contraseña"
        placeholderTextColor={colors.inputPlaceholder}
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity
        style={[globalStyles.btnPrimary, { backgroundColor: colors.btnPrimaryBg }]}
        accessibilityLabel="Iniciar sesión"
      >
        <ThemedText style={[globalStyles.btnPrimaryText, { color: colors.btnPrimaryText }]}>Iniciar sesión</ThemedText>
      </TouchableOpacity>
      <ThemedText style={[styles.linkText, { color: colors.loginLinkText, fontSize: 16 }]}>
        No tiene una cuenta?
      </ThemedText>
      <TouchableOpacity
        style={[globalStyles.btnSecondary, { backgroundColor: colors.btnSecondaryBg }]}
        onPress={() => router.push('/register')}
        accessibilityLabel="Crear cuenta"
      >
        <ThemedText style={[globalStyles.btnSecondaryText, { color: colors.btnSecondaryText }]}>Crear cuenta</ThemedText>
      </TouchableOpacity>
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
  iconCircle: {
    borderRadius: 80,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  input: {
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 8,
    elevation: 2,
    borderWidth: 1,
    width: '100%',
    maxWidth: 350,
  },
  linkBtn: {
    marginBottom: 8,
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 16, 
  },
});

