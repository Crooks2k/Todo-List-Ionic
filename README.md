# Todo List Ionic - Prueba Técnica

Aplicación de gestión de tareas desarrollada con **Ionic**, **Angular** y **Cordova**.

## Requisitos

- Node.js (v18 o superior)
- npm (v10 o superior)
- Ionic CLI (v6 o superior)
- Cordova (v11 o superior)
- Android Studio (para compilar Android)
- Xcode (para compilar iOS - solo macOS)

## Instalación

```bash
npm install
```

## Ejecución en Desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:8100`

## Compilación

### Android

```bash
ionic cordova build android
```

### iOS

```bash
ionic cordova build ios
```

## Ejecutar en Dispositivo

### Android

```bash
ionic cordova run android
```

### iOS

```bash
ionic cordova run ios
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── presentation/
│   │   └── pages/
│   │       └── home/
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
├── assets/
├── environments/
└── theme/
```

## Tecnologías

- **Ionic 8**
- **Angular 19**
- **Cordova 11**
- **TypeScript 5.6**

## Autor

Desarrollado como parte de una prueba técnica para desarrollador mobile.
