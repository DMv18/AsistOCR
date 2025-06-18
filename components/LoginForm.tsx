import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { globalStyles } from '@/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export function LoginForm() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = Colors[colorMode][theme];

  return (
    <View style={styles.root}>
      <View style={[styles.iconCircle, { backgroundColor: c.formIconCircle ?? c.inputIconCircle }]}>
        <Ionicons name="person-circle-outline" size={64} color={c.loginIconColor} />
      </View>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: c.inputBg,
            borderColor: c.inputBorder,
            color: c.inputText,
          },
        ]}
        placeholder="Correo"
        placeholderTextColor={c.inputPlaceholder}
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: c.inputBg,
            borderColor: c.inputBorder,
            color: c.inputText,
          },
        ]}
        placeholder="Contraseña"
        placeholderTextColor={c.inputPlaceholder}
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity
        style={[globalStyles.btnPrimary, { backgroundColor: c.loginBtnBg }]}
        accessibilityLabel="Iniciar sesión"
      >
        <ThemedText style={[globalStyles.btnPrimaryText, { color: c.loginBtnText }]}>Iniciar sesión</ThemedText>
      </TouchableOpacity>
      {/* Solo texto, sin TouchableOpacity */}
      <ThemedText style={[styles.linkText, { color: c.loginLinkText, fontSize: 16 * fontScale }]}>
        No tiene una cuenta?
      </ThemedText>
      <TouchableOpacity
        style={[globalStyles.btnSecondary, { backgroundColor: c.loginCreateBtnBg }]}
        onPress={() => router.push('/register')}
        accessibilityLabel="Crear cuenta"
      >
        <ThemedText style={[globalStyles.btnSecondaryText, { color: c.loginCreateBtnText }]}>Crear cuenta</ThemedText>
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
    fontSize: 16, // Se sobreescribe inline con fontScale
  },
});
