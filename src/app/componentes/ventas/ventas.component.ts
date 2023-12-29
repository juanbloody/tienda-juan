import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ventadetalle } from 'src/app/models/venta';
import { PeticionesService } from 'src/app/service/peticiones.service';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  display_form: boolean;
  display_opciones: boolean;
  ventas: any[];
  productos: any[];
  producto: Producto;
  buscarproducto: string;
  fecha: string;
  fecha2: string
  titulo: string = 'seleccione producto';
  unidad: number;
  recibido: number;
  ventasArray: ventadetalle[] = [];
  totalventa: number;
  valor_ganado: number;
  total_ventas: number;
  total_ganado: number;
  errores: string[] = [];
  p: number = 1;



  constructor(private peticionesService: PeticionesService) {

    this.fecha = this.obtenerFechaActualEnFormato();
    this.getVentas();
    this.getProductos();

  }

  formatearFecha(date: string) {
    let fecha = new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      //second: '2-digit',
      //timeZoneName: 'short'
    });

    return fecha;
  }

  obtenerFechaActualEnFormato() {
    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');

    const fechaEnFormato = `${anio}-${mes}-${dia}`;
    return fechaEnFormato;
  }

  getVentas() {

    this.peticionesService.getVentas().subscribe(data => {
      this.ventas = data;


    });

  }

  search() {
    this.peticionesService.buscarVentas(this.fecha, this.fecha2).subscribe(data => {
      this.ventas = data;
      if (this.ventas.length == 0) {
        alert('no hay ventas')
      } else {
        this.suma_total_ganado(data);
      }

    });
  }

  suma_total_ganado(data: []) {

    let total_ventas = 0
    let total_ganado = 0

    data.forEach((element: any) => {
      total_ganado += element.ganado;
      total_ventas += element.costo;
    });
    this.total_ventas = total_ventas;
    this.total_ganado = total_ganado;

  }

  getProductos() {

    this.peticionesService.getproductos().subscribe(data => {

      let disponibles = data.filter((producto: { observaciones: string; }) => {

        return producto.observaciones != 'xx';

      });

      this.productos = disponibles;


    });
  }

  searchProducto() {

    if (this.buscarproducto) {
      this.peticionesService.searchProducto(this.buscarproducto).subscribe(data => {
        this.productos = data;

      });
    } else {
      this.getProductos();
    }


  }

  select(producto: Producto) {

    this.producto = producto;

    this.titulo = this.producto.nombre;

    this.opcionesAction();

  }

  agregar() {

    let total = this.producto.valor * this.unidad;

    //sumar valor ganado de un producto
    let valor_ganado = this.producto.valor - this.producto.valor_unitario
    let total_ganado = 0;
    for (let index = 1; index <= this.unidad; index++) {

      total_ganado += valor_ganado
    }

    let ventadetalle: ventadetalle = {
      venta_id: 0,
      producto_id: this.producto.id,
      producto_name: this.titulo,
      unidades: this.unidad,
      total: total,
      valor_ganado: total_ganado,
      producto: this.producto
    }

    this.ventasArray.push(ventadetalle);

    this.sumatotal();
    this.sumaTotalGanado();

  }

  sumatotal() {

    let totalVenta = 0;

    this.ventasArray.forEach(element => {
      totalVenta += element.total

    });
    this.totalventa = totalVenta
  }

  sumaTotalGanado() {
    let total_ganado = 0;

    this.ventasArray.forEach(element => {
      total_ganado += element.valor_ganado

    });
    this.valor_ganado = total_ganado;
  }

  save() {

    if (this.filtrar().length === 0) {

      let venta = {
        costo: this.totalventa,
        ganado: this.valor_ganado,
      }

      this.peticionesService.addventa(venta).subscribe(data => {

        this.saveVentaDellate(data.venta.id);


      }, error => {
        //console.log(<any>error);

        alert('error al guardar venta');
      });



    } else {

      this.filtrar().forEach(Element => {
        alert(Element.producto_name + ' : error unidades superan a cantidad disponible');
      })
    }


  }

  saveVentaDellate(venta_id: number) {

    this.ventasArray.forEach((element, index) => {

      element.venta_id = venta_id;

    });

    this.peticionesService.addVentaDetalle({ array: this.ventasArray }).subscribe(data => {

      this.editarProducto();

      this.getVentas();

    }, error => {
      //console.log(<any>error);
      alert('error al guardar venta');

      localStorage.setItem("error_venta" + venta_id, venta_id.toString());
      this.getVentas();
    });


  }

  editarProducto() {

    //restar a quedaron producto


    this.ventasArray.forEach(ventadetalle => {

      let quedaron = ventadetalle.producto.quedaron - ventadetalle.unidades

      let valor_quedaron = quedaron * ventadetalle.producto.valor;

      ventadetalle.producto.quedaron = quedaron;
      ventadetalle.producto.valor_quedaron = valor_quedaron;
    });


    this.peticionesService.updateProducto2({ array: this.ventasArray }).subscribe(Response => {

      alert('venta guardada con exito');

      this.titulo = 'seleccione producto';
      this.unidad = 0;
      this.ventasArray = [];
    }, error => {
      //console.log(<any>error);
      alert('error al guardar venta: verificar productos afectados');

      localStorage.setItem("error_venta" + this.ventasArray[0].venta_id, this.ventasArray[0].venta_id.toString());
      this.getVentas();
    }
    );

  }

  getLocalStorage(id: number) {

    return localStorage.getItem("error_venta" + id);

  }

  filtrar(): ventadetalle[] {

    //verificar que las unidades no superen a quedaron

    let noCumplenCondicion: ventadetalle[] = [];

    this.ventasArray.forEach(Element => {

      if (Element.unidades > Element.producto.quedaron) {
        noCumplenCondicion.push(Element);
      }

    });

    return noCumplenCondicion;

  }

  cambio() {

    return this.recibido - this.totalventa;


  }

  accion(index: number) {
    this.ventasArray.splice(index, 1);
    this.sumatotal();
    this.sumaTotalGanado();
  }

  cancelar() {
    this.ventasArray = [];
  }

  FormAction(acccion: string) {
    if (acccion == 'generar') {
      this.display_form = true

    }
    if (acccion == 'cerrar') {
      this.display_form = false
      //this.form.reset();
    }

  }

  opcionesAction() {
    if (this.display_opciones) {
      this.display_opciones = false
    } else {
      this.display_opciones = true;
    }
  }

  destroy(id: number) {

    let borrar = confirm("¿borrar producto?");

    if (borrar) {
      this.peticionesService.destroyventa(id).subscribe(
        Response => {


          alert(Response.message);

          localStorage.removeItem("error_venta" + id);
          this.getVentas();

        },
        error => {
          //console.log(<any>error);
          alert('error al borrar')
        }

      );
    };


  }
}