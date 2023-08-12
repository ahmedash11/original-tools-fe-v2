import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  // CREATE
  createOrder(order: any): Promise<any> {
    return this.http.post(this.apiUrl, order).toPromise();
  }

  // READ
  getOrders(): Promise<any> {
    return this.http.get(this.apiUrl).toPromise();
  }

  getOrder(id: number): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url).toPromise();
  }

  // UPDATE
  updateOrder(order: any): Promise<any> {
    const url = `${this.apiUrl}/${order.id}`;
    return this.http.put(url, order).toPromise();
  }

  // DELETE
  deleteOrder(id: number): Promise<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).toPromise();
  }
}
