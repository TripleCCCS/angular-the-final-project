import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OuthService {

currentUser: BehaviorSubject<string> = new BehaviorSubject(null);
temporaryUser: any;
baseUrl: string = environment.apiUri;

  constructor( private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${this.baseUrl}/api/signup`, user)
      .map(res => {
      res.json();
      })
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${this.baseUrl}/api/login`, user, { withCredentials: true })
      .map(res => {
        this.currentUser.next(res.json());
        res.json();
      })
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/api/logout`, { withCredentials: true })
      .map(res => {
        this.currentUser.next(null);
        res.json();
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${this.baseUrl}/api/loggedin`, { withCredentials: true })
      .map(res => {
        console.log('loggedin being called', res);
        this.temporaryUser = res;
        this.currentUser.next(JSON.parse(this.temporaryUser._body));
        console.log('user in service: ', this.currentUser);
    })
      .catch(this.handleError);
  }

  cardInfo(dataToSend) {
    return this.http.post(`${this.baseUrl}/creditinfo`, dataToSend, { withCredentials: true })
    .map(res => {
      console.log('heyyyyy: ', res);
       res.json();
      })
    .catch(this.handleError);
  }

  getTheCards() {
    return this.http.get(`${this.baseUrl}/api/creditcards`, { withCredentials: true })
    .map(res => res.json())
    .catch(this.handleError);
  }

  sendToShoppingCart(dataToSend) {
    console.log('whattt: ', dataToSend);
    return this.http.post(`${this.baseUrl}/api/cart`, dataToSend, { withCredentials: true })
    .map(res => {
      console.log('carttttt: ', res);
       res.json();
      })
    .catch(this.handleError);
  }

  getTheCartContent(userId) {
    return this.http.get(`${this.baseUrl}/api/user/${userId}/cart`, { withCredentials: true })
    .map(res => res.json())
    .catch(this.handleError);
  }
  removeFromShoppingCart(prodId) {
    console.log('data to send: ', prodId.prodId);
    return this.http.post(`${this.baseUrl}/api/cart/${prodId.prodId}/delete`, prodId, { withCredentials: true })
    .map(res => {
      console.log('carttttt: ', res);
       res.json();
      })
    .catch(this.handleError);
  }

}
