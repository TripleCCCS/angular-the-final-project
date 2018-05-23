import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class OuthService {

currentUser: any;

  constructor( private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`http://localhost:3000/signup`, user, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`http://localhost:3000/login`, user, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`http://localhost:3000/logout`, { withCredentials: true })
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`http://localhost:3000/loggedin`, { withCredentials: true })
      .map(res => { this.currentUser = res, console.log('user in service: ', this.currentUser), res.json();
    })
      .catch(this.handleError);
  }
}
