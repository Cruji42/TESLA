import { Component, OnInit } from '@angular/core';
import { WsService} from '../../services';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import {__await} from 'tslib';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  data: any;
  log: any;
  dataUser: any;
  id = {id: null};
  JSON = {id: null, option: null};
  // tslint:disable-next-line:variable-name
  id_O = {id_cite: null};
  response: any;
  response2: any;
  dates: any;
  admin: any;
  // @ts-ignore
  dtTrigger: Subject = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(public WS: WsService, public router: Router) {
  }
  ngOnInit(){
    this.GetUser();
    this.GetOrders();
    this.GetAllDates();
    this.log = Number(localStorage.getItem('LogState'));
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

 /* ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }*/

  GetUser(){
    this.id.id = Number(localStorage.getItem('Id'));
    this.WS.getUser(this.id).subscribe(data => {
      this.response = data;
      this.dataUser = this.response[0].nickname;
      if (this.response[0].access === '100'){
        this.admin = false;
      } else {
        this.admin = true;
      }
    }, error => {
      console.log(error);
    });
  }
  LogOut(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
  goOrders(){
    this.router.navigate(['orders']);
  }

  GetOrders(){
    this.WS.getDates(this.id).subscribe(data => {
      this.response2 = data;
      this.dates = this.response2;
      console.log(this.dates);
    }, error => {
      console.log(error);
    });
  }
  GetAllDates(){
    this.WS.getAllDates(this.id).subscribe(data => {
      this.response2 = data;
      this.dates = this.response2;
      console.log(this.dates);
      this.dtTrigger.next();
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:variable-name
  DateDecision( id_date, decision){
    this.WS.UpDateDate({ id: Number(id_date), option: decision }).subscribe( (data: any) => {
      console.log(data);
      if (data === 'success'){
        if(decision === 'A'){
          Swal.fire({
            title: 'Aceptada',
            text: 'La cita fue aceptada',
            icon: 'success',
          });
          this.WS.getAllDates(this.id).subscribe(data => {
            this.response2 = data;
            this.dates = this.response2;
            console.log(this.dates);
            //this.dtTrigger.next();
          }, error => {
            console.log(error);
          });
        } else if (decision === 'B'){
          Swal.fire({
            title: 'Rechazada',
            text: 'La cita fue rechazada',
            icon: 'success',
          });
          this.WS.getAllDates(this.id).subscribe(data => {
            this.response2 = data;
            this.dates = this.response2;
            console.log(this.dates);
            // this.dtTrigger.next();
          }, error => {
            console.log(error);
          });
        }
      } else {
        Swal.fire({
          title: 'Oops...',
          text: 'Algo salio mal, favor de intentarlo más tarde',
          icon: 'warning',
        });
      }
    });
  }

  // tslint:disable-next-line:variable-name
  eliminar( id ){
    this.id_O.id_cite = Number(id);
    Swal.fire({
      title: 'Cancelar Prueba',
      text: '¿Estas seguro de que deseas cancelar tu prueba?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4cae50',
      cancelButtonColor: '#ec1f34',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.WS.DeleteCite(this.id_O ).subscribe((data: any) => {
            console.log(data);
            if (data === 'success'){
              Swal.fire({
                title: '¡Cancelado!',
                text: 'Recuerda que puedes agendar otra prueba',
                icon: 'success',
                confirmButtonColor: '#707070',
              });
              // this.GetOrders();
              location.reload();
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Tu prueba no pudo ser cancelada, favor de intentarlo más tarde',
                icon: 'success',
                confirmButtonColor: '#707070',
              });
            }
        });

      }
    });
  }




}
