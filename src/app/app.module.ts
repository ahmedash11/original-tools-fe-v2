import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbCarouselModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderSummaryCardComponent } from './cart-page/order-summary-card/order-summary-card.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAddressComponent } from './checkout-page/add-address/add-address.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProductDetailsComponent,
    CartPageComponent,
    OrderSummaryCardComponent,
    CheckoutPageComponent,
    ProductsPageComponent,
    ContactUsComponent,
    NavbarComponent,
    AddAddressComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbModalModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
