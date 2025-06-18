import { SERVER_URL } from '@/constants/server';

// Stub para evitar error de importación. Implementa la lógica real según tu backend.
export async function segmentarFilas(uri: string): Promise<{ excel: string; nombresDetectados: string[] }> {
  // Sube la imagen al backend y espera la respuesta real
  const formData = new FormData();
  formData.append('imagen', {
    uri,
    name: 'foto.png',
    type: 'image/png',
  } as any);

  const res = await fetch(`${SERVER_URL}/segmentar`, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      // 'Content-Type' NO debe estar presente para FormData en React Native
    },
  });

  if (!res.ok) {
    throw new Error('Error al procesar la imagen');
  }

  const data = await res.json();
  return {
    excel: data.excel,
    nombresDetectados: data.nombresDetectados || [],
  };
}

