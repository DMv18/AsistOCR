import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { globalStyles } from '@/styles/globalStyles';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { theme, colorMode } = useThemeCustom();
  const homeColors = Colors[colorMode]?.[theme]?.Home || { cardBg: '#FFFFFF', btnText: '#111111' };

  return (
    <AppLayout description="Bienvenido. Selecciona una opción para comenzar." showBack={false}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <TouchableOpacity
          style={[globalStyles.btnPrimary, { backgroundColor: homeColors.cardBg }]}
          accessibilityLabel="Crear nueva asistencia"
          onPress={() => router.push('/crear-asistencia')}
        >
          <ThemedText style={[
            globalStyles.btnPrimaryText,
            { color: homeColors.btnText, textAlign: 'center', width: '100%' }
          ]}>
            Crear nueva asistencia
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.btnSecondary,
            {
              backgroundColor: homeColors.cardBg,
              alignSelf: 'center',
              minWidth: 220,
              width: 240,
              height: 60,
              justifyContent: 'center',
            }
          ]}
          accessibilityLabel="Historial"
          onPress={() => router.push('/historial')}
        >
          <ThemedText style={[
            globalStyles.btnSecondaryText,
            { color: homeColors.btnText, textAlign: 'center', width: '100%' }
          ]}>
            Historial
          </ThemedText>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}



