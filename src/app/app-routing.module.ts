import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
