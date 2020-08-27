import { Component, OnInit } from '@angular/core';
import { WsService} from '../../services';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-cakemaker',
  templateUrl: './cakemaker.component.html',
  styleUrls: ['./cakemaker.component.css']
})
export class CakemakerComponent implements OnInit {
  OrderData = {
    FechaEntrega: null,
    ClienteId: null,
    ProductoCant: null,
    ProductImporte: 0.0,
    ProductoDecoracion: null,
    ProductoTamano: null,
    ProductoSabor: null,
    ProductoRelleno: null,
    ProductoExtra: null,
  };
  registerForm: FormGroup;
  submitted = false;
  data: any;
  log: any;
  dataUser: any;
  id = {id: null};
  mes: any;
  dia: any;
  hora: any;
  minutos: any;
  fecha: any;
  response: any;
  aux: any;
  fecha_not: any;

  constructor(public WS: WsService, public router: Router, private formBuilder: FormBuilder) {
    this.GetUser();
  }

  ngOnInit(): void {
    this.log = Number(localStorage.getItem('LogState'));
    this.registerForm = this.formBuilder.group({
      fecha: [ '', [Validators.required, ]],
      cantidad: [ '', [Validators.required]],
      decoracion: ['', [Validators.required, ]],
      tamano: [ '', [Validators.required]],
      sabor: [ '', [Validators.required]],
      relleno: [ '', [Validators.required ]],
      extra: ['', [Validators.required ]],
    });
  }
  get f() { return this.registerForm.controls; }
  // tslint:disable-next-line:variable-name
  Formato_fecha( fecha_hora ): void{
    const valor = new Date(fecha_hora);
    console.log( valor);
    if ('Invalid Date' === (String(valor))){
        this.fecha_not = false;
        if (this.registerForm.invalid) {
        return;
      }
    } else {
      this.fecha_not = true;
      this.mes = valor.getMonth() + 1;
      this.dia = valor.getDate();
      this.hora = valor.getHours();
      this.minutos = valor.getMinutes();

      if (this.mes <= 9) {
        this.mes = '0' + this.mes;
      }

      if ( this.dia <= 9){
        this.dia = '0' + this.dia;
      }

      if ( this.hora <= 9){
        this.hora = '0' + this.hora;
      }

      if ( this.minutos <= 9) {
        this.minutos = '0' + this.minutos;
      }

      this.fecha = valor.getFullYear() + '-' + this.mes + '-' + this.dia + ' ' + this.hora + ':' + this.minutos + ':00';
      console.log(this.fecha);
      return this.fecha;
    }
  }
  makeOrder(FechaEntrega, cantidad, decoracion, tamano, sabor, relleno, extra ){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.OrderData.ClienteId = Number(localStorage.getItem('Id'));
    this.OrderData.FechaEntrega = this.Formato_fecha(FechaEntrega);
    this.OrderData.ProductoCant = Number(cantidad);
    this.OrderData.ProductoDecoracion = decoracion;
    this.OrderData.ProductoTamano = tamano;
    this.OrderData.ProductoSabor = sabor;
    this.OrderData.ProductoRelleno = relleno;
    this.OrderData.ProductoExtra = extra;
    this.WS.CreateOrder(this.OrderData).subscribe(response => {
      this.data = response;
      console.log(this.data);
      if( this.data.status_code_header === 'HTTP/1.1 422 Unprocessable Entity'){
        Swal.fire({
          title: 'Error',
          text: 'La fecha no cumple con el formato',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Exitoso',
          text: 'Tu pedido fue registrado y enviado',
          icon: 'success',
        });
        this.router.navigate(['home']);
      }

    });
  }
  GetUser(){
    this.id.id = Number(localStorage.getItem('Id'));
    this.WS.getUser(this.id).subscribe(data => {
      this.response = data;
      this.dataUser = this.response[0].Nombre;
    }, error => {
      console.log(error);
    });
  }
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


}
