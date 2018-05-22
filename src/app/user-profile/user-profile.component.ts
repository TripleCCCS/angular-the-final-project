import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
user: any;
  constructor( private myService: OuthService ) { }

  ngOnInit() {
    this.myService.isLoggedIn()
    .toPromise()
    .then(() => {
      this.user = JSON.parse(this.myService.currentUser._body);
      console.log('user in the component: ', this.user);
    })
    .catch();

  }

}
