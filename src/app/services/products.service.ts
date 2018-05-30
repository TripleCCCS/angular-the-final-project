import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';




@Injectable()
export class ProductlistService {
  baseUrl: string = environment.apiUri;

  getAllTheProducts(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private myHttp: Http) { }

  getAllProducts() {
    return this.myHttp.get(`${this.baseUrl}/product/products`)
    .map((responseFromApi) => responseFromApi.json());
  }

  getOneProduct(theID: string) {
    return this.myHttp.get(`${this.baseUrl}/product/products/${theID}`)
    .map((responseFromApi) => responseFromApi.json());
  }


  // deleteProduct(id) {
  //   const body = {};
  //   return this.myHttp.post(`http://localhost:3000/task/delete/${id}`, body)
  //   .map((responseFromApi) => responseFromApi.json());
  // }


  // createNewProduct(theWholeProductObject) {
  //   return this.myHttp.post(`http://localhost:3000/product/products`, theWholeProductObject)
  //   .map((responseFromApi) => responseFromApi.json());
  // }


  updateProduct(theID, theUpdates) {
    return this.myHttp.post(`${this.baseUrl}/task/update/${theID}`, theUpdates)
    .map((responseFromApi) => responseFromApi.json());
  }


}
