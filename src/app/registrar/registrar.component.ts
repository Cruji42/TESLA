import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { WsService} from '../services';
import Swal from 'sweetalert2';


/*import Swal from 'sweetalert2'*/
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  public formRegistrar: FormGroup;
  response: any;
  user = {Name: '', LastName: '', Telephone: '', Address: '', City: '', Mail: '', Password: ''};
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, public ws: WsService, public router: Router) {
  // this.formulario();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        nombre: [ '', [Validators.required]],
        apellido: [ '', [Validators.required]],
        telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
        direccion: [ '', [Validators.required]],
        ciudad: [ '', [Validators.required]],
        correo: [ '', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() { return this.registerForm.controls; }



  registrar_usuario(nombre, apellido, telefono, direccion, ciudad, correo, contrasena){

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.user.Name = nombre;
    this.user.LastName = apellido;
    this.user.Telephone = telefono;
    this.user.Address = direccion;
    this.user.City = ciudad;
    this.user.Mail = correo;
    this.user.Password = contrasena;
    console.log(this.user);
    this.ws.ws_create(this.user).subscribe(data => {
      this.response = data;
      console.log(this.response);
      if(this.response === 'DB query Error'){
        Swal.fire({
          title: 'Opss..',
          text: 'El correo con el que se desea registrar ya existe',
          icon: 'warning',
        });
      }else if (this.response.status_code_header === 'HTTP/1.1 201 Created'){
        Swal.fire({
          title: 'Exitoso',
          text: 'Tu registro se realizo correctamente',
          icon: 'success',
        });
        this.router.navigate(['login']);
      }else {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrio algún error, favor de intentarlo más tarde',
          icon: 'error',
        });
      }
    });
  }
  cancel(){
        this.router.navigate(['login']);
  }
}
