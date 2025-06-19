const colorsNormal = {
  light: {
    // Fondo general de la app (área exterior)
    background: '#F7FAFC', // gris azulado muy claro

    // Fondo de los contenedores principales (cards, AppLayout, etc)
    card: '#FFFFFF',
    appLayoutCard: '#FFFFFF',

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
    formAddBtnText: '#FFF', // <-- Cambiado a blanco
    formBtnDanger: '#E53E3E',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#3182CE',
    formBtnPrimaryText: '#FFF',
    formBtnSecondary: '#63B3ED',

    // AppLayout (AppLayout.tsx)
    appLayoutBg: '#F7FAFC',
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
    },

    // LoginForm/RegisterForm (LoginForm.tsx, RegisterForm.tsx)
    iconCircle: '#E3F2FD',
    iconCircleIcon: '#3182CE',

    // LoginForm (colores específicos para botones y textos)
    loginBtnBg: '#63B3ED',         // Botón "Iniciar sesión" fondo (azul claro)
    loginBtnText: '#FFF',          // Botón "Iniciar sesión" texto (blanco)
    loginLinkText: '#1A202C',      // "No tiene una cuenta?" (negro)
    loginCreateBtnBg: '#63B3ED',   // Botón "Crear cuenta" fondo (azul claro)
    loginCreateBtnText: '#FFF',    // Botón "Crear cuenta" texto (blanco)
    loginIconColor: '#3182CE', // <-- icono persona en light

    // ThemedText (ThemedText.tsx)
    themedText: {
      default: '#3182CE',
      title: '#2B6CB0',
      link: '#3182CE',
      subtitle: '#1A202C',
      defaultSemiBold: '#1A202C',
    },
    // ThemedView (ThemedView.tsx)
    themedView: '#F7FAFC',

    // ExternalLink (ExternalLink.tsx)
    externalLink: '#3182CE',

    // RegisterForm/LoginForm (LoginForm.tsx, RegisterForm.tsx)
    formIconCircle: '#E3F2FD',
    formIconCircleIcon: '#3182CE',

    // Collapsible
    collapsible: {
      background: '#F7FAFC',
      headerText: '#3182CE',
      icon: '#3182CE',
    },

    // Historial (iconos individuales)
    historialArchivoIconBg: '#1565c0',      
    historialArchivoIconColor: '#FFFF',   
    historialEditarIconBg: '#388e3c',      
    historialEditarIconColor: '#FFFF',   
    historialBorrarIconBg: '#d32f2f',       
    historialBorrarIconColor: '#FFFF',    
    historialObservarIconBg: '#1565c0',     
    historialObservarIconColor: '#FFFF',    

    // ResultadoAsistencia (resultado-asistencia.tsx)
    ResultadoAsistencia: {
      infoInputBg: '#e8f5e9',
      infoInputBorder: '#b4cded',
      infoInputText: '#1A202C',
      previewBlockBg: '#e8f5e9',
      previewTitle: '#1565c0',
      excelContainerBorder: '#43a047',
      excelContainerBg: '#e8f5e9',
      tablaBorder: '#b4cded',
      tablaBg: '#fff',
      tablaHeaderText: '#1565c0',
      tablaCellText: '#222',
      tablaRowBorder: '#b4cded',
      nombreIndex: '#388e3c',
      nombreText: '#222',
      btnCancelarBg: '#2196f3',
      btnCancelarText: '#fff',
      btnContinuarBg: '#43a047',
      btnContinuarText: '#fff',
      checkIcon: 'green',
    },
  },

  dark: {
    // Fondo general de la app (área exterior)
    background: '#1A202C', // Fondo principal oscuro

    // Fondo de los contenedores principales (cards, AppLayout)
    card: '#2D3748',
    appLayoutCard: '#2D3748',

    // Fondo de bloques funcionales internos 
    mainBlockBg: '#1E365D',

    // General
    text: '#E2E8F0',
    border: '#4A5568',
    accent: '#63B3ED',
    danger: '#F56565',
    warning: '#F6E05E',
    success: '#48BB78',
    help: '#2D3748',
    btnPrimary: '#63B3ED',
    btnSecondary: '#90CDF4',
    btnDanger: '#F56565',
    btnText: '#FFF',

    // Header/AppBar
    headerBg: '#1E4B8C',
    headerText: '#FFF',
    headerBtnBg: '#63B3ED',
    headerBtnText: '#FFF',
    helpBtnBg: '#2D3748',
    helpBtnText: '#CBD5E0',

    // Input
    inputBg: '#2D3748',
    inputBorder: '#4A5568',
    inputText: '#E2E8F0',
    inputPlaceholder: '#B3C7E6', // <-- Más claro para contraste en dark
    inputIcon: '#63B3ED',
    inputError: '#F56565',
    inputFocus: '#63B3ED',
    inputIconCircle: '#63B3ED',
    inputLinkText: '#90CDF4',

    // ListaEventos
    listaEventosSearchBar: '#1E365D',
    listaEventosCard: '#2D3748',
    listaEventosIcon: '#63B3ED',
    listaEventosNombre: '#E2E8F0',
    listaEventosFecha: '#718096',
    listaEventosBtnEditar: '#48BB78',
    listaEventosBtnBorrar: '#F56565',
    listaEventosBtnVer: '#63B3ED',
    listaEventosBtnIcon: '#FFF',

    // FormularioAsistencia
    formFotosBlock: '#1E365D',
    formFotoRow: '#2D3748',
    formFotoRowBorder: '#4A5568',
    formAddBtn: '#90CDF4', // <-- Azul más claro en dark
    formAddBtnText: '#FFF', // <-- Cambiado a blanco
    formBtnDanger: '#F56565',
    formBtnDangerText: '#FFF',
    formBtnPrimary: '#63B3ED',
    formBtnPrimaryText: '#FFF',
    formBtnSecondary: '#90CDF4',

    // AppLayout
    appLayoutBg: '#1A202C',
    appLayoutGreenBlock: '#1E365D',
    appLayoutRegresarBtn: '#63B3ED',
    appLayoutRegresarBtnText: '#FFF',

    // Home
    homeCardBg: '#2D3748',
    homeBtnText: '#63B3ED',

    // TomarFoto
    tomarFotoBtnBg: '#63B3ED',
    tomarFotoBtnText: '#FFF',
    tomarFotoPreviewBorder: '#4A5568',
    tomarFotoRegresarBtnBg: '#90CDF4',
    tomarFotoRegresarBtnText: '#FFF',

    // EditarEvento
    editarEventoGreenBlock: '#1E365D',
    editarEventoRegresarBtn: '#63B3ED',
    editarEventoRegresarBtnText: '#FFF',
    editarEventoOpcion1Bg: '#2D3748',
    editarEventoOpcion2Bg: '#2D3748',
    editarEventoOpcion3Bg: '#2D3748',
    editarEventoOpcionText: '#E2E8F0',
    editarEventoIcon1Bg: '#63B3ED',
    editarEventoIcon2Bg: '#48BB78',
    editarEventoIcon3Bg: '#F6E05E',

    // Config
    configSectionBg: '#2D3748',
    configColorOptionBg: '#1E365D',
    configColorOptionSelected: '#4A5568',
    configColorRadio: '#4A5568',
    configColorRadioSelected: '#63B3ED',
    configFontBtn: '#63B3ED',
    configFontBtnText: '#FFF',
    configLabelText: '#E2E8F0',

    // Historial
    historialMainBg: '#1A202C',
    historialCardBg: '#2D3748',

    // ListaEventos
    eventoCard: '#2D3748',
    btnIcon: '#63B3ED',
    eventoNombre: '#E2E8F0',
    eventoFecha: '#718096',
    btnEditar: '#48BB78',
    btnBorrar: '#F56565',
    btnVer: '#63B3ED',
    iconTendencias: '#90CDF4',

    TomarFoto: {
      cameraBtnBg: '#63B3ED',
      cameraBtnText: '#FFF',
      previewBorder: '#4A5568',
      regresarBtnBg: '#90CDF4',
      regresarBtnText: '#FFF',
    },

    EditarEvento: {
      greenBlock: '#1E365D',
      regresarBtn: '#63B3ED',
      regresarBtnText: '#FFF',
      opcion1Bg: '#2D3748',
      opcion2Bg: '#2D3748',
      opcion3Bg: '#2D3748',
      opcionText: '#E2E8F0',
      icon1Bg: '#63B3ED',
      icon2Bg: '#48BB78',
      icon3Bg: '#F6E05E',
    },

    Config: {
      sectionBg: '#2D3748',
      colorOptionBg: '#1E365D',
      colorOptionSelected: '#4A5568',
      colorRadio: '#4A5568',
      colorRadioSelected: '#63B3ED',
      fontBtn: '#63B3ED',
      fontBtnText: '#FFF',
      labelText: '#E2E8F0',
    },

    // Nuevas propiedades para login/register
    iconCircle: '#2D3748',
    iconCircleIcon: '#90CDF4',

    // LoginForm (colores específicos para botones y textos)
    loginBtnBg: '#90CDF4',         // Botón "Iniciar sesión" fondo (azul más claro)
    loginBtnText: '#FFF',          // Botón "Iniciar sesión" texto (blanco)
    loginLinkText: '#FFF',         // "No tiene una cuenta?" (blanco)
    loginCreateBtnBg: '#90CDF4',   // Botón "Crear cuenta" fondo (azul más claro)
    loginCreateBtnText: '#FFF',    // Botón "Crear cuenta" texto (blanco)
    loginIconColor: '#FFF', // <-- icono persona en dark

    // ThemedText
    themedText: {
      default: '#63B3ED',
      title: '#E3F2FD', // <-- Azul muy claro, casi blanco, para el título en dark
      link: '#63B3ED',
      subtitle: '#CBD5E0',
      defaultSemiBold: '#E2E8F0',
    },

    // ThemedView
    themedView: '#1A202C',

    // Collapsible
    collapsible: {
      background: '#1A202C',
      headerText: '#90CDF4',
      icon: '#90CDF4',
    },

    // ExternalLink
    externalLink: '#90CDF4',

    // RegisterForm/LoginForm
    formIconCircle: '#2D3748',
    formIconCircleIcon: '#90CDF4',

    // Historial (iconos individuales)
    historialArchivoIconBg: '#4299E1',
    historialArchivoIconColor: '#1A202C',
    historialEditarIconBg: '#68D391',
    historialEditarIconColor: '#1A202C',
    historialBorrarIconBg: '#FC8181',
    historialBorrarIconColor: '#1A202C',
    historialObservarIconBg: '#4299E1',
    historialObservarIconColor: '#1A202C',

    // ResultadoAsistencia (resultado-asistencia.tsx)
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

export default colorsNormal;
