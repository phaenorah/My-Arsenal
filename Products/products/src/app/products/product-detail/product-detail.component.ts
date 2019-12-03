import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Product } from '../../models/product';
import { ProductService } from '../../services';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product[] = [];
  // quantity = 0;
  // price = 0;

  @Input()
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        switchMap(id => this.productService.getProduct(id)),
      )
      .subscribe(product => {
        console.log('product from api', product);
        this.product = product;
      });
  }
  onDelete(product: Product): void {
    console.log('deleting product', product);
    this.productService.removeProduct(product._id).subscribe(deletedProduct => {
      console.log('deleted product', deletedProduct);

      this.products = this.products.filter(
        currentProduct => currentProduct._id !== deletedProduct._id,
      );
      this.router.navigateByUrl('/');
    });
  }

}
