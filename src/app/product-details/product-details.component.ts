import { Component, OnInit } from '@angular/core';
import {ProductlistService} from '../services/products.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  theProduct: any = {};

  theUpdates: any = {};

  constructor(
    private myService: ProductlistService,
    private route: ActivatedRoute
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
    this.route.params
    .subscribe((theParams) => {
      const theID = theParams.id;
      this.getTheProduct(theID);
    });
  }

}
