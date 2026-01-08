import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateProvider {
  private translations: { [key: string]: any } = {};
  private currentModule: string = '';
  private readonly defaultLanguage = 'es-CO';

  constructor(private http: HttpClient) {}

  /**
   * Carga el módulo de traducciones desde assets/i18n/{moduleKey}/{language}.json
   * @param moduleKey - Nombre del módulo (feature) a cargar
   * @param language - Idioma a cargar (por defecto es-CO)
   */
  async loadModule(
    moduleKey: string,
    language: string = this.defaultLanguage
  ): Promise<void> {
    if (this.translations[moduleKey]) {
      this.currentModule = moduleKey;
      return;
    }

    try {
      const path = `assets/i18n/${moduleKey}/${language}.json`;
      const translations = await firstValueFrom(this.http.get(path));
      this.translations[moduleKey] = translations;
      this.currentModule = moduleKey;
    } catch (error) {
      console.error(
        `Error loading translations for module: ${moduleKey}`,
        error
      );
      this.translations[moduleKey] = {};
    }
  }

  /**
   * Obtiene una traducción usando notación de punto
   * @param key - Clave de la traducción (ej: 'home.title')
   * @param params - Parámetros opcionales para interpolación
   * @returns Traducción o la clave si no se encuentra
   */
  get(key: string, params?: { [key: string]: string | number }): string {
    const keys = key.split('.');
    let translation: any = this.translations[this.currentModule];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
    }

    if (typeof translation !== 'string') {
      console.warn(`Translation for key ${key} is not a string`);
      return key;
    }

    // Interpolación de parámetros
    if (params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(
          `{{${param}}}`,
          String(params[param])
        );
      });
    }

    return translation;
  }

  /**
   * Obtiene un objeto completo de traducciones
   * @param key - Clave del objeto (ej: 'home')
   * @returns Objeto con todas las traducciones
   */
  getObject(key: string): any {
    const keys = key.split('.');
    let translation: any = this.translations[this.currentModule];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation object not found for key: ${key}`);
        return {};
      }
    }

    return translation;
  }

  /**
   * Limpia las traducciones cargadas
   */
  clear(): void {
    this.translations = {};
    this.currentModule = '';
  }
}
