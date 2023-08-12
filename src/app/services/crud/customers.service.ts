import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentications.service';
import { CurrentuserService } from '../currentuser.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = '/api/customers';
  private addressString = '/address';
  private token: string = '';
  private tokenKey: string = 'x-access-token';
  private currentUserKey: string = 'x-current-user';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private currentUserService: CurrentuserService
  ) {}

  // Get all customers
  getAllCustomers(): Promise<any> {
    return this.http.get(this.baseUrl).toPromise();
  }

  // Get a single customer by ID
  getCustomerById(customerId: number): Promise<any> {
    return this.http.get(`${this.baseUrl}/${customerId}`).toPromise();
  }

  // Get a single customer by Email
  getCustomerByEmail(customerEmail: string): Promise<any> {
    return this.http.get(`${this.baseUrl}/email/${customerEmail}`).toPromise();
  }
  // Create a new customer
  createCustomer(customer: any): Promise<any> {
    return this.http.post(this.baseUrl, customer).toPromise();
  }

  // Update an existing customer
  updateCustomer(customerId: number, customer: any): Promise<any> {
    return this.http.put(`${this.baseUrl}/${customerId}`, customer).toPromise();
  }

  // Delete a customer by ID
  deleteCustomer(customerId: number): Promise<any> {
    return this.http.delete(`${this.baseUrl}/${customerId}`).toPromise();
  }

  getAddress(customerId: number): Promise<any> {
    const url = `${this.baseUrl}/${customerId}/address`;
    return this.http.get(url).toPromise();
  }

  createAddress(customerId: number, address: any): Promise<any> {
    const url = `${this.baseUrl}/${customerId}/address`;
    return this.http.post(url, address).toPromise();
  }

  updateAddress(customerId: number, address: any): Promise<any> {
    const url = `${this.baseUrl}/${customerId}/address`;
    return this.http.patch(url, address).toPromise();
  }

  deleteAddress(customerId: number): Promise<any> {
    const url = `${this.baseUrl}/${customerId}/address`;
    return this.http.delete(url).toPromise();
  }
}
