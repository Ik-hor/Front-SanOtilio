import { Component, OnDestroy, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Router} from '@angular/router';
import { Banco } from 'src/app/models/banco';
import { BancoService } from 'src/app/services/banco.service';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proveedor-agregar',
  templateUrl: './proveedor-agregar.component.html',
  styleUrls: ['./proveedor-agregar.component.css'],
  providers:[ProveedorService,BancoService]  
})
export class ProveedorAgregarComponent implements OnInit, OnDestroy {

  public proveedor: Proveedor= new Proveedor(0,'','','','','','','','','','',0,0,1,'','','','','','','','','');//Modelo del proveedor
  public banco: Array<Banco> = [];//Array de modelos del objeto banco

  //subscripciones
  private registraProveedor: Subscription = new Subscription;
  private getBancoSub: Subscription = new Subscription;
  
  constructor(  private _proveedorService: ProveedorService, private _bancoService: BancoService,
                private _router: Router, public toastService: ToastService ) { }

  ngOnInit(): void {
    this.getBanco(); 

  }

  /**
   * Recibe la informacion del formulario
   * Y registra la informacion del formulario
   * @param form 
   */
  onSubmit(form:any){
    //console.log(this.proveedor);
    this.registraProveedor =  this._proveedorService.register(this.proveedor).subscribe(
       response =>{ 
         //console.log(response);
         this.toastService.show('Proveedor guardado correctamente', { classname: 'bg-success text-light', delay: 5000 }); 
         form.reset();
         this._router.navigate(['./proveedor-modulo/proveedorBuscar']);
        },
       error => {
         this.toastService.show('Ups... Algo salio mal', { classname: 'bg-danger text-light', delay: 15000 });
         console.log(<any>error);
       }
     )
  }

  /**
   * Trae la informacion de los bancos que se tienen registradros en la DB
   */
  getBanco(){
    //console.log(this.banco);
    this.getBancoSub = this._bancoService.getBancos().subscribe(
      response =>{
        if(response.status == 'success'){
          this.banco = response.proveedores;
          //console.log(response.proveedores);
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  /**
   * Destruye las subscripciones a los observables de regitro proveedor
   * y obtecion de bancos
   */
  ngOnDestroy(): void {
    this.registraProveedor.unsubscribe();
    this.getBancoSub.unsubscribe();
  }

}
