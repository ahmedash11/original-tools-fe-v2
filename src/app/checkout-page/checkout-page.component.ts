import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentications.service';
import { CustomersService } from '../services/crud/customers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAddressComponent } from './add-address/add-address.component';
import { OrderService } from '../services/crud/orders.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  public LOGGED_IN: boolean = false;
  public CHECKOUT_STATUS: number = 1;
  public SELECTED_CARD: number = 0;
  public AUTH_STATUS: number = 0;
  public customerData: any = {};
  public signUpForm!: FormGroup;

  public paymentMethod: string = 'COD';
  public customerAddress: any = null;

  constructor(
    private customerService: CustomersService,
    private authService: AuthenticationService,
    private ordersService: OrderService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.populateCustomerData();
    }
    this.signUpForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      company: new FormControl(''),
      mobile: new FormControl('', Validators.pattern('[0-9]{10}')),
    });
  }

  setStatus(status: number) {
    this.CHECKOUT_STATUS = status;
  }
  selectCard(card: number) {
    this.SELECTED_CARD = card;
  }
  switchAuthStatus() {
    this.AUTH_STATUS = this.AUTH_STATUS == 0 ? 1 : 0;
  }

  onSubmit() {
    if (this.AUTH_STATUS == 0) {
      this.createCustomer();
    } else {
      this.login();
    }
  }

  fetchAddresses() {
    if (this.customerData.id) {
      this.customerService
        .getAddress(this.customerData.id)
        .then((address) => {
          this.customerAddress = address;
        })
        .catch((err) => console.error(err));
    }
  }

  createCustomer() {
    this.customerService
      .createCustomer(this.signUpForm.value)
      .then((customer) => {
        this.authService.setCurrentUserData(customer);
        this.populateCustomerData();
      })
      .catch((err) => console.error(err));
  }
  login() {
    let loginData = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };
    this.authService
      .login(loginData)
      .then((user) => {
        if (user.user.email) {
          this.authService.setToken(user.token);
          this.fetchCustomer(user.user.email);
        }
      })
      .catch((err) => console.error(err));
  }
  fetchCustomer(email: string) {
    this.customerService
      .getCustomerByEmail(email)
      .then((customer) => {
        this.authService.setCurrentUser(customer);
        this.populateCustomerData();
      })
      .catch((err) => console.error(err));
  }

  populateCustomerData() {
    this.customerData = this.authService.getCurrentUser();
    this.fetchAddresses();
    this.LOGGED_IN = true;
  }

  openAddAddress() {
    const modalRef = this.modalService.open(AddAddressComponent);
    modalRef.componentInstance.customerId = this.customerData.id;
    modalRef.componentInstance.existingAddress = this.customerAddress;
    modalRef.result
      .then((result) => {
        /* handle the result (e.g. update the address list) */
        this.fetchAddresses();
      })
      .catch((error) => {
        console.error(error);
        /* handle the error (e.g. display an error message) */
      });
  }

  submitOrder(event: any) {
    console.log('Event ==> ', event);
    const modifiedItems = event?.items.map((item: any) => {
      const { quantity, id, selectedQuantity, ...rest } = item;
      return { productId: id, quantity: selectedQuantity };
    });
    console.log('Modified Items ==> ', modifiedItems);

    let finalOrder = {
      address: this.customerAddress,
      customer: this.customerData,
      products: modifiedItems,
      total: event?.total,
      paymentMethod: this.paymentMethod,
    };

    this.ordersService
      .createOrder(finalOrder)
      .then((res) => {
        console.log('Order Response ==> ', res);
      })
      .catch((err) => console.error(err));
  }
}
