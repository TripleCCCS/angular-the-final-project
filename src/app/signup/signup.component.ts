import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formInfo: any = {name: '', password: '', email: '', address: '', city: '',  state: '', zip: ''};

  user: any;

  error: any;

  constructor(private myService: OuthService ) { }

  ngOnInit() {
  }

  signup() {
    console.log('signup form: ', this.formInfo);
    this.myService.signup(this.formInfo)
      .subscribe(
        (user) => {this.user = user;
          console.log(this.user);
        },
        (err) => this.error = err
      );
  }


  logout() {
    this.myService.logout()
    .subscribe(
    () => {this.user = null;
      this.formInfo = {};
    },
    (err) => this.error = err
  );
  }

}
