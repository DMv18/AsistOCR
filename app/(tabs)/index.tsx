import { AppLayout } from '@/components/AppLayout';
import { ThemedText } from '@/components/ThemedText';
import { useGlobalColors, useGlobalStyles } from '@/styles/globalStyles';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';

// Copilot imports actualizados
import { CopilotProvider, CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';

const WalkthroughableTouchableOpacity = walkthroughable(TouchableOpacity);

function HomeScreen() {
  const router = useRouter();
  const colors = useGlobalColors();
  const globalStyles = useGlobalStyles();
  const { start } = useCopilot();

  // Callback estable para pasar a onHelp
  const handleHelp = useCallback(() => {
    // Pequeño delay para asegurar que el contexto esté listo
    setTimeout(() => {
      start();
    }, 100);
  }, [start]);

  return (
    <AppLayout
      description="Bienvenido. Selecciona una opción para comenzar."
      showBack={false}
      onHelp={handleHelp}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {/* Elimina el botón de ayuda extra */}
        <CopilotStep
          text="Aquí puedes crear una nueva asistencia. Sube una foto de la lista y el sistema la procesará automáticamente."
          order={1}
          name="crearAsistencia"
        >
          <WalkthroughableTouchableOpacity
            style={[
              globalStyles.btnSecondary,
              {
                backgroundColor: colors.btnSecondaryBg,
                alignSelf: 'center',
                minWidth: 220 * globalStyles.btnSecondaryText.fontSize / 16,
                width: 240 * globalStyles.btnSecondaryText.fontSize / 16,
                height: 60 * globalStyles.btnSecondaryText.fontSize / 16,
                justifyContent: 'center',
              }
            ]}
            accessibilityLabel="Crear nueva asistencia"
            onPress={() => router.push('/crear-asistencia')}
          >
            <ThemedText style={[globalStyles.btnSecondaryText, { color: colors.btnSecondaryText }]}>
              Crear nueva asistencia
            </ThemedText>
          </WalkthroughableTouchableOpacity>
        </CopilotStep>
        <CopilotStep
          text="Aquí puedes ver el historial de asistencias creadas y gestionarlas."
          order={2}
          name="historial"
        >
          <WalkthroughableTouchableOpacity
            style={[
              globalStyles.btnSecondary,
              {
                backgroundColor: colors.btnSecondaryBg,
                alignSelf: 'center',
                minWidth: 220 * globalStyles.btnSecondaryText.fontSize / 16,
                width: 240 * globalStyles.btnSecondaryText.fontSize / 16,
                height: 60 * globalStyles.btnSecondaryText.fontSize / 16,
                justifyContent: 'center',
              }
            ]}
            accessibilityLabel="Historial"
            onPress={() => router.push('/historial')}
          >
            <ThemedText style={[globalStyles.btnSecondaryText, { color: colors.btnSecondaryText }]}>
              Historial
            </ThemedText>
          </WalkthroughableTouchableOpacity>
        </CopilotStep>
      </View>
    </AppLayout>
  );
}

// Exporta el componente envuelto en CopilotProvider
export default function HomeScreenWithCopilot() {
  return (
    <CopilotProvider
      overlay="svg"
      animated
      tooltipStyle={{ borderRadius: 12, padding: 12 }}
      labels={{
        finish: 'Listo',
        next: 'Siguiente',
        previous: 'Anterior',
        skip: 'Saltar',
      }}
      stepNumberComponent={() => null}
    >
      <HomeScreen />
    </CopilotProvider>
  );
}


