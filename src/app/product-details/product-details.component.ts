import { Component, OnInit } from '@angular/core';
import {ProductlistService} from '../services/products.service';
import { OuthService } from '../services/outh.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  user: any;

  theProduct: any = {};

  theUpdates: any = {};

  constructor(
    private myService: ProductlistService,
    private myAuth: OuthService ,
    private route: ActivatedRoute,
    private myRouter: Router
   ) { }

   getTheProduct(id) {
    this.myService.getOneProduct(id)
    .subscribe((responseFromService) => {
      this.theProduct = responseFromService;
    });
  }

updateTheProduct(idOfProduct) {
  this.myService.updateProduct(idOfProduct, this.theUpdates)
  .subscribe(() => {
      this.getTheProduct(idOfProduct);
      this.theUpdates = {};
  });

}

  ngOnInit() {
    this.myAuth.isLoggedIn()
    .toPromise()
    .then(() => {
      this.user = this.myAuth.currentUser;
      console.log('user in details page: ', this.user);
    })
    .catch( err => {
      console.log('err in product details: ', err);
    } );

    this.route.params
    .subscribe((theParams) => {
      const theID = theParams.id;
      this.getTheProduct(theID);
    });
  }

  addToCart(product, user) {
    const data = {prodId: product._id, userId: user._id};
    console.log('what is data in component: ', data);
    this.myAuth.sendToShoppingCart(data)
    .toPromise()
    .then(() => {
      this.myRouter.navigate(['/user', user._id, 'cart']);
    })
    .catch( err => {
      console.log('err in addToCart: ', err);
    } );
    // console.log("product is: ", product)
  }

}
