import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { DataUserSave } from '../models/dataUser';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList: Cart[] = [];
  dataSave!: DataUserSave;
  constructor() {}

  // handle Add product
  addToCart(product: Product, amount: number): Cart[] | null {
    if (!amount) {
      return null;
    }
    const findIdxProduct = this.cartList.findIndex(
      (ele) => ele.id === product.id && ele.name === product.name
    );
    if (findIdxProduct === -1) {
      this.cartList.push({ ...product, amount });
    } else {
      this.cartList = this.cartList.map((ele) => {
        if (ele.id === product.id && ele.name === product.name)
          return { ...ele, amount: ele.amount + amount };
        return ele;
      });
    }
    return this.cartList;
  }

  // get Product from cart
  getListCart(): Cart[] {
    return this.cartList;
  }

  // update CartProduct if change amount
  updateListCart(cartList: Cart[]): Cart[] {
    this.cartList = cartList;
    return this.cartList;
  }

  // delete Product from cart if cart == 0
  deleteCart(id: Number): Cart[] {
    const listCartEdit = this.cartList.filter((ele) => ele.id !== id);
    this.cartList = listCartEdit;
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
