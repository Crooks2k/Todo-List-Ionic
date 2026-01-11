import { ReleaseNote } from '@app/config/core/domain/entities/release-note.entity';

export const DEFAULT_RELEASE_NOTES: ReleaseNote[] = [
  {
    version: '1.2.0',
    date: '2026-01-11',
    title: 'Integración con Firebase Remote Config',
    description:
      'Implementación completa de Firebase Remote Config siguiendo Clean Architecture para gestión dinámica de configuraciones',
    features: [
      'Firebase Remote Config con arquitectura limpia',
      'Modo de mantenimiento configurable desde Firebase',
      'Release notes dinámicas desde la nube',
      'Sistema de feature flags preparado para futuras funcionalidades',
    ],
    improvements: [
      'Arquitectura SOLID y DRY en toda la implementación',
      'Organización por capas: domain, data, presentation',
      'Constantes centralizadas para evitar magic strings',
      'Manejo robusto de errores con fallbacks',
    ],
    fixes: [
      'Corrección de warnings de Zone en AngularFire',
      'Solución de problemas de cache en Remote Config',
      'Optimización del contexto de inyección de dependencias',
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-10',
    title: 'Mejoras en arquitectura y UI',
    description:
      'Refactorización completa siguiendo principios de Clean Architecture y mejoras visuales',
    features: [
      'Modal de mantenimiento con diseño profesional',
      'Animaciones suaves (slideUp, float, heartbeat)',
      'Sistema de configuración por entornos',
    ],
    improvements: [
      'Separación de responsabilidades en capas',
      'Uso de interactors para lógica de negocio',
      'Repositorios abstractos para flexibilidad',
      'Datasources especializados por funcionalidad',
    ],
  },
  {
    version: '1.0.0',
    date: '2026-01-09',
    title: '🎉 Lanzamiento Inicial',
    description:
      'Primera versión de la aplicación Todo List con funcionalidades básicas',
    features: [
      'Crear y gestionar tareas',
      'Organizar tareas por categorías',
      'Filtrar tareas por estado',
      'Persistencia local de datos',
      'Interfaz intuitiva con Ionic',
      'Soporte para múltiples idiomas',
    ],
  },
];
