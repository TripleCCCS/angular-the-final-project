import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})


export class UserProfileComponent implements OnInit {
user: any;
isFormShowing: Boolean = false;
newCard: any = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
cardList: Array <any> = [];
savedCard: Array<any> = [];

toggleForm() {
  this.isFormShowing = !this.isFormShowing;
}

  constructor( private myService: OuthService, private myRouter: Router ) { }

  ngOnInit() {
    this.myService.isLoggedIn()
    .toPromise()
    .then(() => {
      this.user = JSON.parse(this.myService.currentUser._body);
      console.log('user in the component: ', this.user);
    })
    .catch();

  }

  addNewCard(newCard) {
    // console.log('am i here?');
    this.myService.cardInfo(this.newCard)
    .toPromise()
    .then( newCard => {
      console.log('card in the TS file: ', newCard);
      this.newCard = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
      this.myRouter.navigate(['/profile']);
    } )
    .catch( err => {
      console.log('err in component when saving card ', err);
    });
  }

  // addToList(theCard) {
  //   this.savedCard.unshift(theCard);
  // }

}
