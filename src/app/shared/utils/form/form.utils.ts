import { AbstractControl } from '@angular/forms';

/**
 * Verifica si un control de formulario es inválido y ha sido tocado
 * @param control Control del formulario a verificar
 * @returns true si el control es inválido y ha sido tocado
 */
export function isControlInvalid(control: AbstractControl | null): boolean {
  return !!(control?.invalid && control?.touched);
}

/**
 * Verifica si un control de formulario es válido
 * @param control Control del formulario a verificar
 * @returns true si el control es válido
 */
export function isControlValid(control: AbstractControl | null): boolean {
  return !!control?.valid;
}

/**
 * Verifica si un control de formulario tiene un error específico
 * @param control Control del formulario a verificar
 * @param errorKey Clave del error a buscar
 * @returns true si el control tiene el error especificado
 */
export function hasControlError(
  control: AbstractControl | null,
  errorKey: string
): boolean {
  return !!(control?.hasError(errorKey) && control?.touched);
}

/**
 * Obtiene el mensaje de error de un control
 * @param control Control del formulario
 * @param errorMessages Objeto con los mensajes de error por clave
 * @returns Mensaje de error o cadena vacía
 */
export function getControlErrorMessage(
  control: AbstractControl | null,
  errorMessages: Record<string, string>
): string {
  if (!control?.errors || !control?.touched) return '';

  const errorKey = Object.keys(control.errors)[0];
  return errorMessages[errorKey] || '';
}
