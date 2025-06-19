import { SERVER_URL } from '@/constants/server';
import { useCallback } from 'react';

export function useLimpiarFilasBackend() {
  return useCallback(async () => {
    try {
      await fetch(`${SERVER_URL}/limpiar-filas`, { method: 'POST' });
    } catch {
    }
  }, []);
}
