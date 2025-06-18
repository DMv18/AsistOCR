const colorsHighContrast = {
  light: {
    // Fondo general de la app (área exterior)
    background: '#FFF', // blanco puro

    // Fondo de los contenedores principales (cards, AppLayout, etc)
    card: '#FFF',
    appLayoutCard: '#FFF',

    // Fondo de bloques funcionales internos (ej: bloque funcional principal)
    mainBlockBg: '#000', // negro puro para máximo contraste

    // General (usado en toda la app)
    text: '#000',         // negro puro
    border: '#000',       // negro puro
    accent: '#0000FF',    // azul fuerte
    danger: '#FF0000',    // rojo fuerte
    warning: '#FFD700',   // amarillo fuerte
    success: '#008000',   // verde fuerte
    help: '#FFF',         // blanco
    btnPrimary: '#0000FF',
    btnSecondary: '#008000',
    btnDanger: '#FF0000',
    btnText: '#FFF',

    // Header/AppBar (AppLayout, globalStyles)
    headerBg: '#000',
    headerText: '#FFF',
    headerBtnBg: '#0000FF',
    headerBtnText: '#FFF',
    helpBtnBg: '#FFF',
    helpBtnText: '#000',

    // Input (TextInput, etc)
    inputBg: '#FFF',
    inputBorder: '#000',
    inputText: '#000',
    inputPlaceholder: '#000',
    inputIcon: '#0000FF',
    inputError: '#FF0000',
    inputFocus: '#0000FF',
    inputIconCircle: '#0000FF',
    inputLinkText: '#0000FF',

    // ListaEventos
    listaEventosSearchBar: '#FFF',
    listaEventosCard: '#FFF',
    listaEventosIcon: '#0000FF',
    listaEventosNombre: '#000',
    listaEventosFecha: '#000',
    listaEventosBtnEditar: '#008000',
    listaEventosBtnBorrar: '#FF0000',
    listaEventosBtnVer: '#0000FF',
    listaEventosBtnIcon: '#FFF',

    // FormularioAsistencia
    formFotosBlock: '#FFF',
    formFotoRow: '#FFF',
    formFotoRowBorder: '#000',
    formAddBtn: '#FFD700',
    formAddBtnText: '#000',
    formBtnDanger: '#FF0000',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#0000FF',
    formBtnPrimaryText: '#FFF',
    formBtnSecondary: '#008000',

    // AppLayout
    appLayoutBg: '#FFF',
    appLayoutGreenBlock: '#FFD700',
    appLayoutRegresarBtn: '#0000FF',
    appLayoutRegresarBtnText: '#FFF',

    // Home
    homeCardBg: '#FFF',
    homeBtnText: '#0000FF',

    // TomarFoto
    tomarFotoBtnBg: '#0000FF',
    tomarFotoBtnText: '#FFF',
    tomarFotoPreviewBorder: '#000',
    tomarFotoRegresarBtnBg: '#008000',
    tomarFotoRegresarBtnText: '#FFF',

    // EditarEvento
    editarEventoGreenBlock: '#FFD700',
    editarEventoRegresarBtn: '#0000FF',
    editarEventoRegresarBtnText: '#FFF',
    editarEventoOpcion1Bg: '#FFF',
    editarEventoOpcion2Bg: '#FFF',
    editarEventoOpcion3Bg: '#FFF',
    editarEventoOpcionText: '#000',
    editarEventoIcon1Bg: '#0000FF',
    editarEventoIcon2Bg: '#008000',
    editarEventoIcon3Bg: '#FFD700',

    // Config
    configSectionBg: '#FFF',
    configColorOptionBg: '#FFD700',
    configColorOptionSelected: '#0000FF',
    configColorRadio: '#000',
    configColorRadioSelected: '#0000FF',
    configFontBtn: '#0000FF',
    configFontBtnText: '#FFF',
    configLabelText: '#000',

    // Historial
    historialMainBg: '#FFF',
    historialCardBg: '#FFF',

    // ListaEventos
    eventoCard: '#FFF',
    btnIcon: '#0000FF',
    eventoNombre: '#000',
    eventoFecha: '#000',
    btnEditar: '#008000',
    btnBorrar: '#FF0000',
    btnVer: '#0000FF',
    iconTendencias: '#FFD700',

    TomarFoto: {
      cameraBtnBg: '#0000FF',
      cameraBtnText: '#FFF',
      previewBorder: '#000',
      regresarBtnBg: '#008000',
      regresarBtnText: '#FFF',
    },

    EditarEvento: {
      greenBlock: '#FFD700',
      regresarBtn: '#0000FF',
      regresarBtnText: '#FFF',
      opcion1Bg: '#FFF',
      opcion2Bg: '#FFF',
      opcion3Bg: '#FFF',
      opcionText: '#000',
      icon1Bg: '#0000FF',
      icon2Bg: '#008000',
      icon3Bg: '#FFD700',
    },

    Config: {
      sectionBg: '#FFF',
      colorOptionBg: '#FFD700',
      colorOptionSelected: '#0000FF',
      colorRadio: '#000',
      colorRadioSelected: '#0000FF',
      fontBtn: '#0000FF',
      fontBtnText: '#FFF',
      labelText: '#000',
    },

    iconCircle: '#FFD700',
    iconCircleIcon: '#0000FF',

    // LoginForm/RegisterForm
    loginBtnBg: '#0000FF',
    loginBtnText: '#FFF',
    loginLinkText: '#000',
    loginCreateBtnBg: '#0000FF',
    loginCreateBtnText: '#FFF',
    loginIconColor: '#0000FF',

    // ThemedText
    themedText: {
      default: '#000',
      title: '#0000FF',
      link: '#0000FF',
      subtitle: '#000',
      defaultSemiBold: '#000',
    },
    // ThemedView
    themedView: '#FFF',

    // ExternalLink
    externalLink: '#0000FF',

    // RegisterForm/LoginForm
    formIconCircle: '#FFD700',
    formIconCircleIcon: '#0000FF',

    // Collapsible
    collapsible: {
      background: '#FFF',
      headerText: '#0000FF',
      icon: '#0000FF',
    },

    // Historial (iconos individuales)
    historialArchivoIconBg: '#FFD700',
    historialArchivoIconColor: '#000',
    historialEditarIconBg: '#008000',
    historialEditarIconColor: '#FFF',
    historialBorrarIconBg: '#FF0000',
    historialBorrarIconColor: '#FFF',
    historialObservarIconBg: '#0000FF',
    historialObservarIconColor: '#FFF',

    // ResultadoAsistencia
    ResultadoAsistencia: {
      infoInputBg: '#FFF',
      infoInputBorder: '#000',
      infoInputText: '#000',
      previewBlockBg: '#FFF',
      previewTitle: '#0000FF',
      excelContainerBorder: '#000',
      excelContainerBg: '#FFF',
      tablaBorder: '#000',
      tablaBg: '#FFF',
      tablaHeaderText: '#0000FF',
      tablaCellText: '#000',
      tablaRowBorder: '#000',
      nombreIndex: '#008000',
      nombreText: '#000',
      btnCancelarBg: '#0000FF',
      btnCancelarText: '#FFF',
      btnContinuarBg: '#008000',
      btnContinuarText: '#FFF',
      checkIcon: '#008000',
    },
  },

  dark: {
    // Fondo general de la app (área exterior)
    background: '#000', // negro puro

    // Fondo de los contenedores principales (cards, AppLayout)
    card: '#000',
    appLayoutCard: '#000',

    // Fondo de bloques funcionales internos 
    mainBlockBg: '#FFF',

    // General
    text: '#FFF',
    border: '#FFF',
    accent: '#FFD700',
    danger: '#FF0000',
    warning: '#FFD700',
    success: '#00FF00',
    help: '#000',
    btnPrimary: '#FFD700',
    btnSecondary: '#00FF00',
    btnDanger: '#FF0000',
    btnText: '#000',

    // Header/AppBar
    headerBg: '#FFD700',
    headerText: '#000',
    headerBtnBg: '#FFD700',
    headerBtnText: '#000',
    helpBtnBg: '#000',
    helpBtnText: '#FFD700',

    // Input
    inputBg: '#000',
    inputBorder: '#FFF',
    inputText: '#FFF',
    inputPlaceholder: '#FFF',
    inputIcon: '#FFD700',
    inputError: '#FF0000',
    inputFocus: '#FFD700',
    inputIconCircle: '#FFD700',
    inputLinkText: '#FFD700',

    // ListaEventos
    listaEventosSearchBar: '#000',
    listaEventosCard: '#000',
    listaEventosIcon: '#FFD700',
    listaEventosNombre: '#FFF',
    listaEventosFecha: '#FFF',
    listaEventosBtnEditar: '#00FF00',
    listaEventosBtnBorrar: '#FF0000',
    listaEventosBtnVer: '#FFD700',
    listaEventosBtnIcon: '#000',

    // FormularioAsistencia
    formFotosBlock: '#000',
    formFotoRow: '#000',
    formFotoRowBorder: '#FFF',
    formAddBtn: '#FFD700',
    formAddBtnText: '#000',
    formBtnDanger: '#FF0000',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#FFD700',
    formBtnPrimaryText: '#000',
    formBtnSecondary: '#00FF00',

    // AppLayout
    appLayoutBg: '#000',
    appLayoutGreenBlock: '#FFD700',
    appLayoutRegresarBtn: '#FFD700',
    appLayoutRegresarBtnText: '#000',

    // Home
    homeCardBg: '#000',
    homeBtnText: '#FFD700',

    // TomarFoto
    tomarFotoBtnBg: '#FFD700',
    tomarFotoBtnText: '#000',
    tomarFotoPreviewBorder: '#FFF',
    tomarFotoRegresarBtnBg: '#00FF00',
    tomarFotoRegresarBtnText: '#000',

    // EditarEvento
    editarEventoGreenBlock: '#FFD700',
    editarEventoRegresarBtn: '#FFD700',
    editarEventoRegresarBtnText: '#000',
    editarEventoOpcion1Bg: '#000',
    editarEventoOpcion2Bg: '#000',
    editarEventoOpcion3Bg: '#000',
    editarEventoOpcionText: '#FFF',
    editarEventoIcon1Bg: '#FFD700',
    editarEventoIcon2Bg: '#00FF00',
    editarEventoIcon3Bg: '#FF0000',

    // Config
    configSectionBg: '#000',
    configColorOptionBg: '#FFD700',
    configColorOptionSelected: '#FFF',
    configColorRadio: '#FFF',
    configColorRadioSelected: '#FFD700',
    configFontBtn: '#FFD700',
    configFontBtnText: '#000',
    configLabelText: '#FFD700',

    // Historial
    historialMainBg: '#000',
    historialCardBg: '#000',

    // ListaEventos
    eventoCard: '#000',
    btnIcon: '#FFD700',
    eventoNombre: '#FFF',
    eventoFecha: '#FFF',
    btnEditar: '#00FF00',
    btnBorrar: '#FF0000',
    btnVer: '#FFD700',
    iconTendencias: '#FFD700',

    TomarFoto: {
      cameraBtnBg: '#FFD700',
      cameraBtnText: '#000',
      previewBorder: '#FFF',
      regresarBtnBg: '#00FF00',
      regresarBtnText: '#000',
    },

    EditarEvento: {
      greenBlock: '#FFD700',
      regresarBtn: '#FFD700',
      regresarBtnText: '#000',
      opcion1Bg: '#000',
      opcion2Bg: '#000',
      opcion3Bg: '#000',
      opcionText: '#FFF',
      icon1Bg: '#FFD700',
      icon2Bg: '#00FF00',
      icon3Bg: '#FF0000',
    },

    Config: {
      sectionBg: '#000',
      colorOptionBg: '#FFD700',
      colorOptionSelected: '#FFF',
      colorRadio: '#FFF',
      colorRadioSelected: '#FFD700',
      fontBtn: '#FFD700',
      fontBtnText: '#000',
      labelText: '#FFD700',
    },

    iconCircle: '#FFD700',
    iconCircleIcon: '#000',

    // LoginForm/RegisterForm
    loginBtnBg: '#FFD700',
    loginBtnText: '#000',
    loginLinkText: '#FFD700',
    loginCreateBtnBg: '#FFD700',
    loginCreateBtnText: '#000',
    loginIconColor: '#FFD700',

    // ThemedText
    themedText: {
      default: '#FFD700',
      title: '#FFD700',
      link: '#FFD700',
      subtitle: '#FFF',
      defaultSemiBold: '#FFD700',
    },
    // ThemedView
    themedView: '#000',

    // ExternalLink
    externalLink: '#FFD700',

    // RegisterForm/LoginForm
    formIconCircle: '#FFD700',
    formIconCircleIcon: '#000',

    // Collapsible
    collapsible: {
      background: '#000',
      headerText: '#FFD700',
      icon: '#FFD700',
    },

    // Historial (iconos individuales)
    historialArchivoIconBg: '#FFD700',
    historialArchivoIconColor: '#000',
    historialEditarIconBg: '#00FF00',
    historialEditarIconColor: '#000',
    historialBorrarIconBg: '#FF0000',
    historialBorrarIconColor: '#FFF',
    historialObservarIconBg: '#FFD700',
    historialObservarIconColor: '#000',

    // ResultadoAsistencia
    ResultadoAsistencia: {
      infoInputBg: '#000',
      infoInputBorder: '#FFD700',
      infoInputText: '#FFD700',
      previewBlockBg: '#000',
      previewTitle: '#FFD700',
      excelContainerBorder: '#FFD700',
      excelContainerBg: '#000',
      tablaBorder: '#FFD700',
      tablaBg: '#000',
      tablaHeaderText: '#FFD700',
      tablaCellText: '#FFF',
      tablaRowBorder: '#FFD700',
      nombreIndex: '#00FF00',
      nombreText: '#FFD700',
      btnCancelarBg: '#FFD700',
      btnCancelarText: '#000',
      btnContinuarBg: '#00FF00',
      btnContinuarText: '#000',
      checkIcon: '#00FF00',
    },
  },
};

export default colorsHighContrast;