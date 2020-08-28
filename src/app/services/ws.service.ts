import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  constructor(public http: HttpClient) {
  }

  Get_Main_Products(){
    return this.http.get('http://localhost/CARS/index.php/PRODUCT');
  }
  Login(data){
    return this.http.post('http://localhost/CARS/Login.php', data);
  }
  Get_Stores(){
    return this.http.get('http://localhost/CARS/get_Stores.php');
  }
  ws_create(data){
    return this.http.post('http://localhost/CARS/index.php/USER', data);
  }
  CreateOrder(data){
    return this.http.post('http://localhost/CARS/index.php/ORDER', data);
  }
  getUser(data){
    return this.http.post('http://localhost/CARS/index.php/USER', data );
    // return this.http.get('http://localhost/LAINNE/index.php/USER', data);
  }
  getOrders(data){
    return this.http.post('http://localhost/CARS/index.php/ORDER', data );
    // return this.http.get('http://localhost/LAINNE/index.php/USER', data);
  }

  DeleteOrder(data){
    return this.http.post( 'http://localhost/CARS/index.php/ORDER', data);
  }

  Forgot(data){
    return this.http.post( 'http://localhost/CARS/password.php', data);
  }
}

