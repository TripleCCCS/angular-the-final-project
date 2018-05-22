import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formInfo: any = {username: '', password: ''};

  user: any;

  error: any;

  constructor(private myService: OuthService ) { }

  ngOnInit() {
  }

  signup() {
    this.myService.signup(this.formInfo)
      .subscribe(
        (user) => {this.user = user;
          console.log(this.user);
        },
        (err) => this.error = err
      );
  }

}
