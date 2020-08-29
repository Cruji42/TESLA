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
  TestData = {
    ClienteId: null,
    Fecha: null,
    Modelo: null,
    Store: null
  };
  registerForm: FormGroup;
  submitted = false;
  data: any;
  log: any;
  dataUser: any;
  dataStore: any;
  dataProduct: any;
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
    this.GetStores();
    this.GetProducts();
  }

  ngOnInit(): void {
    this.log = Number(localStorage.getItem('LogState'));
    this.registerForm = this.formBuilder.group({
      fecha: [ '', [Validators.required, ]],
      modelo: [ '', [Validators.required]],
      store: ['', [Validators.required ]]
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
  makeDate(Fecha, modelo, store){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.TestData.ClienteId = Number(localStorage.getItem('Id'));
    this.TestData.Fecha = this.Formato_fecha(Fecha);
    this.TestData.Modelo = Number(modelo);
    this.TestData.Store = Number(store);
    console.log(this.TestData);
    this.WS.CreateDate(this.TestData).subscribe(response => {
      this.data = response;
      console.log(this.data);
      if ( this.data === 'Error al agendar tu cita'){
        Swal.fire({
          title: 'Error al agendar tu cita',
          text: 'Tenemos problemas para agendar tu cita intentalo más tarde',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Exitoso',
          text: 'Tu cita ha sido agendada',
          icon: 'success',
        });
        this.router.navigate(['orders']);
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
  GetStores(){
    this.WS.Get_Stores().subscribe(data => {
      this.response = data;
      this.dataStore = this.response;
    }, error => {
      console.log(error);
    });
  }
  GetProducts(){
    this.WS.Get_Main_Products().subscribe(data => {
      this.response = data;
      this.dataProduct = this.response;
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
