import { Component, OnInit } from '@angular/core';
/**Servicios */
import { ProveedorService } from 'src/app/services/proveedor.service';
import { MedidaService } from 'src/app/services/medida.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ImpuestoService } from 'src/app/services/impuesto.service';
import { global } from 'src/app/services/global';
/**MODELOS */
import { Compra } from 'src/app/models/compra'
import { Producto_compra } from 'src/app/models/producto_compra';
//NGBOOTSTRAP
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compra-agregar',
  templateUrl: './compra-agregar.component.html',
  styleUrls: ['./compra-agregar.component.css'],
  providers: [ProveedorService, MedidaService,
  ProductoService,ImpuestoService]
})
export class CompraAgregarComponent implements OnInit {

  public proveedoresLista: any;
  public proveedorVer: any;
  public productoVer: any;
  public medidas: any;
  public impuestos: any;
  public compra: Compra;
  public Lista_compras: Array<Producto_compra>;
  public producto_compra: Producto_compra;
  //public producto_datos_extra:any;
  public dato:any;
  public url:any;

  closeResult = '';

  constructor( 
    private _proveedorService: ProveedorService,
    private _medidaService: MedidaService,
    private _productoService: ProductoService,
    private _impuestoService: ImpuestoService,
    private modalService: NgbModal) {
      
      this.compra = new Compra(0,null,null,0,0,0,0,0,'',null,'',null);
      this.producto_compra = new Producto_compra(0,0,0,0,0,0,null,null,null,null);
      this.Lista_compras = [];
      this.url = global.url;
     }

  ngOnInit(): void {
    this.getProvee();
    this.getMedida();
    this.getImpuesto();
  }
  onChange(id:any){//evento que muestra los datos del proveedor al seleccionarlo
    this.getProveeVer(id);
  }
  Consultar(event:any){
    if (event.keyCode === 13) {
      //alert('you just pressed the enter key'+event);
      this.dato=event.target.value;
      //console.log(this.dato)
      this.getProd(this.dato);
    }
  }
  capturar(datos:any){
    this.Lista_compras.push({...this.producto_compra});
    console.log(this.Lista_compras);
  }

/**SERVICIOS */
  getProvee(){
    this._proveedorService.getProveedores().subscribe(
      response => {
        if(response.status == 'success'){
          this.proveedoresLista = response.proveedores;
          
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  getMedida(){
    this._medidaService.getMedidas().subscribe(
      response =>{
        if(response.status == 'success'){
          this.medidas = response.medidas
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getProveeVer(id:any){
    this._proveedorService.getProveedoresVer(id).subscribe(
      response => {
        if(response.status == 'success'){
          this.proveedorVer = response.proveedores;
          //console.log(this.proveedorVer);
        }
      }, error =>{
          console.log(error);
      }
    );
  }

  getProd(id:any){
    this._productoService.getProdclaveex(id).subscribe(
      response =>{
        this.productoVer = response.producto;
        //console.log(this.productoVer);
      },error => {
        console.log(error);
      }
    );
  }

  getImpuesto(){
    this._impuestoService.getImpuestos().subscribe(
      response =>{
        if(response.status == 'success'){
          this.impuestos = response.impuestos
          //console.log(this.impuestos);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  

  //Modal para buscar orden de compra
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
