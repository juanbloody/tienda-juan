import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  //private urlApi = 'http://192.168.0.111/proyecto-completo/tienda-de-juan/public/api/'
  //private urlApi = 'http://tienda-juan.com/api/'
  private urlApi = '/api/'

  constructor(private http: HttpClient) { }

  public getproductos():Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.urlApi + 'productos', { headers: headers });
   // return this.http.get<any>(this.urlApi + 'productos');
  }

  public bondo():Observable<any> {
    let headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.urlApi + "usuarios", '', { headers: headers })
   
  }
  public getproducto(id:number):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.urlApi + 'producto/mostrar/'+id, { headers: headers });
  }

  addProducto(producto: any): Observable<any> {
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.post(this.urlApi + "producto/guardar", params, { headers: headers })
  }

  public searchProducto(name:string):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.urlApi + 'producto/buscar/'+name , { headers: headers });
  }

  updateProducto(producto:any):Observable<any>{
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.put(this.urlApi + "producto/editar/"+producto.id, params, { headers: headers })
  }

  updateProducto2(producto:any):Observable<any>{
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.put(this.urlApi + "producto/editar2", params, { headers: headers })
  }

  destroy(id:number): Observable<any> {
    
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.delete(this.urlApi + "producto/borrar/"+id, { headers: headers })
  }

  /*ventas*/
 
  public getVentas():Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.urlApi + 'ventas', { headers: headers });
  }

  addventa(producto: any): Observable<any> {
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.post(this.urlApi + "venta/guardar", params, { headers: headers })
  }

  public buscarVentas(fecha:string,fecha2?:string):Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });

    if (fecha2) {
      return this.http.get<any>(this.urlApi + 'venta/buscar/'+fecha+'/'+fecha2, { headers: headers });
    }else{
      return this.http.get<any>(this.urlApi + 'venta/buscar/'+fecha, { headers: headers });
    
    }
    
  }

  destroyventa(id:number): Observable<any> {
     let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    
    return this.http.delete(this.urlApi + "venta/borrar/"+id, { headers: headers })
  }

  /*venta detalle*/

  addVentaDetalle(producto: any): Observable<any> {
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });

    return this.http.post(this.urlApi + "detalle/guardar", params, { headers: headers });
  }

  destroyventaDetalle(id:number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.delete(this.urlApi + "detalle/borrar/"+id,{ headers: headers })
  }

  //usuario

  public getUsuarios():Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.urlApi + 'usuarios',{ headers: headers });
  }

  public getRegistrado():Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.urlApi + 'usuario/mostrar',{ headers: headers });
  }

  addUsuario(usuario: any): Observable<any> {
    
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    
    return this.http.post(this.urlApi + "usuario/guardar", params, { headers: headers })
  }

  destroyUsuario(id:number): Observable<any> {

    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    
    return this.http.delete(this.urlApi + "usuario/borrar/"+id,{ headers: headers })
  }

  updateUsuario(usuario:any):Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.put(this.urlApi + "usuario/editar/"+usuario.id, params, { headers: headers })
  }

  login(usuario: any): Observable<any> {
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set("Content-type", "application/json");
    return this.http.post(this.urlApi + "usuario/login", params, { headers: headers })
  }

  logout(){

    let headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer '+localStorage.getItem("access_token")
    });
    return this.http.get<any>(this.urlApi + 'usuario/logout',{ headers: headers });
    
  }
  
}
