import { FormularioAsistencia } from '@/components/FormularioAsistencia';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

type Props = {
  eventoId: string;
  onSalir: () => void;
};

export function AgregarListaDia({ eventoId, onSalir }: Props) {
  const [fotoListaDia, setFotoListaDia] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleProcesarListaDia = (uri: string) => {
    // Navega a la pantalla de agregar-asistencia con los parámetros correctos
    router.replace({
      pathname: '/agregar-asistencia',
      params: { eventoId, uri }
    });
  };

  return (
    <FormularioAsistencia
      fotoCamara={fotoListaDia}
      onProcesar={handleProcesarListaDia}
      modoAgregarListaDia
    />
  );
}
