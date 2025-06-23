import { FormularioAsistencia } from '@/components/FormularioAsistencia';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { CopilotProvider } from 'react-native-copilot';

type Props = {
  eventoId: string;
  onSalir: () => void;
};

function AgregarListaDiaInner({ eventoId, onSalir }: Props) {
  const [fotoListaDia, setFotoListaDia] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleProcesarListaDia = (uri: string) => {
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

export function AgregarListaDia(props: Props) {
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
      <AgregarListaDiaInner {...props} />
    </CopilotProvider>
  );
}
