import { AppLayout } from '@/components/AppLayout';
import { FormularioAsistencia } from '@/components/FormularioAsistencia';
import React from 'react';

export default function CrearAsistenciaScreen() {
  return (
    <AppLayout
      description="Sube las fotos y datos de la asistencia."
    >
      <FormularioAsistencia />
    </AppLayout>
  );
}



