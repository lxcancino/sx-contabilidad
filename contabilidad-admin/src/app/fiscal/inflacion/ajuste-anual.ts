import { CuentaContable } from 'app/cuentas/models';

export class AjusteAnual {
  cuenta?: Partial<CuentaContable>;
  concepto: string;
  grupo: string;
  subgrupo: string;
}
