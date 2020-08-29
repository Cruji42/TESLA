import { Component, OnInit } from '@angular/core';
import { WsService} from '../../services';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import {__await} from 'tslib';

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
  // tslint:disable-next-line:variable-name
  id_O = {id_cite: null};
  response: any;
  response2: any;
  dates: any;

  constructor(public WS: WsService, public router: Router) {
  }
  ngOnInit(){
    this.GetUser();
    this.GetOrders();
    this.log = Number(localStorage.getItem('LogState'));
  }
  GetUser(){
    this.id.id = Number(localStorage.getItem('Id'));
    this.WS.getUser(this.id).subscribe(data => {
      this.response = data;
      this.dataUser = this.response[0].nickname;
    }, error => {
      console.log(error);
    });
  }
  /*GetOrders(){
    this.id.id = Number(localStorage.getItem('Id'));
    this.WS.getOrders(this.id).subscribe(data => {
      this.response2 = data;
      this.dataOrder = this.response2.body;
      console.log(this.dataOrder);
      }, error => {
      console.log(error);
    });
  }*/
  LogOut(){
    localStorage.clear();
    this.router.navigate(['home']);
  }
  Perfil(){
    this.router.navigate(['profile']);
  }
  goOrders(){
    this.router.navigate(['orders']);
  }
  GetOrders(){
    this.WS.getDates(this.id).subscribe(data => {
      this.response2 = data;
      this.dates = this.response2;
      console.log(this.dates);
     /* for (let i = 0; i < this.response2.length; i++){
        if (i < (this.response2.length - 1)) {
          this.response2_M[i] = this.response2[i + 1];
        }
      }*/
    }, error => {
      console.log(error);
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
