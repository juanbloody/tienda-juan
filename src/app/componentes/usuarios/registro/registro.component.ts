import { Component } from '@angular/core';
import { PeticionesService } from 'src/app/service/peticiones.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  display_form: boolean;
  id: number;
  nombre: string;
  apellido: string;
  password: string;
  usuarios: any[];
  constructor(private peticionesService: PeticionesService) {
    
    this.getUsuarios();
  }

  getUsuarios() {

    this.peticionesService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      
      
    }, error => {
      //console.log(<any>error);

      
    });

  }

  save() {


    let usuario = { id: this.id, name: this.nombre, apellidos: this.apellido, password: this.password }

    if (this.id) {

      this.peticionesService.updateUsuario(usuario).subscribe(data => {
        
        alert('usuario editado con exito');
        this.getUsuarios();
        this.nombre = '';
        this.apellido = '';
        this.password = '';
      }, error => {
        console.log(<any>error);

        alert('error al editar usuario');
      });

    } else {
      this.peticionesService.addUsuario(usuario).subscribe(data => {
        alert('usuario guardado con exito');
        this.getUsuarios();
        this.nombre = '';
        this.apellido = '';
        this.password = '';

      }, error => {
        //console.log(<any>error);

        alert('error al guardar usuario');
      });
    }


  }

  editar(usuario: { id: number, name: string, apellidos: string, created_at: string, updated_at: string }) {
    this.id = usuario.id;
    this.nombre = usuario.name;
    this.apellido = usuario.apellidos;
    this.FormAction('editar');
  }



  FormAction(acccion: string) {
    if (acccion == 'agregar') {
      this.display_form = true;

      if (this.id) {
        this.nombre = '';
        this.apellido = '';
        this.id = 0;
      }

    }

    if (acccion == 'cerrar') {
      this.display_form = false

    }

    if (acccion == 'editar') {
      this.display_form = true

    }

  }

  destroy(id: number) {

    let borrar = confirm("¿borrar usuario?");

    if (borrar) {
      this.peticionesService.destroyUsuario(id).subscribe(
        Response => {


          alert(Response.message);
          this.getUsuarios();

        },
        error => {
          //console.log(<any>error);
          alert('error al borrar')
        }

      );
    };

  }
}
