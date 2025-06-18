// Paleta tritanopia: basada en colors.normal, pero adaptada para personas con tritanopia (evita azules y verdes puros).

const colorsTritanopia = {
  light: {
    // Fondo general de la app (área exterior)
    background: '#F7FAFC',

    // Fondo de los contenedores principales (cards, AppLayout, etc)
    card: '#FFFFFF',
    appLayoutCard: '#FFFFFF',

    // Fondo de bloques funcionales internos (ej: bloque funcional principal)
    mainBlockBg: '#F9EAF3', // rosa muy claro

    // General (usado en toda la app)
    text: '#1A202C',
    border: '#CBD5E0',
    accent: '#B46FC2', // púrpura
    danger: '#E53E3E',
    warning: '#ECC94B',
    success: '#D17C3A', // marrón anaranjado
    help: '#F5E9F7', // gris rosado claro
    btnPrimary: '#B46FC2', // púrpura
    btnSecondary: '#D17C3A', // marrón anaranjado
    btnDanger: '#E53E3E',
    btnText: '#FFF',

    // Header/AppBar (AppLayout, globalStyles)
    headerBg: '#8E44AD', // púrpura oscuro
    headerText: '#FFF',
    headerBtnBg: '#B46FC2',
    headerBtnText: '#FFF',
    helpBtnBg: '#F9EAF3',
    helpBtnText: '#1A202C',

    // Input (TextInput, etc)
    inputBg: '#F7FAFC',
    inputBorder: '#CBD5E0',
    inputText: '#1A202C',
    inputPlaceholder: '#A0AEC0',
    inputIcon: '#B46FC2',
    inputError: '#E53E3E',
    inputFocus: '#B46FC2',
    inputIconCircle: '#B46FC2',
    inputLinkText: '#B46FC2',

    // ListaEventos
    listaEventosSearchBar: '#F9EAF3',
    listaEventosCard: '#FFFFFF',
    listaEventosIcon: '#B46FC2',
    listaEventosNombre: '#1A202C',
    listaEventosFecha: '#718096',
    listaEventosBtnEditar: '#D17C3A',
    listaEventosBtnBorrar: '#E53E3E',
    listaEventosBtnVer: '#B46FC2',
    listaEventosBtnIcon: '#FFF',

    // FormularioAsistencia
    formFotosBlock: '#F9EAF3',
    formFotoRow: '#FFFFFF',
    formFotoRowBorder: '#CBD5E0',
    formAddBtn: '#E09AC7', // rosa
    formAddBtnText: '#FFF',
    formBtnDanger: '#E53E3E',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#B46FC2',
    formBtnPrimaryText: '#FFF',
    formBtnSecondary: '#E09AC7',

    // AppLayout
    appLayoutBg: '#F7FAFC',
    appLayoutGreenBlock: '#F9EAF3',
    appLayoutRegresarBtn: '#B46FC2',
    appLayoutRegresarBtnText: '#FFF',

    // Home
    homeCardBg: '#FFFFFF',
    homeBtnText: '#B46FC2',

    // TomarFoto
    tomarFotoBtnBg: '#B46FC2',
    tomarFotoBtnText: '#FFF',
    tomarFotoPreviewBorder: '#CBD5E0',
    tomarFotoRegresarBtnBg: '#D17C3A',
    tomarFotoRegresarBtnText: '#FFF',

    // EditarEvento
    editarEventoGreenBlock: '#F9EAF3',
    editarEventoRegresarBtn: '#B46FC2',
    editarEventoRegresarBtnText: '#FFF',
    editarEventoOpcion1Bg: '#F7FAFC',
    editarEventoOpcion2Bg: '#F7FAFC',
    editarEventoOpcion3Bg: '#F7FAFC',
    editarEventoOpcionText: '#1A202C',
    editarEventoIcon1Bg: '#B46FC2',
    editarEventoIcon2Bg: '#D17C3A',
    editarEventoIcon3Bg: '#ECC94B',

    // Config
    configSectionBg: '#FFFFFF',
    configColorOptionBg: '#F9EAF3',
    configColorOptionSelected: '#E09AC7',
    configColorRadio: '#CBD5E0',
    configColorRadioSelected: '#B46FC2',
    configFontBtn: '#B46FC2',
    configFontBtnText: '#FFF',
    configLabelText: '#1A202C',

    // Historial
    historialMainBg: '#F7FAFC',
    historialCardBg: '#FFFFFF',

    // ListaEventos
    eventoCard: '#FFFFFF',
    btnIcon: '#B46FC2',
    eventoNombre: '#1A202C',
    eventoFecha: '#718096',
    btnEditar: '#D17C3A',
    btnBorrar: '#E53E3E',
    btnVer: '#B46FC2',
    iconTendencias: '#E09AC7',

    // TomarFoto
    TomarFoto: {
      cameraBtnBg: '#B46FC2',
      cameraBtnText: '#FFF',
      previewBorder: '#CBD5E0',
      regresarBtnBg: '#D17C3A',
      regresarBtnText: '#FFF',
    },

    // EditarEvento
    EditarEvento: {
      greenBlock: '#F9EAF3',
      regresarBtn: '#B46FC2',
      regresarBtnText: '#FFF',
      opcion1Bg: '#F7FAFC',
      opcion2Bg: '#F7FAFC',
      opcion3Bg: '#F7FAFC',
      opcionText: '#1A202C',
      icon1Bg: '#B46FC2',
      icon2Bg: '#D17C3A',
      icon3Bg: '#ECC94B',
    },

    // Config
    Config: {
      sectionBg: '#FFFFFF',
      colorOptionBg: '#F9EAF3',
      colorOptionSelected: '#E09AC7',
      colorRadio: '#CBD5E0',
      colorRadioSelected: '#B46FC2',
      fontBtn: '#B46FC2',
      fontBtnText: '#FFF',
      labelText: '#1A202C',
    },

    // LoginForm/RegisterForm
    iconCircle: '#F9EAF3',
    iconCircleIcon: '#B46FC2',

    // LoginForm
    loginBtnBg: '#E09AC7',
    loginBtnText: '#FFF',
    loginLinkText: '#1A202C',
    loginCreateBtnBg: '#E09AC7',
    loginCreateBtnText: '#FFF',
    loginIconColor: '#B46FC2',

    // ThemedText
    themedText: {
      default: '#B46FC2',
      title: '#8E44AD',
      link: '#B46FC2',
      subtitle: '#1A202C',
      defaultSemiBold: '#1A202C',
    },
    // ThemedView
    themedView: '#F7FAFC',

    // ExternalLink
    externalLink: '#B46FC2',

    // RegisterForm/LoginForm
    formIconCircle: '#F9EAF3',
    formIconCircleIcon: '#B46FC2',

    // Collapsible
    collapsible: {
      background: '#F7FAFC',
      headerText: '#B46FC2',
      icon: '#B46FC2',
    },

    // Historial (iconos individuales)
    historialArchivoIconBg: '#8E44AD',
    historialArchivoIconColor: '#FFF',
    historialEditarIconBg: '#D17C3A',
    historialEditarIconColor: '#FFF',
    historialBorrarIconBg: '#E53E3E',
    historialBorrarIconColor: '#FFF',
    historialObservarIconBg: '#8E44AD',
    historialObservarIconColor: '#FFF',

    // ResultadoAsistencia
    ResultadoAsistencia: {
      infoInputBg: '#F9EAF3',
      infoInputBorder: '#B46FC2',
      infoInputText: '#1A202C',
      previewBlockBg: '#F9EAF3',
      previewTitle: '#8E44AD',
      excelContainerBorder: '#D17C3A',
      excelContainerBg: '#F9EAF3',
      tablaBorder: '#B46FC2',
      tablaBg: '#fff',
      tablaHeaderText: '#8E44AD',
      tablaCellText: '#222',
      tablaRowBorder: '#B46FC2',
      nombreIndex: '#D17C3A',
      nombreText: '#222',
      btnCancelarBg: '#B46FC2',
      btnCancelarText: '#fff',
      btnContinuarBg: '#D17C3A',
      btnContinuarText: '#fff',
      checkIcon: '#D17C3A',
    },
  },

  dark: {
    // Fondo general de la app (área exterior)
    background: '#1A202C',

    // Fondo de los contenedores principales (cards, AppLayout)
    card: '#2D3748',
    appLayoutCard: '#2D3748',

    // Fondo de bloques funcionales internos 
    mainBlockBg: '#3B2C3F', // púrpura oscuro

    // General
    text: '#E2E8F0',
    border: '#4A5568',
    accent: '#B46FC2',
    danger: '#F56565',
    warning: '#F6E05E',
    success: '#D17C3A',
    help: '#2D3748',
    btnPrimary: '#B46FC2',
    btnSecondary: '#E09AC7',
    btnDanger: '#F56565',
    btnText: '#FFF',

    // Header/AppBar
    headerBg: '#8E44AD',
    headerText: '#FFF',
    headerBtnBg: '#B46FC2',
    headerBtnText: '#FFF',
    helpBtnBg: '#3B2C3F',
    helpBtnText: '#CBD5E0',

    // Input
    inputBg: '#2D3748',
    inputBorder: '#4A5568',
    inputText: '#E2E8F0',
    inputPlaceholder: '#B3A6C7',
    inputIcon: '#B46FC2',
    inputError: '#F56565',
    inputFocus: '#B46FC2',
    inputIconCircle: '#B46FC2',
    inputLinkText: '#E09AC7',

    // ListaEventos
    listaEventosSearchBar: '#3B2C3F',
    listaEventosCard: '#2D3748',
    listaEventosIcon: '#B46FC2',
    listaEventosNombre: '#E2E8F0',
    listaEventosFecha: '#718096',
    listaEventosBtnEditar: '#D17C3A',
    listaEventosBtnBorrar: '#F56565',
    listaEventosBtnVer: '#B46FC2',
    listaEventosBtnIcon: '#FFF',

    // FormularioAsistencia
    formFotosBlock: '#3B2C3F',
    formFotoRow: '#2D3748',
    formFotoRowBorder: '#4A5568',
    formAddBtn: '#E09AC7',
    formAddBtnText: '#FFF',
    formBtnDanger: '#F56565',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#B46FC2',
    formBtnPrimaryText: '#FFF',
    formBtnSecondary: '#E09AC7',

    // AppLayout
    appLayoutBg: '#1A202C',
    appLayoutGreenBlock: '#3B2C3F',
    appLayoutRegresarBtn: '#B46FC2',
    appLayoutRegresarBtnText: '#FFF',

    // Home
    homeCardBg: '#2D3748',
    homeBtnText: '#B46FC2',

    // TomarFoto
    tomarFotoBtnBg: '#B46FC2',
    tomarFotoBtnText: '#FFF',
    tomarFotoPreviewBorder: '#4A5568',
    tomarFotoRegresarBtnBg: '#D17C3A',
    tomarFotoRegresarBtnText: '#FFF',

    // EditarEvento
    editarEventoGreenBlock: '#3B2C3F',
    editarEventoRegresarBtn: '#B46FC2',
    editarEventoRegresarBtnText: '#FFF',
    editarEventoOpcion1Bg: '#2D3748',
    editarEventoOpcion2Bg: '#2D3748',
    editarEventoOpcion3Bg: '#2D3748',
    editarEventoOpcionText: '#E2E8F0',
    editarEventoIcon1Bg: '#B46FC2',
    editarEventoIcon2Bg: '#D17C3A',
    editarEventoIcon3Bg: '#F6E05E',

    // Config
    configSectionBg: '#2D3748',
    configColorOptionBg: '#3B2C3F',
    configColorOptionSelected: '#4A5568',
    configColorRadio: '#4A5568',
    configColorRadioSelected: '#B46FC2',
    configFontBtn: '#B46FC2',
    configFontBtnText: '#FFF',
    configLabelText: '#E2E8F0',

    // Historial
    historialMainBg: '#1A202C',
    historialCardBg: '#2D3748',

    // ListaEventos
    eventoCard: '#2D3748',
    btnIcon: '#B46FC2',
    eventoNombre: '#E2E8F0',
    eventoFecha: '#718096',
    btnEditar: '#D17C3A',
    btnBorrar: '#F56565',
    btnVer: '#B46FC2',
    iconTendencias: '#E09AC7',

    TomarFoto: {
      cameraBtnBg: '#B46FC2',
      cameraBtnText: '#FFF',
      previewBorder: '#4A5568',
      regresarBtnBg: '#D17C3A',
      regresarBtnText: '#FFF',
    },

    EditarEvento: {
      greenBlock: '#3B2C3F',
      regresarBtn: '#B46FC2',
      regresarBtnText: '#FFF',
      opcion1Bg: '#2D3748',
      opcion2Bg: '#2D3748',
      opcion3Bg: '#2D3748',
      opcionText: '#E2E8F0',
      icon1Bg: '#B46FC2',
      icon2Bg: '#D17C3A',
      icon3Bg: '#F6E05E',
    },

    Config: {
      sectionBg: '#2D3748',
      colorOptionBg: '#3B2C3F',
      colorOptionSelected: '#4A5568',
      colorRadio: '#4A5568',
      colorRadioSelected: '#B46FC2',
      fontBtn: '#B46FC2',
      fontBtnText: '#FFF',
      labelText: '#E2E8F0',
    },

    // Nuevas propiedades para login/register
    iconCircle: '#2D3748',
    iconCircleIcon: '#E09AC7',

    // LoginForm
    loginBtnBg: '#E09AC7',
    loginBtnText: '#FFF',
    loginLinkText: '#FFF',
    loginCreateBtnBg: '#E09AC7',
    loginCreateBtnText: '#FFF',
    loginIconColor: '#FFF',

    // ThemedText
    themedText: {
      default: '#B46FC2',
      title: '#F9EAF3',
      link: '#B46FC2',
      subtitle: '#CBD5E0',
      defaultSemiBold: '#E2E8F0',
    },

    // ThemedView
    themedView: '#1A202C',

    // Collapsible
    collapsible: {
      background: '#1A202C',
      headerText: '#E09AC7',
      icon: '#E09AC7',
    },

    // ExternalLink
    externalLink: '#E09AC7',

    // RegisterForm/LoginForm
    formIconCircle: '#2D3748',
    formIconCircleIcon: '#E09AC7',

    // Historial (iconos individuales)
    historialArchivoIconBg: '#8E44AD',
    historialArchivoIconColor: '#1A202C',
    historialEditarIconBg: '#D17C3A',
    historialEditarIconColor: '#1A202C',
    historialBorrarIconBg: '#FC8181',
    historialBorrarIconColor: '#1A202C',
    historialObservarIconBg: '#8E44AD',
    historialObservarIconColor: '#1A202C',

    // ResultadoAsistencia
    ResultadoAsistencia: {
      infoInputBg: '#1E365D',
      infoInputBorder: '#4299E1',
      infoInputText: '#E2E8F0',
      previewBlockBg: '#1E365D',
      previewTitle: '#63B3ED',
      excelContainerBorder: '#4299E1',
      excelContainerBg: '#1E365D',
      tablaBorder: '#4299E1',
      tablaBg: '#2D3748',
      tablaHeaderText: '#63B3ED',
      tablaCellText: '#E2E8F0',
      tablaRowBorder: '#4299E1',
      nombreIndex: '#68D391',
      nombreText: '#E2E8F0',
      btnCancelarBg: '#3182CE',
      btnCancelarText: '#fff',
      btnContinuarBg: '#68D391',
      btnContinuarText: '#1A202C',
      checkIcon: '#68D391',
    },
  },
};

export default colorsTritanopia;