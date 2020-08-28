import { Component, OnDestroy, OnInit } from '@angular/core';
import { WsService} from '../services';
// import { DataTablesModule} from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnDestroy, OnInit  {
  dtOptions: DataTables.Settings = {};
  stores: any;
  response: any;
  // @ts-ignore
  dtTrigger: Subject = new Subject();
  constructor(public WS: WsService) {

  }

  // ngOnInit(): void {
  //   this.getProducts();
  // }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getProducts();
  }

  ngOnDestroy(): void {
   // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body.data || {};
  // }

  getProducts(){
    this.WS.Get_Stores().subscribe(data => {
      this.response = data;
      this.stores = this.response;
      console.log(this.stores);
      this.dtTrigger.next();
    }, error => {
      console.log(error);
    });
  }
}
