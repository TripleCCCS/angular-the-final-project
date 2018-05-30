import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formInfo: any = {email: '', password: ''};

  user: any;

  error: any;

  constructor(private myService: OuthService, private myRouter: Router ) { }

  ngOnInit() {
    this.myService.isLoggedIn()


    this.myService.currentUser
    .subscribe((theUser)=>{
      // console.log("user in app component", theUser)
      this.user=theUser
    })
  
  }

  login() {
    this.myService.login(this.formInfo)
      .subscribe (
        (user) => {
          this.user = user;
          this.myRouter.navigate(['/index']);
        },
        // tslint:disable-next-line:no-unused-expression
        (err) => this.error = err
      );
  }

}

