import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { DataUserSave } from '../models/dataUser';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  listCart: Cart[] = [];
  dataSave!: DataUserSave;
  constructor() {}

  addToCart(product: Product, amount: number): Cart[] | null {
    if (!amount) {
      return null;
    }
    const findIdxProduct = this.listCart.findIndex(
      (ele) => ele.id === product.id && ele.name === product.name
    );
    if (findIdxProduct === -1) {
      this.listCart.push({ ...product, amount });
    } else {
      this.listCart = this.listCart.map((ele) => {
        if (ele.id === product.id && ele.name === product.name)
          return { ...ele, amount: ele.amount + amount };
        return ele;
      });
    }
    return this.listCart;
  }

  // get Product from cart
  getListCart(): Cart[] {
    return this.listCart;
  }

  // update CartProduct if change amount
  updateListCart(cartList: Cart[]): Cart[] {
    this.listCart = cartList;
    return this.listCart;
  }

  // delete Product from cart if cart == 0
  deleteCart(id: Number): Cart[] {
    const listCartEdit = this.listCart.filter((ele) => ele.id !== id);
    this.listCart = listCartEdit;
    return listCartEdit;
  }

  // save data from user form
  saveData(data: DataUserSave): void {
    this.dataSave = data;
  }

  // get Data from user form
  getDataSave() {
    return this.dataSave;
  }
}
