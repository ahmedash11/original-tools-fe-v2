import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: any[] = [];

  constructor() {}

  add(item: any) {
    const existingIndex = this.items.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingIndex !== -1) {
      this.items.splice(existingIndex, 1, item);
    } else {
      this.items.push(item);
    }
  }

  remove(index: number) {
    this.items.splice(index, 1);
  }

  clear() {
    this.items = [];
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  load() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.items = JSON.parse(cart);
    }
  }

  getItems() {
    this.load();
    return this.items;
  }
}
