import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newCartProducts: CartProduct[] = [];
  isProductExist: boolean = false;
  productOption: string[] = ['1', '2', '3', '4', '5'];
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.productService.getProduct().subscribe((res) => {
      this.products = res;
    });
  }

  onSubmit(cartProduct: Product, event: any) {
    const selectedOption =
      event.target[0].options[event.target[0].options.selectedIndex].value;
    const cardProducts: CartProduct[] | [] =
      this.productService.getProductInCart();
    const cartIndex = cardProducts.findIndex(
      (item) => item.id === cartProduct.id
    );
    this.newCartProducts = cardProducts;
    if (this.newCartProducts.length == 0 || cartIndex == -1) {
      this.newCartProducts.push(
        Object.assign(cartProduct, { option: selectedOption })
      );
      this.toastr.success('Item has been added');
    } else {
      const option: string = this.newCartProducts[cartIndex].option;
      this.isProductExist = selectedOption === option;
      if (this.isProductExist) {
        this.toastr.error('Item is already exist in cart');
      } else {
        this.newCartProducts[cartIndex].id = cartProduct.id;
        this.newCartProducts[cartIndex].option = selectedOption;
        this.toastr.error('Item is already exist in cart');
      }
    }
    !this.isProductExist
      ? this.productService.addProductToCart(this.newCartProducts)
      : null;

    return false;
  }
}
