import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  constructor(private productService: ProductsService) {}
  ngOnInit() {
    this.productService.getListProducts().subscribe((res) => {
      this.productList = res;
    });
  }
}
