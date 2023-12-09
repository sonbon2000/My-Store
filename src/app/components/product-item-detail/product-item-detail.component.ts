import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { ListAmount } from 'src/app/constants';
import { Product } from 'src/app/models/Product';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  productId: number | null = null;
  productDetail!: Product;
  productAmount: number = 1;
  listAmount: number[] = ListAmount;
  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.productId = this.activateRoute.snapshot.params['id'];
    // get Product by id
    this.productService
      .getListProductById(Number(this.productId))
      .subscribe((product) => {
        if (product) {
          this.productDetail = product;
        }
      });
  }

  addProductToCart() {
    alert('Item has been added to cart');
    this.cartService.addToCart(this.productDetail, Number(this.productAmount));
  }
}
