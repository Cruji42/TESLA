import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  constructor(public http: HttpClient) {
  }

  Get_Main_Products(){
    return this.http.get('http://localhost/CARS/get_Products.php');
  }
  Login(data){
    return this.http.post('http://localhost/CARS/Login.php', data);
  }
  Get_Stores(){
    return this.http.get('http://localhost/CARS/get_Stores.php');
  }
  ws_create(data){
    return this.http.post('http://localhost/CARS/add_User.php', data);
  }
  CreateDate(data){
    return this.http.post('http://localhost/CARS/create_Date.php', data);
  }
  getUser(data){
    return this.http.post('http://localhost/CARS/get_User.php', data );
  }
  getDates(data){
    return this.http.post('http://localhost/CARS/get_Dates.php', data );
    // return this.http.get('http://localhost/LAINNE/index.php/USER', data);
  }
  getAllDates(data){
    return this.http.post('http://localhost/CARS/get_all_Dates.php', data );
    // return this.http.get('http://localhost/LAINNE/index.php/USER', data);
  }
  get_Sales(){
    return this.http.get('http://localhost/CARS/get_Sales.php' );
    // return this.http.get('http://localhost/LAINNE/index.php/USER', data);
  }

  DeleteCite(data){
    return this.http.post( 'http://localhost/CARS/delete_Date.php', data);
  }

  UpDateDate(data){
    return this.http.post('http://localhost/CARS/update_Date.php', data);
  }

  Forgot(data){
    return this.http.post( 'http://localhost/CARS/password.php', data);
  }
}

