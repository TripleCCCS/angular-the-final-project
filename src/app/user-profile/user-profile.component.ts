import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';

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

toggleForm() {
  this.isFormShowing = !this.isFormShowing;
}

  constructor( private myService: OuthService ) { }

  addNewCard() {
    const theNewCard = {
      name: this.newCard.name,
      cardnumber: this.newCard.cardnumber,
      cardexp: this.newCard.cardexp,
      cvv: this.newCard.cvv,
      mailing_address: this.newCard.mailing_address,
      city: this.newCard.city,
      state: this.newCard.state,
      zip: this.newCard.zip
    };
    this.cardList.unshift(theNewCard);
    this.newCard = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
    this.isFormShowing = false;
  }


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
