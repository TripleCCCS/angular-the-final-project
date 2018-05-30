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
  quantityProduct: any = [];
  subTotal: any;
  taxTotal: any;
  grandTotal: any;

  constructor( private myService: OuthService,
    private myRouter: Router,
    private myActivated: ActivatedRoute ) { }

  ngOnInit() {
    console.log('user in shopp component', this.user);


    this.myService.isLoggedIn();


    this.myService.currentUser
    .subscribe((theUser) => {
      console.log('user in shopping cart component', theUser);
      this.user = theUser;
    });
    // this.myService.getTheCartContent(this.user);
    // this.myService.isLoggedIn()
    // .toPromise()
    // .then(() => {
      // this.user = JSON.parse(this.myService.currentUser._body);
    //   this.user = this.myService.currentUser;

    //   console.log('user in the component: ', this.user);
    // })
    // .catch();

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
      this.subTotal = this.cartList.reduce((a, b) => {
        const newB = Number(b.price.substr(1));
        // console.log("b.price======",newB)
        return a + newB;
      }, 0).toFixed(2);

      this.taxTotal = (this.subTotal * 0.07).toFixed(2);
      console.log('taxxxx: ', this.taxTotal);

      this.grandTotal = Number(this.subTotal) + Number(this.taxTotal);
      console.log('totalllll: ', this.grandTotal);

      console.log('subototalllllll: ', this.subTotal);

      this.cartList.forEach(product => {
        const found = this.quantityProduct.find(oneProduct => {
          return oneProduct.name === product.name;
        });
        if (found) {
          found.realQuantity += 1;
        } else {
          product.realQuantity = 1;
          this.quantityProduct.push(product);
        }
        // console.log("quantityProduct =====> ", this.quantityProduct)
      });


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



