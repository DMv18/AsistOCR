import { Colors } from '@/constants/Colors';
import { useThemeCustom } from '@/hooks/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { ThemedText } from './ThemedText';

type Props = {
  children: React.ReactNode;
  description?: string;
  showBack?: boolean;
  onHelp?: () => void; // <-- agrega la prop
};

export function AppLayout({ children, description, showBack = true, onHelp }: Props) {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { fontScale, theme, colorMode } = useThemeCustom();
  const c = Colors[colorMode][theme];


  const bgColor = c.appLayoutBg;
  const cardColor = c.appLayoutCard;
  const helpColor = c.helpBtnBg;
  const textColor = c.text;
  const regresarBtnColor = c.appLayoutRegresarBtn;
  const regresarBtnTextColor = c.appLayoutRegresarBtnText;
  const headerTitleColor = c.headerText;
  const headerBtnBgColor = c.headerBtnBg;
  const headerBtnTextColor = c.headerBtnText;
  const headerBgColor = c.headerBg;
  const accentColor = c.accent;
  const greenBlockColor = c.appLayoutGreenBlock;

  
  const showCompactMenu = width < 420 || fontScale > 1.15;
  const [menuVisible, setMenuVisible] = useState(false);

 
  const headerFontSize = 24;
  const headerBtnFontSize = 16;
  const headerPaddingVertical = 18;


  const cardWidth = Math.min(width * 0.96, 600 * fontScale);
  const cardHeight = Math.max(height * 0.85, 400 * fontScale);
  const greenBlockMinHeight = Math.max(cardHeight * 0.7, 220 * fontScale);

  return (
    <SafeAreaView style={[styles.safeArea, { minHeight: height, backgroundColor: bgColor }]}>
      {}
      <View style={[
        styles.headerRow,
        {
          paddingVertical: headerPaddingVertical,
          backgroundColor: headerBgColor,
        }
      ]}>
        <TouchableOpacity onPress={() => router.push('/')} accessibilityLabel="Inicio">
          <ThemedText style={[styles.headerTitle, { fontSize: headerFontSize, color: headerTitleColor }]}>AsistOCR</ThemedText>
        </TouchableOpacity>
        {showCompactMenu ? (
          <>
            <TouchableOpacity
              style={[styles.menuBtn, { backgroundColor: accentColor }]}
              accessibilityLabel="Menú"
              onPress={() => setMenuVisible(true)}
            >
              <Ionicons name="menu" size={28} color={headerBtnTextColor} />
            </TouchableOpacity>
            <Modal
              visible={menuVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setMenuVisible(false)}
            >
              <Pressable style={[styles.menuOverlay, { justifyContent: 'flex-start', alignItems: 'flex-end' }]} onPress={() => setMenuVisible(false)}>
                <View style={[
                  styles.menuPopup,
                  {
                    backgroundColor: cardColor,
                    marginTop: 40, // más arriba aún
                    alignSelf: 'flex-end',
                  }
                ]}>
                  <TouchableOpacity
                    style={styles.menuOption}
                    onPress={() => {
                      setMenuVisible(false);
                      router.push('/login');
                    }}
                  >
                    <Ionicons name="person-circle-outline" size={22} color={textColor} />
                    <ThemedText style={[styles.menuOptionText, { color: textColor }]}>Usuario</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuOption}
                    onPress={() => {
                      setMenuVisible(false);
                      router.push('/config');
                    }}
                  >
                    <Ionicons name="settings" size={22} color={textColor} />
                    <ThemedText style={[styles.menuOptionText, { color: textColor }]}>Ajustes</ThemedText>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
          </>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.headerBtn, { backgroundColor: headerBtnBgColor }]}
              accessibilityLabel="Usuario"
              onPress={() => router.push('/login')}
            >
              <Ionicons name="person-circle-outline" size={20} color={headerBtnTextColor} />
              <ThemedText style={[styles.headerBtnText, { fontSize: headerBtnFontSize, color: headerBtnTextColor }]}>Usuario</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerBtn, { backgroundColor: headerBtnBgColor }]}
              accessibilityLabel="Ajustes"
              onPress={() => router.push('/config')}
            >
              <Ionicons name="settings" size={20} color={headerBtnTextColor} />
              <ThemedText style={[styles.headerBtnText, { fontSize: headerBtnFontSize, color: headerBtnTextColor }]}>Ajustes</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {}
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: height * 0.9,
            paddingBottom: 24 * fontScale,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[
            styles.card,
            {
              width: cardWidth,
              minHeight: cardHeight,
              padding: 18 * fontScale,
              gap: 12 * fontScale,
              maxWidth: 600 * fontScale,
              backgroundColor: cardColor,
            }
          ]}>
            {}
            <View style={styles.descHelpRow}>
              {description && (
                <ThemedText
                  style={[
                    styles.description,
                    { fontSize: 16 * fontScale, flex: 1, color: textColor }
                  ]}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {description}
                </ThemedText>
              )}
              <TouchableOpacity
                style={[
                  styles.helpBtn,
                  {
                    width: 36 * fontScale,
                    height: 36 * fontScale,
                    borderRadius: 18 * fontScale,
                    marginLeft: 12,
                    backgroundColor: helpColor,
                  }
                ]}
                accessibilityLabel="Ayuda"
                onPress={onHelp} // <-- llama a la prop si existe
              >
                <ThemedText style={[styles.helpBtnText, { fontSize: 22 * fontScale, color: c.helpBtnText }]}>?</ThemedText>
              </TouchableOpacity>
            </View>
            {}
            <ScrollView
              style={{ flex: 1, width: '100%' }}
              contentContainerStyle={{
                minHeight: greenBlockMinHeight,
                padding: 0,
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 12 * fontScale,
              }}
              keyboardShouldPersistTaps="handled"
              horizontal={false}
              showsVerticalScrollIndicator={false}
            >
              <View style={[
                styles.greenBlock,
                {
                  minHeight: greenBlockMinHeight,
                  width: '100%',
                  padding: 16 * fontScale,
                  gap: 12 * fontScale,
                  backgroundColor: greenBlockColor,
                }
              ]}>
                {children}
              </View>
            </ScrollView>
            {/* Botón regresar */}
            {showBack && (
              <TouchableOpacity
                style={[
                  styles.regresarBtn,
                  {
                    paddingVertical: 16 * fontScale,
                    width: 140 * fontScale,
                    borderRadius: 12 * fontScale,
                    marginTop: 8 * fontScale,
                    backgroundColor: regresarBtnColor,
                  }
                ]}
                onPress={() => router.back()}
                accessibilityLabel="Regresar"
              >
                <ThemedText style={[styles.regresarBtnText, { fontSize: 20 * fontScale, color: regresarBtnTextColor }]}>Regresar</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderRadius: 0,
    marginBottom: 0,
    position: 'relative',
    flexShrink: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
    letterSpacing: 1,
  },
  headerBtn: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  headerBtnText: {
    fontWeight: 'bold',
    marginLeft: 4,
  },
  menuBtn: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  menuPopup: {
    borderRadius: 12,
    padding: 16,
    margin: 24,
    minWidth: 160,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    // marginTop se sobreescribe inline para subir el menú
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  card: {
    borderRadius: 16,
    margin: 16,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    position: 'relative',
    flex: 1,
    maxWidth: 600,
    alignSelf: 'center',
  },
  helpAboveDesc: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  descHelpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    gap: 0,
    minHeight: 36, 
  },
  descCol: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  helpBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    zIndex: 10,
  },
  helpBtnText: {
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 0,
    textAlign: 'left',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  greenBlock: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    marginBottom: 18,
  },
  regresarBtn: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  regresarBtnText: {
    fontWeight: 'bold',
  },
});
