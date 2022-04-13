import { Component, OnInit } from '@angular/core';
//servicio
import { ClientesService } from 'src/app/services/clientes.service';
//modelo
import { Cliente } from 'src/app/models/cliente';
import { Cdireccion} from 'src/app/models/cdireccion'
//ngbootstrap
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-agregar',
  templateUrl: './cliente-agregar.component.html',
  styleUrls: ['./cliente-agregar.component.css'],
  providers:[ClientesService]
})
export class ClienteAgregarComponent implements OnInit {

  //variables servicios
  public tipocliente :any;
  //variable formulario
  public isCredito: boolean = false;
  //modelo
  public cliente: Cliente;
  public cdireccion: Cdireccion;
  //cerrar modal
  closeResult ='';
  // //variable para asginar fecha
  // hoy : Date= new Date();

  constructor( private _clienteService: ClientesService,
               private modalService:NgbModal) { 
    this.cliente = new Cliente (0,'','','','','',0,1,0);
    this.cdireccion = new Cdireccion (0,'Mexico','Puebla','','','','','','','','','','');
  }

  ngOnInit(): void {
    this.getTipocliente();
    
  }
  getTipocliente(){//obtenemos los tipos de clientes para el select
    this._clienteService.getTipocliente().subscribe(
      response =>{
        this.tipocliente = response.tipocliente;
      },error =>{
        console.log(error);
      });
  }
  guardarCliente(){//guardamos la informacion capturada del cliente
    this._clienteService.postCliente(this.cliente,this.cdireccion).subscribe( 
      response =>{
        console.log(response);
      },error=>{
        console.log(error);
    });
  }
  capturarDireccion(){
    console.log(this.cdireccion);
  }
  // Modal
  open(content:any) {//abre modal
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {//cierra modal con teclado ESC o al picar fuera del modal
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
/*** */