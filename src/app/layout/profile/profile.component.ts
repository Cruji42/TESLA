import { Component, OnInit } from '@angular/core';
import {WsService} from '../../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  log: any;
  dataUser: any;
  id = {id: null};
  response: any;

  constructor(public WS: WsService, public router: Router) {
    this.GetUser();
  }
  ngOnInit(): void {
    this.log = Number(localStorage.getItem('LogState'));
  }

  GetUser(){
    this.id.id = Number(localStorage.getItem('Id'));
    this.WS.getUser(this.id).subscribe(data => {
      this.response = data;
      this.dataUser = this.response[0];
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
