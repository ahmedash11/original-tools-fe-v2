import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-summary-card',
  templateUrl: './order-summary-card.component.html',
  styleUrls: ['./order-summary-card.component.scss'],
})
export class OrderSummaryCardComponent implements OnInit {
  items: any[] = [];
  public total: number = 0;

  @Output() action = new EventEmitter<any>();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    if (this.items.length > 0) {
      this.total = this.items.reduce((acc, item) => {
        return acc + item.price * item.selectedQuantity;
      }, 0);

      console.log('Total ==> ', this.total);
    }
  }

  triggerAction() {
    this.action.emit({ items: this.items, total: this.total });
  }
}
