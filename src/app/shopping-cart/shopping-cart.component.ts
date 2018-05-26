import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})


export class ShoppingCartComponent implements OnInit {
user: any;
newProduct: any = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
productsList: Array <any> = [];




  constructor( private myService: OuthService, private myRouter: Router ) { }

  ngOnInit() {
    this.myService.isLoggedIn()
    .toPromise()
    .then(() => {
      // this.user = JSON.parse(this.myService.currentUser._body);
      this.user = this.myService.currentUser;

      console.log('user in the component: ', this.user);
    })
    .catch();
    this.showTheCards();
  }

  addNewCard(newCard) {
    console.log('am i here? =======', this.newProduct);
    this.myService.cardInfo(this.newProduct)
    .toPromise()
    .then( () => {
      // console.log('card in the TS file: ', newCard);
      this.newProduct = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
      this.myRouter.navigate(['/profile']);
    } )
    .catch( err => {
      console.log('err in component when saving card ', err);
    });
  }

  showTheCards() {
    this.myService.getTheCards()
    .subscribe( arrayOfCards => {
      this.productsList = arrayOfCards;
      // console.log('array in the component: ', arrayOfCards );
    });
  }

}
