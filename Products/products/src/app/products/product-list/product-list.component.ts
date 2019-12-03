import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(products => {
        console.log('products?', products, this);
        this.products = products;
      });
  }
  onSelect(product: Product) {
    console.log('selecting product', product);
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }

  onCreate(product: Product) {
    console.log('creating product', product);

    this.productService
      .createProduct(product)
      .subscribe(createdProduct => (this.products = [...this.products, createdProduct]));
  }

  onEnter(product: Product) {
    console.log(`entered product ${product.name}`);
  }

  onEvent(event: Event) {
    console.log('eventing');
    event.stopPropagation();
  }

}
