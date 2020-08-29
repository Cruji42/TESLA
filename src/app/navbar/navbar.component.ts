import { Component, OnInit } from '@angular/core';
import { WsService} from '../services';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dataUser: any;
  log: any;
  id = {id: null};
  response: any;
  constructor( public WS: WsService, public router: Router) {
    this.GetUser();
  }

  GetUser(){
    this.id.id = Number(localStorage.getItem('Id'));
    this.WS.getUser(this.id).subscribe(data => {
      this.response = data;
      this.dataUser = this.response[0].nickname;
      console.log(this.response);
    }, error => {
      console.log(error);
    });
  }
  ngOnInit(): void {
    this.log = Number(localStorage.getItem('LogState'));
  }
  LogOut(){
    localStorage.clear();
    this.log = 0;
    this.router.navigate(['home']);
  }
  LogIn(){
    this.router.navigate(['login']);
  }
  Perfil(){
    this.router.navigate(['profile']);
  }

}
