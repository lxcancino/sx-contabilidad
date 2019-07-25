import {
  EjercicioMes,
  loadEjercicioMesFromStorage
} from '../../../models/ejercicio-mes';
import * as fromActions from '../actions/ui-context.actions';

export const POLIZAS_STORAGE_KEY = 'contabilidad.polizas.periodo';

export class Grupo {
  constructor(
    public tipo: string,
    public label: string,
    public desc: string,
    public subtipos?: Grupo[]
  ) {}
}

export interface State {
  periodo: EjercicioMes;
  grupos: Grupo[];
}

export const initialState: State = {
  periodo: loadEjercicioMesFromStorage(POLIZAS_STORAGE_KEY),
  grupos: [
    new Grupo('INGRESO', 'Ingreso', 'Pólizas de ingresos', [
      new Grupo('INGRESOS_CON', 'Ingresos CON', 'Contado'),
      new Grupo('COBRANZA_CON', 'Cobranza CON', 'Contado'),
      new Grupo('COBRANZA_COD', 'Cobranza COD', 'Contra entrega (COD)'),
      new Grupo('COBRANZA_CRE', 'Cobranza CRE', 'Crédito'),
      new Grupo('COBRANZA_CHE', 'Cobranza CHE', 'Cheque devuelto'),
      new Grupo('COBRANZA_JUR', 'Cobranza JUR', 'Trámite jurídico'),
      new Grupo(
        'INTERESES_PRESTAMO_CHOFERES',
        'Intereses prestamos ',
        'Prestamos choferes'
      ),
    ]),
    new Grupo('EGRESO', 'Egreso', 'Pólizas de egresos', [
      new Grupo('CHEQUE', 'Cheques', 'Pagos con cheque'),
      new Grupo('TRANSFERENCIA', 'Transferencias', 'Pagos con transferencia'),
      new Grupo('COMISIONES_TARJETA', 'Comisiones Tarjeta', 'Comisiones')
    ]),
    new Grupo('DIARIO', 'Diario', 'Pólizas de diario', [
      new Grupo('VENTAS_CON', 'Ventas CON', 'Contado'),
      new Grupo('VENTAS_COD', 'Ventas COD', 'Contra entrega'),
      new Grupo('VENTAS_CRE', 'Ventas CRE', 'Crédito'),
      new Grupo('VENTAS_ACF', 'Ventas ACF', 'Activo Fijo'),
      new Grupo('VENTAS_OTR', 'Ventas OTR', 'Otros'),
      new Grupo(
        'NOTAS_DE_CARGO',
        'Notas de cargos',
        'Pólizas de notas de cargo'
      ),
      new Grupo('TRASPASOS_CXC', 'Traspasos de CxC', 'Traspaso de CxC'),

      new Grupo('NOTAS_DE_CREDITO_DEV', 'Devoluciones', ''),
      new Grupo('NOTAS_DE_CREDITO_BON', 'Bonificaciones', ''),
      new Grupo('ANTICIPOS', 'Anticipos', ''),
      new Grupo('COMPRAS', 'Compras', ''),
      new Grupo(
        'DESCUENTOS_COMPRAS',
        'Descuentos en compras',
        'Notas de credito CXP'
      ),
      new Grupo('INVENTARIOS', 'Inventarios', ''),
      new Grupo('ACTIVO_FIJO', 'Activo fijo', ''),
      new Grupo('CHEQUES_EN_TRANSITO', 'Cheques en transito', ''),
      new Grupo('DEPOSITOS_EN_TRANSITO', 'Depósitos en tránsito', ''),
      new Grupo('TESORERIA', 'Tesorería', ''),
      new Grupo('DEPOSITOS_TESORERIA', 'Depositos', 'Depositos de tesorería'),
      new Grupo('PROVISION_DE_GASTOS', 'Provisión de gastos', ''),
      new Grupo('PROVISION_DE_REMBOLSO', 'Provisión de rembolso', ''),
      new Grupo('PROVISION_DE_FLETES', 'Provisión de fletes', ''),
      new Grupo('PROVISION_DE_SEGUROS', 'Provisión de seguros', ''),
      new Grupo('COMISIONES_BANCARIA_GASTO', 'Comisiones bancarias gasto', ''),
      new Grupo('PROVISION_NOMINA', 'Provisión de nómina', ''),
      new Grupo('PROVISION_DE_CARGA_SOCIAL', 'Provisión de carga social', ''),
      new Grupo('VARIACION_CAMBIARIA', 'Variacion Cambiaria', ''),
      new Grupo('IMPUESTOS_SOBRE_NOMINA', 'Impuesto Sobre Nomina', ''),
      new Grupo('TRASPASO_IVA', 'Traspaso Iva', ''),
      new Grupo('CIERRE_ANUAL', 'Cierre anual', ''),
      new Grupo('CIERRE_MENSUAL', 'Cierre Mensual', ''),
    ])
  ]
};

export function reducer(
  state = initialState,
  action: fromActions.UIContextActions
): State {
  switch (action.type) {
    case fromActions.UIContextActionTypes.SetPeriodoDePoliza: {
      return {
        ...state,
        periodo: action.payload.periodo
      };
    }
  }
  return state;
}

export const getGrupos = (state: State) => state.grupos;
export const getPeriodo = (state: State) => state.periodo;
