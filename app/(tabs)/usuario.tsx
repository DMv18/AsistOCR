import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { auth, firebase } from '@/firebaseConfig';
import 'firebase/compat/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function UsuarioScreen() {
  const { theme, colorMode, fontScale } = useThemeCustom();
  const c = require('@/constants/Colors').Colors[colorMode][theme];
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{ displayName: string; email: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserData({
        displayName: user.displayName || '',
        email: user.email || '',
      });
      setNewName(user.displayName || '');
      setLoading(false);
    } else {
      setUserData(null);
      setLoading(false);
    }
  }, []);

  // Validación en tiempo real
  useEffect(() => {
    if (!editMode) {
      setNameError(null);
      return;
    }
    const trimmed = newName.replace(/\s+$/, ''); // quita espacios al final
    if (!trimmed) setNameError('El nombre no puede estar vacío.');
    else if (trimmed.length < 2) setNameError('El nombre debe tener al menos 2 caracteres.');
    else if (trimmed.length > 64) setNameError('El nombre es demasiado largo (máx. 64 caracteres).');
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.'-]+$/.test(trimmed)) setNameError('El nombre contiene caracteres no permitidos.');
    else if (/\s$/.test(newName)) setNameError('El nombre no puede terminar con espacios.');
    else setNameError(null);
  }, [newName, editMode]);

  const handleGuardarNombre = async () => {
    if (!userData) return;
    const trimmedName = newName.replace(/\s+$/, '');
    if (!trimmedName) {
      Alert.alert('Error', 'El nombre no puede estar vacío.');
      return;
    }
    if (trimmedName.length < 2) {
      Alert.alert('Error', 'El nombre debe tener al menos 2 caracteres.');
      return;
    }
    if (trimmedName.length > 64) {
      Alert.alert('Error', 'El nombre es demasiado largo (máx. 64 caracteres).');
      return;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s.'-]+$/.test(trimmedName)) {
      Alert.alert('Error', 'El nombre contiene caracteres no permitidos.');
      return;
    }
    if (/\s$/.test(newName)) {
      Alert.alert('Error', 'El nombre no puede terminar con espacios.');
      return;
    }
    if (trimmedName === userData.displayName) {
      Alert.alert('Sin cambios', 'El nombre es igual al actual.');
      setEditMode(false);
      return;
    }
    setLoading(true);
    try {
      await auth.currentUser?.updateProfile({ displayName: trimmedName });
      const firestore = firebase.firestore();
      const uid = auth.currentUser?.uid;
      if (uid) {
        await firestore.collection('users').doc(uid).set(
          { displayName: trimmedName },
          { merge: true }
        );
      }
      // Refresca el usuario para obtener el nuevo displayName
      await auth.currentUser?.reload();
      const refreshedUser = auth.currentUser;
      setUserData({
        displayName: refreshedUser?.displayName || trimmedName,
        email: refreshedUser?.email || userData.email,
      });
      setEditMode(false);
      Alert.alert('Éxito', 'Nombre actualizado correctamente.');
    } catch (err: any) {
      console.warn('Error actualizando nombre:', err?.message || err);
      setEditMode(false);
      setUserData({ ...userData, displayName: trimmedName });
      Alert.alert('Aviso', 'El nombre fue actualizado, pero ocurrió un problema menor. Si no ves el cambio, intenta recargar.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <AppLayout description="Perfil de usuario">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <ActivityIndicator color={c.accent} />
        </View>
      </AppLayout>
    );
  }

  if (!userData) {
    return (
      <AppLayout description="Perfil de usuario">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <ThemedText style={{ color: c.danger, fontWeight: 'bold', fontSize: 18 * fontScale }}>
            No hay usuario autenticado.
          </ThemedText>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout description="Información de tu cuenta" showBack>
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.root}>
            <View style={styles.fieldBlock}>
              <ThemedText style={[styles.label, { color: c.text, fontSize: 16 * fontScale }]}>Nombre</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: editMode ? c.inputBg : c.card,
                    borderColor: c.inputBorder,
                    color: c.text,
                    fontSize: 18 * fontScale,
                    minHeight: 44,
                    maxHeight: 80,
                    paddingVertical: 8,
                  },
                ]}
                value={editMode ? newName : userData.displayName}
                editable={editMode}
                onChangeText={text => {
                  setNewName(text);
                  // validación en tiempo real ya está en useEffect
                }}
                placeholder="Nombre"
                placeholderTextColor={c.inputPlaceholder}
                multiline
                numberOfLines={1}
                scrollEnabled={editMode}
                textAlignVertical="center"
                maxLength={64}
                autoCapitalize="words"
                autoCorrect={false}
                onBlur={() => {
                  // Limpia espacios extra al salir del input
                  if (editMode) setNewName(newName.trim());
                }}
              />
              {editMode && nameError && (
                <ThemedText style={{ color: c.danger, fontSize: 13, marginTop: 4 }}>
                  {nameError}
                </ThemedText>
              )}
              {editMode ? (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
                  <TouchableOpacity
                    style={[styles.editBtn, { backgroundColor: c.btnPrimary, marginRight: 10 }]}
                    onPress={handleGuardarNombre}
                  >
                    <Ionicons name="checkmark" size={20 * fontScale} color={c.btnText} />
                    <ThemedText style={{ color: c.btnText, fontWeight: 'bold', marginLeft: 4 }}>Guardar</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.editBtn, { backgroundColor: c.btnDanger }]}
                    onPress={() => {
                      setEditMode(false);
                      setNewName(userData.displayName);
                    }}
                  >
                    <Ionicons name="close" size={20 * fontScale} color={c.btnText} />
                    <ThemedText style={{ color: c.btnText, fontWeight: 'bold', marginLeft: 4 }}>Cancelar</ThemedText>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.editBtn, { backgroundColor: c.btnPrimary, marginTop: 12 }]}
                  onPress={() => setEditMode(true)}
                >
                  <Ionicons name="pencil" size={20 * fontScale} color={c.btnText} />
                  <ThemedText style={{ color: c.btnText, fontWeight: 'bold', marginLeft: 4 }}>Editar</ThemedText>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.fieldBlock}>
              <ThemedText style={[styles.label, { color: c.text, fontSize: 16 * fontScale }]}>Correo</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: c.card,
                    borderColor: c.inputBorder,
                    color: c.text,
                    fontSize: 18 * fontScale,
                  },
                ]}
                value={userData.email}
                editable={false}
                selectTextOnFocus={false}
                placeholder="Correo"
                placeholderTextColor={c.inputPlaceholder}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
    );
    }


const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
    padding: 18,
    gap: 18,
  },
  fieldBlock: {
    width: '100%',
    maxWidth: 420,
    marginBottom: 18,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 0,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 0,
  },
});

