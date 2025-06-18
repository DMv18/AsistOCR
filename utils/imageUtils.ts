import * as FileSystem from 'expo-file-system';

const IMAGENES_DIR = FileSystem.documentDirectory + 'Imagenes/';

export async function ensureImagenesDir() {
  const dirInfo = await FileSystem.getInfoAsync(IMAGENES_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(IMAGENES_DIR, { intermediates: true });
  }
}

export function getExtension(uri: string): string {
  const match = uri.match(/\.(\w+)(\?|$)/);
  return match ? match[1] : 'jpg';
}

export async function copyImageToApp(uri: string): Promise<string> {
  await ensureImagenesDir();
  if (uri.startsWith(IMAGENES_DIR)) {
    return uri;
  }
  const ext = getExtension(uri);
  const filename = `img_${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
  const dest = IMAGENES_DIR + filename;
  await FileSystem.copyAsync({ from: uri, to: dest });
  return dest;
}
