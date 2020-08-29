import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WsService} from '../services';
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor( public router: Router, private formBuilder: FormBuilder, public WS: WsService) { }

  // tslint:disable-next-line:variable-name
  enviarMail( email_data ){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.WS.Forgot({ email: email_data}).subscribe( data => {
      console.log(data);
      Swal.fire({
        title: 'Enviado',
        text: 'Se ha enviado una contraseña de crecuperación a tu correo',
        icon: 'success',
      });
      this.router.navigate(['login']);
    });
    console.log(email_data);
  }
  get f() { return this.registerForm.controls; }

  login(){
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
