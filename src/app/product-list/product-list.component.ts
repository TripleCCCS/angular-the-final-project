import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductlistService } from '../services/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  allTheProducts: Array<any> = [];

  searchTerm: String = "";

  constructor(
    private myService: ProductlistService,
    private router: Router
  ) { }


  ngOnInit() {
    this.getAllTheProducts();
    // this.resultsArray = [];
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

  // deleteProduct(idArgument) {
    //   this.myService.deleteProduct(idArgument)
    //   .subscribe(() => {
  //     this.getAllTheProducts();
  //   });
  // }




}

