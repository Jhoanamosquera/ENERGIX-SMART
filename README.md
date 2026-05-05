# ⚡ ENERGIX SMART

<div align="center">

![ENERGIX SMART](https://img.shields.io/badge/ENERGIX-SMART-00C853?style=for-the-badge&logo=lightning&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![TRL](https://img.shields.io/badge/TRL-6-orange?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**Sistema Inteligente de Monitoreo y Optimización del Consumo de Energía Eléctrica Residencial**

[Demo en Vivo](#) • [Documentación](#características) • [Instalación](#instalación) • [Contribuir](#contribución)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Usuarios de Prueba](#-usuarios-de-prueba)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Roadmap](#-roadmap)
- [Contribución](#-contribución)
- [Equipo](#-equipo)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**ENERGIX SMART** es una plataforma web inteligente diseñada para el monitoreo, análisis y optimización del consumo de energía eléctrica en hogares residenciales. El sistema permite a los usuarios visualizar su consumo en tiempo real, identificar patrones de uso, detectar picos de consumo y recibir recomendaciones personalizadas para reducir costos y promover prácticas energéticas sostenibles.

### Contexto Académico

- **Universidad:** Universidad Nacional Abierta y a Distancia (UNAD)
- **Programa:** Ingeniería de Sistemas
- **Tipo:** Proyecto de Grado 2026
- **Grupo:** 75
- **Nivel TRL:** 6 (Prototipo Funcional)
- **ODS:** Objetivo 7 - Energía Asequible y No Contaminante

### Problema que Resuelve

El consumo energético ineficiente en hogares colombianos genera:
- 💰 Altos costos en facturas de electricidad
- 🌍 Mayor huella de carbono
- ⚠️ Falta de visibilidad sobre patrones de consumo
- 📊 Dificultad para tomar decisiones informadas

**ENERGIX SMART** proporciona las herramientas necesarias para que los usuarios tomen control de su consumo energético mediante:
- Visualización clara y en tiempo real
- Análisis inteligente de datos
- Recomendaciones personalizadas
- Alertas automáticas de consumo anómalo

---

## ✨ Características

### 🏠 Para Usuarios Residenciales

#### Dashboard Interactivo
- 📊 KPIs en tiempo real (consumo diario, mensual, costos)
- 📈 Gráficos dinámicos con Chart.js
- 🎯 Proyecciones de consumo mensual
- 💰 Cálculo automático de costos (700 COP/kWh)

#### Análisis Avanzado
- 📉 Historial de consumo (diario, semanal, mensual, anual)
- 🔍 Detección automática de picos de consumo
- 📊 Comparación entre períodos
- 🕐 Análisis de patrones horarios

#### Alertas Inteligentes
- 🔔 Notificaciones de consumo elevado
- ⚠️ Detección de picos críticos
- 💡 Alertas de desperdicio energético
- 📱 Sistema de notificaciones profesional

#### Recomendaciones IA
- 💡 Sugerencias personalizadas de ahorro
- 🎯 Acciones específicas por dispositivo
- 💵 Estimación de ahorro potencial
- 🌱 Tips de eficiencia energética

#### Reportes y Exportación
- 📄 Generación de reportes (semanal, mensual, anual)
- 📊 Exportación de datos en CSV
- 📈 Gráficos descargables
- 📋 Historial completo de registros

### 👨‍💼 Para Administradores

#### Dashboard Administrativo
- 📊 Estadísticas globales del sistema
- 👥 Total de usuarios registrados
- ⚡ Consumo total agregado
- 📈 Métricas de uso de la plataforma

#### Gestión de Usuarios
- ➕ Crear, editar y eliminar usuarios
- 🔍 Búsqueda y filtrado avanzado
- 👤 Gestión de roles (usuario/admin)
- 📊 Visualización de consumo por usuario
- ✅ Activar/desactivar cuentas

#### Análisis Comparativo
- 📊 Comparación entre usuarios
- 🏆 Ranking de eficiencia energética
- 📈 Tendencias globales
- 🎯 Identificación de usuarios con alto consumo

---

## 🛠 Tecnologías

### Stack del Proyecto (Diseño Completo)

El proyecto está diseñado con las siguientes tecnologías profesionales:

#### Frontend
- **React.js** - Framework de interfaz de usuario
- **Chart.js** - Visualización de datos
- **CSS3** - Estilos y animaciones

#### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL

#### DevOps
- **Git/GitHub** - Control de versiones
- **Vercel** - Despliegue frontend
- **Railway** - Despliegue backend

### Stack del Prototipo (TRL 6)

Para facilitar el despliegue en **GitHub Pages** con fines académicos y demostrativos, el prototipo funcional está implementado con:

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modulares y responsive
- **JavaScript (Vanilla)** - Lógica de aplicación
- **Chart.js** - Gráficos interactivos
- **LocalStorage** - Persistencia de datos
- **Font Awesome** - Iconografía

---

## 🏗 Arquitectura

### Arquitectura Modular (SOLID)

El proyecto sigue los principios SOLID y buenas prácticas de desarrollo:

```
energix-smart/
│
├── css/                          # Estilos modulares
│   ├── variables.css            # Variables CSS y reset (50 líneas)
│   ├── components.css           # Componentes reutilizables (318 líneas)
│   ├── login.css                # Pantalla de login (217 líneas)
│   ├── dashboard.css            # Panel de usuario (195 líneas)
│   ├── landing.css              # Landing page (469 líneas)
│   ├── devices.css              # Mockups de dispositivos (233 líneas)
│   ├── scroll-button.css        # Botón scroll to top (44 líneas)
│   └── responsive.css           # Media queries (275 líneas)
│
├── js/                          # JavaScript modular
│   ├── core/                    # Módulos principales
│   │   ├── auth.js             # Autenticación (151 líneas)
│   │   ├── data.js             # Gestión de datos (104 líneas)
│   │   └── ui.js               # Interfaz de usuario (94 líneas)
│   ├── views/                   # Vistas (futuro)
│   ├── charts/                  # Gráficos (futuro)
│   └── utils/                   # Utilidades (futuro)
│
├── app.js                       # Aplicación principal (188 líneas)
├── vistas.js                    # Generación de vistas (2041 líneas)
├── graficos.js                  # Configuración de gráficos (1069 líneas)
├── index.html                   # Punto de entrada (888 líneas)
├── styles.css                   # Importador de estilos
├── .gitignore                   # Archivos ignorados
├── LICENSE                      # Licencia MIT
└── README.md                    # Este archivo
```

### Principios Aplicados

#### 1. Single Responsibility Principle (SRP)
- Cada módulo CSS tiene una responsabilidad única
- Cada archivo JS maneja un aspecto específico del sistema

#### 2. Open/Closed Principle (OCP)
- Sistema extensible sin modificar código existente
- Nuevas funcionalidades se agregan en módulos separados

#### 3. Separation of Concerns
- CSS, JavaScript y HTML completamente separados
- Lógica de negocio separada de la presentación

#### 4. DRY (Don't Repeat Yourself)
- Variables CSS centralizadas en `variables.css`
- Funciones reutilizables en módulos core

#### 5. Modularidad
- Fácil mantenimiento
- Escalable
- Testeable
- Cada archivo < 500 líneas (objetivo)

---

## 📦 Instalación

### Requisitos Previos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional)

### Opción 1: Uso Directo

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/energix-smart.git
cd energix-smart
```

2. **Abrir en navegador:**
```bash
# Simplemente abre index.html en tu navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Opción 2: Servidor Local

1. **Usando Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

2. **Usando Node.js:**
```bash
npx http-server -p 8000
```

3. **Usando PHP:**
```bash
php -S localhost:8000
```

4. **Acceder a:**
```
http://localhost:8000
```

### Opción 3: GitHub Pages

El proyecto está configurado para desplegarse automáticamente en GitHub Pages:

1. Fork el repositorio
2. Ve a Settings → Pages
3. Selecciona la rama `main` como fuente
4. Guarda y espera el despliegue
5. Accede a: `https://tu-usuario.github.io/energix-smart`

---

## 🚀 Uso

### 1. Landing Page

Al abrir la aplicación, verás la landing page con:
- Información del proyecto
- Características principales
- Beneficios del sistema
- Mockups de dispositivos
- Tecnologías utilizadas

**Acciones disponibles:**
- Click en "Iniciar Sesión" para acceder al sistema
- Scroll para explorar las secciones
- Botón flotante para volver al inicio

### 2. Inicio de Sesión

Usa las credenciales de prueba para acceder:

**Usuario Regular:**
- Email: `johana@gmail.com`
- Contraseña: `estudiantes`

**Administrador:**
- Email: `brayan@gmail.com`
- Contraseña: `estudiantes`

### 3. Dashboard de Usuario

Una vez autenticado, tendrás acceso a:

#### Panel Principal
- KPIs de consumo (hoy, mes, proyección)
- Gráfico de consumo semanal
- Alertas recientes
- Recomendaciones destacadas

#### Mi Consumo
- Formulario para registrar nuevo consumo
- Validación de datos
- Cálculo automático de costos

#### Historial
- Tabla con todos los registros
- Filtros por fecha
- Búsqueda
- Exportación a CSV

#### Análisis
- Gráficos de tendencias
- Comparación de períodos
- Análisis horario
- Detección de patrones

#### Alertas
- Lista de alertas activas
- Clasificación por prioridad
- Marcar como leídas
- Historial de alertas

#### Recomendaciones
- Sugerencias personalizadas
- Estimación de ahorro
- Acciones específicas
- Tips de eficiencia

#### Reportes
- Generar reporte semanal
- Generar reporte mensual
- Generar reporte anual
- Exportar datos completos

#### Mi Perfil
- Editar información personal
- Cambiar contraseña
- Configuración de notificaciones
- Preferencias del sistema

### 4. Panel de Administrador

Los administradores tienen acceso adicional a:

#### Dashboard Admin
- Estadísticas globales
- Total de usuarios
- Consumo agregado
- Métricas del sistema

#### Gestión de Usuarios
- Lista completa de usuarios
- Crear nuevo usuario
- Editar usuarios existentes
- Eliminar usuarios
- Cambiar roles
- Activar/desactivar cuentas

---

## 👥 Usuarios de Prueba

### Usuario Regular

```
Email: johana@gmail.com
Contraseña: estudiantes
Rol: Usuario Residencial
```

**Permisos:**
- ✅ Ver su propio dashboard
- ✅ Registrar consumo
- ✅ Ver historial personal
- ✅ Recibir alertas y recomendaciones
- ✅ Generar reportes propios
- ✅ Editar su perfil
- ❌ Acceso a panel administrativo

### Administrador

```
Email: brayan@gmail.com
Contraseña: estudiantes
Rol: Administrador
```

**Permisos:**
- ✅ Todos los permisos de usuario regular
- ✅ Ver dashboard administrativo
- ✅ Gestionar usuarios (CRUD completo)
- ✅ Ver estadísticas globales
- ✅ Acceso a todos los datos del sistema
- ✅ Configuración del sistema

---

## 📁 Estructura del Proyecto

### Archivos Principales

```
📦 energix-smart
│
├── 📄 index.html                 # Punto de entrada (888 líneas)
├── 📄 styles.css                 # Importador de estilos modulares
├── 📄 app.js                     # Aplicación principal (188 líneas)
├── 📄 vistas.js                  # Generación de vistas HTML
├── 📄 graficos.js                # Configuración de Chart.js
│
├── 📁 css/                       # Estilos modulares (8 archivos)
│   ├── variables.css            # Variables y reset
│   ├── components.css           # Componentes reutilizables
│   ├── login.css                # Estilos de login
│   ├── dashboard.css            # Estilos del panel
│   ├── landing.css              # Estilos de landing
│   ├── devices.css              # Mockups de dispositivos
│   ├── scroll-button.css        # Botón scroll to top
│   └── responsive.css           # Media queries
│
├── 📁 js/                        # JavaScript modular
│   └── 📁 core/                 # Módulos principales
│       ├── auth.js              # Autenticación
│       ├── data.js              # Gestión de datos
│       └── ui.js                # Interfaz de usuario
│
├── 📄 .gitignore                # Archivos ignorados por Git
├── 📄 LICENSE                   # Licencia MIT
└── 📄 README.md                 # Este archivo
```

### Datos Almacenados (LocalStorage)

```javascript
// Usuarios del sistema
energix_usuarios: Array<Usuario>

// Sesión activa
energix_sesion: Sesion | null

// Consumo por usuario
energix_consumo_{email}: Array<Registro>

// Configuración del sistema
energix_config: Config
```

---

## 📸 Capturas de Pantalla

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/0B1928/00C853?text=Landing+Page)

### Dashboard de Usuario
![Dashboard](https://via.placeholder.com/800x400/0B1928/00C853?text=Dashboard+Usuario)

### Panel de Administrador
![Admin Panel](https://via.placeholder.com/800x400/0B1928/00C853?text=Panel+Administrador)

### Responsive Design
![Responsive](https://via.placeholder.com/800x400/0B1928/00C853?text=Responsive+Design)

---

## 🗺 Roadmap

### Versión 1.0 (Actual) ✅
- [x] Sistema de autenticación
- [x] Dashboard interactivo
- [x] Registro de consumo
- [x] Historial y análisis
- [x] Alertas y recomendaciones
- [x] Panel administrativo
- [x] Responsive design
- [x] Arquitectura modular

### Versión 1.1 (Próxima)
- [ ] Integración con backend real (Node.js + Express)
- [ ] Base de datos MongoDB
- [ ] API RESTful
- [ ] Autenticación JWT
- [ ] Recuperación de contraseña por email

### Versión 2.0 (Futuro)
- [ ] Migración a React.js
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Integración con dispositivos IoT
- [ ] Machine Learning para predicciones
- [ ] App móvil nativa (React Native)

### Versión 3.0 (Visión)
- [ ] Integración con medidores inteligentes
- [ ] Análisis predictivo avanzado
- [ ] Gamificación y recompensas
- [ ] Marketplace de dispositivos eficientes
- [ ] Comunidad de usuarios
- [ ] API pública para desarrolladores

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

### Cómo Contribuir

1. **Fork el proyecto**
```bash
git clone https://github.com/tu-usuario/energix-smart.git
```

2. **Crea una rama para tu feature**
```bash
git checkout -b feature/nueva-funcionalidad
```

3. **Realiza tus cambios**
```bash
# Edita los archivos necesarios
# Asegúrate de seguir las convenciones del proyecto
```

4. **Commit tus cambios**
```bash
git add .
git commit -m "feat: descripción de la nueva funcionalidad"
```

5. **Push a tu rama**
```bash
git push origin feature/nueva-funcionalidad
```

6. **Abre un Pull Request**
- Ve a GitHub y abre un PR
- Describe los cambios realizados
- Espera la revisión del equipo

### Convenciones de Código

#### CSS
- Usar variables CSS para colores y valores reutilizables
- Seguir metodología BEM para nombres de clases
- Mantener archivos bajo 500 líneas
- Comentar secciones importantes

#### JavaScript
- Usar ES6+ cuando sea posible
- Funciones descriptivas y pequeñas
- Comentar lógica compleja
- Mantener archivos bajo 500 líneas
- Seguir principios SOLID

#### HTML
- Estructura semántica
- Accesibilidad (ARIA labels)
- Comentar secciones principales
- Indentación consistente

### Reportar Bugs

Si encuentras un bug, por favor:

1. Verifica que no esté ya reportado en [Issues](https://github.com/tu-usuario/energix-smart/issues)
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Capturas de pantalla (si aplica)
   - Navegador y versión

### Sugerir Mejoras

Para sugerir nuevas funcionalidades:

1. Abre un issue con la etiqueta `enhancement`
2. Describe la funcionalidad propuesta
3. Explica el caso de uso
4. Proporciona ejemplos si es posible

---

## 👨‍💻 Equipo

### Desarrolladores

<table>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Johana Mosquera"/><br />
      <sub><b>Johana Andrea Mosquera Giraldo</b></sub><br />
      <sub>Ingeniería de Sistemas</sub><br />
      <a href="mailto:johana@unad.edu.co">📧 Email</a>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100" width="100px;" alt="Brayan Martinez"/><br />
      <sub><b>Brayan Stiven Martinez Alvarez</b></sub><br />
      <sub>Ingeniería de Sistemas</sub><br />
      <a href="mailto:brayan@unad.edu.co">📧 Email</a>
    </td>
  </tr>
</table>

### Institución

**Universidad Nacional Abierta y a Distancia (UNAD)**
- Programa: Ingeniería de Sistemas
- Grupo: 75
- Año: 2026

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2026 ENERGIX SMART - UNAD

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contacto

### Proyecto
- **Nombre:** ENERGIX SMART
- **Versión:** 1.0.0
- **Repositorio:** [GitHub](https://github.com/tu-usuario/energix-smart)
- **Demo:** [GitHub Pages](https://tu-usuario.github.io/energix-smart)

### Equipo
- **Email:** energix@unad.edu.co
- **Universidad:** UNAD - Colombia
- **Programa:** Ingeniería de Sistemas

---

## 🙏 Agradecimientos

- **UNAD** - Por el apoyo académico y recursos
- **Chart.js** - Por la excelente librería de gráficos
- **Font Awesome** - Por los iconos
- **Comunidad Open Source** - Por las herramientas y recursos

---

## 📊 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/energix-smart?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/energix-smart?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/tu-usuario/energix-smart?style=social)

![GitHub issues](https://img.shields.io/github/issues/tu-usuario/energix-smart)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tu-usuario/energix-smart)
![GitHub last commit](https://img.shields.io/github/last-commit/tu-usuario/energix-smart)

---

<div align="center">

**⚡ ENERGIX SMART - Energía Inteligente para un Futuro Sostenible ⚡**

Hecho con ❤️ por el equipo de UNAD

[⬆ Volver arriba](#-energix-smart)

</div>
