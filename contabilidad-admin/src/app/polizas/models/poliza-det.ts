import { CuentaContable } from 'app/cuentas/models';

export interface PolizaDet {
  id: number;
  cuenta: CuentaContable;
  debe: number;
  haber: number;
  concepto: string;
  descripcion: string;
  asiento: string;
  referencia: string;
  referencia2: string;
  origen: string;
  entidad: string;
  documento: string;
  documentoTipo: string;
  documentoFecha: string;
  sucursal: string;
  dateCreated: string;
  lastUpdated: string;
  updateUser: string;
  createUser: string;
}
