import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from 'src/app/service/peticiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario={
    name:'',
    password:''
  }

  constructor(private peticionesService: PeticionesService) {
   //this.bondo();
   //this.bondo2();
  }

  login(){
    
    
    this.peticionesService.login(this.usuario).subscribe(data => {
      
      localStorage.setItem('access_token', data.access_token);
      //window.location.href = 'http://192.168.0.111:4200/home';
      //window.location.href = 'http://localhost:4200/home';
      
      window.location.href = 'https://tienda-carlos.netlify.app/home';
    }, error => {
      //console.log(<any>error);

      alert('error al ingresar');
      console.log(error);
    });
  }

  bondo(){
    this.peticionesService.bondo().subscribe(data => {
      
     console.log(data);
      

    }, error => {
      //console.log(<any>error);

     
      console.log(error);
    });
  }

  bondo2(){
    this.peticionesService.getUsuarios().subscribe(data => {
      
      console.log(data,'get');
       
 
     }, error => {
       //console.log(<any>error);
 
      
       console.log(error);
     });
  }
}


