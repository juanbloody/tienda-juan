import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PeticionesService } from 'src/app/service/peticiones.service';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent {
  productos: any[];
  display: boolean;
  producto_guardado: any;
  form: FormGroup;
  id: number;
  codigo: number | string;
  nombre: string;
  valor: number;
  cantidad: number;
  total: number;
  quedaron: number;
  valor_quedaron: number;
  valor_provedor: number;
  valor_unitario: number;
  observaciones: string;
  totalget: number;
  producto: Producto;
  buscar: string
  p: number = 1;

  constructor(private peticionesService: PeticionesService) {

    this.getProductos();

    this.buildForm();

  }

  getProductos() {

    this.peticionesService.getproductos().subscribe(data => {

      let disponibles = data.filter((producto: {observaciones: string; }) => {

       return producto.observaciones != 'xx';

      });

      this.productos = disponibles;


    });
  }

  getProducto(id: number) {

    this.peticionesService.getproducto(id).subscribe(data => {

      this.ValorVariables(data);


    });
  }


  private buildForm() {

    //dar valor a los imput 
    this.form = new FormGroup({

      codigo: new FormControl(this.codigo),
      nombre: new FormControl(this.nombre),
      valor: new FormControl(this.valor),
      cantidad: new FormControl(this.cantidad),
      total: new FormControl(this.total),
      quedaron: new FormControl(this.quedaron),
      valor_provedor: new FormControl(this.valor_provedor),
      valor_unitario: new FormControl(this.valor_unitario),
      observaciones: new FormControl(this.observaciones)



    });

  }

  save(event: Event) {

    event.preventDefault;

    this.operaciones();

    this.producto = {
      id: this.id,
      codigo: this.codigo,
      nombre: this.nombre,
      valor: this.valor,
      cantidad: this.cantidad,
      total: this.total,
      quedaron: this.cantidad,
      valor_quedaron: this.valor_quedaron,
      valor_provedor: this.valor_provedor,
      valor_unitario: this.valor_unitario,
      observaciones: this.observaciones

    }

    if (this.id) {

      this.peticionesService.getproducto(this.id).subscribe(data => {

        if (data.cantidad == this.cantidad && data.valor == this.valor && data.quedaron==this.quedaron) {
          this.producto.quedaron = data.quedaron;
          this.producto.valor_quedaron = data.valor_quedaron;

        } else if (data.cantidad == this.cantidad && data.valor != this.valor) {
          this.producto.quedaron = data.quedaron;
          this.producto.valor_quedaron = this.valor * this.producto.quedaron;
          this.producto.cantidad = data.quedaron;
          this.producto.total = this.producto.valor_quedaron
        }

        this.update();

      });

    } else {
      this.addProducto();
    }

  }

  addProducto() {

    this.peticionesService.addProducto(this.producto).subscribe(
      Response => {

        //console.log(Response);
        alert(Response.message);
        this.getProductos();
        this.form.reset();


      },
      error => {
        // console.log(<any>error);
        alert('error al guardar : todos los campos son requeridos excepto codigo y observaciones, campo codigo debe ser unico ')
      }

    );
  }

  update() {

    this.peticionesService.updateProducto(this.producto).subscribe(
      Response => {


        alert(Response.message);
        this.getProductos();
        this.form.reset();


      },
      error => {
        //console.log(<any>error);
        alert('error al editar : todos los campos son requeridos excepto codigo y observaciones, campo codigo debe ser unico ')
      }

    );
  }

  ValorVariables(data?: Producto) {

    // dar  valor a las vaiables

    if (data) {
      this.codigo = data.codigo;
      this.nombre = data.nombre;
      this.valor = data.valor;
      this.cantidad = data.cantidad;
      this.total = data.total;
      this.quedaron=data.quedaron;
      this.valor_provedor = data.valor_provedor;
      this.valor_unitario = data.valor_unitario;
      this.observaciones = data.observaciones;

      this.buildForm();

    } else {

      this.codigo = this.form.value.codigo;
      this.nombre = this.form.value.nombre;
      this.valor = this.form.value.valor;
      this.cantidad = this.form.value.cantidad;
      this.quedaron= this.form.value.quedaron;
      this.valor_provedor = this.form.value.valor_provedor;
      this.observaciones = this.form.value.observaciones;
    }


  }

  operaciones() {

    this.ValorVariables();

    //operaciones

    this.total = this.valor * this.cantidad;
    this.valor_quedaron = this.valor * this.cantidad;
    this.valor_unitario = this.valor_provedor / this.cantidad;



    this.buildForm();

  }

  FormAction(acccion: string, id?: number) {
    if (acccion == 'agregar') {
      this.display = true
      this.id = 0;


    }
    if (acccion == 'cerrar') {
      this.display = false
      this.form.reset();
    }

    if (acccion == 'editar') {
      this.display = true

      if (id !== undefined) {
        this.id = id;
        this.getProducto(this.id);

      }
    }

  }

  destroy(id: number) {

    let borrar = confirm("¿borrar producto?");

    if (borrar) {
      this.peticionesService.destroy(id).subscribe(
        Response => {

          //console.log(Response);
          alert(Response.message)
          this.getProductos();

        },
        error => {
          //console.log(<any>error);
          alert('error al borrar')
        }

      );
    };

  }

  search() {
    console.log(typeof this.buscar);
    switch (this.buscar) {

      case "agotados":
        this.filtrar('agotados')
        break;

      case "xx":
       this.filtrar('xx');
        break;

      default:
        
        this.peticionesService.searchProducto(this.buscar).subscribe(data => {
    
          this.productos = data;
  
        },error => {
          // console.log(<any>error);
          this.getProductos();
        });
    }

  }

  filtrar(filtrar: string) {
    console.log(filtrar);
    this.peticionesService.getproductos().subscribe(data => {

      let agotados = data.filter((producto: { quedaron: number; observaciones: string; }) => {

        if (filtrar === 'agotados') {
          return producto.quedaron <= 3 && producto.observaciones != 'xx';
        } else {
          return producto.observaciones === 'xx';
        }


      });

      this.productos = agotados;

    });
  }

}
