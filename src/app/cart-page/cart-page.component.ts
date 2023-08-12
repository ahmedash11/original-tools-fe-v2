import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  public numbers = Array(10)
    .fill(4)
    .map((x, i) => i);
  items: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  removeItem(index: number) {
    this.cartService.remove(index);
    this.cartService.save();
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.cartService.clear();
    this.cartService.save();
    this.items = this.cartService.getItems();
  }

  changeQuantity(idx: number, plus: boolean = true) {
    let product = this.items[idx];
    if (plus && product.quantity > product.selectedQuantity) {
      product.selectedQuantity++;
    } else {
      if (product.selectedQuantity > 1) product.selectedQuantity--;
    }

    this.cartService.add({ ...product });
    this.cartService.save();

    console.log(
      'Cart Page -> Change Quantity -> Cart Items ==> ',
      this.cartService.getItems()
    );
  }
}
