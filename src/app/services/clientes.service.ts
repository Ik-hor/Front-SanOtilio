import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public url: string;//declaramos la url publica a usar para todas las peticiones

  constructor(public _http: HttpClient) { this.url = global.url; }
  getAllClientes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this._http.get(this.url+'clientes/index', {headers:headers} );
  }
 getTipocliente():Observable<any> {
  let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
  return this._http.get(this.url+'clientes/indexTipocliente', {headers:headers} );
 }
 postCliente(cliente:any,cdireccion:any):Observable<any>{
  let json = JSON.stringify(cliente+cdireccion);
  let params = 'json='+json;
  let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');//mandamos el json con las cabeceras para que obtengamos el token
  return this._http.post(this.url+'clientes/register',params, {headers:headers} );
 }
}
