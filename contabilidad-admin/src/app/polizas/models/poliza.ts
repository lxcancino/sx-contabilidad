import { PolizaDet } from './poliza-det';

export interface Poliza {
  id: number;
  ejercicio: number;
  mes: number;
  tipo: string;
  folio: number;
  subtipo: string;
  fecha: string;
  concepto: string;
  debe: number;
  haber: number;
  manual: boolean;
  cierre?: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
  partidas: Partial<PolizaDet>[];
}

export interface PolizasFilter {
  ejercicio: number;
  mes: number;
  tipo: string;
  subtipo: string;
}

export const TIPOS = [{ tipo: '', subtipo: [''] }];
