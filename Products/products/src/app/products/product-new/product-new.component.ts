import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product';
import { NgForm } from '@angular/forms';

import { ProductService } from '../../services';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  product = new Product();

  @Output()
  createProduct = new EventEmitter<Product>();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();

    this.productService.createProduct(this.product).subscribe(createdProduct => {
      console.log(createdProduct);
      this.product = new Product();
      form.reset();

      this.router.navigateByUrl('/');
    });
  }
}
