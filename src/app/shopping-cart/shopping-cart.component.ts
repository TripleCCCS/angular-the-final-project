import { Component, OnInit } from '@angular/core';
import { OuthService } from '../services/outh.service';
import { Router, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})


export class ShoppingCartComponent implements OnInit {

  user: any;
  newProduct: any = {name: '', description: '', id: '', category: '', price: '', material: '', color: '', quantity: ''};
  productsList: Array <any> = [];
  cartList: any = [];

  constructor( private myService: OuthService,
    private myRouter: Router,
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


  showTheCart(userId) {
    this.myService.getTheCartContent(userId)
    .subscribe( arrayOfProducts => {
      this.cartList = arrayOfProducts;
      console.log('array in the component: ', arrayOfProducts );
    });
  }

  deleteFromCart(product) {
    const data = {prodId: product._id};
    // console.log("product to be deleted: ", data)
    this.myService.removeFromShoppingCart(data)
    .toPromise()
    .then(() => {
      this.myRouter.navigate(['/user', product._id, 'cart']);
    })
    .catch( err => {
      console.log('err in deleteFromCart: ', err);
    } );
    console.log('product is: ', product);
  }
  }



