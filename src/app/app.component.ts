import { Component, OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../app/pipes/filter.pipe';
import { OuthService } from '../app/services/outh.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formInfo: any = {name: '', password: '', email: '', address: '', city: '',  state: '', zip: ''};

  user: any = {};

  error: any;

  title = 'app';

  constructor( private myAuth: OuthService, private myRouter: Router ) {
  }

  ngOnInit() {
    // console.log("user in app component", this.user)

    this.myAuth.isLoggedIn()
    .toPromise()
    .then(() => {

      this.myAuth.currentUser
      .subscribe((theUser) => {
        console.log('user in app component', theUser);
        this.user = theUser;
      });
    });
  }


  logout() {
    this.myAuth.logout()
    .subscribe(
    () => {this.user = null;
      this.formInfo = {};
    },
    (err) => this.error = err
  );
  }


}


