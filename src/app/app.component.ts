import { Component, OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../app/pipes/filter.pipe';
import { OuthService } from '../app/services/outh.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  title = 'app';

  constructor( private myAuth: OuthService ) {

  }

  ngOnInit() {
    this.myAuth.isLoggedIn()
    .toPromise()
    .then( () => {
      this.user = this.myAuth.currentUser;
      console.log('helloooooooo: ', this.user);
    } )
    .catch( err => {
      console.log('error in app comp: ', err);
    });
  }
}


