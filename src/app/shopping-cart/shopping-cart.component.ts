import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})


export class ShoppingCartComponent implements OnInit {
user: any;
newProduct: any = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
productsList: Array <any> = [];



  user: any;
  newProduct: any = {name: '', description: '', id: '', category: '', price: '', material: '', color: '', quantity: ''};
  productsList: Array <any> = [];
  cartList: any = [];

  constructor( private myService: OuthService,
    private myRouter: RouterModule,
    private myActivated: ActivatedRoute ) { }

  ngOnInit() {
    this.myService.isLoggedIn()
    .toPromise()
    .then(() => {
      // this.user = JSON.parse(this.myService.currentUser._body);
      this.user = this.myService.currentUser;

      console.log('user in the component: ', this.user);
    })
    .catch();

    this.myActivated.params
    .subscribe((theParams) => {
      const userId = theParams.id;
      this.showTheCart(userId);
    });

    // this.showTheCart(userId);
  }

  // addNewCard(newCard) {
  //   console.log('am i here? =======', this.newCard);
  //   this.myService.cardInfo(this.newCard)
  //   .toPromise()
  //   .then( () => {
  //     // console.log('card in the TS file: ', newCard);
  //     this.newCard = {cardname: '', cardnumber: '', mailing_address: '', cardexp: '', cvv: '', city: '', state: '', zip: ''};
  //     this.myRouter.navigate(['/profile']);
  //   } )
  //   .catch( err => {
  //     console.log('err in component when saving card ', err);
  //   });
  // }

  showTheCart(userId) {
    this.myService.getTheCartContent(userId)
    .subscribe( arrayOfProducts => {
      this.cartList = arrayOfProducts;
      console.log('array in the component: ', arrayOfProducts );
    });
  }

}


