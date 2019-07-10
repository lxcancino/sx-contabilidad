import { CuentaContable } from 'app/cuentas/models';

export interface PagoIsr {
  id: number;
  ejercicio: number;
  mes: number;
  concepto: string;
  cuenta?: Partial<CuentaContable>;
  clave?: string;
  importe: number;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}

export class PagoIsrRow {
  public enero = 0.0;
  public febrero = 0.0;
  public marzo = 0.0;
  public abril = 0.0;
  public mayo = 0.0;
  public junio = 0.0;
  public julio = 0.0;
  public agosto = 0.0;
  public septiembre = 0.0;
  public octubre = 0.0;
  public noviembre = 0.0;
  public diciembre = 0.0;
  constructor(public concepto: string, public clave: string) {}
  // constructor(public payload: { periodo: EjercicioMes }) {}
}

export function buildPagoIsrRows(): PagoIsrRow[] {
  return [
    new PagoIsrRow('VENTAS', '402'),
    new PagoIsrRow('PRODUCTOS FINANCIEROS', '702'),
    new PagoIsrRow('OTROS INGRESOS', '704'),
    new PagoIsrRow('UTILIDAD FISCAL EN VENTA DE ACTIVO FIJO', '402'),
    new PagoIsrRow('VENTA INMUEBLE', '999'),
    new PagoIsrRow('ANTICIPO CLIENTES', '206')
  ];
}
