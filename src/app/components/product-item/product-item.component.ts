import { Component, Input, OnInit } from '@angular/core';
import { ListAmount } from 'src/app/constants';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description: '',
  };
  productAmount: number = 1;
  listAmount: number[] = ListAmount;
  constructor(private cartService: CartService) {}

  ngOnInit() {}

  addProductToCart() {
    alert('Item has been added');
    this.cartService.addToCart(this.product, Number(this.productAmount));
  }
}
