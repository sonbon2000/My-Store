import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('../assets/data.json');
  }
  getListProductById(id: number): Observable<Product | undefined> {
    return this.http
      .get<Product[]>('../assets/data.json')
      .pipe(map((products) => products?.find((ele) => ele.id === Number(id))));
  }
}
