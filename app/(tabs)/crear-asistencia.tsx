import { AppLayout } from '@/components/AppLayout';
import { FormularioAsistencia } from '@/components/FormularioAsistencia';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function CrearAsistenciaScreen() {
  const params = useLocalSearchParams();
  
  const fotoCamara = typeof params.foto === 'string' ? params.foto : undefined;

  return (
    <AppLayout
      description="Sube las fotos y datos de la asistencia."
    >
      <FormularioAsistencia fotoCamara={fotoCamara} />
    </AppLayout>
  );
}



