import { Component } from '@angular/core';
import { PeticionesService } from 'src/app/service/peticiones.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  name_usuario: string

  constructor(private peticionesService: PeticionesService) {
    this.getResgistrado();


  }

  getResgistrado() {
    this.peticionesService.getRegistrado().subscribe(data => {


      this.name_usuario = data.name+' '+data.apellidos;
      


    });
  }

}
