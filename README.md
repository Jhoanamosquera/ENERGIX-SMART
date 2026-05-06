# ⚡ ENERGIX SMART

**Sistema Inteligente de Monitoreo y Optimización del Consumo de Energía Eléctrica Residencial**

[![TRL](https://img.shields.io/badge/TRL-6-success)](https://en.wikipedia.org/wiki/Technology_readiness_level)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![UNAD](https://img.shields.io/badge/UNAD-Proyecto%20de%20Grado-orange)](https://www.unad.edu.co)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Usuarios de Prueba](#-usuarios-de-prueba)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Autores](#-autores)

---

## 📖 Descripción

ENERGIX SMART es una plataforma web inteligente diseñada para ayudar a los hogares colombianos a monitorear, analizar y optimizar su consumo de energía eléctrica. El sistema proporciona análisis en tiempo real, recomendaciones personalizadas y herramientas de gamificación para promover hábitos de consumo eficiente.

### 🎯 Objetivos

- **Monitoreo en Tiempo Real**: Seguimiento continuo del consumo energético del hogar
- **Análisis Inteligente**: Identificación de patrones y oportunidades de ahorro
- **Recomendaciones Personalizadas**: Sugerencias basadas en el perfil de consumo del usuario
- **Gamificación**: Sistema de logros y metas para motivar el ahorro energético
- **Educación**: Información y consejos para promover el uso eficiente de la energía

### 🌍 Alineación con ODS

Este proyecto contribuye al **Objetivo de Desarrollo Sostenible 7**: Energía Asequible y No Contaminante, promoviendo el acceso a energía asequible, segura, sostenible y moderna para todos.

---

## ✨ Características

### 🏠 Para Usuarios Residenciales

- **Dashboard Interactivo**: Visualización completa del consumo energético con KPIs en tiempo real
- **Registro de Consumo**: Captura manual o automática de lecturas de medidor
- **Análisis Histórico**: Gráficos y tendencias de consumo por día, semana, mes y año
- **Detección de Picos**: Identificación automática de consumos anormales
- **Sistema de Alertas**: Notificaciones push y por email de eventos importantes
- **Recomendaciones IA**: Sugerencias personalizadas con ahorro estimado en COP
- **Calculadora de Ahorro**: Herramientas especializadas para calcular ahorros potenciales
- **Sistema de Metas**: Definición y seguimiento de objetivos de ahorro
- **Gamificación**: Logros, niveles y ranking de usuarios más eficientes
- **Comparación con Vecinos**: Benchmarking anónimo con otros hogares
- **Widget de Clima**: Correlación entre temperatura y consumo energético
- **Reportes PDF**: Generación de informes profesionales descargables
- **Temas Personalizables**: Modo claro, oscuro y automático

### 👨‍💼 Para Administradores

- **Panel de Administración**: Vista global de todos los usuarios y el sistema
- **Gestión de Usuarios**: CRUD completo de cuentas de usuario
- **Monitoreo del Sistema**: Métricas de rendimiento y salud de la plataforma
- **Gestión de Dispositivos**: Administración de dispositivos monitoreados
- **Estadísticas Globales**: Análisis agregado de consumo y tendencias
- **Configuración de Plataforma**: Ajustes globales del sistema
- **Reportes Administrativos**: Informes ejecutivos y de gestión

---

## 🛠 Tecnologías

### Frontend

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y animaciones
- **JavaScript (Vanilla)**: Lógica de aplicación sin frameworks
- **Chart.js**: Visualización de datos con gráficos interactivos
- **Font Awesome**: Iconografía profesional
- **Google Fonts**: Tipografía Inter y JetBrains Mono

### Almacenamiento

- **LocalStorage**: Persistencia de datos en el navegador
- **Session Storage**: Gestión de sesiones de usuario

### APIs Externas (Opcionales)

- **OpenWeatherMap API**: Datos meteorológicos en tiempo real
- **Notification API**: Notificaciones push del navegador

### Arquitectura

- **SPA (Single Page Application)**: Navegación sin recargas
- **Modular JavaScript**: Código organizado en módulos
- **Responsive Design**: Adaptado a móviles, tablets y desktop
- **Progressive Enhancement**: Funcionalidad básica sin JavaScript

---

## 📦 Instalación

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor web local (opcional, para desarrollo)

### Opción 1: Uso Directo

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/energix-smart.git
   cd energix-smart
   ```

2. **Abrir en el navegador**:
   - Simplemente abre `index.html` en tu navegador
   - O usa Live Server en VS Code

### Opción 2: Servidor Local

1. **Con Python**:
   ```bash
   python -m http.server 8000
   ```
   Luego abre `http://localhost:8000`

2. **Con Node.js (http-server)**:
   ```bash
   npx http-server -p 8000
   ```
   Luego abre `http://localhost:8000`

3. **Con PHP**:
   ```bash
   php -S localhost:8000
   ```
   Luego abre `http://localhost:8000`

### Opción 3: GitHub Pages

El proyecto está configurado para desplegarse automáticamente en GitHub Pages:

1. Fork el repositorio
2. Ve a Settings > Pages
3. Selecciona la rama `main` como fuente
4. Tu sitio estará disponible en `https://tu-usuario.github.io/energix-smart`

---

## 🚀 Uso

### Acceso a la Aplicación

1. **Landing Page**: Página de inicio con información del proyecto
2. **Iniciar Sesión**: Accede con las credenciales de prueba

### Usuarios de Prueba

#### Usuario Residencial
- **Email**: `johana@gmail.com`
- **Contraseña**: `estudiantes`
- **Rol**: Usuario residencial con datos de consumo demo

#### Administrador
- **Email**: `brayan@gmail.com`
- **Contraseña**: `estudiantes`
- **Rol**: Administrador con acceso completo al sistema

### Flujo de Uso Típico

1. **Iniciar Sesión** con las credenciales de prueba
2. **Explorar el Dashboard** para ver el resumen de consumo
3. **Registrar Consumo** en la sección "Mi Consumo"
4. **Ver Análisis** de patrones y tendencias
5. **Revisar Recomendaciones** personalizadas
6. **Establecer Metas** de ahorro energético
7. **Desbloquear Logros** mediante el uso eficiente
8. **Generar Reportes** PDF para análisis detallado

---

## 📁 Estructura del Proyecto

```
ENERGIX-SMART/
│
├── index.html                 # Página principal (SPA)
├── app.js                     # Lógica principal de la aplicación
├── styles.css                 # Estilos base
├── LICENSE                    # Licencia MIT
├── README.md                  # Este archivo
│
├── css/                       # Estilos modulares
│   ├── admin.css             # Estilos del panel de administración
│   ├── calculator.css        # Estilos de la calculadora de ahorro
│   ├── components.css        # Componentes reutilizables
│   ├── configuration.css     # Estilos de configuración
│   ├── dashboard.css         # Estilos del dashboard
│   ├── devices.css           # Estilos de gestión de dispositivos
│   ├── forms.css             # Estilos de formularios
│   ├── gamification.css      # Estilos de gamificación y logros
│   ├── goals.css             # Estilos de metas
│   ├── landing.css           # Estilos de la landing page
│   ├── login.css             # Estilos de login
│   ├── mejoras-profesionales.css  # Mejoras visuales profesionales
│   ├── responsive.css        # Media queries responsive
│   ├── scroll-button.css     # Botón de scroll to top
│   ├── sections.css          # Secciones de la landing
│   ├── themes.css            # Temas claro/oscuro
│   ├── ui-elements.css       # Elementos de UI
│   ├── variables.css         # Variables CSS
│   └── weather.css           # Estilos del widget de clima
│
├── js/                        # JavaScript modular
│   ├── charts/               # Gráficos con Chart.js
│   │   ├── admin-charts.js
│   │   ├── analysis-charts.js
│   │   ├── comparison-charts.js
│   │   ├── dashboard-charts.js
│   │   ├── history-charts.js
│   │   └── peaks-charts.js
│   │
│   ├── core/                 # Funcionalidades core
│   │   ├── auth.js          # Autenticación y sesiones
│   │   ├── data.js          # Gestión de datos
│   │   └── ui.js            # Utilidades de UI
│   │
│   ├── features/             # Características avanzadas
│   │   ├── gamification.js  # Sistema de logros y niveles
│   │   ├── goals.js         # Sistema de metas
│   │   ├── neighbor-comparison.js  # Comparación con vecinos
│   │   ├── notifications.js # Sistema de notificaciones
│   │   ├── pdf-export.js    # Exportación a PDF
│   │   ├── savings-calculator.js  # Calculadora de ahorros
│   │   ├── theme.js         # Gestión de temas
│   │   └── weather.js       # Widget de clima
│   │
│   ├── utils/                # Utilidades
│   │   ├── demo-data.js     # Datos de demostración
│   │   ├── formatters.js    # Formateadores de datos
│   │   └── helpers.js       # Funciones auxiliares
│   │
│   ├── views/                # Vistas de la aplicación
│   │   ├── admin.js         # Panel de administración
│   │   ├── alertas.js       # Vista de alertas
│   │   ├── analisis.js      # Vista de análisis
│   │   ├── calculadora.js   # Vista de calculadora
│   │   ├── clima.js         # Vista de clima
│   │   ├── comparacion.js   # Vista de comparación
│   │   ├── configuracion.js # Vista de configuración
│   │   ├── consumo.js       # Vista de registro de consumo
│   │   ├── dashboard.js     # Vista del dashboard
│   │   ├── gamificacion.js  # Vista de gamificación
│   │   ├── historial.js     # Vista de historial
│   │   ├── metas.js         # Vista de metas
│   │   ├── perfil.js        # Vista de perfil
│   │   ├── picos.js         # Vista de picos
│   │   ├── recomendaciones.js  # Vista de recomendaciones
│   │   ├── reportes.js      # Vista de reportes
│   │   └── vecinos.js       # Vista de comunidad
│   │
│   └── fixes.js              # Correcciones y parches
│
└── CORRECCIONES_APLICADAS.md  # Documentación de correcciones

```

---

## 🎨 Capturas de Pantalla

### Landing Page
![Landing Page](docs/screenshots/landing.png)

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)

### Análisis
![Análisis](docs/screenshots/analisis.png)

### Gamificación
![Gamificación](docs/screenshots/gamificacion.png)

### Calculadora
![Calculadora](docs/screenshots/calculadora.png)

---

## 🗺 Roadmap

### Versión 1.0 (Actual - TRL 6)
- ✅ Dashboard interactivo
- ✅ Registro manual de consumo
- ✅ Análisis histórico
- ✅ Sistema de alertas
- ✅ Recomendaciones personalizadas
- ✅ Gamificación básica
- ✅ Reportes PDF
- ✅ Widget de clima

### Versión 1.5 (Próxima)
- 🔄 Integración con medidores inteligentes
- 🔄 API REST para dispositivos IoT
- 🔄 Notificaciones push móviles
- 🔄 Análisis predictivo con ML
- 🔄 Comparación con tarifas reales
- 🔄 Integración con sistemas de domótica

### Versión 2.0 (Futuro)
- 📅 App móvil nativa (iOS/Android)
- 📅 Backend con Node.js + MongoDB
- 📅 Autenticación con OAuth2
- 📅 Marketplace de dispositivos
- 📅 Comunidad y foros
- 📅 Integración con paneles solares

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

1. **Fork** el repositorio
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Guías de Contribución

- Sigue el estilo de código existente
- Documenta nuevas funcionalidades
- Agrega tests cuando sea posible
- Actualiza el README si es necesario

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

### Equipo de Desarrollo

**Johana Mosquera**
- Rol: Desarrolladora Full Stack
- Universidad: UNAD - Ingeniería de Sistemas
- Email: johana.mosquera@unad.edu.co
- GitHub: [@johana-mosquera](https://github.com/johana-mosquera)

**Brayan Martinez**
- Rol: Desarrollador Full Stack
- Universidad: UNAD - Ingeniería de Sistemas
- Email: brayan.martinez@unad.edu.co
- GitHub: [@brayan-martinez](https://github.com/brayan-martinez)

### Institución

**Universidad Nacional Abierta y a Distancia (UNAD)**
- Programa: Ingeniería de Sistemas
- Proyecto: Trabajo de Grado 2026
- Grupo: 75

---

## 🙏 Agradecimientos

- A la **UNAD** por el apoyo académico
- A los **profesores** por su guía y mentoría
- A la **comunidad open source** por las herramientas utilizadas
- A **Chart.js** por la librería de gráficos
- A **Font Awesome** por los iconos
- A **OpenWeatherMap** por la API de clima

---

## 📞 Contacto

Para preguntas, sugerencias o reportar problemas:

- **Email**: energix@unad.edu.co
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/energix-smart/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tu-usuario/energix-smart/discussions)

---

## 📊 Estado del Proyecto

- **Versión**: 1.0.0
- **Estado**: TRL 6 - Prototipo Funcional
- **Última Actualización**: Mayo 2026
- **Mantenimiento**: Activo

---

<div align="center">

**⚡ ENERGIX SMART - Energía Inteligente para un Futuro Sostenible ⚡**

[![UNAD](https://img.shields.io/badge/UNAD-Colombia-yellow)](https://www.unad.edu.co)
[![ODS 7](https://img.shields.io/badge/ODS-7-green)](https://www.un.org/sustainabledevelopment/es/energy/)

</div>
