import { Concepto } from "./concepto.interface"

export interface Cotizacion {
    idCotizacion: number
    fecha: string
    total: number
    idAsegurado: number
    idVehiculo: number
    idAseguradora: number
    prima_neta: number
    descuento: number
    prima_modulos: number
    recargo_fraccionamiento: number
    reduccion_autorizada: number
    derecho_poliza: number
    iva: number
    conceptos: Concepto[],
    nombre_asegurado: string
  }