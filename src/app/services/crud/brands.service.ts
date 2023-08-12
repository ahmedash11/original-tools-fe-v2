import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private baseUrl = '/api/brands';

  constructor(private http: HttpClient) {}

  // Get all brands
  getAllBrands(): Promise<any> {
    return this.http.get(this.baseUrl).toPromise();
  }

  // Get a single brand by ID
  getBrandById(brandId: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/${brandId}`).toPromise();
  }

  // Create a new brand
  createBrand(brand: any): Promise<any> {
    return this.http.post(this.baseUrl, brand).toPromise();
  }

  // Update an existing brand
  updateBrand(brandId: number, brand: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/${brandId}`, brand).toPromise();
  }

  // Delete a brand by ID
  deleteBrand(brandId: number): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${brandId}`).toPromise();
  }
}
