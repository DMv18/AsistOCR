// Paleta normal: colores suaves, modernos y accesibles, con buen contraste y jerarquía visual.

export const colorsNormal = {
  light: {
    // Fondo general de la app (área exterior)
    background: '#F7FAFC', // gris azulado muy claro

    // Fondo de los contenedores principales (cards, AppLayout, etc)
    card: '#FFFFFF',           // blanco para cards
    appLayoutCard: '#FFFFFF',
    homeCardBg: '#FFFFFF',
    historialCardBg: '#FFFFFF',

    // Fondo de bloques funcionales internos (ej: bloque funcional principal)
    mainBlockBg: '#E3F2FD', // azul muy claro

    // General (usado en toda la app)
    text: '#1A202C',         // gris oscuro
    border: '#CBD5E0',       // gris claro
    accent: '#3182CE',       // azul principal/acento
    danger: '#E53E3E',       // rojo
    warning: '#ECC94B',      // amarillo
    success: '#38A169',      // verde
    help: '#EDF2F7',         // gris claro
    btnPrimary: '#3182CE',   // azul principal
    btnSecondary: '#63B3ED', // azul secundario
    btnDanger: '#E53E3E',
    btnText: '#FFF',

    // Header/AppBar (AppLayout, globalStyles)
    headerBg: '#2B6CB0',     // azul más oscuro
    headerText: '#FFF',
    headerBtnBg: '#3182CE',
    headerBtnText: '#FFF',
    helpBtnBg: '#E3F2FD',
    helpBtnText: '#1A202C',

    // Input (TextInput, etc) (LoginForm, RegisterForm, FormularioAsistencia)
    inputBg: '#F7FAFC',
    inputBorder: '#CBD5E0',
    inputText: '#1A202C',
    inputPlaceholder: '#A0AEC0',
    inputIcon: '#3182CE',
    inputError: '#E53E3E',
    inputFocus: '#3182CE',
    inputIconCircle: '#3182CE',
    inputLinkText: '#3182CE',

    // ListaEventos (ListaEventos, historial.tsx)
    listaEventosSearchBar: '#E3F2FD',
    listaEventosCard: '#FFFFFF',
    listaEventosIcon: '#3182CE',
    listaEventosNombre: '#1A202C',
    listaEventosFecha: '#718096',
    listaEventosBtnEditar: '#38A169',
    listaEventosBtnBorrar: '#E53E3E',
    listaEventosBtnVer: '#3182CE',
    listaEventosBtnIcon: '#FFF',

    // FormularioAsistencia (FormularioAsistencia.tsx)
    formFotosBlock: '#E3F2FD',
    formFotoRow: '#FFFFFF',
    formFotoRowBorder: '#CBD5E0',
    formAddBtn: '#63B3ED',
    formAddBtnText: '#3182CE',
    formBtnDanger: '#E53E3E',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#3182CE',
    formBtnPrimaryText: '#FFF',
    formBtnSecondary: '#63B3ED',

    // AppLayout (AppLayout.tsx)
    appLayoutBg: '#F7FAFC',
    appLayoutCard: '#FFFFFF',
    appLayoutGreenBlock: '#E3F2FD',
    appLayoutRegresarBtn: '#3182CE',
    appLayoutRegresarBtnText: '#FFF',

    // Home (index.tsx)
    homeCardBg: '#FFFFFF',
    homeBtnText: '#3182CE',        // Texto de los botones en Home (puedes ajustar si lo deseas)

    // TomarFoto (tomar-foto.tsx)
    tomarFotoBtnBg: '#3182CE',
    tomarFotoBtnText: '#FFF',
    tomarFotoPreviewBorder: '#CBD5E0',
    tomarFotoRegresarBtnBg: '#63B3ED',
    tomarFotoRegresarBtnText: '#FFF',

    // EditarEvento (editar-evento.tsx)
    editarEventoGreenBlock: '#E3F2FD',
    editarEventoRegresarBtn: '#3182CE',
    editarEventoRegresarBtnText: '#FFF',
    editarEventoOpcion1Bg: '#F7FAFC',
    editarEventoOpcion2Bg: '#F7FAFC',
    editarEventoOpcion3Bg: '#F7FAFC',
    editarEventoOpcionText: '#1A202C',
    editarEventoIcon1Bg: '#3182CE',
    editarEventoIcon2Bg: '#38A169',
    editarEventoIcon3Bg: '#ECC94B',

    // Config (config.tsx)
    configSectionBg: '#FFFFFF',
    configColorOptionBg: '#E3F2FD',
    configColorOptionSelected: '#63B3ED',
    configColorRadio: '#CBD5E0',
    configColorRadioSelected: '#3182CE',
    configFontBtn: '#3182CE',
    configFontBtnText: '#FFF',
    configLabelText: '#1A202C',
    mainBlockBg: '#E3F2FD', // Cambiado a b4cded

    // Historial (historial.tsx)
    historialMainBg: '#F7FAFC',
    historialCardBg: '#FFFFFF',// Card en Historial

    // ListaEventos (ListaEventos.tsx)
    eventoCard: '#FFFFFF',
    btnIcon: '#3182CE',
    eventoNombre: '#1A202C',
    eventoFecha: '#718096',
    btnEditar: '#38A169',
    btnBorrar: '#E53E3E',
    btnVer: '#3182CE',
    iconTendencias: '#63B3ED',

    // TomarFoto (tomar-foto.tsx)
    TomarFoto: {
      cameraBtnBg: '#3182CE',
      cameraBtnText: '#FFF',
      previewBorder: '#CBD5E0',
      regresarBtnBg: '#63B3ED',
      regresarBtnText: '#FFF',
    },

    // EditarEvento (editar-evento.tsx)
    EditarEvento: {
      greenBlock: '#E3F2FD',
      regresarBtn: '#3182CE',
      regresarBtnText: '#FFF',
      opcion1Bg: '#F7FAFC',
      opcion2Bg: '#F7FAFC',
      opcion3Bg: '#F7FAFC',
      opcionText: '#1A202C',
      icon1Bg: '#3182CE',
      icon2Bg: '#38A169',
      icon3Bg: '#ECC94B',
    },

    // Config (usado en app/(tabs)/config.tsx)
    Config: {
      sectionBg: '#FFFFFF',
      colorOptionBg: '#E3F2FD',
      colorOptionSelected: '#63B3ED',
      colorRadio: '#CBD5E0',
      colorRadioSelected: '#3182CE',
      fontBtn: '#3182CE',
      fontBtnText: '#FFF',
      labelText: '#1A202C',
      mainBlockBg: '#E3F2FD',
    },

    // LoginForm/RegisterForm (LoginForm.tsx, RegisterForm.tsx)
    iconCircle: '#E3F2FD',
    iconCircleIcon: '#3182CE',

    // ThemedText (ThemedText.tsx)
    themedText: {
      default: '#1A202C',
      title: '#2B6CB0',
      link: '#3182CE',
      subtitle: '#1A202C',
      defaultSemiBold: '#1A202C',
    },

    // ThemedView (ThemedView.tsx)
    themedView: {
      background: '#F7FAFC',
      card: '#FFFFFF',
    },

    // Collapsible (Collapsible.tsx)
    collapsible: {
      background: '#E3F2FD',
      headerText: '#3182CE',
      icon: '#3182CE',
    },

    // ExternalLink (ExternalLink.tsx)
    externalLink: {
      color: '#3182CE',
    },

    // RegisterForm/LoginForm (LoginForm.tsx, RegisterForm.tsx)
    formIconCircle: '#E3F2FD',
    formIconCircleIcon: '#3182CE',
  },

  dark: {
    // Fondo general de la app (área exterior)
    background: '#274C77', // Fondo general oscuro (puedes ajustar según preferencia)

    // Fondo de los contenedores principales (cards, AppLayout, etc)
    card: '#6096BA',       // Contenedores/card oscuro
    appLayoutCard: '#6096BA',
    homeCardBg: '#6096BA',
    historialCardBg: '#6096BA',

    // Fondo de bloques funcionales internos (ej: bloque azul claro de config)
    mainBlockBg: '#365980', // Puedes ajustar este color según tu diseño

    // General
    text: '#F7FAFC',
    border: '#4A5568',
    accent: '#2563EB',
    danger: '#E53E3E',
    warning: '#ECC94B',
    success: '#38A169',
    help: '#2D3748',
    btnPrimary: '#83c5be',
    btnSecondary: '#83c5be',
    homeBtnBg: '#83c5be',
    homeBtnText: '#222',
    // ...existing code...

    // Header/AppBar
    headerBg: '#274C77',   // Header oscuro
    headerText: '#FFF',
    headerBtnBg: '#2563EB',
    headerBtnText: '#FFF',
    helpBtnBg: '#2D3748',
    helpBtnText: '#FFF',

    // Input
    inputBg: '#2D3748',
    inputBorder: '#4A5568',
    inputText: '#F7FAFC',
    inputPlaceholder: '#A0AEC0',
    inputIcon: '#2563EB',
    inputError: '#E53E3E',
    inputFocus: '#2563EB',
    inputIconCircle: '#2563EB',
    inputLinkText: '#63B3ED',

    // ListaEventos
    listaEventosSearchBar: '#234E52',
    listaEventosCard: '#2D3748',
    listaEventosIcon: '#2563EB',
    listaEventosNombre: '#F7FAFC',
    listaEventosFecha: '#A0AEC0',
    listaEventosBtnEditar: '#38A169',
    listaEventosBtnBorrar: '#E53E3E',
    listaEventosBtnVer: '#2563EB',
    listaEventosBtnIcon: '#FFF',

    // FormularioAsistencia
    formFotosBlock: '#234E52',
    formFotoRow: '#2D3748',
    formFotoRowBorder: '#4A5568',
    formAddBtn: '#2D3748',
    formAddBtnText: '#2563EB',
    formBtnDanger: '#E53E3E',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#38A169',
    formBtnPrimaryText: '#FFF',
    formBtnSecondary: '#2563EB',

    // AppLayout
    appLayoutBg: '#274C77',
    appLayoutCard: '#6096BA',
    appLayoutGreenBlock: '#365980',
    appLayoutRegresarBtn: '#2563EB',
    appLayoutRegresarBtnText: '#FFF',

    // Home
    homeCardBg: '#6096BA',
    homeBtnText: '#222',

    // TomarFoto
    tomarFotoBtnBg: '#2563EB',
    tomarFotoBtnText: '#FFF',
    tomarFotoPreviewBorder: '#4A5568',
    tomarFotoRegresarBtnBg: '#38A169',
    tomarFotoRegresarBtnText: '#FFF',

    // EditarEvento
    editarEventoGreenBlock: '#234E52',
    editarEventoRegresarBtn: '#2563EB',
    editarEventoRegresarBtnText: '#FFF',
    editarEventoOpcion1Bg: '#2D3748',
    editarEventoOpcion2Bg: '#2D3748',
    editarEventoOpcion3Bg: '#2D3748',
    editarEventoOpcionText: '#F7FAFC',
    editarEventoIcon1Bg: '#2563EB',
    editarEventoIcon2Bg: '#38A169',
    editarEventoIcon3Bg: '#ECC94B',

    // Config
    configSectionBg: '#2D3748',
    configColorOptionBg: '#234E52',
    configColorOptionSelected: '#4A5568',
    configColorRadio: '#4A5568',
    configColorRadioSelected: '#2563EB',
    configFontBtn: '#2563EB',
    configFontBtnText: '#FFF',
    configLabelText: '#F7FAFC',
    mainBlockBg: '#365980',

    // Historial
    historialMainBg: '#1A202C',
    historialCardBg: '#6096BA',

    // ListaEventos
    eventoCard: '#2D3748',
    btnIcon: '#2563EB',
    eventoNombre: '#F7FAFC',
    eventoFecha: '#A0AEC0',
    btnEditar: '#38A169',
    btnBorrar: '#E53E3E',
    btnVer: '#2563EB',
    iconTendencias: '#e1aaff',

    TomarFoto: {
      cameraBtnBg: '#2563EB',
      cameraBtnText: '#FFF',
      previewBorder: '#4A5568',
      regresarBtnBg: '#38A169',
      regresarBtnText: '#FFF',
    },

    EditarEvento: {
      greenBlock: '#234E52',
      regresarBtn: '#2563EB',
      regresarBtnText: '#FFF',
      opcion1Bg: '#2D3748',
      opcion2Bg: '#2D3748',
      opcion3Bg: '#2D3748',
      opcionText: '#F7FAFC',
      icon1Bg: '#2563EB',
      icon2Bg: '#38A169',
      icon3Bg: '#ECC94B',
    },

    Config: {
      sectionBg: '#2D3748',
      colorOptionBg: '#234E52',
      colorOptionSelected: '#4A5568',
      colorRadio: '#4A5568',
      colorRadioSelected: '#2563EB',
      fontBtn: '#2563EB',
      fontBtnText: '#FFF',
      labelText: '#F7FAFC',
      mainBlockBg: '#365980',
    },

    // Nuevas propiedades para login/register
    iconCircle: '#2D3748',
    iconCircleIcon: '#888',

    // ThemedText
    themedText: {
      default: '#F7FAFC',
      title: '#63B3ED',
      link: '#63B3ED',
      subtitle: '#F7FAFC',
      defaultSemiBold: '#F7FAFC',
    },

    // ThemedView
    themedView: {
      background: '#1A202C',
      card: '#2D3748',
    },

    // Collapsible
    collapsible: {
      background: '#2D3748',
      headerText: '#63B3ED',
      icon: '#63B3ED',
    },

    // ExternalLink
    externalLink: {
      color: '#63B3ED',
    },

    // RegisterForm/LoginForm
    formIconCircle: '#2D3748',
    formIconCircleIcon: '#888',
  },
};
