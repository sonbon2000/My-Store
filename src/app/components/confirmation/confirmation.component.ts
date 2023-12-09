import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataUserSave } from 'src/app/models/dataUser';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  data!: DataUserSave;
  constructor(
    private router: Router,
    private cartService: CartService,
  ) {}
  ngOnInit(): void {
    this.data = this.cartService.getDataSave();
  }
  back() {
    this.router.navigateByUrl('/products');
  }
}
