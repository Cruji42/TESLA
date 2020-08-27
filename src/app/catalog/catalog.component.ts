import { Component, OnInit } from '@angular/core';
import { WsService} from '../services';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  // stores: any;
  // response: any;
  constructor(public WS: WsService) {
    // this.getProducts();
  }

  ngOnInit(): void {
  }

  /*getProducts(){
    this.WS.Get_Stores().subscribe(data => {
      this.response = data;
      this.stores = this.response;
      console.log(this.stores);
    }, error => {
      console.log(error);
    });
  }*/
}
