import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = '/api/products';

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(opts: any = {}): Promise<any> {
    let params: any = {};
    if (opts) {
      params.filter = JSON.stringify(opts);
    }
    return this.http.get(this.baseUrl, { params }).toPromise();
  }

  // Get a single product by ID
  getProductById(productId: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/${productId}`).toPromise();
  }

  // Create a new product
  createProduct(product: any): Promise<any> {
    return this.http.post(this.baseUrl, product).toPromise();
  }

  // Update an existing product
  updateProduct(productId: number, product: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/${productId}`, product).toPromise();
  }

  // Delete a product by ID
  deleteProduct(productId: number): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${productId}`).toPromise();
  }
}
