export interface Vivienda {
    id?: number;
    direccion: string;
    cantidad_habitaciones: number;
    cantidad_banos: number;
    metros_cuadrados: number;
    valor_uf: number;
    descripcion: string;
    comuna_id_comuna: number;
    inmobiliario_id_inmobiliario: number;
  }