import { CuentaContable } from 'app/cuentas/models';

export interface Balanza {
  id: number;
  ejercicio: number;
  mes: number;
  tipo: string;
  fileName: string;
  acuse: boolean;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}
