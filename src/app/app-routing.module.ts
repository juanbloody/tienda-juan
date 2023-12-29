import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './componentes/home/home.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component'; 
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { seccion_activa, verificar_token } from './guards/verificar_token.guards';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[verificar_token]},
  {path:"login",component:LoginComponent,canActivate:[seccion_activa]},
  {path:"home",component:HomeComponent,canActivate:[verificar_token]},
  {path:"productos",component:ProductosComponent,canActivate:[verificar_token]},
  {path:"ventas",component:VentasComponent,canActivate:[verificar_token]},
  {path:"usuarios",component:RegistroComponent,canActivate:[verificar_token]},
  {path:"**",component:HomeComponent,canActivate:[verificar_token]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
