import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Product } from '../../models/product';

import { ProductService } from '../../services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private readonly productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.productService.getProduct(id)),
      )
      .subscribe(product => {
        console.log('product from api', product);
        this.product = this.product;
      });
  }
  onSubmit(event: Event, form: NgForm) {
    console.log('editing product', { ...form.value, _id: this.product._id });

    this.productService
      .updateProduct({ ...form.value, _id: this.product._id })
      .subscribe(updatedProduct => {
        console.log('updated product', updatedProduct);

        this.router.navigate(['/products', updatedProduct._id]);
      });
  }
}
