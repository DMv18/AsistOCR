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
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { auth } from '@/firebaseConfig';
import colorsNormal from '@/constants/colors.normal';
import { useGlobalStyles } from '@/styles/globalStyles';

const colors = colorsNormal.light;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const globalStyles = useGlobalStyles();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    const emailLower = email.trim().toLowerCase();

    if (!emailLower) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[\w-.]+@gmail\.com$/.test(emailLower)) {
      newErrors.email = 'Solo se permiten correos @gmail.com';
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password);
      Alert.alert('Éxito', 'Inicio de sesión correcto');
      router.replace('/(tabs)');
    } catch (error: any) {
      // No mostrar el error crudo de Firebase al usuario
      let errorMessage = 'Error al iniciar sesión';

      if (
        error.code === 'auth/user-not-found' ||
        (error.message && error.message.toLowerCase().includes('no user record'))
      ) {
        errorMessage = 'El correo no está registrado. Por favor verifica o regístrate.';
      } else if (
        error.code === 'auth/invalid-credential' ||
        (error.message && error.message.toLowerCase().includes('invalid credential'))
      ) {
        errorMessage = 'Las credenciales ingresadas no son válidas. Verifica tu correo y contraseña.';
      } else {
        switch (error.code) {
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Correo electrónico inválido';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Demasiados intentos. Cuenta temporalmente bloqueada';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Cuenta deshabilitada';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
            break;
        }
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    Alert.alert(
      'Restablecer contraseña',
      `¿Deseas recibir un enlace para restablecer la contraseña a ${email}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Enviar',
          onPress: async () => {
            try {
              await auth.sendPasswordResetEmail(email.trim().toLowerCase());
              Alert.alert(
                'Correo enviado',
                'Revisa tu bandeja de entrada para restablecer tu contraseña'
              );
            } catch (error) {
              Alert.alert('Error', 'No se pudo enviar el correo de recuperación');
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.headerText }]}>Iniciar Sesión</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.iconContainer, { backgroundColor: colors.formIconCircle }]}>
          <Ionicons name="person-circle-outline" size={48} color={colors.loginIconColor} />
        </View>

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
            onChangeText={text => {
              setEmail(text);
              const emailLower = text.trim().toLowerCase();
              if (!emailLower) setErrors(e => ({ ...e, email: 'El correo es obligatorio' }));
              else if (!/^[\w-.]+@gmail\.com$/.test(emailLower)) setErrors(e => ({ ...e, email: 'Solo se permiten correos @gmail.com' }));
              else setErrors(e => ({ ...e, email: undefined }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />
          {errors.email && (
            <Text style={[styles.errorText, { color: colors.danger }]}>{errors.email}</Text>
          )}
        </View>

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
              onChangeText={text => {
                setPassword(text);
                if (!text) setErrors(e => ({ ...e, password: 'La contraseña es obligatoria' }));
                else if (text.length < 6) setErrors(e => ({ ...e, password: 'Mínimo 6 caracteres' }));
                else setErrors(e => ({ ...e, password: undefined }));
              }}
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

        <TouchableOpacity
          onPress={handleForgotPassword}
          disabled={loading}
        >
          <Text style={[styles.forgotPassword, { color: colors.link }]}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            globalStyles.btnPrimary,
            styles.loginButton,
            { 
              backgroundColor: colors.btnPrimary,
              opacity: loading ? 0.7 : 1,
            },
          ]}
          onPress={handleLogin}
          disabled={loading}
          accessibilityLabel="Iniciar sesión"
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.btnText} />
          ) : (
            <Text style={[globalStyles.btnPrimaryText, { color: colors.btnText }]}>
              Iniciar Sesión
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={[styles.dividerLine, { backgroundColor: colors.divider }]} />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}>o</Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.divider }]} />
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.text }]}>
            ¿No tienes una cuenta?
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/register')}
            disabled={loading}
          >
            <Text style={[styles.footerLink, { color: colors.link }]}> Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
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
  forgotPassword: {
    textAlign: 'right',
    marginBottom: 24,
    fontSize: 14,
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});