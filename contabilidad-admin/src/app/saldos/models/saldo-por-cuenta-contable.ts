import { CuentaContable } from 'app/cuentas/models';

export interface SaldoPorCuentaContable {
  id: number;
  cuenta: Partial<CuentaContable>;
  clave: string;
  ejercicio: number;
  mes: number;
  debe: number;
  haber: number;
  saldoInicial: number;
  saldoFinal: number;
  cierre: string;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
