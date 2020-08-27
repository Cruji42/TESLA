import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WsService} from '../services';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData = {email: '', password: ''};
  data: any;
  registerForm: FormGroup;
  submitted = false;

  constructor( public WS: WsService, public router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() { return this.registerForm.controls; }



  Login(pass, email){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.userData.email = email;
    this.userData.password = pass;
    console.log (this.userData);
    this.WS.Login(this.userData).subscribe(response => {
      this.data = response;
      console.log(this.data);
      if (this.data.success === 1){
        console.log('ok');
        localStorage.setItem('token', this.data.token);
        localStorage.setItem('Id', this.data.id);
        localStorage.setItem('LogState', '1');
        this.router.navigate(['order']);
      }else{

        Swal.fire({
          title: 'Oops...',
          text: this.data,
          icon: 'warning',
        });
        console.log(this.data);
      }
    });
  }
}
