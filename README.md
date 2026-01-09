# Todo List Ionic - Prueba Técnica

Aplicación de gestión de tareas desarrollada con **Ionic**, **Angular** y **Cordova**.

## Requisitos

- Node.js (v18 o superior)
- npm (v10 o superior)
- Ionic CLI (v6 o superior)
- Cordova (v11 o superior)
- native-run (para ejecutar en dispositivos/emuladores)
- Android Studio (para compilar Android)
- Xcode (para compilar iOS - solo macOS)

## Instalación

```bash
npm install
```

### Instalar native-run (necesario para ejecutar en dispositivos)

```bash
npm i -g native-run
```

## Ejecución en Desarrollo

### En el navegador

```bash
npm start
```

La aplicación estará disponible en `http://localhost:8100`

### En Android con Live Reload

1. **Abrir Android Studio y iniciar un emulador**

   - Abre Android Studio
   - Ve a Device Manager (o AVD Manager)
   - Inicia un emulador Android

2. **Compilar y ejecutar con live reload**

```bash
ionic cordova run android --livereload
```

Esto compilará la aplicación, la instalará en el emulador y habilitará la recarga automática cuando hagas cambios en el código.

## Compilación

### Compilar para Android

```bash
ionic cordova build android
```

El APK de debug se generará en:

```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Compilar para iOS

```bash
ionic cordova build ios
```

### Compilar para producción

```bash
# Android
ionic cordova build android --release --prod

# iOS
ionic cordova build ios --release --prod
```

## Ejecutar en Dispositivo

### Android

```bash
# Con live reload
ionic cordova run android --livereload

# Sin live reload
ionic cordova run android

# En un dispositivo específico
ionic cordova run android --target=DEVICE_ID
```

### iOS

```bash
ionic cordova run ios
```

### Ver dispositivos disponibles

```bash
adb devices  # Para Android
```

## Abrir en Android Studio

1. Compilar el proyecto primero:

```bash
ionic cordova build android
```

2. Abrir Android Studio y seleccionar:

```
File → Open → Todo-List-Ionic/platforms/android
```

3. Ejecutar desde Android Studio usando el botón Run o Shift + F10

## Estructura del Proyecto

```
src/
├── app/
│   ├── features/              # Features modulares
│   │   └── home/
│   │       ├── core/          # Lógica de negocio
│   │       ├── data/          # Repositorios e implementaciones
│   │       └── presentation/  # UI y componentes
│   │           ├── features-home.module.ts
│   │           ├── features-home-routing.module.ts
│   │           └── pages/
│   └── shared/                # Código compartido
│       └── providers/
│           └── translate.provider.ts
├── assets/
│   └── i18n/                  # Traducciones por feature
│       └── home/
│           └── es-CO.json
├── environments/              # Configuraciones de entorno
└── theme/                     # Estilos globales
```

## Arquitectura

El proyecto sigue los principios de **Arquitectura Limpia** y **SOLID**:

- **Features modulares**: Cada feature tiene su propia estructura (core, data, presentation)
- **Path aliases**: Uso de `@shared/*` y `@features/*` para imports limpios
- **i18n por feature**: Sistema de traducciones modular con `TranslateProvider`
- **Configuración por página**: Archivos `.config.ts` con constantes inmutables
- **Componentes standalone**: Uso de componentes standalone de Angular 19

## Tecnologías

- **Ionic 8**
- **Angular 19**
- **Cordova 11**
- **TypeScript 5.6**
- **RxJS 7.8**

## Comandos Útiles

```bash
# Desarrollo
npm start                                    # Servidor de desarrollo
npm run build                                # Build de producción
npm test                                     # Ejecutar tests

# Cordova
ionic cordova platform add android           # Agregar plataforma Android
ionic cordova platform add ios               # Agregar plataforma iOS
ionic cordova plugin add [plugin-name]       # Agregar plugin
ionic cordova resources                      # Generar iconos y splash screens

# Debugging
adb logcat                                   # Ver logs de Android
ionic cordova run android --device --consolelogs  # Ver logs en consola
```

## Autor

Desarrollado como parte de una prueba técnica para desarrollador mobile.
