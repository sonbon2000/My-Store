import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productOption: string[] = ['1', '2', '3', '4', '5'];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res;
    });
  }

  onSubmit(cartProduct: Product, event: any) {}
}