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
cardsList: Array <any> = [];
// savedCard: Array<any> = [];

toggleForm() {
  this.isFormShowing = !this.isFormShowing;
}

  constructor( private myService: OuthService, private myRouter: Router ) { }

  ngOnInit() {
    console.log('user in user prof component', this.user);


    this.myService.isLoggedIn();


    this.myService.currentUser
    .subscribe((theUser) =>  {
      console.log('user in user component', theUser);
      this.user = theUser;
    });
    // this.myService.isLoggedIn()
    // .toPromise()
    // .then(() => {
    //   // this.user = JSON.parse(this.myService.currentUser._body);
    //   this.user = this.myService.currentUser;

    //   console.log('user in the component: ', this.user);
    // })
    // .catch();
    this.showTheCards();
  }

  addNewCard(newCard) {
    console.log('am i here? =======', this.newCard);
    this.myService.cardInfo(this.newCard)
    .toPromise()
    .then( () => {
      // console.log('card in the TS file: ', newCard);
      this.newCard = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
      this.myRouter.navigate(['/profile']);
    } )
    .catch( err => {
      console.log('err in component when saving card ', err);
    });
  }

  showTheCards() {
    this.myService.getTheCards()
    .subscribe( arrayOfCards => {
      console.log('cards in the component: ', arrayOfCards );
      this.cardsList = arrayOfCards;
    });
  }

}
