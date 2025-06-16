import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { globalStyles, useGlobalColors } from '@/styles/globalStyles';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colors = useGlobalColors();

  return (
    <AppLayout description="Bienvenido. Selecciona una opción para comenzar." showBack={false}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <TouchableOpacity
          style={[globalStyles.btnPrimary, { backgroundColor: colors.btnSecondaryBg }]}
          accessibilityLabel="Crear nueva asistencia"
          onPress={() => router.push('/crear-asistencia')}
        >
          <ThemedText style={[globalStyles.btnSecondaryText, { color: colors.btnSecondaryText }]}>
            Crear nueva asistencia
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            globalStyles.btnSecondary,
            {
              backgroundColor: colors.btnSecondaryBg,
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
          <ThemedText style={[globalStyles.btnSecondaryText, { color: colors.btnSecondaryText }]}>
            Historial
          </ThemedText>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
}
