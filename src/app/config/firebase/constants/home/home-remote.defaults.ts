import { MaintenanceMode } from '@app/config/core/domain/entities/maintenance-mode.entity';

export const DEFAULT_MAINTENANCE_MODE: MaintenanceMode = {
  enabled: false,
  title: 'Modo de mantenimiento',
  message: 'La aplicación está temporalmente en mantenimiento.',
  startDate: '2026-01-01T00:00:00Z',
  endDate: '2026-01-01T01:00:00Z',
  icon: 'hammer-outline',
};
