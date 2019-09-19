export interface BajaDeActivo {
  id: number;
  fecha: string;
  comentario: string;
  facturaSerie: string;
  facturaFolio: string;
  fechaFactura: string;
  importeDeVenta: number;
  moiContable: number;
  depreciacionContable: number;
  remanenteContable: number;
  utilidadContable: number;
  moiFiscal: number;
  depreciacionAcumuladaFiscal: number;
  remanenteFiscal: number;
  inpcMedioUso: number;
  inpc: number;
  factor: number;
  costoActualizadoFiscal: number;
  utilidadFiscal: number;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}
