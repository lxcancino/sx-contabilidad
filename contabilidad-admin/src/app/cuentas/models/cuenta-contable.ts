import { CuentaSat } from './cuenta-sat';

export interface CuentaContable {
  id: number;
  clave: string;
  descripcion: string;
  tipo: string;
  padre?: Partial<CuentaContable>;
  nivel: number;
  subTipo: string;
  cuentaSat: Partial<CuentaSat>;
  detalle: boolean;
  deResultado: boolean;
  naturaleza: string;
  presentacionContable: boolean;
  presentacionFiscal: boolean;
  presentacionFinanciera: boolean;
  presentacionPresupuestal: boolean;
  suspendida: boolean;
  subcuentas: Partial<CuentaContable>[];
  dateCreated: string;
  lastUpdated: string;
}
