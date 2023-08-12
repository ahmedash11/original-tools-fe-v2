import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from 'src/app/services/crud/customers.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {
  @Input() customerId: number = 0;
  @Input() existingAddress: any = null;
  addressForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private customersService: CustomersService
  ) {
    this.addressForm = new FormGroup({
      id: new FormControl(null),
      building: new FormControl('', Validators.required),
      appartment: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    if (this.existingAddress) {
      this.addressForm.patchValue({
        id: this.existingAddress.id,
        building: this.existingAddress.building,
        appartment: this.existingAddress.appartment,
        floor: this.existingAddress.floor,
        street: this.existingAddress.street,
        area: this.existingAddress.area,
        city: this.existingAddress.city,
      });
    }
  }
  onSubmit() {
    if (this.existingAddress) this.updateAddress();
    else this.createAddress();
  }

  createAddress() {
    const address = this.addressForm.value;
    this.customersService
      .createAddress(this.customerId, address)
      .then((result) => {
        this.activeModal.close(result);
      })
      .catch((error) => {
        this.activeModal.dismiss(error);
      });
  }
  updateAddress() {
    const address = this.addressForm.value;
    this.customersService
      .updateAddress(this.customerId, address)
      .then((result) => {
        this.activeModal.close(result);
      })
      .catch((error) => {
        this.activeModal.dismiss(error);
      });
  }
}
