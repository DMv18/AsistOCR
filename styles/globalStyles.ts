import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';


export function useGlobalColors() {
  const { theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];
  return {
    containerBg: c.background,
    headerBg: c.headerBg,
    headerBtnBg: c.accent,
    headerText: c.text,
    btnPrimaryBg: c.btnPrimary,      // <-- color de fondo para btnPrimary
    btnPrimaryText: c.btnText,       // <-- color de texto para btnPrimary
    btnSecondaryBg: c.btnSecondary,  // <-- color de fondo para btnSecondary
    btnSecondaryText: c.btnText,     // <-- color de texto para btnSecondary
    btnDangerBg: c.formBtnDanger,        // <--- corregido
    btnDangerText: c.formBtnDangerText,  
    helpBtnBg: c.help,
    helpBtnText: c.text,
  };
}

export const globalStyles = StyleSheet.create({
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
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 8,
    // El color de fondo se debe pasar desde el componente
  },
  btnPrimaryText: {
    fontWeight: 'bold',
    fontSize: 18,
    // El color se debe pasar desde el componente
  },
  btnSecondary: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 8,
    // El color de fondo se debe pasar desde el componente
  },
  btnSecondaryText: {
    fontWeight: 'bold',
    fontSize: 18,
    // El color se debe pasar desde el componente
  },
  btnDanger: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginHorizontal: 4,
    // El color de fondo se debe pasar desde el componente
  },
  btnDangerText: {
    fontWeight: 'bold',
    fontSize: 16,
    // El color se debe pasar desde el componente
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
