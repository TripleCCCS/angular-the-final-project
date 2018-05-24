import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], field: string, value: string): any [] {
    if (!products) {
      return[];
    }
    if (!value) {
      return products;
    }

    const myPattern = new RegExp(value, 'i');

    // tslint:disable-next-line:no-shadowed-variable
    return products.filter(products => products[field].match(myPattern));
  }

}
