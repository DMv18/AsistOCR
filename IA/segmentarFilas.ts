import { SERVER_URL } from '@/constants/server';

export async function segmentarFilas(uri: string): Promise<{ excel: string; nombresDetectados: string[] }> {
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

