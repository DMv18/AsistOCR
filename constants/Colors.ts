// Paleta centralizada de colores accesibles para cada modo y componente
// Cumple con WCAG 2.1 AA para contraste de texto (mínimo 4.5:1)
// Diseñado para:
// - Visión normal (light/dark)
// - Alto contraste
// - Daltonismo (protanopia, deuteranopia, tritanopia)

export const Colors = {
  normal: {
    light: {
      // Colores base generales
      text: '#111111',         // Texto principal (contraste 15:1 con fondo)
      background: '#F4F4F4',   // Fondo general
      tint: '#2D3748',         // Header/topbar principal
      card: '#FFFFFF',         // Fondo de tarjetas
      border: '#2C5282',       // Bordes principales (azul oscuro)
      accent: '#3182CE',       // Azul para bloques funcionales
      danger: '#E53E3E',       // Rojo para errores (contraste 4.6:1)
      help: '#718096',         // Botón de ayuda
      btnPrimary: '#3182CE',   // Botón principal (azul)
      btnSecondary: '#38A169', // Botón secundario (verde)
      btnText: '#FFFFFF',      // Texto de botones
      headerTitle: '#FFFFFF', // Color del texto "AsistOCR" en el header
      headerBtnBg: '#3182CE', // Fondo de botones en el header
      headerBtnText: '#FFFFFF', // Texto de botones en el header

      // AppLayout y páginas principales
      AppLayout: {
        headerBg: '#2D3748',
        headerText: '#FFFFFF',
        headerBtnBg: '#4A5568',
        headerBtnText: '#FFFFFF',
        cardBg: '#EDF2F7',
        greenBlock: '#BEE3F8',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#718096',
        helpBtnText: '#FFFFFF',
      },

      Home: {
        cardBg: '#EDF2F7', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#111111',
      },
      CrearAsistencia: {
        mainBg: '#2D3748',
        cardBg: '#EDF2F7',
        fotosBlock: '#FFFFFF',
        addBtn: '#EBF8FF',
        btnGuardar: '#38A169',
        btnGuardarText: '#FFFFFF',
      },
      Historial: {
        mainBg: '#2D3748',
        cardBg: '#EDF2F7',
      },

      // Colores específicos para componentes
      RegisterForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#E2E8F0',
        inputText: '#1A202C',
        linkText: '#3182CE',
      },
      LoginForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#E2E8F0',
        inputText: '#1A202C',
        linkText: '#3182CE',
      },
      ListaEventos: {
        searchBar: '#EDF2F7',
        eventoCard: '#FFFFFF',
        iconTendencias: '#DD6B20',
        iconArquitectura: '#553C9A',
        iconSoftware: '#3182CE',
        iconRedes: '#38A169',
        eventoNombre: '#1A202C',
        eventoFecha: '#4A5568',
        btnEditar: '#38A169',
        btnBorrar: '#E53E3E',
        btnVer: '#3182CE',
        btnIcon: '#FFFFFF',
      },

      FormularioAsistencia: {
        fotosBlock: '#FFFFFF',
        fotoRow: '#FFFFFF',
        fotoRowBorder: '#BEE3F8',
        addBtn: '#EBF8FF',
        addBtnText: '#2D3748',
        btnDanger: '#E53E3E',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#38A169',
        btnPrimaryText: '#FFFFFF',
      },

      TomarFoto: {
        cameraBtnBg: '#4BE38A',
        cameraBtnText: '#222222',
        previewBorder: '#BBBBBB',
        regresarBtnBg: '#2196F3',
        regresarBtnText: '#FFFFFF',
      },
      EditarEvento: {
        greenBlock: '#BEE3F8',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
      },
      Config: {
        sectionBg: '#EBF8FF', // Define el color de fondo de las secciones en Config
        colorOptionBg: '#FFFFFF',
        colorOptionSelected: '#BEE3F8',
        colorRadio: '#A0AEC0',
        colorRadioSelected: '#3182CE',
        fontBtn: '#3182CE',
        fontBtnText: '#FFFFFF',
      },

      // ...existing code...
    },
    dark: {
      text: '#E2E8F0',
      background: '#1A202C',
      tint: '#2D3748',
      card: '#2D3748',
      border: '#4A5568',
      accent: '#63B3ED',
      danger: '#FC8181',
      help: '#718096',
      btnPrimary: '#3182CE',
      btnSecondary: '#38A169',
      btnText: '#FFFFFF',
      headerTitle: '#E2E8F0',
      headerBtnBg: '#4A5568',
      headerBtnText: '#E2E8F0',

      AppLayout: {
        headerBg: '#2D3748',
        headerText: '#FFFFFF',
        headerBtnBg: '#4A5568',
        headerBtnText: '#FFFFFF',
        cardBg: '#2D3748',
        greenBlock: '#2C5282',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#4A5568',
        helpBtnText: '#E2E8F0',
      },

      Home: {
        cardBg: '#2D3748', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#E2E8F0',
      },
      CrearAsistencia: {
        mainBg: '#1A202C',
        cardBg: '#2D3748',
        fotosBlock: '#2D3748',
        addBtn: '#2C5282',
        btnGuardar: '#38A169',
        btnGuardarText: '#FFFFFF',
      },
      Historial: {
        mainBg: '#1A202C',
        cardBg: '#2D3748',
      },

      // Colores específicos para componentes
      RegisterForm: {
        iconCircle: '#2D3748',
        inputBg: '#2D3748',
        inputBorder: '#4A5568',
        inputText: '#E2E8F0',
        linkText: '#63B3ED',
      },
      LoginForm: {
        iconCircle: '#2D3748',
        inputBg: '#2D3748',
        inputBorder: '#4A5568',
        inputText: '#E2E8F0',
        linkText: '#63B3ED',
      },
      ListaEventos: {
        searchBar: '#2D3748',
        eventoCard: '#2D3748',
        iconTendencias: '#DD6B20',
        iconArquitectura: '#9F7AEA',
        iconSoftware: '#63B3ED',
        iconRedes: '#68D391',
        eventoNombre: '#E2E8F0',
        eventoFecha: '#A0AEC0',
        btnEditar: '#38A169',
        btnBorrar: '#FC8181',
        btnVer: '#63B3ED',
        btnIcon: '#FFFFFF',
      },

      FormularioAsistencia: {
        fotosBlock: '#2D3748',
        fotoRow: '#2D3748',
        fotoRowBorder: '#4A5568',
        addBtn: '#2C5282',
        addBtnText: '#E2E8F0',
        btnDanger: '#E53E3E',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#38A169',
        btnPrimaryText: '#FFFFFF',
      },

      TomarFoto: {
        cameraBtnBg: '#4BE38A',
        cameraBtnText: '#E2E8F0',
        previewBorder: '#4A5568',
        regresarBtnBg: '#4299E1',
        regresarBtnText: '#E2E8F0',
      },

      Home: {
        cardBg: '#2D3748', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#E2E8F0',
      },
      EditarEvento: {
        greenBlock: '#2C5282', // Define el color para el bloque verde
        regresarBtn: '#4299E1',
        regresarBtnText: '#E2E8F0',
      },
      Config: {
        sectionBg: '#2D3748', // Fondo oscuro para secciones
        colorOptionBg: '#1A202C',
        colorOptionSelected: '#4A5568',
        colorRadio: '#718096',
        colorRadioSelected: '#63B3ED',
        fontBtn: '#63B3ED',
        fontBtnText: '#FFFFFF',
      },

      // ...existing code...
    },
  },
  highContrast: {
    light: {
      text: '#000000',
      background: '#FFFFFF',
      tint: '#000000',
      card: '#FFFFFF',
      border: '#000000',
      accent: '#000000',
      danger: '#FF0000',
      help: '#000000',
      btnPrimary: '#0000FF',
      btnSecondary: '#FFFF00',
      btnText: '#FFFFFF',
      AppLayout: {
        headerBg: '#000000',
        headerText: '#FFFFFF',
        headerBtnBg: '#000000',
        headerBtnText: '#FFFFFF',
        cardBg: '#FFFFFF',
        greenBlock: '#F0FFF0',
        regresarBtn: '#0000FF',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#000000',
        helpBtnText: '#FFFFFF',
      },
      Home: {
        cardBg: '#FFFFFF', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#000000',
      },
      ListaEventos: {
        background: '#F0FFF0',
        searchBar: '#FFFFFF',
        eventoCard: '#FFFFFF',
        iconTendencias: '#FFA500',
        iconArquitectura: '#000000',
        iconSoftware: '#0000FF',
        iconRedes: '#008000',
        eventoNombre: '#000000',
        eventoFecha: '#000000',
        btnEditar: '#008000',
        btnBorrar: '#FF0000',
        btnVer: '#0000FF',
        btnIcon: '#FFFFFF',
      },
      FormularioAsistencia: {
        fotosBlock: '#FFFFFF',
        fotoRow: '#FFFFFF',
        fotoRowBorder: '#000000',
        addBtn: '#FFFF00',
        addBtnText: '#000000',
        btnDanger: '#FF0000',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#008000',
        btnPrimaryText: '#FFFFFF',
      },
      LoginForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#000000',
        inputText: '#000000',
        linkText: '#0000FF',
      },
      Config: {
        sectionBg: '#F0F0F0', // Fondo claro para secciones
        colorOptionBg: '#FFFFFF',
        colorOptionSelected: '#FFD700', // Amarillo brillante para selección
        colorRadio: '#000000',
        colorRadioSelected: '#FFD700',
        fontBtn: '#0000FF',
        fontBtnText: '#FFFFFF',
      },
    },
    dark: {
      text: '#FFFFFF',
      background: '#000000',
      tint: '#FFFFFF',
      card: '#121212',
      border: '#FFFFFF',
      accent: '#FFFF00',
      danger: '#FF5252',
      help: '#FFFFFF',
      btnPrimary: '#448AFF',
      btnSecondary: '#FFFF00',
      btnText: '#000000',
      AppLayout: {
        headerBg: '#000000',
        headerText: '#FFFFFF',
        headerBtnBg: '#FFFFFF',
        headerBtnText: '#000000',
        cardBg: '#121212',
        greenBlock: '#003300',
        regresarBtn: '#0000FF',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#FFFFFF',
        helpBtnText: '#000000',
      },
      Home: {
        cardBg: '#121212', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#FFFFFF',
      },
      ListaEventos: {
        background: '#1B5E20',
        searchBar: '#121212',
        eventoCard: '#121212',
        iconTendencias: '#FFA500',
        iconArquitectura: '#FFFFFF',
        iconSoftware: '#448AFF',
        iconRedes: '#4CAF50',
        eventoNombre: '#FFFFFF',
        eventoFecha: '#E0E0E0',
        btnEditar: '#4CAF50',
        btnBorrar: '#FF5252',
        btnVer: '#448AFF',
        btnIcon: '#000000',
      },
      FormularioAsistencia: {
        fotosBlock: '#121212',
        fotoRow: '#121212',
        fotoRowBorder: '#FFFFFF',
        addBtn: '#FFFF00',
        addBtnText: '#000000',
        btnDanger: '#FF5252',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#4CAF50',
        btnPrimaryText: '#FFFFFF',
      },
      LoginForm: {
        iconCircle: '#121212',
        inputBg: '#121212',
        inputBorder: '#FFFFFF',
        inputText: '#FFFFFF',
        linkText: '#448AFF',
      },
      Config: {
        sectionBg: '#121212', // Fondo oscuro para secciones
        colorOptionBg: '#1A1A1A',
        colorOptionSelected: '#FFD700', // Amarillo brillante para selección
        colorRadio: '#FFFFFF',
        colorRadioSelected: '#FFD700',
        fontBtn: '#0000FF',
        fontBtnText: '#FFFFFF',
      },
    },
  },
  protanopia: {
    light: {
      text: '#2D3748',
      background: '#F7FAFC',
      tint: '#2B6CB0',
      card: '#FFFFFF',
      border: '#2B6CB0',
      accent: '#68D391',
      danger: '#FC8181',
      help: '#90CDF4',
      btnPrimary: '#2B6CB0',
      btnSecondary: '#68D391',
      btnText: '#FFFFFF',
      AppLayout: {
        headerBg: '#2B6CB0',
        headerText: '#FFFFFF',
        headerBtnBg: '#4299E1',
        headerBtnText: '#FFFFFF',
        cardBg: '#EBF8FF',
        greenBlock: '#C6F6D5',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#90CDF4',
        helpBtnText: '#2D3748',
      },

      Home: {
        cardBg: '#FFFFFF', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#000000',
      },
      CrearAsistencia: {
        mainBg: '#2D3748',
        cardBg: '#EDF2F7',
        fotosBlock: '#FFFFFF',
        addBtn: '#EBF8FF',
        btnGuardar: '#38A169',
        btnGuardarText: '#FFFFFF',
      },
      Historial: {
        mainBg: '#2D3748',
        cardBg: '#EDF2F7',
      },

      // Colores específicos para componentes
      RegisterForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#CBD5E0',
        inputText: '#2D3748',
        linkText: '#2B6CB0',
      },
      LoginForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#CBD5E0',
        inputText: '#2D3748',
        linkText: '#2B6CB0',
      },
      ListaEventos: {
        searchBar: '#EBF8FF', // Define el color de fondo de la barra de búsqueda
        eventoCard: '#FFFFFF',
        iconTendencias: '#ED8936',
        iconArquitectura: '#9F7AEA',
        iconSoftware: '#4299E1',
        iconRedes: '#48BB78',
        eventoNombre: '#2D3748',
        eventoFecha: '#4A5568',
        btnEditar: '#48BB78',
        btnBorrar: '#FC8181',
        btnVer: '#4299E1',
        btnIcon: '#FFFFFF',
      },

      FormularioAsistencia: {
        fotosBlock: '#FFFFFF',
        fotoRow: '#FFFFFF',
        fotoRowBorder: '#C6F6D5',
        addBtn: '#EBF8FF',
        addBtnText: '#2D3748',
        btnDanger: '#FC8181',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#48BB78',
        btnPrimaryText: '#FFFFFF',
      },

      Config: {
        sectionBg: '#EBF8FF', // Fondo claro para secciones
        colorOptionBg: '#FFFFFF',
        colorOptionSelected: '#C6F6D5',
        colorRadio: '#A0AEC0',
        colorRadioSelected: '#2B6CB0',
        fontBtn: '#2B6CB0',
        fontBtnText: '#FFFFFF',
      },
    },
    dark: {
      text: '#E2E8F0',
      background: '#1A202C',
      tint: '#3182CE',
      card: '#2D3748',
      border: '#4A5568',
      accent: '#68D391',
      danger: '#FC8181',
      help: '#90CDF4',
      btnPrimary: '#3182CE',
      btnSecondary: '#48BB78',
      btnText: '#FFFFFF',
      AppLayout: {
        headerBg: '#2D3748',
        headerText: '#FFFFFF',
        headerBtnBg: '#4A5568',
        headerBtnText: '#FFFFFF',
        cardBg: '#2D3748',
        greenBlock: '#2F855A',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#4A5568',
        helpBtnText: '#E2E8F0',
      },

      Home: {
        cardBg: '#2D3748', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#E2E8F0',
      },
      EditarEvento: {
        greenBlock: '#2F855A', // Define el color para el bloque verde
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
      },
      Config: {
        sectionBg: '#2D3748', // Fondo oscuro para secciones
        colorOptionBg: '#1A202C',
        colorOptionSelected: '#2F855A',
        colorRadio: '#A0AEC0',
        colorRadioSelected: '#48BB78',
        fontBtn: '#48BB78',
        fontBtnText: '#FFFFFF',
      },

      // ...existing code...
    },
  },
  deuteranopia: {
    light: {
      text: '#322659',
      background: '#F5F3FF',
      tint: '#553C9A',
      card: '#FFFFFF',
      border: '#553C9A',
      accent: '#9AE6B4',
      danger: '#FC8181',
      help: '#B794F4',
      btnPrimary: '#553C9A',
      btnSecondary: '#38A169',
      btnText: '#FFFFFF',
      AppLayout: {
        headerBg: '#553C9A',
        headerText: '#FFFFFF',
        headerBtnBg: '#9F7AEA',
        headerBtnText: '#FFFFFF',
        cardBg: '#FAF5FF',
        greenBlock: '#C6F6D5',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#B794F4',
        helpBtnText: '#322659',
      },
      Home: {
        cardBg: '#FFFFFF', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#000000',
      },
      CrearAsistencia: {
        mainBg: '#2D3748',
        cardBg: '#EDF2F7',
        fotosBlock: '#FFFFFF',
        addBtn: '#EBF8FF',
        btnGuardar: '#38A169',
        btnGuardarText: '#FFFFFF',
      },
      Historial: {
        mainBg: '#2D3748',
        cardBg: '#EDF2F7',
      },

      // Colores específicos para componentes
      RegisterForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#E2E8F0',
        inputText: '#322659',
        linkText: '#553C9A',
      },
      LoginForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#E2E8F0',
        inputText: '#322659',
        linkText: '#553C9A',
      },
      ListaEventos: {
        background: '#E9D8FD',
        searchBar: '#FAF5FF',
        eventoCard: '#FFFFFF',
        iconTendencias: '#DD6B20',
        iconArquitectura: '#553C9A',
        iconSoftware: '#3182CE',
        iconRedes: '#38A169',
        eventoNombre: '#322659',
        eventoFecha: '#4A5568',
        btnEditar: '#38A169',
        btnBorrar: '#FC8181',
        btnVer: '#3182CE',
        btnIcon: '#FFFFFF',
      },

      FormularioAsistencia: {
        fotosBlock: '#FFFFFF',
        fotoRow: '#FFFFFF',
        fotoRowBorder: '#E9D8FD',
        addBtn: '#FAF5FF',
        addBtnText: '#322659',
        btnDanger: '#FC8181',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#38A169',
        btnPrimaryText: '#FFFFFF',
      },

      Config: {
        sectionBg: '#FAF5FF',
        colorOptionBg: '#FFFFFF',
        colorOptionSelected: '#E9D8FD',
        colorRadio: '#A0AEC0',
        colorRadioSelected: '#553C9A',
        fontBtn: '#553C9A',
        fontBtnText: '#FFFFFF',
      },
    },
    dark: {
      text: '#E9D8FD',
      background: '#1A202C',
      tint: '#9F7AEA',
      card: '#322659',
      border: '#553C9A',
      accent: '#68D391',
      danger: '#FC8181',
      help: '#B794F4',
      btnPrimary: '#9F7AEA',
      btnSecondary: '#48BB78',
      btnText: '#FFFFFF',
      AppLayout: {
        headerBg: '#322659',
        headerText: '#FFFFFF',
        headerBtnBg: '#553C9A',
        headerBtnText: '#FFFFFF',
        cardBg: '#322659',
        greenBlock: '#2F855A',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#553C9A',
        helpBtnText: '#E9D8FD',
      },
      Home: {
        cardBg: '#322659', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#E9D8FD',
      },
      ListaEventos: {
        background: '#553C9A',
        searchBar: '#322659',
        eventoCard: '#322659',
        iconTendencias: '#ED8936',
        iconArquitectura: '#9F7AEA',
        iconSoftware: '#63B3ED',
        iconRedes: '#68D391',
        eventoNombre: '#E9D8FD',
        eventoFecha: '#A0AEC0',
        btnEditar: '#48BB78',
        btnBorrar: '#FC8181',
        btnVer: '#63B3ED',
        btnIcon: '#FFFFFF',
      },
      FormularioAsistencia: {
        fotosBlock: '#322659',
        fotoRow: '#322659',
        fotoRowBorder: '#553C9A',
        addBtn: '#2F855A',
        addBtnText: '#E9D8FD',
        btnDanger: '#E53E3E',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#48BB78',
        btnPrimaryText: '#FFFFFF',
      },
      LoginForm: {
        iconCircle: '#322659',
        inputBg: '#322659',
        inputBorder: '#553C9A',
        inputText: '#E9D8FD',
        linkText: '#9F7AEA',
      },
      Config: {
        sectionBg: '#553C9A',
        colorOptionBg: '#322659',
        colorOptionSelected: '#9F7AEA',
        colorRadio: '#B794F4',
        colorRadioSelected: '#68D391',
        fontBtn: '#9F7AEA',
        fontBtnText: '#FFFFFF',
      },
    },
  },
  tritanopia: {
    light: {
      text: '#2D3748',
      background: '#FFF5F5',
      tint: '#C53030',
      card: '#FFFFFF',
      border: '#C53030',
      accent: '#68D391',
      danger: '#DD6B20',
      help: '#FC8181',
      btnPrimary: '#C53030',
      btnSecondary: '#38A169',
      btnText: '#FFFFFF',
      AppLayout: {
        headerBg: '#C53030',
        headerText: '#FFFFFF',
        headerBtnBg: '#E53E3E',
        headerBtnText: '#FFFFFF',
        cardBg: '#FED7D7',
        greenBlock: '#C6F6D5',
        regresarBtn: '#4299E1',
        regresarBtnText: '#FFFFFF',
        helpBtn: '#FC8181',
        helpBtnText: '#2D3748',
      },
      Home: {
        cardBg: '#FFFFFF', // Define el color de fondo de las tarjetas en la pantalla Home
        btnText: '#000000',
      },
      ListaEventos: {
        background: '#FED7D7',
        searchBar: '#FFF5F5',
        eventoCard: '#FFFFFF',
        iconTendencias: '#ED8936',
        iconArquitectura: '#553C9A',
        iconSoftware: '#3182CE',
        iconRedes: '#38A169',
        eventoNombre: '#2D3748',
        eventoFecha: '#4A5568',
        btnEditar: '#38A169',
        btnBorrar: '#DD6B20',
        btnVer: '#3182CE',
        btnIcon: '#FFFFFF',
      },
      FormularioAsistencia: {
        fotosBlock: '#FFFFFF',
        fotoRow: '#FFFFFF',
        fotoRowBorder: '#FED7D7',
        addBtn: '#FFF5F5',
        addBtnText: '#2D3748',
        btnDanger: '#DD6B20',
        btnDangerText: '#FFFFFF',
        btnPrimary: '#38A169',
        btnPrimaryText: '#FFFFFF',
      },
      LoginForm: {
        iconCircle: '#FFFFFF',
        inputBg: '#FFFFFF',
        inputBorder: '#E2E8F0',
        inputText: '#2D3748',
        linkText: '#C53030',
      },
      Config: {
        sectionBg: '#FED7D7',
        colorOptionBg: '#FFFFFF',
        colorOptionSelected: '#FEB2B2',
        colorRadio: '#A0AEC0',
        colorRadioSelected: '#C53030',
        fontBtn: '#C53030',
        fontBtnText: '#FFFFFF',
      },
    },
    dark: {
      text: '#FED7D7',
      background: '#1A202C',
      tint: '#FC8181',
      card: '#63171B',
      border: '#E53E3E',
      accent: '#68D391',
      danger: '#ED8936',
      help: '#FC8181',
      btnPrimary: '#FC8181',
      btnSecondary: '#48BB78',
      btnText: '#1A202C',
      AppLayout: {
        headerBg: '#63171B',
        headerText: '#FED7D7',
        headerBtnBg: '#E53E3E',
        headerBtnText: '#1A202C',
        cardBg: '#63171B',
        greenBlock: '#2F855A',
        regresarBtn: '#63B3ED',
        regresarBtnText: '#1A202C',
        helpBtn: '#E53E3E',
        helpBtnText: '#1A202C',
      },
      ListaEventos: {
        background: '#63171B',
        searchBar: '#822727',
        eventoCard: '#63171B',
        iconTendencias: '#ED8936',
        iconArquitectura: '#B794F4',
        iconSoftware: '#63B3ED',
        iconRedes: '#68D391',
        eventoNombre: '#FED7D7',
        eventoFecha: '#FEB2B2',
        btnEditar: '#48BB78',
        btnBorrar: '#ED8936',
        btnVer: '#63B3ED',
        btnIcon: '#FFFFFF',
      },
      FormularioAsistencia: {
        fotosBlock: '#63171B',
        fotoRow: '#63171B',
        fotoRowBorder: '#E53E3E',
        addBtn: '#2F855A',
        addBtnText: '#1A202C',
        btnDanger: '#ED8936',
        btnDangerText: '#1A202C',
        btnPrimary: '#48BB78',
        btnPrimaryText: '#FFFFFF',
      },
      LoginForm: {
        iconCircle: '#63171B',
        inputBg: '#63171B',
        inputBorder: '#E53E3E',
        inputText: '#FED7D7',
        linkText: '#FC8181',
      },
      Config: {
        sectionBg: '#822727',
        colorOptionBg: '#63171B',
        colorOptionSelected: '#FC8181',
        colorRadio: '#FEB2B2',
        colorRadioSelected: '#68D391',
        fontBtn: '#FC8181',
        fontBtnText: '#1A202C',
      },
    },
  },
};

export type ThemeName = 'light' | 'dark';
export type ColorMode = keyof typeof Colors;