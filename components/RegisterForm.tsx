import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth, modularAuth, firebase } from '@/firebaseConfig';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import 'firebase/compat/firestore';
import colorsNormal from '@/constants/colors.normal';
import { useGlobalStyles } from '@/styles/globalStyles';

const colors = colorsNormal.light;

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const globalStyles = useGlobalStyles();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const emailLower = email.trim().toLowerCase();

    // Validación de nombre
    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Mínimo 2 caracteres';
    }

    // Validación de email
    if (!emailLower) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailLower)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    // Validación de contraseña
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    // Validación de confirmación de contraseña
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const emailChecked = email.trim().toLowerCase();

      // Solo permitir correos @gmail.com
      if (!emailChecked.endsWith('@gmail.com')) {
        setLoading(false);
        Alert.alert('Correo inválido', 'Solo se permiten correos que terminen en @gmail.com');
        return;
      }

      // Verifica si el correo ya está registrado antes de crear el usuario
      const signInMethods = await fetchSignInMethodsForEmail(modularAuth, emailChecked);
      if (signInMethods && signInMethods.length > 0) {
        setLoading(false);
        Alert.alert('Correo ya registrado', 'El correo electrónico ya está registrado. Intenta iniciar sesión o usa otro correo.');
        return;
      }

      const userCredential = await auth.createUserWithEmailAndPassword(
        emailChecked,
        password
      );
      
      // Actualizar perfil del usuario con el nombre
      await userCredential.user?.updateProfile({
        displayName: name.trim()
      });

      // Guardar datos del usuario y preferencias por defecto en Firestore
      const firestore = firebase.firestore();
      try {
        await firestore.collection('users').doc(userCredential.user.uid).set({
          email: emailChecked,
          displayName: name.trim(),
          fontScale: 1,
          themeSetting: 'system',
          colorMode: 'normal',
          createdAt: new Date().toISOString(),
        });
      } catch (firestoreErr: any) {
        if (
          firestoreErr?.code === 'permission-denied' ||
          firestoreErr?.message?.includes('permission')
        ) {
          // Solo muestra un mensaje informativo, no bloqueante
          Alert.alert(
            'Registro exitoso',
            'Tu cuenta fue creada. No se pudo guardar tus preferencias en la base de datos por falta de permisos, pero podrás usar la app normalmente.'
          );
          // Permite continuar aunque falle Firestore
          router.replace('/config');
          setLoading(false);
          return;
        } else {
          Alert.alert('Registro parcial', 'Tu cuenta fue creada, pero no se pudo guardar tu información en la base de datos.');
          router.replace('/config');
          setLoading(false);
          return;
        }
      }

      // Enviar email de verificación
      await userCredential.user?.sendEmailVerification();

      Alert.alert(
        'Registro exitoso',
        '¡Bienvenido! Por favor verifica tu correo electrónico.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/config')
          }
        ]
      );
    } catch (error: any) {
      let errorMessage = 'Error al registrar';

      if (error.code === 'auth/network-request-failed') {
        errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'El correo ya está registrado';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Operación no permitida';
      } else if (
        error.code === 'permission-denied' ||
        (error.message && error.message.toLowerCase().includes('permission'))
      ) {
        errorMessage = 'No tienes permisos suficientes para completar el registro. Contacta al administrador.';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.headerText }]}>Crear Cuenta</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={[styles.iconContainer, { backgroundColor: colors.formIconCircle }]}>
            <Ionicons name="person-add-outline" size={48} color={colors.loginIconColor} />
          </View>

          {/* Campo de Nombre */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.inputLabel }]}>Nombre Completo</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: errors.name ? colors.danger : colors.inputBorder,
                  color: colors.inputText,
                },
              ]}
              placeholder="Tu nombre"
              placeholderTextColor={colors.inputPlaceholder}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
              editable={!loading}
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: colors.danger }]}>{errors.name}</Text>
            )}
          </View>

          {/* Campo de Email */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.inputLabel }]}>Correo Electrónico</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  borderColor: errors.email ? colors.danger : colors.inputBorder,
                  color: colors.inputText,
                },
              ]}
              placeholder="tucorreo@ejemplo.com"
              placeholderTextColor={colors.inputPlaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: colors.danger }]}>{errors.email}</Text>
            )}
          </View>

          {/* Campo de Contraseña */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.inputLabel }]}>Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: errors.password ? colors.danger : colors.inputBorder,
                    color: colors.inputText,
                  },
                ]}
                placeholder="••••••••"
                placeholderTextColor={colors.inputPlaceholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureTextEntry}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                disabled={loading}
              >
                <Ionicons
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.inputPlaceholder}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={[styles.errorText, { color: colors.danger }]}>{errors.password}</Text>
            )}
          </View>

          {/* Campo de Confirmar Contraseña */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.inputLabel }]}>Confirmar Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: errors.confirmPassword ? colors.danger : colors.inputBorder,
                    color: colors.inputText,
                  },
                ]}
                placeholder="••••••••"
                placeholderTextColor={colors.inputPlaceholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={confirmSecureTextEntry}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
                disabled={loading}
              >
                <Ionicons
                  name={confirmSecureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.inputPlaceholder}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { color: colors.danger }]}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>

          {/* Requisitos de contraseña */}
          <View style={styles.passwordRequirements}>
            <Text style={[styles.requirementText, { color: colors.textSecondary }]}>
              La contraseña debe contener:
            </Text>
            <View style={styles.requirementItem}>
              <Ionicons
                name={password.length >= 6 ? 'checkmark-circle' : 'alert-circle'}
                size={16}
                color={password.length >= 6 ? colors.success : colors.warning}
              />
              <Text style={[styles.requirementText, { color: colors.textSecondary }]}>
                Mínimo 6 caracteres
              </Text>
            </View>
          </View>

          {/* Botón de Registro */}
          <TouchableOpacity
            style={[
              globalStyles.btnPrimary,
              styles.registerButton,
              {
                backgroundColor: colors.btnPrimary,
                opacity: loading ? 0.7 : 1,
              },
            ]}
            onPress={handleRegister}
            disabled={loading}
            accessibilityLabel="Registrarse"
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.btnText} />
            ) : (
              <Text style={[globalStyles.btnPrimaryText, { color: colors.btnText }]}>
                Registrarse
              </Text>
            )}
          </TouchableOpacity>

          {/* Enlace a Login */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.text }]}>
              ¿Ya tienes una cuenta?
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/login')}
              disabled={loading}
            >
              <Text style={[styles.footerLink, { color: colors.link }]}> Iniciar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 24,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  passwordRequirements: {
    marginVertical: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  requirementText: {
    marginLeft: 8,
    fontSize: 13,
  },
  registerButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});