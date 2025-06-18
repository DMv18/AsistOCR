import { SERVER_URL } from '@/constants/server';


export async function segmentarFilas(uri: string): Promise<{ filas: string[]; excel: string; nombresDetectados: string[] }> {
  const formData = new FormData();
  formData.append('imagen', {
    uri,
    name: 'foto.png',
    type: 'image/png',
  } as any);

  const response = await fetch(`${SERVER_URL}/segmentar`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const data = await response.json();
  return {
    filas: data.filas,
    excel: data.excel,
    nombresDetectados: data.nombresDetectados ?? [],
  };
}

