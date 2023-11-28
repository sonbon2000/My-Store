import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartProduct } from '../models/CartProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  localStorage = window.localStorage;
  constructor(private http: HttpClient) {}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4200/assets/data.json');
  }

  addProductToCart(product: CartProduct[]) {
    this.localStorage.setItem('productCart', JSON.stringify(product));
  }

  getProductInCart(): CartProduct[] | [] {
    const productStorage = this.localStorage.getItem('productCart');
    return productStorage ? JSON.parse(productStorage) : [];
  }

  clearProductInCart(): void {
    this.localStorage.clear();
  }
}
