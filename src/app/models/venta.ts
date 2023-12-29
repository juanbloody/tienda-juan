import { Producto } from "./producto";

export interface ventadetalle {
    venta_id:number,
    producto_id:number,
    producto_name: string,
    unidades: number,
    total: number,
    valor_ganado:number
    producto:Producto
    
}