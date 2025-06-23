import { AppLayout } from '@/components/AppLayout';
import { FormularioAsistencia } from '@/components/FormularioAsistencia';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';

import { CopilotProvider, useCopilot } from 'react-native-copilot';

function CrearAsistenciaScreenInner() {
  const params = useLocalSearchParams();
  const fotoCamara = typeof params.foto === 'string' ? params.foto : undefined;
  const { start } = useCopilot();

  const handleHelp = useCallback(() => {
    setTimeout(() => {
      start();
    }, 100);
  }, [start]);

  return (
    <AppLayout
      description="Sube las fotos y datos de la asistencia."
      onHelp={handleHelp}
    >
      <FormularioAsistencia fotoCamara={fotoCamara} />
    </AppLayout>
  );
}

export default function CrearAsistenciaScreen() {
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
      <CrearAsistenciaScreenInner />
    </CopilotProvider>
  );
}
    