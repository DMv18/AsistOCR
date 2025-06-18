import { SERVER_URL } from '@/constants/server';
import { useCallback } from 'react';

export function useLimpiarFilasBackend() {
  return useCallback(async () => {
    try {
      await fetch(`${SERVER_URL}/limpiar-filas`, { method: 'POST' });
      // Opcional: console.log('Carpeta filas limpiada en el backend');
    } catch {
      // Opcional: console.warn('No se pudo limpiar la carpeta filas en el backend');
    }
  }, []);
}
