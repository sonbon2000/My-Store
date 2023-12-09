import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  listCart: Cart[] = [];
  submitForm: any = {};

  constructor(private cartService: CartService, private router: Router) {}
  ngOnInit(): void {
    this.listCart = this.cartService.getListCart();
    this.calculateTotalPrice();
  }

  changeAmount(event: Event, id: Number) {
    const amount = (event.target as HTMLInputElement).value;

    if (Number(amount) === 0) {
      alert('Item has been deleted');
      this.listCart = this.cartService.deleteCart(Number(id));
      this.calculateTotalPrice();
    } else {
      this.listCart.forEach((ele) => {
        if (ele.id === id) {
          ele.amount = Number(amount);
        }
      });
      this.listCart = this.cartService.updateListCart(this.listCart);
      this.calculateTotalPrice();
    }

    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let total = 0;
    this.listCart.forEach((ele) => {
      total += ele.amount * ele.price;
    });
    return Math.round(total * 100) / 100;
  }

  onSubmit(data: { fullName: string; address: string; creditCard: string }) {
    this.cartService.saveData({ ...data, total: this.calculateTotalPrice() });
    this.router.navigate(['/confirmation']);
  }
}
