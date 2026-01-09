/**
 * Normaliza una fecha eliminando las horas, minutos, segundos y milisegundos
 * @param date Fecha a normalizar
 * @returns Nueva fecha con hora 00:00:00.000
 */
export function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Verifica si una fecha está vencida (es anterior al día de hoy)
 * @param dueDate Fecha a verificar
 * @returns true si la fecha es anterior a hoy, false en caso contrario
 */
export function isDateOverdue(dueDate: Date | null | undefined): boolean {
  if (!dueDate) return false;

  const today = normalizeDate(new Date());
  const date = normalizeDate(new Date(dueDate));

  return date < today;
}

/**
 * Verifica si una fecha es hoy
 * @param date Fecha a verificar
 * @returns true si la fecha es hoy, false en caso contrario
 */
export function isToday(date: Date | null | undefined): boolean {
  if (!date) return false;

  const today = normalizeDate(new Date());
  const checkDate = normalizeDate(new Date(date));

  return checkDate.getTime() === today.getTime();
}

/**
 * Verifica si una fecha es futura (posterior a hoy)
 * @param date Fecha a verificar
 * @returns true si la fecha es posterior a hoy, false en caso contrario
 */
export function isFutureDate(date: Date | null | undefined): boolean {
  if (!date) return false;

  const today = normalizeDate(new Date());
  const checkDate = normalizeDate(new Date(date));

  return checkDate > today;
}

/**
 * Obtiene la diferencia en días entre dos fechas
 * @param date1 Primera fecha
 * @param date2 Segunda fecha
 * @returns Número de días de diferencia
 */
export function getDaysDifference(date1: Date, date2: Date): number {
  const normalized1 = normalizeDate(new Date(date1));
  const normalized2 = normalizeDate(new Date(date2));

  const diffTime = normalized2.getTime() - normalized1.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
