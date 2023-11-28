import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/CartProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalPrice: number = 0;
  productOption: string[] = ['1', '2', '3', '4', '5'];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.getProductInCart();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartProducts.reduce((accu: number, val: any) => {
      return accu + val.price * Number(val.option);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  changeAmount(cartProductId: number, e: any) {
    const selectedOption =
      e.target.options[e.target.options.selectedIndex].value;
    const cartIdx = this.cartProducts.findIndex(
      (cart) => cart.id === cartProductId
    );
    cartIdx != -1 && this.cartProducts.length > 0
      ? (this.cartProducts[cartIdx].option = selectedOption)
      : null;
    this.cartProducts.length > 0
      ? this.productService.addProductToCart(this.cartProducts)
      : null;
    this.calculateTotalPrice();
  }

  submitForm(formValue: any) {
    this.productService.clearProductInCart();
    this.router.navigateByUrl(
      `success/${formValue.fullName}/${this.totalPrice}`
    );
  }
}
