export interface Catalogo {
  id: number;
  ejercicio: number;
  mes: number;
  rfc: string;
  emisor: string;
  fileName?: string;
  dateCreated?: string;
  lastUpdated?: string;
  createUser?: string;
  updateUser?: string;
}
