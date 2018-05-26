import { Component, OnInit } from '@angular/core';
import {ProductlistService} from '../services/products.service';
import * as $ from 'jquery';


interface JQery<TElement> {
  spectrum: any;
}


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  allTheProducts: Array<any> = [];


  constructor(
    private myService: ProductlistService,
  ) { }



  ngOnInit() {
    this.getAllTheProducts();

    (<any>$('.carousel')).carousel ({
      interval: 1000
    });
  }


  getAllTheProducts() {
    console.log('getting the products');
    console.log(this.allTheProducts);
    this.myService.getAllProducts()
    .subscribe((theList) => {
      this.allTheProducts = theList;
      console.log('products are: ', this.allTheProducts);
    });
  }

}
