import {
  EjercicioMes,
  buildCurrentPeriodo
} from '../../../models/ejercicio-mes';
import * as fromActions from '../actions/ui-context.actions';

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
  periodo: { ejercicio: 2018, mes: 11 }, // buildCurrentPeriodo(),
  grupos: [
    new Grupo('INGRESO', 'Ingreso', 'Pólizas de ingresos', [
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
      new Grupo('DEPOSITOS_TESORERIA', 'Depositos', 'Depositos de tesorería')
    ]),
    new Grupo('EGRESO', 'Egreso', 'Pólizas de egresos', [
      new Grupo('CHEQUE', 'Cheques', 'Pagos con cheque'),
      new Grupo('TRANSFERENCIA', 'Transferencias', 'Pagos con transferencia'),
      new Grupo('TARJETA', 'Tarjeta', 'Pagos con tarjeta')
    ]),
    new Grupo('DIARIO', 'Diario', 'Pólizas de diario', [
      new Grupo('VENTAS', 'Ventas', 'Pólizas de ventas'),
      new Grupo('CARGOS', 'Cargos diversos', 'Pólizas de notas de cargo'),
      new Grupo('NOTAS_DE_CREDITO', 'Notas de crédito', ''),
      new Grupo('ANTICIPOS', 'Anticipos', ''),
      new Grupo('COMPRAS', 'Compras', ''),
      new Grupo('DESCUENTOS_COMPRAS', 'Descuentos en compras', ''),
      new Grupo('INVENTARIOS', 'Inventarios', ''),
      new Grupo('ACTIVO_FIJO', 'Activo fijo', ''),
      new Grupo('CHEQUES_EN_TRANSITO', 'Cheques en transito', ''),
      new Grupo('DEPOSITOS_EN_TRANSITO', 'Depósitos en tránsito', ''),
      new Grupo('TESORERIA', 'Tesorería', ''),
      new Grupo('PROVISION_DE_GASTOS', 'Provisión de gastos', ''),
      new Grupo('PROVISION_DE_CARGA_SOCIAL', 'Provisión de carga social', ''),
      new Grupo('CIERRE_ANUAL', 'Cierre anual', '')
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
