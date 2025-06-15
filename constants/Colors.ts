// Paleta centralizada de colores para cada modo y componente.
// Comentarios explicativos para cada color.

export const Colors = {
  normal: {
    light: {
      // Colores base generales
      text: '#111',           // Texto principal en toda la app
      background: '#f4f4f4',  // Fondo general de la app
      tint: '#353636',        // Header/topbar principal
      card: '#fff',           // Fondo de tarjetas/contenedores
      border: '#18362a',      // Bordes principales
      accent: '#4caf50',      // Verde para bloques funcionales y botones destacados
      danger: '#c62828',      // Rojo para errores y botones peligrosos
      help: '#bdbdbd',        // Fondo del botón de ayuda/interrogación
      btnPrimary: '#2196f3',  // Botón principal (azul)
      btnSecondary: '#43a047',// Botón secundario (verde)
      btnText: '#fff',        // Texto de botones

      // AppLayout y páginas principales
      AppLayout: {
        headerBg: '#6d4c41',         // Fondo del header (café)
        headerText: '#fff',          // Texto del header
        headerBtnBg: '#8d6e63',      // Fondo de los botones del header (café claro)
        headerBtnText: '#fff',       // Texto de los botones del header
        cardBg: '#d7ccc8',           // Fondo de tarjetas principales (café claro)
        greenBlock: '#b6eeb0',       // Fondo del bloque funcional principal
        regresarBtn: '#4fc3f7',      // Botón regresar (celeste)
        regresarBtnText: '#fff',     // Texto del botón regresar
        helpBtn: '#bdbdbd',          // Fondo del botón de ayuda
        helpBtnText: '#444',         // Texto del botón de ayuda
      },

      // Home, Crear Nueva Asistencia, Historial
      Home: {
        mainBg: '#6d4c41',           // Fondo principal de la home (café)
        cardBg: '#d7ccc8',           // Fondo de las tarjetas/botones principales (café claro)
      },
      CrearAsistencia: {
        mainBg: '#6d4c41',           // Fondo principal de la pantalla (café)
        cardBg: '#d7ccc8',           // Fondo de la tarjeta principal (café claro)
        fotosBlock: '#f8f6f2',       // Fondo del bloque para agregar foto (blanco cálido)
        addBtn: '#fffde7',           // Fondo del botón agregar foto (amarillo muy claro)
        btnGuardar: '#43a047',       // Botón guardar (verde)
        btnGuardarText: '#fff',      // Texto del botón guardar
      },
      Historial: {
        mainBg: '#6d4c41',           // Fondo principal de historial (café)
        cardBg: '#d7ccc8',           // Fondo de la tarjeta de historial (café claro)
      },

      // ListaEventos
      ListaEventos: {
        background: '#b6eeb0',       // Fondo del bloque de eventos
        searchBar: '#f3f3f3',        // Fondo del buscador
        eventoCard: '#fffde7',       // Fondo de cada evento (amarillo muy claro)
        iconTendencias: '#ffb300',   // Icono para "Tendencias Tecnológicas" (amarillo)
        iconArquitectura: '#8d6e63', // Icono para "Arquitectura de Maquinas III" (café)
        iconSoftware: '#1976d2',     // Icono para "Ingeniería de Software II" (azul)
        iconRedes: '#43a047',        // Icono para "Redes de Computadora" (verde)
        eventoNombre: '#111',        // Texto del nombre del evento
        eventoFecha: '#353636',      // Texto de la fecha del evento
        btnEditar: '#43a047',        // Botón editar (verde)
        btnBorrar: '#c62828',        // Botón borrar (rojo)
        btnVer: '#2196f3',           // Botón ver (azul)
        btnIcon: '#fff',             // Color de los iconos de los botones
      },

      // FormularioAsistencia
      FormularioAsistencia: {
        fotosBlock: '#f8f6f2',       // Fondo del bloque para agregar fotos (blanco cálido)
        fotoRow: '#fff',             // Fondo de cada fila de foto
        fotoRowBorder: '#b6eeb0',    // Borde de la fila de foto
        addBtn: '#fffde7',           // Fondo del botón agregar foto
        addBtnText: '#222',          // Texto del botón agregar foto
        btnDanger: '#c62828',        // Botón quitar foto (rojo)
        btnDangerText: '#fff',       // Texto del botón quitar foto
        btnPrimary: '#43a047',       // Botón guardar (verde)
        btnPrimaryText: '#fff',      // Texto del botón guardar
      },

      // Config (ajustes)
      Config: {
        sectionBg: '#f3e5ab',        // Fondo de la sección de opciones
        colorOptionBg: '#fffde7',    // Fondo de cada opción de color
        colorOptionSelected: '#ffe082', // Fondo de la opción seleccionada
        colorRadio: '#bdbdbd',       // Radio de selección no seleccionado
        colorRadioSelected: '#43a047', // Radio de selección seleccionado
        fontBtn: '#43a047',          // Botón para cambiar tamaño de fuente
        fontBtnText: '#fff',         // Texto del botón de fuente
      },

      // LoginForm/RegisterForm
      LoginForm: {
        iconCircle: '#fff',          // Fondo del círculo del icono
        inputBg: '#fff',             // Fondo de los inputs
        inputBorder: '#eee',         // Borde de los inputs
        inputText: '#111',           // Texto de los inputs
        linkText: '#1a0dab',         // Texto de los links
      },
    },
    dark: {
      // Colores base generales
      text: '#f0f0f0',
      background: '#121212',
      tint: '#1e1e1e',
      card: '#1e1e1e',
      border: '#2d2d2d',
      accent: '#388e3c',
      danger: '#d32f2f',
      help: '#757575',
      btnPrimary: '#1976d2',
      btnSecondary: '#388e3c',
      btnText: '#ffffff',

      // AppLayout y páginas principales
      AppLayout: {
        headerBg: '#2c3e50',
        headerText: '#fff',
        headerBtnBg: '#27ae60',
        headerBtnText: '#fff',
        cardBg: '#34495e',
        greenBlock: '#16a085',
        regresarBtn: '#3498db',
        regresarBtnText: '#fff',
        helpBtn: '#bdc3c7',
        helpBtnText: '#2c3e50',
      },

      // Home, Crear Nueva Asistencia, Historial
      Home: {
        mainBg: '#2c3e50',
        cardBg: '#34495e',
      },
      CrearAsistencia: {
        mainBg: '#2c3e50',
        cardBg: '#34495e',
        fotosBlock: '#1b263b',
        addBtn: '#2ecc71',
        btnGuardar: '#3498db',
        btnGuardarText: '#fff',
      },
      Historial: {
        mainBg: '#2c3e50',
        cardBg: '#34495e',
      },

      // ListaEventos
      ListaEventos: {
        background: '#2c3e50',
        searchBar: '#34495e',
        eventoCard: '#16a085',
        iconTendencias: '#27ae60',
        iconArquitectura: '#8d6e63',
        iconSoftware: '#3498db',
        iconRedes: '#2ecc71',
        eventoNombre: '#ecf0f1',
        eventoFecha: '#bdc3c7',
        btnEditar: '#2ecc71',
        btnBorrar: '#e74c3c',
        btnVer: '#3498db',
        btnIcon: '#fff',
      },

      // FormularioAsistencia
      FormularioAsistencia: {
        fotosBlock: '#1b263b',
        fotoRow: '#34495e',
        fotoRowBorder: '#2c3e50',
        addBtn: '#2ecc71',
        addBtnText: '#fff',
        btnDanger: '#e74c3c',
        btnDangerText: '#fff',
        btnPrimary: '#3498db',
        btnPrimaryText: '#fff',
      },

      // Config (ajustes)
      Config: {
        sectionBg: '#2c3e50',
        colorOptionBg: '#34495e',
        colorOptionSelected: '#27ae60',
        colorRadio: '#bdc3c7',
        colorRadioSelected: '#2ecc71',
        fontBtn: '#2ecc71',
        fontBtnText: '#fff',
      },

      // LoginForm/RegisterForm
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#2c3e50',
        inputBorder: '#34495e',
        inputText: '#ecf0f1',
        linkText: '#1abc9c',
      },
    },
  },
  highContrast: {
    light: {
      text: '#000',
      background: '#fff',
      tint: '#000',
      card: '#fff',
      border: '#000',
      accent: '#000', // negro para bloques funcionales
      danger: '#ff0000',
      help: '#000',
      btnPrimary: '#000',
      btnSecondary: '#ffea00',
      btnText: '#fff',
      AppLayout: {
        headerBg: '#000',
        headerText: '#fff',
        headerBtnBg: '#000',
        headerBtnText: '#fff',
        cardBg: '#fff',
        greenBlock: '#fff', // fondo blanco para máximo contraste
        regresarBtn: '#1976d2', // azul fuerte para botón regresar
        regresarBtnText: '#fff',
        helpBtn: '#000',
        helpBtnText: '#fff',
      },
      ListaEventos: {
        background: '#fff',
        searchBar: '#fff',
        eventoCard: '#fff',
        iconTendencias: '#ffea00',
        iconArquitectura: '#000',
        iconSoftware: '#1976d2',
        iconRedes: '#43a047',
        eventoNombre: '#000',
        eventoFecha: '#000',
        btnEditar: '#43a047',
        btnBorrar: '#ff0000',
        btnVer: '#1976d2',
        btnIcon: '#fff',
      },
      FormularioAsistencia: {
        fotosBlock: '#fff',
        fotoRow: '#fff',
        fotoRowBorder: '#000',
        addBtn: '#ffea00',
        addBtnText: '#000',
        btnDanger: '#ff0000',
        btnDangerText: '#fff',
        btnPrimary: '#43a047',
        btnPrimaryText: '#fff',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#fff',
        inputBorder: '#000',
        inputText: '#000',
        linkText: '#1976d2',
      },
      Config: {
        sectionBg: '#fff',
        colorOptionBg: '#fff',
        colorOptionSelected: '#ffea00',
        colorRadio: '#000',
        colorRadioSelected: '#1976d2',
        fontBtn: '#1976d2',
        fontBtnText: '#fff',
      },
    },
    dark: {
      text: '#fff',
      background: '#000',
      tint: '#fff',
      card: '#000',
      border: '#fff',
      accent: '#fff',
      danger: '#ff1744',
      help: '#fff',
      btnPrimary: '#fff',
      btnSecondary: '#ffea00',
      btnText: '#000',
      AppLayout: {
        headerBg: '#000',
        headerText: '#fff',
        headerBtnBg: '#fff',
        headerBtnText: '#000',
        cardBg: '#000',
        greenBlock: '#222', // gris oscuro para contraste
        regresarBtn: '#1976d2',
        regresarBtnText: '#fff',
        helpBtn: '#fff',
        helpBtnText: '#000',
      },
      ListaEventos: {
        background: '#000',
        searchBar: '#222',
        eventoCard: '#222',
        iconTendencias: '#ffea00',
        iconArquitectura: '#fff',
        iconSoftware: '#1976d2',
        iconRedes: '#43a047',
        eventoNombre: '#fff',
        eventoFecha: '#fff',
        btnEditar: '#43a047',
        btnBorrar: '#ff1744',
        btnVer: '#1976d2',
        btnIcon: '#000',
      },
      FormularioAsistencia: {
        fotosBlock: '#222',
        fotoRow: '#000',
        fotoRowBorder: '#fff',
        addBtn: '#ffea00',
        addBtnText: '#000',
        btnDanger: '#ff1744',
        btnDangerText: '#fff',
        btnPrimary: '#43a047',
        btnPrimaryText: '#fff',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#222',
        inputBorder: '#fff',
        inputText: '#fff',
        linkText: '#ffea00',
      },
      Config: {
        sectionBg: '#222',
        colorOptionBg: '#000',
        colorOptionSelected: '#ffea00',
        colorRadio: '#fff',
        colorRadioSelected: '#1976d2',
        fontBtn: '#1976d2',
        fontBtnText: '#fff',
      },
    },
  },
  protanopia: {
    light: {
      text: '#222',
      background: '#f5f5f5',
      tint: '#005b9f',
      card: '#ffffff',
      border: '#005b9f',
      accent: '#b2df8a',
      danger: '#ff8c00',
      help: '#8da0cb',
      btnPrimary: '#005b9f',
      btnSecondary: '#66c2a5',
      btnText: '#222',
      AppLayout: {
        headerBg: '#005b9f',
        headerText: '#fff',
        headerBtnBg: '#66c2a5',
        headerBtnText: '#222',
        cardBg: '#e3f2fd',
        greenBlock: '#b2df8a',
        regresarBtn: '#1976d2',
        regresarBtnText: '#fff',
        helpBtn: '#8da0cb',
        helpBtnText: '#222',
      },
      ListaEventos: {
        background: '#b2df8a',
        searchBar: '#e3f2fd',
        eventoCard: '#e0f7fa',
        iconTendencias: '#ffb300',
        iconArquitectura: '#005b9f',
        iconSoftware: '#1976d2',
        iconRedes: '#66c2a5',
        eventoNombre: '#222',
        eventoFecha: '#005b9f',
        btnEditar: '#66c2a5',
        btnBorrar: '#ff8c00',
        btnVer: '#1976d2',
        btnIcon: '#222',
      },
      FormularioAsistencia: {
        fotosBlock: '#e0f7fa',
        fotoRow: '#fff',
        fotoRowBorder: '#b2df8a',
        addBtn: '#b2df8a',
        addBtnText: '#222',
        btnDanger: '#ff8c00',
        btnDangerText: '#fff',
        btnPrimary: '#66c2a5',
        btnPrimaryText: '#222',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#fff',
        inputBorder: '#005b9f',
        inputText: '#222',
        linkText: '#005b9f',
      },
      Config: {
        sectionBg: '#e3f2fd',
        colorOptionBg: '#e0f7fa',
        colorOptionSelected: '#b2df8a',
        colorRadio: '#8da0cb',
        colorRadioSelected: '#005b9f',
        fontBtn: '#005b9f',
        fontBtnText: '#fff',
      },
    },
    dark: {
      text: '#e0e0e0',
      background: '#0d1b2a',
      tint: '#1b3a57',
      card: '#1b263b',
      border: '#415a77',
      accent: '#4ea8de',
      danger: '#ff9e00',
      help: '#778da9',
      btnPrimary: '#1b3a57',
      btnSecondary: '#4ea8de',
      btnText: '#fff',
      AppLayout: {
        headerBg: '#1b3a57',
        headerText: '#fff',
        headerBtnBg: '#4ea8de',
        headerBtnText: '#fff',
        cardBg: '#1b263b',
        greenBlock: '#4ea8de',
        regresarBtn: '#1976d2',
        regresarBtnText: '#fff',
        helpBtn: '#778da9',
        helpBtnText: '#fff',
      },
      ListaEventos: {
        background: '#1b263b',
        searchBar: '#415a77',
        eventoCard: '#4ea8de',
        iconTendencias: '#ffb300',
        iconArquitectura: '#1b3a57',
        iconSoftware: '#1976d2',
        iconRedes: '#4ea8de',
        eventoNombre: '#fff',
        eventoFecha: '#4ea8de',
        btnEditar: '#4ea8de',
        btnBorrar: '#ff9e00',
        btnVer: '#1976d2',
        btnIcon: '#fff',
      },
      FormularioAsistencia: {
        fotosBlock: '#1b263b',
        fotoRow: '#4ea8de',
        fotoRowBorder: '#1b3a57',
        addBtn: '#4ea8de',
        addBtnText: '#fff',
        btnDanger: '#ff9e00',
        btnDangerText: '#fff',
        btnPrimary: '#4ea8de',
        btnPrimaryText: '#fff',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#1b263b',
        inputBorder: '#415a77',
        inputText: '#fff',
        linkText: '#4ea8de',
      },
      Config: {
        sectionBg: '#1b263b',
        colorOptionBg: '#415a77',
        colorOptionSelected: '#4ea8de',
        colorRadio: '#778da9',
        colorRadioSelected: '#4ea8de',
        fontBtn: '#4ea8de',
        fontBtnText: '#fff',
      },
    },
  },
  deuteranopia: {
    light: {
      text: '#222',
      background: '#f5f5f5',
      tint: '#6a3d9a',
      card: '#ffffff',
      border: '#6a3d9a',
      accent: '#b15928',
      danger: '#e31a1c',
      help: '#a6cee3',
      btnPrimary: '#6a3d9a',
      btnSecondary: '#b15928',
      btnText: '#fff',
      AppLayout: {
        headerBg: '#6a3d9a',
        headerText: '#fff',
        headerBtnBg: '#b15928',
        headerBtnText: '#fff',
        cardBg: '#ede7f6',
        greenBlock: '#b15928',
        regresarBtn: '#1976d2',
        regresarBtnText: '#fff',
        helpBtn: '#a6cee3',
        helpBtnText: '#222',
      },
      ListaEventos: {
        background: '#ede7f6',
        searchBar: '#ede7f6',
        eventoCard: '#fffde7',
        iconTendencias: '#ffb300',
        iconArquitectura: '#b15928',
        iconSoftware: '#6a3d9a',
        iconRedes: '#43a047',
        eventoNombre: '#222',
        eventoFecha: '#6a3d9a',
        btnEditar: '#b15928',
        btnBorrar: '#e31a1c',
        btnVer: '#1976d2',
        btnIcon: '#fff',
      },
      FormularioAsistencia: {
        fotosBlock: '#ede7f6',
        fotoRow: '#fff',
        fotoRowBorder: '#b15928',
        addBtn: '#fffde7',
        addBtnText: '#222',
        btnDanger: '#e31a1c',
        btnDangerText: '#fff',
        btnPrimary: '#b15928',
        btnPrimaryText: '#fff',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#fff',
        inputBorder: '#6a3d9a',
        inputText: '#222',
        linkText: '#6a3d9a',
      },
      Config: {
        sectionBg: '#ede7f6',
        colorOptionBg: '#fffde7',
        colorOptionSelected: '#b15928',
        colorRadio: '#a6cee3',
        colorRadioSelected: '#b15928',
        fontBtn: '#b15928',
        fontBtnText: '#fff',
      },
    },
    dark: {
      text: '#e0e0e0',
      background: '#1a1a2e',
      tint: '#4e2a84',
      card: '#16213e',
      border: '#553d9a',
      accent: '#ff7f00',
      danger: '#ff4444',
      help: '#a8d8ea',
      btnPrimary: '#4e2a84',
      btnSecondary: '#ff7f00',
      btnText: '#fff',
      AppLayout: {
        headerBg: '#4e2a84',
        headerText: '#fff',
        headerBtnBg: '#ff7f00',
        headerBtnText: '#fff',
        cardBg: '#16213e',
        greenBlock: '#ff7f00',
        regresarBtn: '#1976d2',
        regresarBtnText: '#fff',
        helpBtn: '#a8d8ea',
        helpBtnText: '#fff',
      },
      ListaEventos: {
        background: '#16213e',
        searchBar: '#4e2a84',
        eventoCard: '#ff7f00',
        iconTendencias: '#ffb300',
        iconArquitectura: '#ff7f00',
        iconSoftware: '#4e2a84',
        iconRedes: '#ff7f00',
        eventoNombre: '#fff',
        eventoFecha: '#ff7f00',
        btnEditar: '#ff7f00',
        btnBorrar: '#ff4444',
        btnVer: '#1976d2',
        btnIcon: '#fff',
      },
      FormularioAsistencia: {
        fotosBlock: '#16213e',
        fotoRow: '#ff7f00',
        fotoRowBorder: '#4e2a84',
        addBtn: '#ff7f00',
        addBtnText: '#fff',
        btnDanger: '#ff4444',
        btnDangerText: '#fff',
        btnPrimary: '#ff7f00',
        btnPrimaryText: '#fff',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#16213e',
        inputBorder: '#4e2a84',
        inputText: '#fff',
        linkText: '#ff7f00',
      },
      Config: {
        sectionBg: '#16213e',
        colorOptionBg: '#4e2a84',
        colorOptionSelected: '#ff7f00',
        colorRadio: '#a8d8ea',
        colorRadioSelected: '#ff7f00',
        fontBtn: '#ff7f00',
        fontBtnText: '#fff',
      },
    },
  },
  tritanopia: {
    light: {
      text: '#222',
      background: '#f5f5f5',
      tint: '#d62728',
      card: '#ffffff',
      border: '#d62728',
      accent: '#2ca02c',
      danger: '#ff7f0e',
      help: '#9467bd',
      btnPrimary: '#d62728',
      btnSecondary: '#2ca02c',
      btnText: '#fff',
      AppLayout: {
        headerBg: '#d62728',
        headerText: '#fff',
        headerBtnBg: '#2ca02c',
        headerBtnText: '#fff',
        cardBg: '#ffe0b2',
        greenBlock: '#2ca02c',
        regresarBtn: '#1976d2',
        regresarBtnText: '#fff',
        helpBtn: '#9467bd',
        helpBtnText: '#fff',
      },
      ListaEventos: {
        background: '#ffe0b2',
        searchBar: '#fffde7',
        eventoCard: '#ffe0b2',
        iconTendencias: '#ffb300',
        iconArquitectura: '#d62728',
        iconSoftware: '#1976d2',
        iconRedes: '#2ca02c',
        eventoNombre: '#222',
        eventoFecha: '#d62728',
        btnEditar: '#2ca02c',
        btnBorrar: '#ff7f0e',
        btnVer: '#1976d2',
        btnIcon: '#fff',
      },
      FormularioAsistencia: {
        fotosBlock: '#ffe0b2',
        fotoRow: '#fff',
        fotoRowBorder: '#2ca02c',
        addBtn: '#2ca02c',
        addBtnText: '#fff',
        btnDanger: '#ff7f0e',
        btnDangerText: '#fff',
        btnPrimary: '#2ca02c',
        btnPrimaryText: '#fff',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#fff',
        inputBorder: '#d62728',
        inputText: '#222',
        linkText: '#d62728',
      },
      Config: {
        sectionBg: '#ffe0b2',
        colorOptionBg: '#fffde7',
        colorOptionSelected: '#2ca02c',
        colorRadio: '#9467bd',
        colorRadioSelected: '#2ca02c',
        fontBtn: '#2ca02c',
        fontBtnText: '#fff',
      },
    },
    dark: {
      text: '#e0e0e0',
      background: '#1e1e1e',
      tint: '#ff4d4d',
      card: '#2a2a2a',
      border: '#ff4d4d',
      accent: '#4dff4d',
      danger: '#ffa64d',
      help: '#cc99ff',
      btnPrimary: '#ff4d4d',
      btnSecondary: '#4dff4d',
      btnText: '#000',
      AppLayout: {
        headerBg: '#ff4d4d',
        headerText: '#fff',
        headerBtnBg: '#4dff4d',
        headerBtnText: '#000',
        cardBg: '#2a2a2a',
        greenBlock: '#4dff4d',
        regresarBtn: '#1976d2',
        regresarBtnText: '#fff',
        helpBtn: '#cc99ff',
        helpBtnText: '#000',
      },
      ListaEventos: {
        background: '#2a2a2a',
        searchBar: '#4dff4d',
        eventoCard: '#4dff4d',
        iconTendencias: '#ffb300',
        iconArquitectura: '#ff4d4d',
        iconSoftware: '#1976d2',
        iconRedes: '#4dff4d',
        eventoNombre: '#000',
        eventoFecha: '#ff4d4d',
        btnEditar: '#4dff4d',
        btnBorrar: '#ffa64d',
        btnVer: '#1976d2',
        btnIcon: '#000',
      },
      FormularioAsistencia: {
        fotosBlock: '#2a2a2a',
        fotoRow: '#4dff4d',
        fotoRowBorder: '#ff4d4d',
        addBtn: '#4dff4d',
        addBtnText: '#000',
        btnDanger: '#ffa64d',
        btnDangerText: '#000',
        btnPrimary: '#4dff4d',
        btnPrimaryText: '#000',
      },
      LoginForm: {
        iconCircle: '#fff',
        inputBg: '#2a2a2a',
        inputBorder: '#ff4d4d',
        inputText: '#fff',
        linkText: '#ff4d4d',
      },
      Config: {
        sectionBg: '#2a2a2a',
        colorOptionBg: '#4dff4d',
        colorOptionSelected: '#ff4d4d',
        colorRadio: '#cc99ff',
        colorRadioSelected: '#4dff4d',
        fontBtn: '#4dff4d',
        fontBtnText: '#000',
      },
    },
  },
};

export type ThemeName = 'light' | 'dark';
export type ColorMode = keyof typeof Colors;