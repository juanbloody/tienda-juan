import { Component } from '@angular/core';
import { verificar_token } from 'src/app/guards/verificar_token.guards';
import { PeticionesService } from 'src/app/service/peticiones.service';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  verificar_token:boolean;
  
  constructor(private peticionesService: PeticionesService) {
    this.verificar_token= verificar_token();
  }

  logout(){

    this.peticionesService.logout().subscribe(data => {
      window.location.reload();
    }, error => {
      //console.log(<any>error);

      alert('error cerrar sesion');
    });

    localStorage.removeItem("access_token");
    
  }
}
