import { Component, OnInit } from '@angular/core';
import { WsService} from '../services';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  response: any;
  products: any;
  constructor(public WS: WsService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }
getProducts(){
  this.WS.Get_Main_Products().subscribe(data => {
    this.response = data;
    // this.products = this.response.body[0];
    // console.log(this.response.body[0]);
    this.products = [this.response[0], this.response[1], this.response[2], this.response[3]];
    console.log(this.response);
  }, error => {
    console.log(error);
  });
}

}
