import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  id: number | null = null;
  products: Product[] = [];
  product: Product | undefined;
  newCartProducts: CartProduct[] = [];
  isProductExist: boolean = false;
  productOption: string[] = ['1', '2', '3', '4', '5'];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.productService.getProduct().subscribe((res) => {
      this.products = res;
      this.product = this.getProductById(this.id);
    });
  }

  getProductById(productId: number | null) {
    return this.products.find((item) => item.id === productId);
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
