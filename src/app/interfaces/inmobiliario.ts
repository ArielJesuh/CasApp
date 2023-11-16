export interface Inmobiliario{
  id?: number;
  direccion: string;
  cantidad_habitaciones: number;
  cantidad_banos: number;
  metros_cuadrados: number;
  valor_uf: number;
  descripcion: string;
  url_imagen: string;
  comuna_id_comuna: number;
  inmobiliario_id_inmobiliario: number;
  inmobiliario: {
      id: number;
      nombre: string;
      usuario_id_usuario: number;
  };
}
