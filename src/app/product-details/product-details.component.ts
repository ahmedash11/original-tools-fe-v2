import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { BrandService } from '../services/crud/brands.service';
import { ProductService } from '../services/crud/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/900/500`
  );

  public quantity: number = 1;
  public productId: any = 0;
  public product: any;
  public brand: any;
  public tabsOptions: any[] = [
    {
      key: 'description',
      value: 'Description',
    },
    {
      key: 'content',
      value: 'Content',
    },
    {
      key: 'techInfo',
      value: 'Technical Info',
    },
    {
      key: 'addings',
      value: 'Addings',
    },
  ];
  public selectedTab: string = 'description';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private brandService: BrandService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.productId = idParam;
        this.getProductDetails(this.productId);
      }
    });
  }

  getProductDetails(productId: any): void {
    this.productService
      .getProductById(productId)
      .then((product) => {
        this.product = product;
        product.brandId && this.getBrandDetails(product.brandId);
      })
      .catch((err) => console.error(err));
  }

  getBrandDetails(brandId: any): void {
    this.brandService
      .getBrandById(brandId)
      .then((brand) => {
        this.brand = brand;
      })
      .catch((err) => console.error(err));
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  changeQuantity(plus: boolean = true) {
    if (plus && this.product.quantity > this.quantity) {
      this.quantity++;
    } else {
      if (this.quantity > 1) this.quantity--;
    }
  }

  addToCart(route: boolean = false) {
    this.cartService.add({ ...this.product, selectedQuantity: this.quantity });
    this.cartService.save();
    console.log('Cart Items ==> ', this.cartService.getItems());
    route && this.goToCart();
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
