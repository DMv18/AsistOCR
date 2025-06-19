import { ThemedText } from '@/components/ThemedText';
import React from 'react';

type Props = {
  eventoId: string;
  onSalir: () => void;
};

export function CambiarAsistencia({ eventoId, onSalir }: Props) {

  return (
    <ThemedText style={{ textAlign: 'center', marginTop: 32 }}>
      Aquí irá la lógica para editar la asistencia del evento.<br />
      (Componente en construcción)
    </ThemedText>
  );
}
