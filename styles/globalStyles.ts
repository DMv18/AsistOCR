import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// Hook para obtener colores globales y estilos de botones
export function useGlobalColors() {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];

  // Fallbacks seguros para los colores de botones
  return {
    ...c,
    btnPrimaryBg: c.btnPrimary ?? c.formBtnPrimary ?? '#3182CE',
    btnPrimaryText: c.btnText ?? c.formBtnPrimaryText ?? '#FFF',
    btnSecondaryBg: c.btnSecondary ?? c.formBtnSecondary ?? '#63B3ED',
    btnSecondaryText: c.btnText ?? '#FFF',
    btnDangerBg: c.btnDanger ?? c.formBtnDanger ?? '#E53E3E',
    btnDangerText: c.btnText ?? '#FFF',
  };
}

// Estilos globales escalables
export function useGlobalStyles() {
  const { fontScale } = useThemeCustom();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: isWeb ? height * 0.04 : 16,
      paddingHorizontal: isWeb ? width * 0.04 : 8,
      minHeight: height,
      minWidth: width,
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      justifyContent: 'space-between',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginBottom: isWeb ? 24 : 12,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    headerBtn: {
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      marginLeft: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerBtnText: {
      fontWeight: 'bold',
      marginLeft: 4,
    },
    btnPrimary: {
      borderRadius: 12 * fontScale,
      paddingVertical: 12 * fontScale,
      paddingHorizontal: 24 * fontScale,
      alignItems: 'center',
      marginVertical: 4 * fontScale,
    },
    btnPrimaryText: {
      fontWeight: 'bold',
      fontSize: 16 * fontScale,
    },
    btnSecondary: {
      borderRadius: 12 * fontScale,
      paddingVertical: 12 * fontScale,
      paddingHorizontal: 24 * fontScale,
      alignItems: 'center',
      marginVertical: 4 * fontScale,
    },
    btnSecondaryText: {
      fontWeight: 'bold',
      fontSize: 16 * fontScale,
    },
    btnDanger: {
      borderRadius: 12 * fontScale,
      paddingVertical: 12 * fontScale,
      paddingHorizontal: 24 * fontScale,
      alignItems: 'center',
      marginVertical: 4 * fontScale,
    },
    btnDangerText: {
      fontWeight: 'bold',
      fontSize: 16 * fontScale,
    },
    helpBtn: {
      borderRadius: 18,
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8,
    },
    helpBtnText: {
      fontSize: 22,
      fontWeight: 'bold',
    },
  });
}
